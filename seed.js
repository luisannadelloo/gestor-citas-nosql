const { MongoClient } = require('mongodb');

async function seedDB() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('clinic_db');
        const collection = db.collection('appointments');

        await collection.deleteMany({}); // Limpia la base de datos antes de insertar

        const especialidades = ["Cardiología", "Pediatría", "Ginecología", "Oftalmología", "Medicina Interna"];
        const estados = ["Scheduled", "Confirmed", "NoShow", "Completed", "Cancelled"];
        let citas = [];

        // Generar 120 citas realistas
        for (let i = 1; i <= 120; i++) {
            const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
            const especialidadAleatoria = especialidades[Math.floor(Math.random() * especialidades.length)];
            
            citas.push({
                appointmentId: `CIT-2026-${1000 + i}`,
                patient: {
                    fullName: `Paciente Prueba ${i}`,
                    phoneNumber: `+18095550${String(i).padStart(3, '0')}`,
                    preferences: { channels: ["WhatsApp", "SMS"] }
                },
                doctor: {
                    fullName: `Dr. Especialista ${Math.ceil(i/24)}`,
                    specialty: especialidadAleatoria
                },
                dateTime: new Date(new Date().getTime() + (i * 1000 * 60 * 60 * 2)), 
                status: estadoAleatorio,
                reminders: [
                    { type: "24h", status: "Pending", token: `tok_24h_${i}xyz` }
                ]
            });
        }

        await collection.insertMany(citas);
        
        // Crear Índices ESR (Requisito UAPA)
        await collection.createIndex({ "status": 1, "dateTime": 1 });

        console.log(`✅ Base de datos poblada con ${citas.length} citas exitosamente.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

seedDB();