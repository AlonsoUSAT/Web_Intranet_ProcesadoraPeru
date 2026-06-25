# Manual Técnico y de Usuario — Web Comercial Procesadora Perú S.A.C.

Este documento contiene la especificación de arquitectura, el mapa de cumplimiento técnico bajo la norma ISO/IEC 25010 y el manual de despliegue local simplificado para la aplicación web comercial de Procesadora Perú S.A.C.

## 1. Arquitectura y Stack Tecnológico
La aplicación está construida sobre una arquitectura de componentes desacoplados basada en el ecosistema de JavaScript moderno, garantizando una alta mantenibilidad y eficiencia temporal.

* **Framework Principal:** React 19 (Arquitectura basada en componentes funcionales y Hooks Hooks personalizados).
* **Herramienta de Construcción (Bundler):** Vite 8 (Optimización de empaquetado y Hot Module Replacement en entorno de desarrollo).
* **Estilizado y Diseño Visual:** Tailwind CSS 4 (Sistema utilitario de diseño para interfaces adaptables).
* **Motor de Animaciones:** Framer Motion 12 (Transiciones fluidas de estados de interfaz).
* **Gestión de Formularios:** React Hook Form.
* **Integración de Mensajería Externa:** API Client-side de EmailJS.

---

## 2. Mapa de Brechas de Calidad Resueltas (ISO/IEC 25010)
El sistema ha sido sometido a un proceso de reingeniería de software enfocado en las siguientes subcaracterísticas de calidad:

| Código | Dimensión | Solución Técnica Implementada |
| :--- | :--- | :--- |
| **PERF-001** | Eficiencia de Rendimiento | División de código dinámico usando `React.lazy` y `Suspense` para optimizar la carga inicial. |
| **PERF-002** | Eficiencia / Comportamiento | Optimización multimedia interactiva implementando atributos `srcSet` y `sizes` en imágenes Unsplash. |
| **PERF-005** | Eficiencia Temporal | Preconexión y precarga (`preload`) de recursos críticos en `index.html` para erradicar el parpadeo de texto invisible (FOIT/FOUT). |
| **B2B-001** | Mantenibilidad | Implementación de un Sistema de Tokens de Diseño Centralizado mediante propiedades personalizadas CSS (`:root`). |
| **B2B-005** | Optimización SEO | Inyección dinámica de metadatos descriptivos agroindustriales dentro del componente `<Helmet>` en el formulario de contacto para motores de búsqueda. |
| **B2B-006** | Usabilidad / Estética | Reemplazo de spinners genéricos por estructuras de carga animadas responsivas (`Skeleton Loaders`). |
| **ACC-001** | Accesibilidad | Incorporación del atributo `tabIndex={0}` y anillos de enfoque visual visibles para habilitar el scroll por teclado en el calendario estacional. |
| **SEC-001** | Seguridad | Extracción y blindaje de credenciales expuestas de EmailJS hacia variables de entorno locales controladas por Vite. |
| **SEC-003** | Seguridad | Algoritmo estricto de sanitización, filtrado y escape de cadenas mediante expresiones regulares (`Regex`) en controladores `onSubmit` para bloquear ataques de inyección HTML y XSS. |

---

## 3. Manual de Instalación Paso a Paso (Ejecución Local)

Siga rigurosamente las siguientes instrucciones para clonar, configurar e iniciar la aplicación en cualquier computadora personal sin experiencia previa en programación:

### Requisito Previo Obligatorio: Instalar Node.js
1. Abra su navegador web e ingrese a la página oficial de Node.js (https://nodejs.org/).
2. Descargue e instale la versión recomendada para la mayoría de usuarios (LTS).
3. Complete el asistente de instalación de Windows o macOS presionando "Siguiente" en todas las ventanas. No altere ninguna configuración predeterminada.

### Paso 1: Descargar el Código del Proyecto
1. Si dispone de Git instalado, abra su terminal de comandos y ejecute de manera directa:
   git clone https://github.com/AlonsoUSAT/Web_Intranet_ProcesadoraPeru.git
2. En caso de no contar con Git, ingrese al enlace del repositorio en GitHub, presione el botón verde "Code" y seleccione la opción "Download ZIP". Extraiga el archivo comprimido en una carpeta de su elección.

### Paso 2: Configurar las Variables de Entorno Seguras
1. Navegue hasta la raíz de la carpeta del proyecto extraído.
2. Cree un archivo de texto plano nuevo y renombre el archivo exactamente con el siguiente nombre: `.env.local`
3. Abra el archivo con cualquier editor de notas e inserte las siguientes claves del sistema de mensajería (reemplace los valores con sus credenciales de prueba en caso sea requerido):
   VITE_EMAILJS_SERVICE_ID="service_kg4kdep"
   VITE_EMAILJS_TEMPLATE_ID="template_et6yjtf"
   VITE_EMAILJS_PUBLIC_KEY="5ZMDxisO3ndxvreps"
4. Guarde y cierre el archivo.

### Paso 3: Instalar las Dependencias del Sistema
1. Abra la consola de comandos de su sistema operativo (Terminal en Mac o CMD/PowerShell en Windows) apuntando a la ruta de la carpeta del proyecto.
2. Ejecute el siguiente comando para descargar de forma automática todas las librerías necesarias del entorno de React:
   npm install

### Paso 4: Levantar el Servidor de Desarrollo Local
1. En la misma ventana de la consola de comandos, inicie la ejecución del proyecto local mediante el comando:
   npm run dev
2. La terminal mostrará una dirección de red local similar a la siguiente: `http://localhost:5173/`.
3. Copie esa dirección, péguela en la barra de direcciones de su navegador de preferencia (Chrome, Edge, Firefox) y presione Enter. La aplicación se renderizará de inmediato en pantalla completa.
