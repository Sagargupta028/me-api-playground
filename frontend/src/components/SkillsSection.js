import React from 'react';

const SkillsSection = ({ skills, loading, error }) => {
  if (loading) return <div className="loading">Loading skills...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!skills || skills.length === 0) return <div className="error">No skills found</div>;

  return (
    <div className="profile-section">
      <h3 className="section-title">Top Skills</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">{skill.level}</div>
            <div className="skill-category">{skill.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
