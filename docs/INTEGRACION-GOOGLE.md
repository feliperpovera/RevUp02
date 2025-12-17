# Integración del Formulario de Ingreso con Google Drive/Sheets

## Resumen

Esta integración permite que los datos del formulario de onboarding se guarden automáticamente en:
- **Google Sheets**: Una hoja de cálculo llamada "Ingresos - Formulario Inicial"
- **Google Drive**: Una carpeta llamada "Ingresos - Adjuntos" para los archivos subidos

## Pasos de Configuración

### 1. Crear la Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Renómbrala como desees (ej: "Ingresos - Formulario Inicial")
4. Copia el **ID de la hoja** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_TU_SHEET_ID/edit
   ```

### 2. Crear la Carpeta de Drive

1. Ve a [Google Drive](https://drive.google.com)
2. Crea una nueva carpeta llamada "Ingresos - Adjuntos"
3. Haz clic derecho > "Obtener enlace" > "Cualquier persona con el enlace"
4. Copia el **ID de la carpeta** de la URL:
   ```
   https://drive.google.com/drive/folders/ESTE_ES_TU_FOLDER_ID
   ```

### 3. Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Borra el contenido predeterminado
4. Copia y pega el contenido de `docs/google-apps-script.js`
5. Modifica las variables en la parte superior:
   ```javascript
   const SHEET_ID = 'tu_sheet_id_aqui';
   const FOLDER_ID = 'tu_folder_id_aqui';
   ```
6. Guarda el proyecto (Ctrl/Cmd + S)

### 4. Desplegar como Web App

1. Haz clic en **"Implementar"** > **"Nueva implementación"**
2. Configura:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: Yo (tu cuenta de Google)
   - **Quién tiene acceso**: Cualquier persona
3. Haz clic en **"Implementar"**
4. **Autoriza** los permisos cuando se solicite
5. Copia la **URL de la aplicación web**

### 5. Configurar el Endpoint en la App

Una vez tengas la URL del Web App, actualiza el componente `OnboardingForm.tsx`:

```typescript
// En la función handleSubmit, reemplaza el simulador con:
const APPS_SCRIPT_URL = 'TU_URL_DE_WEB_APP_AQUI';

const response = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...formData,
    shopifyReport: formData.shopifyReport ? await fileToBase64(formData.shopifyReport) : null,
    googleAdsReport: formData.googleAdsReport ? await fileToBase64(formData.googleAdsReport) : null,
    metaAdsReport: formData.metaAdsReport ? await fileToBase64(formData.metaAdsReport) : null,
    userAgent: navigator.userAgent,
  }),
});
```

## Función auxiliar para convertir archivos a Base64

Añade esta función al componente:

```typescript
const fileToBase64 = (file: File): Promise<{ name: string; mimeType: string; content: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve({
        name: file.name,
        mimeType: file.type,
        content: base64,
      });
    };
    reader.onerror = error => reject(error);
  });
};
```

## Probar la Configuración

1. En el editor de Apps Script, ejecuta la función `testSetup()`
2. Revisa la consola de logs (Ver > Registros)
3. Deberías ver mensajes de confirmación ✅

## Estructura de la Hoja de Cálculo

La hoja creada tendrá las siguientes columnas:

| Columna | Descripción |
|---------|-------------|
| Timestamp | Fecha y hora del envío |
| Shopify Report (Link) | Link al archivo en Drive |
| Google Ads Report (Link) | Link al archivo en Drive |
| Meta Ads Report (Link) | Link al archivo en Drive |
| Estrategia Definida | Sí/No |
| Detalle Estrategia | Descripción de la estrategia |
| % Google | Porcentaje de gasto en Google |
| % Meta | Porcentaje de gasto en Meta |
| SKUs Activos | Número de SKUs |
| Enfoque Categorías | Sí/No |
| Categorías/Productos Objetivo | Detalle de categorías |
| Carpeta Drive/Dropbox | Sí/No |
| Link Carpeta | URL de la carpeta compartida |
| Presupuesto Mensual (USD) | Monto o "No definido" |
| Info Adicional | Comentarios adicionales |
| User Agent | Información del navegador |
| IP Address | IP del usuario (si disponible) |

## Notificaciones por Email

El script enviará automáticamente un email a `managementecaccess@gmail.com` cada vez que se reciba un formulario nuevo.

## Solución de Problemas

### Error de CORS
Si ves errores de CORS, asegúrate de usar `mode: 'no-cors'` en la petición fetch.

### Permisos denegados
Re-autoriza la aplicación haciendo una nueva implementación.

### Archivos no se guardan
Verifica que el FOLDER_ID sea correcto y que la carpeta exista.

## Seguridad

- El Web App está configurado para ejecutarse con tu cuenta, pero acepta peticiones de cualquier origen
- Los archivos se guardan en tu Drive personal
- Considera implementar validación adicional en el script si es necesario
