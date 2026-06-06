const express = require('express');
const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const app = express();
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

client.connect().then(() => {
    db = client.db('clinic_db');
    console.log("✅ Conectado a MongoDB");
});

// Endpoint 1: Ver todas las citas agendadas
// Endpoint 1: Ver TODAS las citas (sin importar el estado) O buscar una específica por ID
app.get('/api/appointments', async (req, res) => {
    const { id } = req.query; // Revisamos si el usuario escribió "?id=..." en la URL

    let filtro = {}; // 👈 ¡El cambio está aquí! Un objeto vacío significa "tráeme todo"

    if (id) {
        filtro.appointmentId = id; // Si nos dieron un ID, lo agregamos al filtro
    }

    const citas = await db.collection('appointments').find(filtro).toArray();
    
    if (citas.length === 0) {
        return res.status(404).json({ mensaje: "No se encontraron citas" });
    }

    res.json(citas);
});

// Endpoint 2: Confirmar o cancelar cita mediante Token (Interactividad)
app.get('/api/reminders/respond', async (req, res) => {
    const { token, action } = req.query; // action = 'confirm' o 'cancel'
    const nuevoEstado = action === 'confirm' ? 'Confirmed' : 'Cancelled';

    const resultado = await db.collection('appointments').updateOne(
        { "reminders.token": token },
        { $set: { "status": nuevoEstado, "reminders.$.status": "Responded", "updatedAt": new Date() } }
    );

    if (resultado.modifiedCount === 0) return res.status(404).send("Token inválido.");
    res.send(`<h1>✅ Cita actualizada a estado: ${nuevoEstado}</h1>`);
});

// Endpoint 3: Reporte Analítico de Ausentismo (Aggregation Framework)
app.get('/api/analytics/noshow', async (req, res) => {
    const pipeline = [
        {
            $group: {
                _id: "$doctor.specialty",
                totalCitas: { $sum: 1 },
                ausentes: { $sum: { $cond: [{ $eq: ["$status", "NoShow"] }, 1, 0] } }
            }
        },
        {
            $project: {
                especialidad: "$_id",
                totalCitas: 1,
                ausentes: 1,
                tasaAusentismo: { $multiply: [{ $divide: ["$ausentes", "$totalCitas"] }, 100] }
            }
        },
        { $sort: { tasaAusentismo: -1 } }
    ];
    
    const reporte = await db.collection('appointments').aggregate(pipeline).toArray();
    res.json(reporte);
});

// Cron Job Simulado: Corre cada 1 minuto para buscar recordatorios
cron.schedule('* * * * *', async () => {
    console.log("⏳ [CRON] Buscando citas para enviar recordatorios...");
});

app.listen(3000, () => console.log('🚀 Servidor corriendo en http://localhost:3000'));