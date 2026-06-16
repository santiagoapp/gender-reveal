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
 * El sitio hace POST { slug, confirmed, token }:
 *   - slug:      identifica el grupo (columna G).
 *   - confirmed: arreglo con los "No." (columna A) de quienes SÍ asisten.
 * Para cada fila cuyo slug (col G) coincida, escribe en la columna F:
 *   "Confirmado" si su "No." está en `confirmed`, de lo contrario "No asiste".
 *
 * Compatibilidad: si llega { slug, confirm: true|false } (sin `confirmed`),
 * confirma/declina a TODO el grupo como antes.
 */

var SHEET_TAB = "Participación";
var TOKEN = "CAMBIA_ESTE_TOKEN"; // debe coincidir con NEXT_PUBLIC_CONFIRM_TOKEN
var NO_COL = 1; // columna A ("No.")
var CONFIRM_COL = 6; // columna F
var SLUG_COL = 7; // columna G

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (String(body.token) !== TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var slug = String(body.slug || "").trim();
    if (!slug) return json({ ok: false, error: "missing slug" });

    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_TAB);
    if (!sheet) return json({ ok: false, error: "sheet tab not found" });

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return json({ ok: true, updated: 0 });

    var n = lastRow - 1;
    var nos = sheet.getRange(2, NO_COL, n, 1).getValues();
    var slugs = sheet.getRange(2, SLUG_COL, n, 1).getValues();

    // Per-person mode: a `confirmed` array of "No." ids.
    var perPerson = Object.prototype.toString.call(body.confirmed) === "[object Array]";
    var confirmedSet = {};
    if (perPerson) {
      for (var k = 0; k < body.confirmed.length; k++) {
        confirmedSet[String(body.confirmed[k]).trim()] = true;
      }
    }
    // Whole-group fallback.
    var groupValue = body.confirm === false ? "No asiste" : "Confirmado";

    var updated = 0;
    for (var i = 0; i < slugs.length; i++) {
      if (String(slugs[i][0]).trim() !== slug) continue;
      var value;
      if (perPerson) {
        var id = String(nos[i][0]).trim();
        value = confirmedSet[id] ? "Confirmado" : "No asiste";
      } else {
        value = groupValue;
      }
      sheet.getRange(i + 2, CONFIRM_COL).setValue(value);
      updated++;
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
