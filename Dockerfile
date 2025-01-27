# Usa una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código al contenedor
COPY . .
# Ejecutamos la construcción del proyecto
RUN npm run build
# Expone el puerto que usará la app (Railway usará automáticamente el puerto definido por la variable $PORT)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "start:prod"]
