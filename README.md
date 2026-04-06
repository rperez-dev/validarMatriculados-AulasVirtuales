📝 Descripción del proyecto

Sistema web para la gestión y validación de estudiantes matriculados en plataformas virtuales (Moodle), enfocado en optimizar procesos académicos mediante la comparación automatizada de datos externos (como SAP) con la información del sistema.

El proyecto permite:

📥 Obtener participantes de cursos desde Moodle mediante consumo de servicios internos.
📊 Visualizar listados de estudiantes con información relevante (nombre, email, rol, estado, etc.).
✅ Validar correos de estudiantes pegados manualmente (ej. desde SAP) contra los matriculados reales.
⚠️ Identificar rápidamente estudiantes no encontrados o inconsistencias en los datos.
🎯 Reducir tiempos operativos en procesos como generación de actas o control de asistencia.

⚙️ Tecnologías utilizadas
Frontend: React + Vite + Tailwind CSS
Backend: Django + Django Rest Framework
Scraping/Parsing: BeautifulSoup + Requests
Arquitectura: Enfoque modular con principios de Clean Code
Infraestructura: Docker + Docker Compose
