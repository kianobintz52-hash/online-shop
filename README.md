# Online Shop

Ein modernes E-Commerce-Projekt mit React (Frontend) und Node.js/Express (Backend).

## Features

- 🛍️ Produktkatalog
- 🛒 Shopping Cart
- 👤 Benutzer-Authentifizierung
- 💳 Checkout & Zahlungsverarbeitung
- 📦 Bestellverwaltung
- 👨‍💼 Admin-Dashboard

## Technologie Stack

### Frontend
- React 18+
- Redux für State Management
- Tailwind CSS für Styling
- Axios für API Calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT für Authentication

## Installation

### Voraussetzungen
- Node.js (v16+)
- npm oder yarn
- MongoDB

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Projektstruktur

```
online-shop/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── config/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## Lizenz

MIT
