# Proyecto Final: Gestor de Citas Médicas NoSQL
**Autor:** Luisanna Dell Olio Ogando | **Asignatura:** MBD-106 - Bases de Datos NoSQL

Este proyecto es la implementación práctica final, de una API desarrollada en Node.js, Express y MongoDB para la gestión ágil de citas médicas y la automatización de recordatorios preventivos (Cron Jobs) con el fin de reducir el ausentismo clínico (No-Show).

## Descripción del Problema
La Clínica Médica enfrenta una tasa de ausentismo del 18% en sus 500 consultas semanales. Este proyecto implementa un sistema de agendamiento y motor de recordatorios automáticos multicanal utilizando MongoDB para reducir las inasistencias y optimizar la agenda médica.

## Stack Tecnológico Utilizado
* **Base de Datos:** MongoDB (NoSQL Documental)
* **Backend:** Node.js + Express
* **Infraestructura:** Docker & Docker Compose
* **Dependencias principales:** `mongodb`, `express`, `node-cron`, `cors`

## Instrucciones para Ejecutar el Proyecto:

## Requisitos Previos
* **Node.js** (v18 o superior)
* **Docker** y **Docker Compose** instalados y ejecutándose.
* **Git**

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/luisannadelloo/gestor-citas-nosql.git](https://github.com/luisannadelloo/gestor-citas-nosql.git)
   cd gestor-citas-nosql

2. **Levantar el motor de base de datos MongoDB (Docker):**
   ```bash
   docker-compose up -d

3. **Instalar las dependencias del servidor:**
   ```bash
   npm install

4. **Cargar datos de prueba (Seed) e Índices ESR:**

Este comando inyectará 121 registros de citas aleatorias, incluyendo una cita programada exactamente para 1 hora en el futuro para probar el sistema de alertas.

   ```bash
   npm run seed

5. **Iniciar el servidor de la API y las tareas en segundo plano:**
   ```bash
   npm start

## Endpoints Principales

Una vez el servidor esté corriendo, puedes probar la API desde tu navegador

1. `GET /api/appointments`: Obtiene la agenda de todas las citas y permite consultar citas específicas mediante: "/api/appointments?id=CIT-2026-XXXX".
2. `GET /api/reminders/respond?token=XYZ&action=confirm`: Simular confirmación de paciente.
3. `GET /api/analytics/noshow`: Genera el reporte analítico de ausentismo por especialidad usando el Aggregation Framework.

