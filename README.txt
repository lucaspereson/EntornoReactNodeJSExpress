1. Configuración del proyecto
        npm init -y

    Instala Express:
        npm install express
    
    Crea un subdirectorio para el frontend y otro para el backend en tu proyecto:
        mkdir frontend
        mkdir backend
    
    Navega al directorio frontend y crea una nueva aplicación React:
        npx create-react-app .
    
    Regresa al directorio principal de tu proyecto e instala nodemon para el desarrollo, para reiniciar automáticamente tu servidor cuando hagas cambios:
        npm install --save-dev nodemon
    
    En tu archivo package.json en la raíz de tu proyecto, añade un script para iniciar el backend con nodemon:
        "scripts": {
            "start": "nodemon backend/server.js",
            "start-frontend": "cd frontend && npm start",
            "build-frontend": "cd frontend && npm run build"
        },