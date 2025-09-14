echo 'Verificando conexión a la base de datos...'
until pg_isready -h db -p 5432 -U postgres; do
  echo 'DB aún no está lista, esperando...'
  sleep 2
done

echo 'Base de datos lista, aplicando migraciones...'
npx prisma migrate deploy

echo 'Sembrando datos iniciales...'
npx tsx prisma/seed.ts

echo 'Iniciando aplicación Next.js en puerto 3001...'
npm run dev