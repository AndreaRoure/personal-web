# Estrategia de Consistencia de Colores

## 📊 Paleta Actual (en globals.css)

### Colores Primarios
- **Accent (Verde Oliva)**: #7A9201 - Usado en botones, acentos
- **Accent Dark (Verde Brillante)**: #A8C63C - Usado en highlights, marcadores
- **Sky (Celeste)**: #71C1D0 - Complementario, usado en variaciones

### Colores de Fondo
- **Dark**: #1C2410 - Fondo oscuro principal (hero, secciones)
- **Dark Suave**: #242E15 - Variante más clara del dark
- **BG**: #FFFFFF - Fondo claro (secciones de contenido)
- **Crema**: #F2F5E4 - Texto claro sobre dark

### Colores Secundarios
- **Ink**: #2B3300 - Texto oscuro sobre claro
- **Muted**: #2B3300B3 - Texto desaturado

---

## 🎨 Problema Actual

**En la red de nodos:**
- RGB(100, 200, 230) Celeste → #64C8E6 ✅ Similar a --color-sky pero más saturado
- RGB(200, 230, 60) Verde → #C8E63C ✅ Similar a --color-accent-dark pero más amarillo
- RGB(150, 100, 220) Púrpura → #9664DC ❌ **NO está en la paleta**

**Choque visual:**
El púrpura parece intruso. Además, el menú en verde (accent-dark) vs. nodos en variante más clara crean inconsistencia.

---

## ✅ Solución: 3 Opciones

### **Opción A: Usar solo colores de la paleta (RECOMENDADO)**
Remplazar los nodos para usar exactamente los colores de la paleta:

```javascript
const colors = {
  tech: { r: 113, g: 193, b: 208 },    // #71C1D0 (--color-sky)
  people: { r: 168, g: 198, b: 60 },   // #A8C63C (--color-accent-dark) 
  data: { r: 122, g: 146, b: 1 },      // #7A9201 (--color-accent)
};
```

**Ventajas:**
- ✅ Perfecta consistencia
- ✅ Se ve unificado con el resto de la web
- ✅ Refuerza la identidad visual

**Desventajas:**
- Solo 3 colores (pero suficientes para 3 categorías)

---

### **Opción B: Extender la paleta con complementarios**
Agregar variantes de los colores existentes que sean armónicas:

```css
/* En globals.css, dentro de @theme */
--color-accent-light: #D4E89B;      /* Verde más claro */
--color-sky-dark: #4A9FAD;          /* Celeste más oscuro */
--color-data: #2B4500;              /* Verde muy oscuro (dato/fondo) */
```

**Ventajas:**
- ✅ Más flexibilidad visual
- ✅ Sigue siendo coherente (tonos naturales)
- ✅ Puedes usar 5-6 colores

**Desventajas:**
- Requiere actualizar tailwind.config
- Más complejidad

---

### **Opción C: Basarse en temperatura (cálido/frío/neutral)**

Reorganizar por temperatura en lugar de categoría:

- **Cálido**: #A8C63C (accent-dark) - "energía, acción"
- **Frío**: #71C1D0 (sky) - "tecnología, datos"
- **Neutro**: #7A9201 (accent) - "balance, personas"

Esto crea más armonía visual.

---

## 🎯 Mi Recomendación

**Opción A** (usar paleta exacta) porque:

1. Tu web tiene identidad fuerte y coherente
2. Los tres colores de tu paleta son suficientes
3. Se ve más profesional y refinado
4. No hay conflictos de saturación/luminosidad

**Y además:**
- Cambiar el menu a usar `--color-accent` en lugar de `--color-accent-dark` para crear jerarquía visual clara

---

## 📋 Checklist de Consistencia

- [ ] Nodos usan solo colores de la paleta
- [ ] Menu usa un único color (sin variaciones)
- [ ] Secciones oscuras (dark) vs claras (bg) tiene suficiente contraste
- [ ] Los acentos (green, sky) aparecen consistentemente
- [ ] No hay colores "sorpresa" (como el púrpura)
- [ ] Luminosidad es coherente (oscuro = fondo, claro = texto/acentos)
