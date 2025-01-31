# Usa Node.js 20 como imagen base
FROM node:20-alpine AS base

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias con una opción para evitar problemas de compatibilidad
RUN npm ci --legacy-peer-deps

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto en el que corre la aplicación (cambia según configuración)
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["npm", "run", "start"]
