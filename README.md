### CipherSchools_SQL_Studio
Frontend: https://cipherssqlstudio.netlify.app
Backend: https://cipherschools-sql-studio.onrender.com

cipherschools-sql-studio/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── README.md

### Tech Stack & Why

Frontend

- React.js → Component-based UI

- SCSS → Modular and responsive styling

- React Router → Routing

- Context API → Global state management

Backend

- Node.js + Express.js → REST API

- PostgreSQL → Execute SQL queries dynamically

- MongoDB (Mongoose) → Store assignments and metadata

- JWT Authentication → Secure API access

- CORS → Cross-origin handling

Deployment

- Render → Backend hosting

- Netlify → Frontend hosting

### Environment Variables
PORT = 3000

MONGOURL = "mongodb_url"

SECRETKEY = "your_secret_key"

GEMINI_API_KEY = "api_key"

PGUSER = "postgres_username"

PGHOST = "your_localhost"

PGDATABASE = "your_database_name"

PGPASSWORD = "your_database_password"

PGPORT = your port 0000

### Installation & Setup

1️⃣ Clone Repository

git clone https://github.com/your-username/cipherschools-sql-studio.git
cd cipherschools-sql-studio

2️⃣ Setup Backend

cd backend
npm install

Create .env file and add variables from .env.example

Run: npm start

Server runs at: http://localhost:3000

3️⃣ Setup Frontend
cd frontend
npm install

Run: npm run dev

Frontend runs at: http://localhost:5173
