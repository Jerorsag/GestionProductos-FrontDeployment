# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Sistema de Gestión de Productos - Frontend
### React Bootstrap Axios JWT

Este repositorio contiene la interfaz de usuario para el Sistema de Gestión de Productos, permitiendo a los usuarios gestionar su catálogo de productos con una experiencia moderna y responsiva.

## Demo en vivo
- **Frontend URL:** [https://gestionproductos.onrender.com](https://gestionproductos.onrender.com)
- **Backend API:** [https://gestionproductos.onrender.com](https://gestionproductos.onrender.com)

## Características principales
- **Interfaz intuitiva:** Diseño moderno y responsivo para una experiencia de usuario óptima.
- **Gestión de productos:** Interfaz completa para crear, ver, editar y eliminar productos.
- **Autenticación de usuarios:** Flujos de registro e inicio de sesión integrados.
- **Seguridad del lado del cliente:** Manejo de tokens JWT y rutas protegidas.
- **Visualización personalizada:** Los usuarios solo ven sus propios productos.

## Estructura del proyecto
```
products-frontend/
├── node_modules/      # Dependencias
├── public/            # Archivos públicos
├── src/               # Código fuente
│   ├── components/    # Componentes React
│   ├── services/      # Servicios para comunicación con API
│   ├── pages/         # Páginas de la aplicación
│   └── utils/         # Utilidades
├── .gitignore         # Archivos ignorados por Git
├── package.json       # Dependencias y scripts
└── README.md          # Documentación
```

## Tecnologías utilizadas
- **React:** Biblioteca JavaScript para construir interfaces de usuario.
- **Bootstrap:** Framework CSS para diseño responsivo.
- **Axios:** Cliente HTTP para realizar peticiones a la API.
- **React Router:** Para la navegación entre páginas.
- **JWT Decode:** Para decodificar tokens JWT.
- **LocalStorage API:** Para almacenamiento persistente de tokens.

## Requisitos previos (desarrollo local)
- Node.js 16 o superior
- npm 8 o superior

## Configuración del entorno local
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/gestion-productos-frontend.git
cd gestion-productos-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura la URL de la API en `.env` o `.env.local`:
```
REACT_APP_API_URL=http://localhost:8080
```

4. Inicia la aplicación:
```bash
npm start
```

La aplicación estará disponible en http://localhost:3000

## Funcionalidades principales

### Autenticación
- **Registro:** Formulario para crear una nueva cuenta de usuario.
- **Inicio de sesión:** Acceso a usuarios existentes.
- **Cierre de sesión:** Eliminación segura del token de autenticación.
- **Gestión de estado de autenticación:** Validación y almacenamiento del token JWT.

### Gestión de productos
- **Lista de productos:** Visualización de todos los productos del usuario actual.
- **Detalles de producto:** Vista detallada de cada producto.
- **Creación de productos:** Formulario para añadir nuevos productos.
- **Edición de productos:** Actualización de productos existentes.
- **Eliminación de productos:** Borrado de productos con confirmación.

### Seguridad y navegación
- **Rutas protegidas:** Acceso a páginas restringido para usuarios autenticados.
- **Interceptores de Axios:** Inclusión automática del token JWT en las peticiones.
- **Manejo de errores:** Gestión centralizada de respuestas de error de la API.
- **Redirecciones inteligentes:** Flujos de navegación adaptados al estado de autenticación.

## Flujo de usuario típico
1. El usuario se registra o inicia sesión.
2. Navega a la sección de productos y ve su catálogo personal.
3. Puede crear nuevos productos con el botón de añadir.
4. Para cada producto, puede ver los detalles, editar o eliminar.
5. Al finalizar, cierra sesión de forma segura.

## Despliegue
El frontend está desplegado en [Servicio de alojamiento] y se comunica con la API alojada en Render.

## Contacto
- Desarrollador: Jeronimo Rodriguez Sepulveda
- Email: jeronimoroseag@gmail.com
