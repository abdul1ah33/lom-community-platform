# Lord of Mysteries Community Platform

A full-stack community platform for Lord of the Mysteries fans.

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Web

- React
- TypeScript
- Vite

### Mobile

- React Native
- Expo

## Project Structure

```
backend/   # FastAPI backend
web/       # React web application
mobile/    # React Native mobile application
docs/      # Project documentation
```

## Current Status

🚧 Project setup in progress.
## Quick Start (any PC, one command)

The only thing you need installed is [Docker Desktop](https://www.docker.com/products/docker-desktop/) (start it once after installing). You don't need Node.js, Python or PostgreSQL.

```bash
git clone https://github.com/abdul1ah33/lom-community-platform.git
cd lom-community-platform
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API docs: http://localhost:8000/docs
- PostgreSQL: `localhost:5433` (user `lom`, password `lom`, database `lom_community`)

Database migrations run automatically on startup. Code changes in `backend/` and `beta_frontend/` reload live.

- Stop: `Ctrl+C`, or `docker compose down`
- Wipe the database and start fresh: `docker compose down -v`
- After changing `requirements.txt` or `package.json`: `docker compose up --build`
