require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const sampleProfile = require('../data/sampleData');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    console.log('Cleared existing profile data');

    // Insert sample data
    const profile = new Profile(sampleProfile);
    await profile.save();
    
    console.log('Sample profile data inserted successfully');
    console.log('Profile created for:', profile.name);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
