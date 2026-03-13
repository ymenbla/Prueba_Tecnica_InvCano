# 🔧 WebApiCanon - REST API Backend

API REST construida con **ASP.NET Core 9** que provee autenticación, gestión de máquinas industriales y métricas de producción diaria.

---

## 🛠️ Tecnologías

| Paquete / Framework                     | Versión  | Rol                                   |
|-----------------------------------------|----------|---------------------------------------|
| .NET / ASP.NET Core                     | 9.0      | Framework principal                   |
| Entity Framework Core                   | 9.0.12   | ORM para acceso a datos               |
| EF Core SQL Server Provider             | 9.0.12   | Proveedor de base de datos            |
| Microsoft.AspNetCore.Authentication.JwtBearer | 9.0.12 | Autenticación JWT                 |
| Swashbuckle (Swagger)                   | 9.0.6    | Documentación y exploración de la API |
| BCrypt.Net-Next                         | 4.0.3    | Hash seguro de contraseñas            |

---

## 🏗️ Arquitectura

El proyecto sigue el patrón **Feature Slices** (Vertical Slice Architecture), donde cada módulo de negocio está autocontenido en su propia carpeta bajo `Features/`.

```
WebApiCanon/
├── Data/
│   └── ApplicationDbContext.cs       # DbContext de EF Core
├── Features/
│   ├── Auth/                         # Autenticación y autorización
│   │   ├── AuthController.cs
│   │   ├── AuthService.cs
│   │   └── DTOs/
│   ├── Machines/                     # Gestión de máquinas
│   │   ├── MachineItemController.cs
│   │   ├── MachineItemService.cs
│   │   └── DTOs/
│   ├── Productions/                  # Producción diaria
│   │   ├── DailyProductionController.cs
│   │   ├── DailyProductionService.cs
│   │   └── DTOs/
│   ├── Metrics/                      # Métricas agregadas
│   │   ├── MachineMetricsController.cs
│   │   ├── MachineMetricsService.cs
│   │   └── DTOs/
│   └── Users/                        # Gestión de usuarios
├── Shared/
│   ├── Middlewares/                  # Middleware de manejo de errores
│   └── Services/Token/              # Servicio de generación de JWT
├── Migrations/                       # Migraciones de EF Core
├── Program.cs                        # Punto de entrada y configuración DI
└── appsettings.json                  # Configuración general
```

### Decisiones de diseño clave

- **Autenticación con cookies HttpOnly**: Los tokens JWT se almacenan en cookies `HttpOnly` para prevenir ataques XSS. El `access_token` expira en 15 minutos y el `refresh_token` en 7 días.
- **CORS configurado**: Los orígenes permitidos se definen en `appsettings.json` via la clave `AllowedOrigins`.
- **Middleware de excepciones global**: `ExceptionHandlingMiddleware` captura y normaliza todos los errores no controlados antes de devolver la respuesta.
- **Swagger activo solo en desarrollo**: La interfaz de Swagger se habilita únicamente cuando `ASPNETCORE_ENVIRONMENT=Development`.

---

## 📡 Endpoints de la API

Base URL: `http://localhost:8080/api`

### 🔐 Auth — `/api/auth`

> Sin autenticación requerida (excepto `GET /me`)

| Método | Ruta            | Auth | Descripción                                                  |
|--------|-----------------|------|--------------------------------------------------------------|
| `GET`  | `/auth/me`      | ✅   | Retorna información del usuario actualmente autenticado      |
| `POST` | `/auth/register`| ❌   | Registra un nuevo usuario                                    |
| `POST` | `/auth/login`   | ❌   | Inicia sesión y establece cookies `access_token` y `refresh_token` |
| `POST` | `/auth/refresh` | ❌   | Renueva el `access_token` usando el `refresh_token` de la cookie |

---

### 🏭 Machines — `/api/machines`

> Todos los endpoints requieren autenticación JWT (`[Authorize]`)

| Método  | Ruta                           | Auth | Descripción                          |
|---------|--------------------------------|------|--------------------------------------|
| `GET`   | `/machines`                    | ✅   | Lista todas las máquinas             |
| `POST`  | `/machines`                    | ✅   | Crea una nueva máquina               |
| `PUT`   | `/machines/{machineId}/disable`| ✅   | Deshabilita una máquina por ID       |

---

### 📊 Daily Production — `/api/daily-production`

> Todos los endpoints requieren autenticación JWT (`[Authorize]`)

| Método  | Ruta                                       | Auth | Descripción                                                       |
|---------|--------------------------------------------|------|-------------------------------------------------------------------|
| `GET`   | `/daily-production?machineId&from&to`      | ✅   | Lista registros de producción de una máquina en un rango de fechas |
| `POST`  | `/daily-production`                        | ✅   | Crea un nuevo registro de producción diaria                       |
| `PUT`   | `/daily-production/{dailyProductionId}/disable` | ✅ | Deshabilita un registro de producción por ID                 |

---

### 📈 Metrics — `/api/metrics`

> Todos los endpoints requieren autenticación JWT (`[Authorize]`)

| Método | Ruta                                     | Auth | Descripción                                                        |
|--------|------------------------------------------|------|--------------------------------------------------------------------|
| `GET`  | `/metrics/daily?machineId&from&to`       | ✅   | Métricas diarias de una máquina (producción total, promedios, etc.) |
| `GET`  | `/metrics/machines?from&to`             | ✅   | Lista todas las máquinas con su producción en el rango de fechas   |

---

## ⚙️ Configuración (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=DB_Prueba_Tecnica;..."
  },
  "AllowedOrigins": "http://localhost:4200",
  "Jwt": {
    "Key": "<clave-secreta>",
    "Issuer": "PruebaTecnicaAPI",
    "Audience": "PruebaTecnicaClient",
    "DurationInMinutes": 15,
    "RefreshTokenDurationInDays": 7
  }
}
```

> ⚠️ La clave JWT (`Jwt:Key`) debe ser cambiada por una cadena segura antes de cualquier despliegue.

---

## 🚀 Ejecución

### Con Docker (recomendado)

Desde la **carpeta raíz** del repositorio:

```bash
docker compose up --build -d
```

La API estará disponible en `http://localhost:8080`.  
Swagger UI: `http://localhost:8080/swagger`

### Local sin Docker

**Pre-requisitos:** .NET SDK 9, SQL Server (local o Docker)

```bash
cd WebApiCanon

# Restaurar dependencias
dotnet restore

# Aplicar migraciones a la base de datos
dotnet ef database update

# Ejecutar en modo desarrollo
dotnet run
```

---

## 🔄 Migraciones de base de datos

```bash
# Agregar nueva migración
dotnet ef migrations add <NombreMigracion>

# Aplicar migraciones
dotnet ef database update

# Revertir última migración
dotnet ef database update <MigracionAnterior>
```
