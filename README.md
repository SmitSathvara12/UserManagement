
🚀 UserModel - User Management System
A full-stack user management application built with modern web technologies. It provides secure authentication, role-based access control, and complete user administration features.

📌 Overview
UserModel is designed to handle user operations efficiently with a scalable architecture. It supports authentication, authorization, and admin-level control with a responsive frontend and robust backend.

✨ Key Features:

🔐 Authentication & Security
User registration with validation
Secure login using JWT
Password hashing using bcrypt
Token-based authorization
Protected routes

👥 User Management
Create, update, and delete users
View all users with pagination
Search by name or email
Filter by role and status

🛡️ Role-Based Access Control
Admin
Full CRUD access
Dashboard & analytics
User
View profile
Limited dashboard access

📊 Dashboard
Total users count
Active vs inactive users
Admin vs user distribution
Real-time statistics

🙍 Profile Management
View personal details
Account status & role
Created & updated timestamps

🛠️ Tech Stack
Frontend
React (Vite)
Redux Toolkit
React Router
Tailwind CSS
Axios
Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Joi Validation

📁 Project Structure
UserModel/
├── usermodel-backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
└── usermodel-frontend/
    ├── components/
    ├── pages/
    ├── features/
    └── api/
    
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/usermodel.git
cd usermodel
2️⃣ Backend Setup
cd usermodel-backend
npm install

Create .env file:

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173

Run backend:
npm run dev

3️⃣ Frontend Setup
cd ../usermodel-frontend
npm install

Create .env file:
VITE_API_URL=http://localhost:3000/api

Run frontend:
npm run dev

▶️ Running the App
Service	URL
Backend	http://localhost:3000
Frontend	http://localhost:5173

📡 API Overview
Authentication
POST /auth/createUser → Register
POST /auth/login → Login
POST /auth/logout → Logout

Users
GET /users → Get all users
GET /users/profile → Current user
POST /users/updateuser → Update (Admin)
POST /users/deleteuser → Delete (Admin)

🔄 Authentication Flow
User registers
Password is hashed (bcrypt)
Login generates JWT token
Token stored in client
Token sent in headers for protected routes
Server verifies token for access

🧠 State Management (Redux)
Auth Slice
Login / Register
Store token & user
Logout handling
User Slice
Fetch users
Update user
Delete user

🎯 Core Functional Pages
Login Page → Authentication
Dashboard → Statistics overview
Manage Users → CRUD operations
Create User → Admin-only
Profile Page → User details

🧪 Test Credentials
Admin:
admin@example.com / password123

User:
user@example.com / password123

⚠️ Troubleshooting
MongoDB Connection Error
Check MONGO_URI
Ensure MongoDB is running
Port Already in Use
lsof -i :3000
kill -9 <PID>
CORS Issues
Verify CORS_ORIGIN
Check frontend API URL
Token Expired
Re-login
Check JWT settings

🤝 Contributing
Fork repository
Create feature branch
Commit changes
Push to GitHub
Open Pull Request


📬 Support
For issues or suggestions:

Open a GitHub issue
Provide clear description