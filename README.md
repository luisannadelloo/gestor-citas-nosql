# Proyecto Final: Gestor de Citas Médicas NoSQL 🏥
**Autor:** Luisanna Dell Olio Ogando | **Asignatura:** MBD-106 - Bases de Datos NoSQL

## Descripción del Problema
La Clínica Médica enfrenta una tasa de ausentismo del 18% en sus 500 consultas semanales. Este proyecto implementa un sistema de agendamiento y motor de recordatorios automáticos multicanal utilizando MongoDB para reducir las inasistencias y optimizar la agenda médica.

## Stack Tecnológico Utilizado
* **Base de Datos:** MongoDB (NoSQL Documental)
* **Backend:** Node.js + Express
* **Infraestructura:** Docker & Docker Compose
* **Dependencias principales:** `mongodb`, `express`, `node-cron`, `cors`

## Endpoints Principales
1. `GET /api/appointments`: Obtiene la agenda de todas las citas y permite consultar citas específicas mediante: "/api/appointments?id=CIT-2026-XXXX".
2. `GET /api/reminders/respond?token=XYZ&action=confirm`: Permite al paciente confirmar/cancelar.
3. `GET /api/analytics/noshow`: Genera el reporte analítico de ausentismo por especialidad usando el Aggregation Framework.

## Instrucciones para Ejecutar el Proyecto
Para arrancar el proyecto con un solo comando, asegúrate de tener Docker instalado.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/luisannadelloo/gestor-citas-nosql.git](https://github.com/luisannadelloo/gestor-citas-nosql.git)
   cd gestor-citas-nosql