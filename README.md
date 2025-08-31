# Me-API Playground

A full-stack web application that provides REST APIs for personal profile, skills, projects, and work experience data. Built with Node.js, Express, MongoDB, and React.

## 🏗️ Architecture

```
me-api-playground/
├── backend/                 # Node.js + Express API server
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── data/               # Sample data
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
├── frontend/               # React.js client application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🚀 Features

### Backend API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/profile` - Get complete profile information
- `POST /api/profile` - Create or update profile
- `GET /api/projects?skill=<skill>` - Get projects, optionally filtered by skill
- `GET /api/skills/top` - Get top skills sorted by proficiency
- `GET /api/search?q=<query>` - Search across projects, skills, and work experience

### Frontend Features
- **Profile Display**: Shows personal information, education, and work experience
- **Skills Showcase**: Interactive grid of technical skills with proficiency levels
- **Project Portfolio**: Filterable project cards with links and technologies used
- **Search Functionality**: Real-time search across all profile data
- **Responsive Design**: Mobile-friendly interface

## 🗄️ Database Schema

### Profile Collection
```javascript
{
  name: String,                    // Full name
  email: String,                   // Email address (unique)
  bio: String,                     // Personal bio/description
  location: String,                // Current location
  education: [{
    institution: String,           // School/University name
    degree: String,               // Degree type
    field: String,                // Field of study
    duration: String,             // Time period
    grade: String                 // GPA/Grade
  }],
  skills: [{
    name: String,                 // Skill name
    level: String,                // Beginner|Intermediate|Advanced|Expert
    category: String              // Frontend|Backend|Database|DevOps|Mobile|Other
  }],
  projects: [{
    title: String,                // Project name
    description: String,          // Project description
    skills: [String],            // Technologies used
    links: {
      github: String,             // GitHub repository
      demo: String,              // Live demo URL
      documentation: String      // Documentation URL
    },
    createdAt: Date
  }],
  work: [{
    company: String,              // Company name
    position: String,             // Job title
    duration: String,             // Employment period
    description: String,          // Job description
    skills: [String]             // Technologies used
  }],
  links: {
    github: String,               // GitHub profile
    linkedin: String,             // LinkedIn profile
    portfolio: String,            // Personal website
    twitter: String,              // Twitter profile
    resume: String               // Resume URL
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd me-api-playground
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   
   # Start the backend server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Start the React development server
   npm start
   ```
   Frontend will run on `http://localhost:3000`

4. **Initialize Sample Data**
   
   Create a profile by making a POST request to `/api/profile` with the sample data from `backend/data/sampleData.js`, or use the provided curl command below.

### Production Setup

#### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your frontend URL

#### Frontend Deployment (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. From the frontend directory: `vercel`
3. Set environment variable:
   - `REACT_APP_API_URL`: Your backend API URL

## 📡 API Usage Examples (Postman)

### Health Check
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/health`

### Create/Update Profile
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/profile`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Sagar Gupta",
  "email": "sagar.gupta@example.com",
  "bio": "Full-stack developer passionate about building scalable web applications",
  "skills": [
    {"name": "JavaScript", "level": "Advanced", "category": "Frontend"},
    {"name": "React.js", "level": "Advanced", "category": "Frontend"},
    {"name": "Node.js", "level": "Advanced", "category": "Backend"}
  ]
}
```

### Get Profile
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/profile`

### Filter Projects by Skill
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/projects`
- **Query Parameters:**
  - Key: `skill`, Value: `React.js`

### Get Top Skills
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/skills/top`

### Search
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/search`
- **Query Parameters:**
  - Key: `q`, Value: `javascript`

### Update Profile Basic Info
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/profile`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Updated Name",
  "email": "updated.email@example.com",
  "bio": "Updated bio description",
  "location": "New York, USA",
  "links": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "portfolio": "https://yourportfolio.com"
  }
}
```

### Update Skills
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/profile/skills`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "skills": [
    {"name": "JavaScript", "level": "Expert", "category": "Frontend"},
    {"name": "Python", "level": "Advanced", "category": "Backend"},
    {"name": "MongoDB", "level": "Intermediate", "category": "Database"}
  ]
}
```

### Update Projects
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/profile/projects`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Full-stack e-commerce solution with React and Node.js",
      "skills": ["React.js", "Node.js", "MongoDB", "Stripe"],
      "links": {
        "github": "https://github.com/username/ecommerce",
        "demo": "https://ecommerce-demo.com"
      }
    }
  ]
}
```

### Seed Database
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/seed`
- **Description:** Populates the database with sample profile data

## 🧪 Testing with Postman

### Backend Testing
1. **Import Collection**: Create a new Postman collection called "Me-API Playground"
2. **Set Base URL**: Use `http://localhost:5000` as your base URL
3. **Test Endpoints**: Use the API examples above to test each endpoint

### Quick Test Sequence
1. Start with Health Check endpoint to verify server is running
2. Create a profile using POST `/api/profile` with sample data
3. Test GET `/api/profile` to retrieve the created profile
4. Test search functionality with `/api/search?q=javascript`
5. Filter projects with `/api/projects?skill=React.js`

### Frontend Testing
```bash
cd frontend
npm test
```

## 📋 Environment Variables

### Backend (.env)
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/me-api-playground
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/me-api-playground

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# API Configuration
API_VERSION=v1
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment URLs

- **Frontend**: [https://me-api-playground.vercel.app](https://me-api-playground.vercel.app)
- **Backend API**: [https://me-api-playground-backend.render.com](https://me-api-playground-backend.render.com)
- **Repository**: [https://github.com/sagargupta/me-api-playground](https://github.com/sagargupta/me-api-playground)

## ⚠️ Known Limitations

1. **Single Profile**: Currently supports only one profile per database
2. **No Authentication**: All endpoints are public (suitable for personal portfolio)
3. **Basic Search**: Text-based search without advanced filtering
4. **No Caching**: API responses are not cached
5. **Limited Validation**: Basic input validation on API endpoints
6. **No Rate Limiting**: API endpoints don't have rate limiting implemented
7. **File Uploads**: No support for image/file uploads for projects or profile

## 🔗 Resume & Contact

- **Resume**: [https://sagargupta.dev/resume.pdf](https://sagargupta.dev/resume.pdf)
- **Portfolio**: [https://sagargupta.dev](https://sagargupta.dev)
- **LinkedIn**: [https://linkedin.com/in/sagar-gupta-dev](https://linkedin.com/in/sagar-gupta-dev)
- **GitHub**: [https://github.com/sagargupta](https://github.com/sagargupta)


---

**Built with ❤️ by Sagar Gupta**
