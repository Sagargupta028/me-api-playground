require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');

const sampleProfile = {
  name: "Sagar Gupta",
  email: "sagar.gupta@example.com",
  bio: "Full-stack developer passionate about building scalable web applications and exploring new technologies.",
  location: "India",
  education: [
    {
      institution: "Indian Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      duration: "2020-2024",
      grade: "8.5 CGPA"
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
      skills: ["React.js", "Node.js", "Express.js", "MongoDB"],
      links: {
        github: "https://github.com/Sagargupta028/ecommerce"
      }
    },
    {
      title: "Receipe eBook",
      description: "Created a web platform to search and browse thousands of recipes via third-party API integration.Applied custom search filtering and responsive layout principles for usability.Deployed to Netlify with continuous deployment and performance optimization.",
      skills: ["React.js", "CSS", "Javascript", "Bootstrap"],
      links: {
        github: "https://github.com/Sagargupta028/Recipe-eBook",
        demo: "https://food2forks.netlify.app/"
      }
    },
    {
      title: "Spotify Clone",
      description: "Interactive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
      skills: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      links: {
        github: "https://github.com/Sagargupta028/Spotifyy",
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
    github: "https://github.com/sagargupta",
    linkedin: "https://linkedin.com/in/sagar-gupta-dev",
    portfolio: "https://sagargupta.dev",
    twitter: "https://twitter.com/sagargupta_dev",
    resume: "https://sagargupta.dev/resume.pdf"
  }
};

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const existingCount = await Profile.countDocuments();
    console.log('Existing profiles:', existingCount);
    
    await Profile.deleteMany({});
    console.log('✅ Cleared existing data');
    
    const profile = new Profile(sampleProfile);
    await profile.save();
    
    console.log('✅ Sample profile data inserted successfully!');
    console.log('Profile created for:', profile.name);
    console.log('Skills count:', profile.skills.length);
    console.log('Projects count:', profile.projects.length);
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
