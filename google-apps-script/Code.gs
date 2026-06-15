/**
 * Gender Reveal — endpoint de confirmación (Google Apps Script Web App).
 *
 * Despliegue:
 *   1. Abre tu Google Sheet → Extensiones → Apps Script.
 *   2. Pega este archivo como Code.gs.
 *   3. Cambia TOKEN por un valor secreto (debe coincidir con
 *      NEXT_PUBLIC_CONFIRM_TOKEN del sitio).
 *   4. Implementar → Nueva implementación → Tipo: "Aplicación web".
 *        - Ejecutar como: Yo (el dueño del Sheet).
 *        - Quién tiene acceso: Cualquier persona.
 *   5. Copia la URL /exec → guárdala como secret APPS_SCRIPT_URL en GitHub.
 *
 * El sitio estático hace POST { slug, confirm, token } y este script escribe
 * "Confirmado" (o "No asiste") en la columna F de TODAS las filas cuyo slug
 * (columna G) coincida. Un botón confirma a todo el grupo.
 */

var SHEET_TAB = "Participación";
var TOKEN = "CAMBIA_ESTE_TOKEN"; // debe coincidir con NEXT_PUBLIC_CONFIRM_TOKEN
var SLUG_COL = 7; // columna G
var CONFIRM_COL = 6; // columna F

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (String(body.token) !== TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var slug = String(body.slug || "").trim();
    if (!slug) return json({ ok: false, error: "missing slug" });

    var value = body.confirm === false ? "No asiste" : "Confirmado";

    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_TAB);
    if (!sheet) return json({ ok: false, error: "sheet tab not found" });

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return json({ ok: true, updated: 0 });

    var slugs = sheet.getRange(2, SLUG_COL, lastRow - 1, 1).getValues();
    var updated = 0;
    for (var i = 0; i < slugs.length; i++) {
      if (String(slugs[i][0]).trim() === slug) {
        sheet.getRange(i + 2, CONFIRM_COL).setValue(value);
        updated++;
      }
    }

    return json({ ok: true, updated: updated });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Permite probar la URL en el navegador.
function doGet() {
  return json({ ok: true, msg: "gender-reveal confirm endpoint activo" });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
