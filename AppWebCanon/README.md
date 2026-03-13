# 🌐 AppWebCanon - Frontend SPA

Aplicación web de página única (**SPA**) construida con **Angular 21** para la gestión y visualización de métricas de producción de máquinas industriales.

---

## 🛠️ Tecnologías

| Paquete / Framework       | Versión   | Rol                                        |
|---------------------------|-----------|--------------------------------------------|
| Angular                   | ~21.1.0   | Framework principal de la SPA              |
| Angular Material + CDK    | ~21.1.3   | Componentes UI y utilidades de accesibilidad |
| Angular Router            | ~21.1.0   | Navegación entre vistas                    |
| Angular Forms             | ~21.1.0   | Manejo de formularios reactivos            |
| RxJS                      | ~7.8.0    | Programación reactiva y manejo de eventos  |
| TypeScript                | ~5.9.2    | Lenguaje tipado                            |
| Angular CLI               | ~21.1.1   | Herramienta de scaffolding y build         |
| Vitest                    | ~4.0.8    | Framework de pruebas unitarias             |
| Node.js                   | 22.x      | Runtime requerido                          |
| npm                       | 10.9.2    | Gestor de paquetes                         |

---

## 🗂️ Estructura del Proyecto

```
AppWebCanon/
├── src/
│   ├── app/                  # Módulos, componentes, servicios y rutas
│   ├── environments/         # Variables de entorno (dev / prod)
│   ├── index.html            # HTML principal
│   ├── main.ts               # Bootstrap de la aplicación
│   └── styles.scss           # Estilos globales
├── public/                   # Recursos estáticos (íconos, imágenes)
├── angular.json              # Configuración del workspace de Angular CLI
├── package.json              # Dependencias del proyecto
├── tsconfig.json             # Configuración de TypeScript
├── Dockerfile                # Imagen Docker para desarrollo
└── README.md
```

---

## 🚀 Ejecución

### Con Docker (recomendado)

Desde la **carpeta raíz** del repositorio:

```bash
docker compose up --build -d
```

La aplicación estará disponible en **http://localhost:4200** y con **hot-reload automático** al modificar el código fuente.

---

### Local sin Docker

**Pre-requisitos:** Node.js 22.x, npm 10.9.2

#### 1. Instalar dependencias

```bash
cd AppWebCanon
npm install
```

#### 2. Ejecutar en modo desarrollo

```bash
npm start
# equivalente a: ng serve
```

La aplicación estará disponible en **http://localhost:4200**.

#### 3. Build de producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

#### 4. Ejecutar pruebas unitarias

```bash
npm test
```

---

## 🔧 Variables de Entorno

Los archivos de entorno se encuentran en `src/environments/`:

| Archivo                         | Descripción                   |
|---------------------------------|-------------------------------|
| `environment.ts`                | Configuración de desarrollo   |
| `environment.production.ts`     | Configuración de producción   |

Ajusta la URL base del backend en esos archivos según tu entorno:

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## 🧩 Comandos útiles de Angular CLI

```bash
# Generar un componente
ng generate component features/mi-componente

# Generar un servicio
ng generate service core/services/mi-servicio

# Generar una interfaz
ng generate interface shared/models/mi-modelo

# Verificar el proyecto (lint)
ng lint
```
