UserModel 👥
A modern user management system that provides comprehensive administration tools for managing users with role-based access control, authentication, and real-time analytics.

🌟 Features

User Authentication: Secure login and registration with JWT tokens
Role-Based Access Control: Admin and regular user roles with different permissions
User Management: Create, read, update, and delete user accounts
Advanced Search & Filter: Find users by name, email, status, or role
Real-Time Dashboard: View user statistics and system health indicators
User Profiles: Manage personal information and account details
Pagination System: Navigate through users with 5 items per page
Password Security: Encrypted passwords with bcryptjs hashing
Responsive Design: Works seamlessly on desktop and mobile devices
Session Management: Persistent login with token-based authentication
Toast Notifications: Real-time success and error messages
Edit & Delete Operations: Manage users with confirmation popups

🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v18 or higher)
npm or yarn
MongoDB (v5.0 or higher)

Or MongoDB Atlas (Cloud service)

Git

Installation

Clone the repository

bashgit clone https://github.com/yourusername/usermodel.git
cd usermodel

Install Backend Dependencies

bashcd usermodel-backend
npm install

Install Frontend Dependencies

bashcd ../usermodel-frontend
npm install

Set up environment variables

Backend - Create .env in usermodel-backend/:
envPORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/usermodel
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
Frontend - Create .env in usermodel-frontend/:
envVITE_API_URL=http://localhost:3000/api

Start the Development Servers

Terminal 1 - Backend:
bashcd usermodel-backend
npm run dev
Backend runs on http://localhost:3000
Terminal 2 - Frontend:
bashcd usermodel-frontend
npm run dev
Frontend runs on http://localhost:5173


🛠️ Tech Stack :

Frontend

React.js - UI library with modern hooks
Vite - Lightning-fast build tool
Redux Toolkit - State management
React Router DOM - Client-side routing
Axios - HTTP client for API calls
Tailwind CSS - Utility-first CSS framework
React Toastify - Toast notifications

Backend

Node.js - JavaScript runtime
Express.js - Web framework
MongoDB - NoSQL database
Mongoose - Object data modeling
JWT - Secure authentication
bcryptjs - Password hashing
Joi - Data validation
CORS - Cross-origin resource sharing

📱 Usage
For Regular Users

Register: Create a new account with email and password
Login: Sign in with your credentials
Dashboard: View overall system statistics
Profile: Access and view your personal information
Logout: Securely logout from your account

For Admin Users
All Regular User Features +
Create Users: Add new users to the system with role assignment

Manage Users:
View all users with detailed information
Search by name or email
Filter by role (Admin/User) and status (Active/Inactive)
Edit user details
Delete users with confirmation


Pagination: Navigate through user lists (5 per page)

Dashboard Analytics:

View total users count
Monitor active users
Track admin vs regular users
View system health status



🔧 API Endpoints :

Authentication

POST /api/auth/createUser - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout

User Management

GET /api/users - Get all users (protected)
GET /api/users/profile - Get current user profile
POST /api/users/getuserbyid - Get specific user by ID
POST /api/users/updateuser - Update user details (Admin only)
POST /api/users/deleteuser - Delete user (Admin only)

🎨 Screenshots
Login Page
Clean and simple login interface with form validation
Dashboard
Real-time statistics with user counts, active users, admins, and regular users
Manage Users Page
Comprehensive user management with search, filter, pagination, and action buttons
Edit User Modal
Modal for updating user information with role and status selection
User Profile
Detailed user profile display with account information and security status

🤝 Contributing

Fork the repository

bashgit clone https://github.com/yourusername/usermodel.git

Create your feature branch

bashgit checkout -b feature/AmazingFeature

Commit your changes

bashgit commit -m 'Add some AmazingFeature'

Push to the branch

bashgit push origin feature/AmazingFeature

Open a Pull Request

📝 License
This project is licensed under the ISC License - see the LICENSE file for details.

👨‍💻 Authors
Smit - Initial Development and Design


🙏 Acknowledgments

Built with modern web technologies
UI inspiration from modern admin dashboards
Icons from Font Awesome
Styling with Tailwind CSS
State management with Redux Toolkit


🐛 Common Issues & Solutions
MongoDB Connection Issues
bash# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas connection string in .env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/usermodel
Port Already in Use
bash# Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or change port in .env
PORT=3001
CORS Errors

Verify CORS_ORIGIN in backend .env matches frontend URL
Ensure VITE_API_URL in frontend .env is correct

📊 Project Statistics

Total API Endpoints: 8
Database Collections: 1 (Users)
Frontend Components: 11 reusable components
Redux Slices: 2 (auth, users)
Admin Features: 4
Protected Routes: 4

🔒 Security Features
✅ Password hashing with bcryptjs (10 salt rounds)
✅ JWT-based authentication
✅ CORS protection
✅ Input validation (Joi)
✅ HTTP-only cookies support
✅ Role-based access control
✅ Protected API endpoints
🎓 Learning Resources

Express.js Docs
React Documentation
MongoDB Docs
Redux Toolkit Docs
Tailwind CSS Docs

📈 Future Enhancements

 Email verification for new accounts
 Password reset functionality
 Two-factor authentication (2FA)
 User activity logs
 Advanced analytics and reports
 Bulk user operations
 Export users to CSV/PDF
 Dark mode support
 API rate limiting
 User audit trail

🚀 Quick Start Commands
bash# Clone and setup
git clone https://github.com/yourusername/usermodel.git
cd usermodel

# Backend setup
cd usermodel-backend
npm install
npm run dev

# Frontend setup (new terminal)
cd ../usermodel-frontend
npm install
npm run dev

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000

📞 Contact & Support
GitHub Issues: Report bugs or request features
Email: -
Live Chat: -