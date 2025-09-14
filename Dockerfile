# 1. Imagen base
FROM node:20-alpine

# Instalar dependencias del sistema incluyendo postgresql-client
RUN apk add --no-cache libc6-compat postgresql-client

# 2. Directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar solo archivos de dependencias primero (mejor cache)
COPY package*.json ./

# 4. Instalar dependencias
RUN npm ci --only=production=false

# 5. Copiar esquema de Prisma
COPY prisma ./prisma/

# 6. Generar cliente de Prisma
RUN npx prisma generate

# 7. Copiar el resto del código (en capas separadas para mejor cache)
COPY . .

# 8. Crear directorio para logs si no existe
RUN mkdir -p /usr/src/app/logs

# 9. Exponer el puerto correcto
EXPOSE 3001

# 10. Script de inicio
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# 11. Comando para desarrollo
CMD ["./start.sh"]