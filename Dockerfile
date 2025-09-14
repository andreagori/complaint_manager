# 1. Imagen base
FROM node:20-alpine

# 2. Directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm ci

# 5. Copiar todo el proyecto
COPY . .

# 6. Exponer el puerto de Next.js
EXPOSE 3000

# 7. Comando para desarrollo
CMD ["npm", "run", "dev"]
