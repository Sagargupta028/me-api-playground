import React from 'react';

const ProjectsSection = ({ projects, loading, error, skillFilter }) => {
  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!projects || projects.length === 0) {
    return (
      <div className="error">
        {skillFilter ? `No projects found for skill: ${skillFilter}` : 'No projects found'}
      </div>
    );
  }

  return (
    <div className="profile-section">
      <h3 className="section-title">
        Projects {skillFilter && `(filtered by: ${skillFilter})`}
      </h3>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h4 className="project-title">{project.title}</h4>
            <p className="project-description">{project.description}</p>
            
            {project.skills && project.skills.length > 0 && (
              <div className="project-skills">
                {project.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            )}
            
            {project.links && (
              <div className="project-links">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live Demo
                  </a>
                )}
                {project.links.documentation && (
                  <a href={project.links.documentation} target="_blank" rel="noopener noreferrer" className="project-link">
                    Docs
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
