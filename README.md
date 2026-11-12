# Fraternidades — Control de Cobranzas

App en Angular (estilo iOS) para controlar los aportes y multas de la fraternidad. Lee los datos de un CSV publicado desde Google Sheets.

## Requisitos

- [Node.js](https://nodejs.org/) LTS (20.19+, 22 o 24)

## Cómo ejecutarla

```bash
npm install
npm start          # http://localhost:4200
npm run build      # genera dist/fraternidades
```

## Estructura

```
src/app/
├── app.ts / app.html / app.css      # Pantalla principal
├── config.ts                        # URL del CSV, aporte mensual, meses
├── models/integrante.ts             # Tipos de datos
├── services/cobranzas.service.ts    # Descarga el CSV
├── utils/csv-parser.ts              # Convierte el CSV en integrantes
├── utils/calculos.ts                # Deuda, al día, resumen
├── pipes/bs.pipe.ts                 # Formato "1,500 Bs"
└── components/
    ├── resumen-cards/               # Tarjetas Recaudado / Pendiente / Al día
    └── integrante-card/             # Tarjeta por integrante con detalle mensual
```

La versión original en HTML/CSS está en `legacy/index.html`.
