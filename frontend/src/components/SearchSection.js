import React, { useState } from 'react';

const SearchSection = ({ onSearch, onSkillFilter, searchResults, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSkillFilter = (e) => {
    e.preventDefault();
    onSkillFilter(skillFilter.trim());
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSkillFilter('');
    onSearch('');
    onSkillFilter('');
  };

  return (
    <div className="search-section">
      <h3 className="section-title">Search & Filter</h3>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search projects, skills, or work experience..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <form onSubmit={handleSkillFilter} className="search-form">
        <input
          type="text"
          placeholder="Filter projects by skill (e.g., React.js, Node.js)..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Filter Projects
        </button>
      </form>

      <button onClick={clearSearch} className="btn btn-secondary">
        Clear All
      </button>

      {searchResults && (
        <div className="search-results">
          <div className="results-summary">
            Found {searchResults.totalResults} results for "{searchResults.query}"
          </div>
          
          {searchResults.data.skills.length > 0 && (
            <div>
              <h4>Skills ({searchResults.data.skills.length})</h4>
              <div className="skills-grid">
                {searchResults.data.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">{skill.level}</div>
                    <div className="skill-category">{skill.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.data.projects.length > 0 && (
            <div>
              <h4>Projects ({searchResults.data.projects.length})</h4>
              <div className="projects-grid">
                {searchResults.data.projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-description">{project.description}</p>
                    {project.skills && (
                      <div className="project-skills">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.data.work.length > 0 && (
            <div>
              <h4>Work Experience ({searchResults.data.work.length})</h4>
              {searchResults.data.work.map((work, index) => (
                <div key={index} className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-position">{work.position}</div>
                      <div className="work-company">{work.company}</div>
                    </div>
                    <div className="work-duration">{work.duration}</div>
                  </div>
                  {work.description && <div className="work-description">{work.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
