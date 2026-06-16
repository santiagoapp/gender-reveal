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

// ────────────────────────────────────────────────────────────────────────────
// fillSlugs(): rellena la columna G con el slug de cada grupo.
//
// Mismo criterio que el sitio: una celda "Grupos" (col D) NO vacía inicia un
// grupo; las filas siguientes con D vacía pertenecen al mismo grupo. El slug
// se deriva del nombre del primer integrante (sin tildes ni paréntesis) y se
// desambigua con sufijos -2, -3 si se repite. Respeta un slug ya escrito en G.
//
// Ejecútalo UNA vez desde el editor de Apps Script: selecciona fillSlugs en el
// menú de funciones → Ejecutar. Vuelve a ejecutarlo si cambian los grupos.
// ────────────────────────────────────────────────────────────────────────────
var NAME_COL = 3; // C
var GROUP_COL = 4; // D

function slugify(name) {
  return String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fillSlugs() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_TAB);
  if (!sheet) throw new Error("No existe la pestaña " + SHEET_TAB);

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var n = lastRow - 1;

  var names = sheet.getRange(2, NAME_COL, n, 1).getValues();
  var markers = sheet.getRange(2, GROUP_COL, n, 1).getValues();
  var existing = sheet.getRange(2, SLUG_COL, n, 1).getValues();

  var used = {};
  var out = [];
  var currentSlug = "";
  var groupFirstName = "";

  for (var i = 0; i < n; i++) {
    var name = String(names[i][0]).trim();
    var marker = String(markers[i][0]).trim();
    var override = String(existing[i][0]).trim();

    if (!name) {
      out.push([""]); // fila vacía → sin slug
      continue;
    }

    // ¿Inicia un grupo nuevo? (col D no vacía, o es el primer integrante)
    if (marker || !currentSlug) {
      groupFirstName = name;
      var base = override || slugify(groupFirstName) || "grupo";
      var slug = base;
      var k = 1;
      while (used[slug]) {
        k++;
        slug = base + "-" + k;
      }
      used[slug] = true;
      currentSlug = slug;
    } else if (override) {
      // Un override explícito a mitad de grupo redefine el slug del grupo.
      currentSlug = override;
    }

    out.push([currentSlug]);
  }

  sheet.getRange(2, SLUG_COL, n, 1).setValues(out);
  SpreadsheetApp.getActive().toast("Slugs escritos en la columna G: " + n + " filas.");
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
