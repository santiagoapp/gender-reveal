# Gender Reveal · Invitación (SPA estática)

Invitación de _gender reveal_ en español, construida con **Next.js (static export)** y
desplegada gratis en **GitHub Pages**. Sin backend:

- **Lee** los nombres/grupos desde un **Google Sheet** (API de Sheets, en _build time_).
- **Escribe** las confirmaciones en la **columna F** del Sheet vía un **Google Apps Script Web App**.
- **Cuenta regresiva** hacia una fecha fija (configurable).
- **Una URL por grupo** usando _slugs_ amigables: `…/familia-marina/`.
- Un botón **confirma a todo el grupo** (escribe `Confirmado` en la columna F de todas sus filas).

## Cómo funciona (arquitectura)

```
Google Sheet ──(lectura en build, API key en CI secret)──▶ JSON ──▶ export estático ──▶ GitHub Pages
                                                                              │
Invitado pulsa "Confirmar" ──POST(slug, token)──▶ Apps Script Web App ──escribe──▶ Sheet columna F
```

La API key se usa **solo durante el build** (secret de GitHub Actions) y **nunca llega al navegador**.
La escritura corre como **dueño del Sheet** dentro del Apps Script, así que el Sheet puede permanecer
privado para escribir; solo necesita lectura pública para la API key.

---

## Estructura del Google Sheet

Pestaña `Participación`, encabezados en la fila 1, datos desde la fila 2:

| Col | Campo          | Uso                                                        |
| --- | -------------- | ---------------------------------------------------------- |
| A   | No.            | (informativo)                                              |
| B   | Participa?     | (uso interno del anfitrión)                                |
| C   | Invitados      | **Nombre** que se muestra en la invitación                 |
| D   | Grupos         | (informativo)                                              |
| E   | Papá o Mamá?   | (uso interno)                                              |
| F   | Confirmation   | **Escrito por el sitio**: `Confirmado` / `No asiste`       |
| G   | **slug**       | **Identificador del grupo** — el _mismo_ slug en cada fila del grupo |

> Pon el **mismo slug** (p. ej. `familia-marina`) en la columna **G** de todas las filas que
> pertenecen a un mismo grupo. Cada slug genera una página `…/<slug>/`.

---

## Puesta en marcha (una sola vez)

### 1. Compartir el Sheet para lectura

`Compartir → Cualquiera con el enlace → Lector` (la API key solo lee Sheets públicos).

### 2. Crear la API key de Google Sheets

1. [Google Cloud Console](https://console.cloud.google.com/) → crea/elige un proyecto.
2. **APIs y servicios → Biblioteca →** habilita **Google Sheets API**.
3. **Credenciales → Crear credenciales → Clave de API**.
4. Restringe la clave: **API → Google Sheets API**. (Opcional: restricción por _referrer_).

### 3. Desplegar el Apps Script (escritura)

1. En el Sheet: **Extensiones → Apps Script**.
2. Pega [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
3. Cambia `TOKEN` por un valor secreto.
4. **Implementar → Nueva implementación → Aplicación web**
   - _Ejecutar como_: **Yo**
   - _Quién tiene acceso_: **Cualquier persona**
5. Copia la URL `…/exec`.

### 4. Configurar GitHub

En el repo `gender-reveal` → **Settings**:

- **Pages**: _Build and deployment → Source → **GitHub Actions**_.
- **Secrets and variables → Actions → Secrets**:
  | Secret                  | Valor                                  |
  | ----------------------- | -------------------------------------- |
  | `SHEET_ID`              | el id del Sheet (de la URL)            |
  | `GOOGLE_API_KEY`        | la API key del paso 2                  |
  | `APPS_SCRIPT_URL`       | la URL `…/exec` del paso 3             |
  | `CONFIRM_TOKEN`         | el mismo `TOKEN` del Apps Script       |
- **Variables** (opcional): `SHEET_TAB` = `Participación`.

### 5. Push a `main`

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construye y publica en
`https://santiagoapp.github.io/gender-reveal/`. Cada grupo: `…/gender-reveal/<slug>/`.

---

## Personalizar el evento

Todo lo que no viene del Sheet está en [`src/lib/config.ts`](src/lib/config.ts):
fecha del evento (cuenta regresiva), título, anfitriones, lugar, código de vestimenta, textos, etc.
Los colores se ajustan en [`tailwind.config.ts`](tailwind.config.ts).

---

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000  (usa datos de ejemplo si no hay .env.local)
npm run build    # genera ./out (export estático)
```

Sin `SHEET_ID`/`GOOGLE_API_KEY` el sitio usa grupos de ejemplo (`familia-marina`, `demo`, …),
así puedes ver el diseño sin credenciales. Copia `.env.example` a `.env.local` para usar datos reales.

## Notas

- **CORS**: el botón hace `POST` con `Content-Type: text/plain` para evitar el _preflight_
  (Apps Script no responde `OPTIONS`). Si la respuesta no se puede leer por CORS, el sitio asume éxito.
- **basePath**: para un _project site_ (`usuario.github.io/gender-reveal`) el workflow fija
  `BASE_PATH=/gender-reveal`. Si usaras un dominio propio o un _user site_, déjalo vacío.
