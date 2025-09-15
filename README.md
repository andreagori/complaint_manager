# Customer Management

Plataforma web para gestionar clientes y quejas, con autenticación, panel de administración y API sobre Next.js. Incluye base de datos PostgreSQL y ORM con Prisma. Puede ejecutarse con Docker (recomendado si no tienes nada instalado) o de forma local.

- Dockerfile: [customer_management/Dockerfile](customer_management/Dockerfile)
- Docker Compose: [customer_management/docker-compose.yml](customer_management/docker-compose.yml)
- Script de arranque: [customer_management/start.sh](customer_management/start.sh)
- Esquema Prisma: [customer_management/prisma/schema.prisma](customer_management/prisma/schema.prisma)
- Seed inicial: [customer_management/prisma/seed.ts](customer_management/prisma/seed.ts)
- Cliente Prisma: [customer_management/lib/prisma.ts](customer_management/lib/prisma.ts)
- Utilidades de autenticación: [customer_management/lib/authHelpers.ts](customer_management/lib/authHelpers.ts)
- Rutas API (App Router): [customer_management/app/api](customer_management/app/api)
- UI (App Router): [customer_management/app](customer_management/app)
- Página cliente: [customer_management/app/(customer)/page.tsx](customer_management/app/(customer)/page.tsx)
- Controladores del dominio: [customer_management/server/controllers](customer_management/server/controllers)
- Servicios del dominio: [customer_management/server/services](customer_management/server/services)
- Package.json: [customer_management/package.json](customer_management/package.json)

## 1) Propósito

- Registrar, listar y gestionar clientes.
- Recibir y administrar quejas/sugerencias con estados y acciones.
- Ofrecer autenticación y vistas diferenciadas (cliente/administración).
- Proveer API interna para operaciones de dominio (clientes y quejas).

## 2) Tecnologías

- **Frontend/Backend:** Next.js (App Router) + React + TypeScript  
- **Base de datos:** PostgreSQL  
- **ORM:** Prisma  
- **Contenedores:** Docker y Docker Compose  
- **Autenticación:** JWT + Middleware en API routes  
- **Estilos:** TailwindCSS  
- **Scripts:** `start.sh` con migraciones y seed

Código clave:
- API (handlers) en [app/api](customer_management/app/api)
- Lógica de dominio en [server/controllers](customer_management/server/controllers) y [server/services](customer_management/server/services)
- Prisma client en [`lib/prisma.ts`](customer_management/lib/prisma.ts) y esquema en [`prisma/schema.prisma`](customer_management/prisma/schema.prisma)

## 3) Arquitectura del proyecto

- App Router (Next.js): [app/](customer_management/app)
  - Secciones: `(admin)/`, `(customer)/`, componentes en [app/components](customer_management/app/components)
  - Rutas API: [app/api](customer_management/app/api) (auth, complaints, customer)
- Capa de dominio (Node/TS puro):
  - Controladores: [server/controllers](customer_management/server/controllers) (p. ej. `complaintController.ts`, `customerController.ts`)
  - Servicios: [server/services](customer_management/server/services)
- Datos:
  - Prisma: [prisma/schema.prisma](customer_management/prisma/schema.prisma), migraciones y [prisma/seed.ts](customer_management/prisma/seed.ts)
  - Cliente: [lib/prisma.ts](customer_management/lib/prisma.ts)
- Utilidades y tipos:
  - Helpers: [lib/](customer_management/lib)
  - Hooks React: [app/hooks](customer_management/app/hooks)
  - Tipos compartidos: [types/](customer_management/types)

Flujo típico:
UI (React) → API routes (Next.js en [app/api](customer_management/app/api)) → Controladores/Servicios ([server/](customer_management/server)) → Prisma → PostgreSQL.

## Pasos:
## 1) Variables de entorno (.env en localhost)

Crea ./.env con:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/complaintsdb
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword
JWT_SECRET=jwtsecretkey
```

## 2) Instalar dependencias

```bash
npm i
```

## 3) Preparar base de datos con Docker (migraciones + seed)

```bash
docker-compose up --build seed
```

Al terminar el seed, deja la base activa en segundo plano:

```bash
docker-compose up -d db
```

- Detener base: `docker-compose down`
- Borrar datos: `docker-compose down -v`

## 4) Ejecutar la aplicación en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000

## Problemas comunes

- Prisma P1001 (no conecta a BD):
  - Verifica DATABASE_URL (localhost:5432) y que el servicio db esté corriendo (`docker-compose ps`).
- Seed falla:
  - Asegura ADMIN_EMAIL/ADMIN_PASSWORD en .env.
  - Reintenta: `docker-compose up --build seed`.
- Puerto 3000 ocupado:
  - `set PORT=3001 && npm run dev` (Windows) y abre http://localhost:3001

Detener:
   En la terminal: Ctrl+C
   O en segundo plano:
   docker compose up -d
   docker compose down

## Scripts útiles

- Desarrollo: `npm run dev`
- Build: `npm run build`
- Producción: `npm start`
- Prisma:
  - `npx prisma studio` (inspeccionar BD)
  - `npx prisma migrate dev` / `deploy`
  - `npx prisma generate`


## Estructura de carpetas (resumen)

- App/UX: [app/](customer_management/app)
- API (handlers): [app/api](customer_management/app/api)
- Dominio (controladores/servicios): [server/](customer_management/server)
- Datos (Prisma/DB): [prisma/](customer_management/prisma)
- Utilidades/Cliente Prisma: [lib/](customer_management/lib)
- Tipos compartidos: [types/](customer_management/types)
