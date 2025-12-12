# Organization Management Service (Express + MongoDB)

## Setup
- Install dependencies: `npm install`
- Copy env: `cp env.example .env` (fill `MONGO_URI`, `MASTER_DB`, `JWT_SECRET`, `PORT`)
- Run dev server: `npm run dev`
- Run production: `npm start`

## Endpoints
- `POST /org/create` — `{ organization_name, email, password }`
- `GET /org/get?organization_name=Acme`
- `PUT /org/update` — `{ organization_name, new_name, email, password }`
- `DELETE /org/delete?organization_name=Acme` — requires `Authorization: Bearer <token>`
- `POST /admin/login` — `{ email, password }` → `{ access_token }`

## Notes
- Master DB collections: `organizations`, `admins`
- Per-org collection name: `org_<slug>`
- Rename copies data into a new collection then drops the old one.

