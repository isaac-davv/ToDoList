# ToDoList

Aplicación fullstack de gestión de tareas con React y Node.js.

## Estructura
```
ToDoList/
├── ToDoList-api/       → Backend (Node.js + Express + MongoDB)
└── ToDoList-frontend/  → Frontend (React + Vite)
```

## Instalación

### Backend
```bash
cd ToDoList-api
npm install
```

Crea un archivo `.env` basándote en `.env.example`:
```
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
PORT=3000
```

Arranca el servidor:
```bash
npm run dev
```

### Frontend
```bash
cd ToDoList-frontend
npm install
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Cadena de conexión de MongoDB Atlas |
| `PORT` | Puerto del servidor (por defecto 3000) |
```

Luego también crea el `.env.example` dentro de `ToDoList-api`:
```
MONGO_URI=
PORT=3000