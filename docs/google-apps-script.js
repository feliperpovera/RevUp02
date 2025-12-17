/**
 * ============================================
 * GOOGLE APPS SCRIPT - FORMULARIO DE INGRESO
 * ============================================
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Ve a https://script.google.com y crea un nuevo proyecto
 * 2. Copia y pega todo este código en el editor
 * 3. Modifica las variables SHEET_ID y FOLDER_ID con tus IDs
 * 4. Despliega como Web App:
 *    - Click en "Implementar" > "Nueva implementación"
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 * 5. Copia la URL del endpoint y úsala en el formulario
 * 6. Otorga los permisos necesarios cuando se soliciten
 * 
 * VARIABLES A CONFIGURAR:
 */

// ID de la hoja de cálculo (crear una nueva o usar existente)
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Ejemplo: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'

// ID de la carpeta de Drive para adjuntos
const FOLDER_ID = 'TU_FOLDER_ID_AQUI'; // Ejemplo: '1dyUEebJaFnWa3Z4n0BFMVAXQ7mfUH11g'

// Nombre de la hoja
const SHEET_NAME = 'Ingresos - Formulario Inicial';

// Email para notificaciones (opcional)
const NOTIFICATION_EMAIL = 'managementecaccess@gmail.com';

/**
 * Función principal que maneja las peticiones POST
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Guardar archivos en Drive y obtener links
    const shopifyLink = data.shopifyReport ? saveFileToDrive(data.shopifyReport, 'Shopify_Report') : '';
    const googleAdsLink = data.googleAdsReport ? saveFileToDrive(data.googleAdsReport, 'GoogleAds_Report') : '';
    const metaAdsLink = data.metaAdsReport ? saveFileToDrive(data.metaAdsReport, 'MetaAds_Report') : '';
    
    // Preparar datos para la hoja
    const rowData = [
      new Date().toISOString(),                          // Timestamp
      shopifyLink,                                        // Shopify report (link Drive)
      googleAdsLink,                                      // Google Ads report (link Drive)
      metaAdsLink,                                        // Meta Ads report (link Drive)
      data.hasStrategy || '',                             // Estrategia definida (Sí/No)
      data.strategyDetails || '',                         // Detalle estrategia
      data.googlePercentage || '',                        // % Google
      data.metaPercentage || '',                          // % Meta
      data.activeSKUs || '',                              // SKUs
      data.focusOnCategories || '',                       // Enfoque en categorías/productos (Sí/No)
      data.categoriesDetails || '',                       // Categorías/productos objetivo
      data.hasDriveFolder || '',                          // Carpeta Drive/Dropbox (Sí/No)
      data.driveFolderLink || '',                         // Link carpeta
      data.noBudget ? 'No definido' : (data.monthlyBudget || '0'), // Presupuesto mensual contenido (USD)
      data.additionalInfo || '',                          // Info adicional
      data.userAgent || '',                               // User Agent / Device info
      data.ipAddress || ''                                // IP Address (si disponible)
    ];
    
    // Guardar en la hoja
    saveToSheet(rowData);
    
    // Enviar notificación por email (opcional)
    sendNotificationEmail(data, shopifyLink, googleAdsLink, metaAdsLink);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'OK', 
        message: 'Datos recibidos correctamente' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'ERROR', 
        message: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Maneja peticiones OPTIONS para CORS
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK', 
      message: 'API funcionando correctamente' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Guarda un archivo en Google Drive
 */
function saveFileToDrive(fileData, prefix) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const timestamp = Utilities.formatDate(new Date(), 'America/New_York', 'yyyyMMdd_HHmmss');
    const fileName = `${prefix}_${timestamp}_${fileData.name}`;
    
    // Decodificar base64
    const blob = Utilities.newBlob(
      Utilities.base64Decode(fileData.content),
      fileData.mimeType,
      fileName
    );
    
    const file = folder.createFile(blob);
    return file.getUrl();
    
  } catch (error) {
    console.error('Error guardando archivo:', error);
    return 'Error al guardar archivo';
  }
}

/**
 * Guarda una fila en la hoja de cálculo
 */
function saveToSheet(rowData) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Si la hoja no existe, crearla con encabezados
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      'Timestamp',
      'Shopify Report (Link)',
      'Google Ads Report (Link)',
      'Meta Ads Report (Link)',
      'Estrategia Definida',
      'Detalle Estrategia',
      '% Google',
      '% Meta',
      'SKUs Activos',
      'Enfoque Categorías',
      'Categorías/Productos Objetivo',
      'Carpeta Drive/Dropbox',
      'Link Carpeta',
      'Presupuesto Mensual (USD)',
      'Info Adicional',
      'User Agent',
      'IP Address'
    ];
    sheet.appendRow(headers);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  sheet.appendRow(rowData);
}

/**
 * Envía notificación por email
 */
function sendNotificationEmail(data, shopifyLink, googleAdsLink, metaAdsLink) {
  if (!NOTIFICATION_EMAIL) return;
  
  const subject = '🚀 Nuevo Formulario de Ingreso Recibido';
  const body = `
Se ha recibido un nuevo formulario de ingreso:

📊 ARCHIVOS ADJUNTOS:
- Shopify Report: ${shopifyLink || 'No adjunto'}
- Google Ads Report: ${googleAdsLink || 'No adjunto'}
- Meta Ads Report: ${metaAdsLink || 'No adjunto'}

📋 DATOS DE OPERACIÓN:
- Estrategia definida: ${data.hasStrategy || 'No especificado'}
- Detalle estrategia: ${data.strategyDetails || 'N/A'}
- Distribución: Google ${data.googlePercentage}% / Meta ${data.metaPercentage}%
- SKUs activos: ${data.activeSKUs || 'No especificado'}
- Enfoque en categorías: ${data.focusOnCategories || 'No especificado'}
- Categorías objetivo: ${data.categoriesDetails || 'N/A'}

📁 CONTENIDO Y PRESUPUESTO:
- Carpeta Drive/Dropbox: ${data.hasDriveFolder || 'No especificado'}
- Link carpeta: ${data.driveFolderLink || 'N/A'}
- Presupuesto mensual: ${data.noBudget ? 'No definido' : ('$' + data.monthlyBudget + ' USD')}

📝 INFORMACIÓN ADICIONAL:
${data.additionalInfo || 'Ninguna'}

---
Fecha: ${new Date().toLocaleString()}
  `;
  
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}

/**
 * Función de prueba para verificar la configuración
 */
function testSetup() {
  try {
    // Verificar acceso a la hoja
    const ss = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ Hoja de cálculo accesible: ' + ss.getName());
    
    // Verificar acceso a la carpeta
    const folder = DriveApp.getFolderById(FOLDER_ID);
    console.log('✅ Carpeta accesible: ' + folder.getName());
    
    console.log('✅ Configuración correcta!');
    
  } catch (error) {
    console.error('❌ Error en la configuración:', error.message);
  }
}
