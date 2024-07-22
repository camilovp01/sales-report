# Proyecto de Reporte de Ventas

## Descripción

Este proyecto está diseñado utilizando la arquitectura hexagonal para la entidad de ventas y hace uso de diversas tecnologías y prácticas modernas como `husky` para el formateo de código y `conventional commits` para mantener un historial de commits claro y consistente. Además, está desarrollado con Next.js en su versión 14, donde todos los componentes son por defecto renderizados del lado del servidor (SSR) a menos que se especifique lo contrario, utilizando el nuevo sistema de `app pages`.

## Arquitectura de Carpetas

```plaintext
├── public // assets de aplicación
├── src
│   ├── app
│   │   ├── api // api generada para consumo de servicio desde la aplicación
│   │   ├── sales // ruta de aplicación
│   │   │   ├── interfaces
│   ├── components
│   │   ├── card
│   │   ├── detail
│   │   ├── filter
│   │   ├── header
│   │   ├── table
│   │   ├── tooltip
│   ├── constants // valores iniciales
│   ├── hooks // hooks personalizados
│   ├── modules
│   │   ├── sales
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infraestructure
│   ├── styles
│   ├── utils // archivos utilitarios
```

### Módulo de Ventas

- **application**: Contiene la lógica y ajuste de datos.
- **domain**: Incluye todas las interfaces relacionadas con ventas.
- **infrastructure**: Maneja los servicios externos.

## Características

- **Next.js 14**: Uso de la versión 14 de Next.js donde todos los componentes son renderizados del lado del servidor por defecto.
- **App Pages**: Uso del nuevo sistema de páginas de la aplicación.
- **Hooks Personalizados**: Implementación de hooks para la lógica de filtrado.
- **Componente HOC para Tooltips**: Uso de un componente HOC para la funcionalidad de tooltips.
- **Tabla Dinámica**: Manejo de la información con una tabla dinámica que recibe un objeto para los headers y otro con los valores.
- **Persistencia en Local Storage**: Persistencia de los filtros en el local storage.

## Formateo de Código y Commits

- **Husky**: Utilizamos Husky para formatear el código automáticamente antes de cada commit.
- **Conventional Commits**: Seguimos la convención de commits para mantener un historial de cambios claro y estructurado.

## Scripts de Despliegue

Para desplegar la aplicación, utiliza los siguientes scripts definidos en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

# Instrucciones de Despliegue

## Instalación de Dependencias

Para comenzar, asegúrate de tener todas las dependencias necesarias instaladas. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

## Entorno de Desarrollo

Para iniciar el entorno de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Next.js y podrás acceder a la aplicación en `http://localhost:3000`.

## Construcción para Producción

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
```

Este comando generará una versión optimizada de la aplicación en la carpeta `.next`.

## Iniciar el Servidor en Producción

Una vez que la aplicación esté construida, puedes iniciar el servidor en modo producción con el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor en `http://localhost:3000` utilizando la versión optimizada de la aplicación.

## Despliegue en Vercel

La aplicación está desplegada en Vercel. Puedes acceder a la aplicación en el siguiente URL:

[https://sales-report-bold.vercel.app/](https://sales-report-bold.vercel.app/)
