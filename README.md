# Notas: Notas Confidenciales con Privacidad Visual

## Descripción del Proyecto

Notas es una aplicación móvil minimalista y enfocada en la seguridad, diseñada para almacenar notas nota confidencial de forma persistente en el dispositivo. La principal característica de la aplicación es la implementación de una buena práctica de seguridad que protege la información sensible contra la exposición visual no deseada.


Mecanismo de Seguridad:

Bloqueo de Capturas de Pantalla: Impide que el usuario o cualquier aplicación intente tomar una captura de pantalla mientras SecureMemo está en primer plano.

Ofuscación en Multitarea: Oculta el contenido de la aplicación en la vista de Aplicaciones Recientes (Multitasking). En lugar de mostrar la previsualización de la nota, el sistema operativo muestra una pantalla negra o vacía, protegiendo los datos confidenciales de miradas externas al cambiar de aplicación.

## Tecnologías Utilizadas

Framework: React Native
Entorno de Desarrollo: Expo
Lenguaje: JavaScript (ES6+)
Dependencias Clave
expo-screen-capture: Implementación de seguridad.
@react-native-async-storage/async-storage: Persistencia de la nota en el almacenamiento local del dispositivo.

## Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno de desarrollo local (Node.js y VS Code) y ejecutarlo en tu dispositivo Android físico (o emulador).


La aplicación Expo Go instalada en tu dispositivo móvil Android.

1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

2. Instalar Dependencias

Asegúrate de tener todas las librerías necesarias:

npm install
# O, si usas Yarn:
# yarn install


3. Iniciar el Servidor de Desarrollo

Ejecuta el servidor de Expo. Esto generará un código QR y pondrá el proyecto en modo escucha:

npx expo start


4. Ejecución en Dispositivo Físico (Recomendado)

Abre la aplicación Expo Go en tu celular Android.

Escanea el código QR que aparece en tu terminal o en la ventana del navegador que se abrió.

El bundle de la aplicación se descargará y ejecutará en tu dispositivo.


