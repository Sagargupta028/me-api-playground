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
    },
    {
      title: "Blog CMS",
      description: "Content Management System for blogging with markdown support, SEO optimization, and admin panel.",
      skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      links: {
        github: "https://github.com/sagargupta/blog-cms",
        demo: "https://blog-cms-demo.vercel.app"
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
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer Intern",
      duration: "Jan 2023 - May 2023",
      description: "Built responsive user interfaces and implemented interactive features for the company's main product. Worked closely with UI/UX designers.",
      skills: ["React.js", "JavaScript", "CSS3", "Figma", "Redux"]
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

module.exports = sampleProfile;
