# BaaS Mini API

Base URL: `http://localhost:5000/api/v1`

## Authentication
- `POST /auth/register` — `{ name, email, password }`
- `POST /auth/login` — `{ email, password }`
- `GET /auth/me` — Bearer JWT required

## Projects
Bearer JWT required.
- `GET /projects`
- `POST /projects`
- `GET /projects/:projectId`
- `DELETE /projects/:projectId`

## Collections and records
Bearer JWT required and project ownership enforced.
- `GET /projects/:projectId/collections`
- `POST /projects/:projectId/collections`
- `DELETE /projects/:projectId/collections/:collectionId`
- `GET /projects/:projectId/collections/:collectionId/records?page=1&limit=10`
- `POST /projects/:projectId/collections/:collectionId/records`
- `PATCH /projects/:projectId/collections/:collectionId/records/:recordId`
- `DELETE /projects/:projectId/collections/:collectionId/records/:recordId`

## Public data API
Use `X-API-Key: <project-key>`.
- `GET /data/:collection?page=1&limit=10&search=term`
- `POST /data/:collection`

## Files
Bearer JWT required.
- `GET /projects/:projectId/files`
- `POST /projects/:projectId/files` with multipart field `file`
- `GET /projects/:projectId/files/:fileId`

All JSON responses follow `{ success, message, data, meta? }`.
