# NodeJS MVC App Template

A robust Node.js backend template built with Express.js following the MVC (Model-View-Controller) architecture pattern. This template provides a solid foundation for building scalable and maintainable RESTful APIs.

## 🚀 Features

- **MVC Architecture**: Clear separation of concerns for better code organization
- **Authentication & Authorization**: JWT-based auth system with role-based access control
- **MongoDB Integration**: Mongoose ODM for elegant MongoDB object modeling
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Advanced logging system for debugging and monitoring
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Customizable CORS settings for security
- **File Uploads**: Multer middleware for handling multipart/form-data
- **Cloud Storage**: Cloudinary integration for media storage
- **Environment Configuration**: dotenv for managing environment variables

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for file uploads)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/NodeJS-MVC-App-Template.git
   cd NodeJS-MVC-App-Template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory based on `.env.example`:
   ```
   PORT = 8500
   DATABASE_URI = mongodb://localhost:27017/your_database
   ACCESS_TOKEN_SECRET = your_secret_key
   CLOUDINARY_CLOUD_NAME = your_cloudinary_name
   CLOUDINARY_API_KEY = your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY = your_cloudinary_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📁 Project Structure

```
NodeJS-MVC-App-Template/
├── config/                 # Configuration files
│   ├── allowedOrigin.js    # CORS allowed origins
│   ├── corsOptions.js      # CORS configuration
│   ├── dbConnect.js        # Database connection setup
│   └── roleList.js         # User role definitions
├── controllers/            # Request handlers
│   └── adminController.js  # Admin-related controllers
├── middleware/             # Express middleware
│   ├── errorHandler.js     # Global error handler
│   ├── logger.js           # Request logger
│   ├── loginLimitter.js    # Rate limiting for login attempts
│   ├── multer.js           # File upload handling
│   ├── protect.js          # Authentication middleware
│   └── verifyRoles.js      # Role verification middleware
├── models/                 # Database models
│   └── Admin.js            # Admin user model
├── public/                 # Static files
├── routes/                 # API routes
│   ├── adminAuthRoute.js   # Admin authentication routes
│   ├── adminRoute.js       # Admin resource routes
│   └── root.js             # Base routes
├── utils/                  # Utility functions
├── views/                  # Template views
├── .env                    # Environment variables
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── server.js               # Application entry point
```

## 🔌 API Endpoints

### Base
- `GET /` - Root endpoint

### Admin
- `POST /api/v1/admin` - Register a new admin
- `PATCH /api/v1/admin/` - delete an admin
- `DELETE /api/v1/admin/` - update admn info
- `POST /api/v1/admin/auth` - Admin login
You can edit the controller and routes to suit your app use cases

## 🛡️ Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Token-Based Authentication**: JWT for stateless authentication
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Restricted cross-origin resource sharing
- **Error Sanitization**: Production-ready error responses

## 🧩 Adding New Features

### Creating a New Model
1. Create a new file in the `models` directory
2. Define the Mongoose schema and model
3. Export the model

Example:
```javascript
// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

### Creating a New Controller
1. Create a new file in the `controllers` directory
2. Define controller functions
3. Export the functions

### Creating a New Route
1. Create a new file in the `routes` directory
2. Import required controllers
3. Define routes with their corresponding controller functions
4. Export the router

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 📧 Contact

Your Name - your.email@example.com

Project Link: https://github.com/yourusername/NodeJS-MVC-App-Template 