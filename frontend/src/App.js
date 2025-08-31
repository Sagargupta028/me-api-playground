import React, { useState, useEffect } from 'react';
import { profileAPI } from './services/api';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import SearchSection from './components/SearchSection';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState({
    profile: false,
    skills: false,
    projects: false,
    search: false
  });
  const [error, setError] = useState({
    profile: null,
    skills: null,
    projects: null,
    search: null
  });
  const [skillFilter, setSkillFilter] = useState('');

  // Load initial data
  useEffect(() => {
    loadProfile();
    loadSkills();
    loadProjects();
  }, []);

  const loadProfile = async () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: null }));
    
    try {
      const response = await profileAPI.getProfile();
      setProfile(response.data.data);
    } catch (err) {
      setError(prev => ({ ...prev, profile: err.response?.data?.error || err.message }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const loadSkills = async () => {
    setLoading(prev => ({ ...prev, skills: true }));
    setError(prev => ({ ...prev, skills: null }));
    
    try {
      const response = await profileAPI.getTopSkills();
      setSkills(response.data.data);
    } catch (err) {
      setError(prev => ({ ...prev, skills: err.response?.data?.error || err.message }));
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const loadProjects = async (skill = '') => {
    setLoading(prev => ({ ...prev, projects: true }));
    setError(prev => ({ ...prev, projects: null }));
    
    try {
      const response = await profileAPI.getProjects(skill);
      setProjects(response.data.data);
      setSkillFilter(skill);
    } catch (err) {
      setError(prev => ({ ...prev, projects: err.response?.data?.error || err.message }));
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    setLoading(prev => ({ ...prev, search: true }));
    setError(prev => ({ ...prev, search: null }));
    
    try {
      const response = await profileAPI.search(query);
      setSearchResults(response.data);
    } catch (err) {
      setError(prev => ({ ...prev, search: err.response?.data?.error || err.message }));
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  const handleSkillFilter = (skill) => {
    loadProjects(skill);
    setSearchResults(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Me-API Playground</h1>
          <p>Interactive Profile & Portfolio API</p>
        </header>

        <SearchSection
          onSearch={handleSearch}
          onSkillFilter={handleSkillFilter}
          searchResults={searchResults}
          loading={loading.search}
        />

        {error.search && <div className="error">Search Error: {error.search}</div>}

        <ProfileSection
          profile={profile}
          loading={loading.profile}
          error={error.profile}
        />

        <SkillsSection
          skills={skills}
          loading={loading.skills}
          error={error.skills}
        />

        <ProjectsSection
          projects={projects}
          loading={loading.projects}
          error={error.projects}
          skillFilter={skillFilter}
        />
      </div>
    </div>
  );
}

export default App;
