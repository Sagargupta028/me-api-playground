const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

const sampleProfile = {
  name: "Sagar Gupta",
  email: "mrsagargupta028@gmail.com",
  bio: "Full-stack developer passionate about building scalable web applications and exploring new technologies.",
  location: "India",
  education: [
    {
      institution: "Indian Institute of Information Technology Kalyani",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      duration: "2022-2026",
      grade: "8.07 CGPA"
    }
  ],
  skills: [
    { name: "JavaScript", level: "Advanced", category: "Frontend" },
    { name: "React.js", level: "Advanced", category: "Frontend" },
    { name: "Node.js", level: "Advanced", category: "Backend" },
    { name: "Express.js", level: "Advanced", category: "Backend" },
    { name: "MongoDB", level: "Intermediate", category: "Database" },
    { name: "Python", level: "Intermediate", category: "Backend" },
    { name: "TypeScript", level: "Intermediate", category: "Frontend" },
    { name: "Next.js", level: "Intermediate", category: "Frontend" },
    { name: "Docker", level: "Beginner", category: "DevOps" },
    { name: "AWS", level: "Beginner", category: "DevOps" },
    { name: "Git", level: "Advanced", category: "Other" },
    { name: "REST APIs", level: "Advanced", category: "Backend" }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration using Stripe API.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      links: {
        github: "https://github.com/sagargupta/ecommerce-platform",
        demo: "https://ecommerce-demo.vercel.app",
        documentation: "https://github.com/sagargupta/ecommerce-platform/wiki"
      }
    },
    {
      title: "Task Management System",
      description: "Collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      skills: ["React.js", "Node.js", "Socket.io", "PostgreSQL", "JWT"],
      links: {
        github: "https://github.com/sagargupta/task-manager",
        demo: "https://task-manager-demo.netlify.app"
      }
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
      skills: ["JavaScript", "Chart.js", "OpenWeather API", "CSS3"],
      links: {
        github: "https://github.com/sagargupta/weather-dashboard",
        demo: "https://weather-dashboard-sg.netlify.app"
      }
    }
  ],
  work: [
    {
      company: "Tech Innovations Pvt Ltd",
      position: "Full Stack Developer Intern",
      duration: "Jun 2023 - Aug 2023",
      description: "Developed and maintained web applications using React.js and Node.js. Collaborated with senior developers on feature implementation and bug fixes.",
      skills: ["React.js", "Node.js", "MongoDB", "Git", "Agile"]
    }
  ],
  links: {
    github: "https://github.com/Sagargupta028",
    linkedin: "https://www.linkedin.com/in/sagar-gupta-61ab07275/",
    portfolio: "https://sagargupta028.github.io/Personal-portfolio/",
    twitter: "https://x.com/Sagargupta028",
    resume: "https://drive.google.com/file/d/1nUs4T4EKv_0xfOedlCocR_Zk2xWXYhhO/view?usp=sharing"
  }
};

// POST /seed - Populate database with sample data
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Profile.deleteMany({});
    
    // Insert sample data
    const profile = new Profile(sampleProfile);
    await profile.save();
    
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
