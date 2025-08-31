const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// POST /profile - Create or update profile
router.post('/profile', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find existing profile or create new one
    let profile = await Profile.findOne({ email });
    
    if (profile) {
      // Update existing profile
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile(req.body);
      await profile.save();
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /profile - Get profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /projects?skill=<skill> - Filter projects by skill
router.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    let projects = profile.projects;
    
    if (skill) {
      projects = projects.filter(project => 
        project.skills.some(s => 
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /skills/top - Return top skills
router.get('/skills/top', async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    // Get skills sorted by level (Expert > Advanced > Intermediate > Beginner)
    const skillLevelOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
    
    const topSkills = profile.skills
      .sort((a, b) => (skillLevelOrder[b.level] || 0) - (skillLevelOrder[a.level] || 0))
      .slice(0, 10); // Top 10 skills

    res.status(200).json({
      success: true,
      data: topSkills,
      count: topSkills.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /search?q=<query> - Search projects/skills
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      });
    }

    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    const searchTerm = q.toLowerCase();
    
    // Search in skills
    const matchingSkills = profile.skills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm) ||
      skill.category.toLowerCase().includes(searchTerm)
    );

    // Search in projects
    const matchingProjects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );

    // Search in work experience
    const matchingWork = profile.work.filter(work =>
      work.company.toLowerCase().includes(searchTerm) ||
      work.position.toLowerCase().includes(searchTerm) ||
      (work.description && work.description.toLowerCase().includes(searchTerm)) ||
      work.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );

    res.status(200).json({
      success: true,
      data: {
        skills: matchingSkills,
        projects: matchingProjects,
        work: matchingWork
      },
      query: q,
      totalResults: matchingSkills.length + matchingProjects.length + matchingWork.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /profile/skills - Update skills
router.put('/profile/skills', async (req, res) => {
  try {
    console.log('PUT /profile/skills request body:', req.body);
    const { skills } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Skills array is required' });
    }

    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    console.log('Updating skills from', profile.skills.length, 'to', skills.length);
    profile.skills = skills;
    profile.markModified('skills');
    profile.updatedAt = new Date();
    
    const savedProfile = await profile.save();
    console.log('Skills updated successfully');

    res.status(200).json({
      success: true,
      data: savedProfile,
      message: 'Skills updated successfully'
    });
  } catch (error) {
    console.error('PUT /profile/skills error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /profile/projects - Update projects
router.put('/profile/projects', async (req, res) => {
  try {
    console.log('PUT /profile/projects request body:', req.body);
    const { projects } = req.body;
    
    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({ error: 'Projects array is required' });
    }

    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    console.log('Updating projects from', profile.projects.length, 'to', projects.length);
    profile.projects = projects;
    profile.markModified('projects');
    profile.updatedAt = new Date();
    
    const savedProfile = await profile.save();
    console.log('Projects updated successfully');

    res.status(200).json({
      success: true,
      data: savedProfile,
      message: 'Projects updated successfully'
    });
  } catch (error) {
    console.error('PUT /profile/projects error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /profile - Update profile basic info
router.put('/profile', async (req, res) => {
  try {
    console.log('PUT /profile request body:', req.body);
    
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    console.log('Found profile:', profile.name);

    // Update only the fields that are provided
    const allowedFields = ['name', 'email', 'bio', 'location', 'links'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        console.log(`Updating ${field}:`, req.body[field]);
        profile[field] = req.body[field];
      }
    });

    // Mark as modified to ensure save
    profile.markModified('links');
    profile.updatedAt = new Date();
    
    const savedProfile = await profile.save();
    console.log('Profile saved successfully:', savedProfile.name);

    res.status(200).json({
      success: true,
      data: savedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('PUT /profile error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /health - Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
