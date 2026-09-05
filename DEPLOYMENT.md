# Deploy — danicode.tech

Render Static Site declarado en [`render.yaml`](./render.yaml), dominio registrado en Porkbun.

Todo lo que sigue son pasos manuales: dependen del dashboard de Render y del panel de Porkbun.

---

## 1. Subir el repositorio

El Blueprint solo funciona sobre un repositorio Git conectado a Render.

La rama local de trabajo es `develop`, pero Render continúa desplegando desde `main`.

```bash
git add .
git commit -m "feat: sitio personal danicode.tech"

git push -u origin develop
```

`render.yaml` declara `branch: main`: solo los cambios publicados en `main` disparan un deploy.
Trabaja en `develop` y haz merge a `main` cuando quieras publicar.

```bash
git switch main
git merge develop
git push -u origin main
git switch develop
```

---

## 2. Crear el Blueprint en Render

1. Dashboard de Render → **New +** → **Blueprint**.
2. Elige el repositorio. Render lee `render.yaml` de la raíz.
3. Debe mostrar **un solo servicio**: `danicode-web`, tipo *Static Site*.
   - Si aparece una base de datos o un web service, el archivo leído no es este.
4. **Apply**. No pide variables de entorno: el Blueprint no declara ninguna con `sync: false`.

## 3. Verificar el primer deploy

- El build es `pnpm install --frozen-lockfile && pnpm build`, publica `./dist`.
- Cuando el despliegue pase a **Live**, abre la URL `https://danicode-web-XXXX.onrender.com`.
- Comprueba en el navegador: la foto carga, los enlaces externos abren en pestaña nueva,
  y `/robots.txt`, `/sitemap.xml`, `/favicon.svg` responden 200.

---

## 4. Custom domain en Render

`render.yaml` ya declara `domains: danicode.tech` y `www.danicode.tech`, así que al aplicar
el Blueprint ambos aparecen en **Settings → Custom Domains** del servicio.

Si no aparecieran, agrégalos a mano ahí (**Add Custom Domain**).

En esa pantalla Render muestra **los valores DNS exactos** a cargar en Porkbun. Típicamente:

| Dominio | Tipo | Valor que da Render |
|---|---|---|
| `danicode.tech` (apex) | `ALIAS` / `ANAME` / `CNAME` aplanado | un host `*.onrender.com` |
| `www.danicode.tech` | `CNAME` | un host `*.onrender.com` |

> Usa **exactamente** el hostname que muestre tu servicio. No copies un valor de otro
> proyecto y no cargues una IP fija: Render puede rotar direcciones y el sitio se cae.
> Si Render ofreciera un registro `A` para el apex, usa ese valor y no un ALIAS.

---

## 5. DNS en Porkbun

Panel de Porkbun → dominio `danicode.tech` → **DNS**.

### 5.1 Revisar lo que ya existe

Porkbun crea registros por defecto al registrar el dominio: suele haber un `A` del apex
y un `CNAME` de `www` apuntando a su página de parking o al URL forwarding.

**Borra o edita solo esos dos**: el `A`/`ALIAS` del apex (`danicode.tech`, host vacío o `@`)
y el `CNAME` de `www`. Si hay un **URL Forward** activo sobre el apex, desactívalo: pisa
cualquier registro DNS que cargues.

**No toques** `MX`, `TXT`, `SPF`, `DKIM` ni `DMARC`. Si tienes correo asociado al dominio,
borrarlos lo rompe. Si no tienes correo y no sabes para qué está un `TXT`, déjalo igual:
no molesta.

Si hubiera registros `AAAA` (IPv6) en el apex heredados del parking, bórralos salvo que
Render te haya dado explícitamente un valor `AAAA`. Un `AAAA` viejo hace que los clientes
con IPv6 lleguen a la IP equivocada mientras IPv4 funciona — un fallo intermitente
molesto de diagnosticar.

### 5.2 Cargar los registros

Porkbun soporta `ALIAS` (CNAME flattening) en el apex, que es lo que hace falta porque un
`CNAME` puro no es válido en la raíz de un dominio.

| Type | Host | Answer | TTL |
|---|---|---|---|
| `ALIAS` | *(vacío)* | el hostname `*.onrender.com` del apex que muestre Render | 600 |
| `CNAME` | `www` | el hostname `*.onrender.com` de `www` que muestre Render | 600 |

Guarda. La propagación suele tardar entre unos minutos y una hora.

---

## 6. Verificar el dominio

En Render, **Custom Domains** → **Verify** en cada dominio. Ambos deben quedar en verde.

Desde tu terminal:

```bash
dig +short danicode.tech
dig +short www.danicode.tech
curl -sI https://danicode.tech | head -1        # HTTP/2 200
curl -sI https://www.danicode.tech | head -1    # 301 → https://danicode.tech
```

## 7. HTTPS

Render emite el certificado (Let's Encrypt) automáticamente **después** de verificar el DNS.
Puede tardar unos minutos más. Hasta entonces vas a ver un aviso de certificado inválido;
no es un error de configuración, es el certificado todavía emitiéndose.

Verifica:

```bash
curl -sI http://danicode.tech | head -1   # debe redirigir a https
```

## 8. Redirección www → apex

Con ambos dominios cargados en el mismo servicio, Render redirige `www` al apex.
El apex queda como canónico, que es lo que declara `<link rel="canonical">` en `index.html`.

Si prefieres lo contrario, cambia el orden de `domains:` en `render.yaml` (el primero es el
canónico) y actualiza `canonical`, `og:url` y `sitemap.xml`.

## 9. Deploy automático

`autoDeployTrigger: commit` en `render.yaml`: cada push a `main` dispara un build.

Pruébalo con un cambio pequeño:

```bash
git commit --allow-empty -m "chore: verificar auto deploy"
git push
```

En **Events** del servicio tiene que aparecer un deploy nuevo en menos de un minuto.

---

## Notas

- **Costo**: los static sites de Render no tienen costo. El único gasto es la renovación
  del dominio en Porkbun.
- **Headers**: `render.yaml` define `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` y `Cache-Control`. Compruébalos con
  `curl -sI https://danicode.tech`.
- **Sin CSP**: no se declara `Content-Security-Policy`. El sitio no carga scripts,
  fuentes ni imágenes de terceros, así que aportaría poco y rompe fácil. Si la agregas
  más adelante, verifica que `img-src 'self'` y `font-src 'self'` sigan cubriendo todo.
