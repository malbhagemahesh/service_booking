# Service Booking Platform ✅ COMPLETE

## Backend (FastAPI + MongoDB)

```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env  # Update MONGO_URI (Atlas free: mongodb+srv://...)
uvicorn app.main:app --reload --port 8000
```

API: http://localhost:8000/docs (Swagger)

Endpoints:

- POST /api/auth/register {username, email, password}
- POST /api/auth/login {username(email), password}
- GET /api/services (list)
- POST /api/services {title, description, price, category} (provider)
- POST /api/bookings {service_id, date_time}

## Frontend (React + Tailwind)

```
cd frontend
npm install
npm run dev  # http://localhost:5173
```

## Features Implemented

✅ Home, Services list/filters, Detail/Booking modal (datepicker)
✅ Auth Login/Register (JWT, role user/provider)
✅ Dashboard bookings
✅ Responsive design mobile→desktop
✅ Dark/Light mode (localStorage)
✅ Navbar auth state
✅ Loading/error states, React Query
✅ Production ready (Tailwind, shadcn style, utils)

## Test Flow

1. Backend + Mongo Atlas
2. Frontend dev
3. Register user → Dashboard empty
4. Provider register → POST service via docs/curl
5. /services → list → Detail → Book (modal)

Deploy: Vercel frontend, Railway backend + Mongo Atlas.

Project scalable, modular, best practices!
