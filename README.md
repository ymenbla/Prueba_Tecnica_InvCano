# 📦 Prueba Técnica - InvCano

Sistema de gestión de producción de máquinas industriales con dashboard de métricas. El proyecto está compuesto por un **backend REST API** en .NET Core 9 y un **frontend SPA** en Angular 21, orquestados mediante Docker Compose.

---

## 🗂️ Estructura del Repositorio

```
Prueba_Tecnica/
├── WebApiCanon/          # Backend - REST API (.NET Core 9)
├── AppWebCanon/          # Frontend - SPA (Angular 21)
├── docker-compose.yml    # Orquestación de servicios Docker
├── .gitignore
└── README.md
```

---

## 🧱 Stack Tecnológico

| Capa       | Tecnología                          |
|------------|-------------------------------------|
| Backend    | .NET Core 9 / ASP.NET Core Web API  |
| Frontend   | Angular 21 / Angular Material       |
| Base de datos | Microsoft SQL Server 2022        |
| ORM        | Entity Framework Core 9             |
| Auth       | JWT con cookies HttpOnly            |
| Contenedores | Docker / Docker Compose           |

---

## 🐳 Ejecutar con Docker (Modo Desarrollo)

### Pre-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.

### Levantando los servicios

```bash
# Desde la carpeta raíz del proyecto
docker compose up --build -d
```

### Servicios disponibles

| Servicio   | URL                              | Descripción                  |
|------------|----------------------------------|------------------------------|
| Frontend   | http://localhost:4200            | Aplicación Angular           |
| Backend    | http://localhost:8080            | REST API                     |
| Swagger UI | http://localhost:8080/swagger    | Documentación interactiva    |
| SQL Server | `localhost,1433`                 | Base de datos (usuario: `sa`)|

### Ver logs

```bash
docker compose logs -f
```

### Detener los servicios

```bash
docker compose down
```

> **Nota:** Los datos de SQL Server se persisten en el volumen `mssql_data`. Para eliminar los datos al bajar los contenedores usa `docker compose down -v`.

---

## 📂 Documentación por Módulo

| Módulo     | README                                                  |
|------------|---------------------------------------------------------|
| Backend    | [WebApiCanon/README.md](./WebApiCanon/README.md)        |
| Frontend   | [AppWebCanon/README.md](./AppWebCanon/README.md)        |
