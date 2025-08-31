import React from 'react';

const ProfileSection = ({ profile, loading, error }) => {
  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!profile) return <div className="error">No profile data found</div>;

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          {profile.bio && <p>{profile.bio}</p>}
          {profile.location && <p>📍 {profile.location}</p>}
        </div>
        <div className="social-links">
          {profile.links?.github && (
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
          )}
          {profile.links?.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
          )}
          {profile.links?.portfolio && (
            <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
              Portfolio
            </a>
          )}
          {profile.links?.resume && (
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="social-link">
              Resume
            </a>
          )}
        </div>
      </div>

      {profile.education && profile.education.length > 0 && (
        <div>
          <h3 className="section-title">Education</h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="work-item">
              <div className="work-header">
                <div>
                  <div className="work-position">{edu.degree}</div>
                  <div className="work-company">{edu.institution}</div>
                  {edu.field && <div className="work-description">{edu.field}</div>}
                </div>
                <div className="work-duration">{edu.duration}</div>
              </div>
              {edu.grade && <div className="work-description">Grade: {edu.grade}</div>}
            </div>
          ))}
        </div>
      )}

      {profile.work && profile.work.length > 0 && (
        <div>
          <h3 className="section-title">Work Experience</h3>
          {profile.work.map((work, index) => (
            <div key={index} className="work-item">
              <div className="work-header">
                <div>
                  <div className="work-position">{work.position}</div>
                  <div className="work-company">{work.company}</div>
                </div>
                <div className="work-duration">{work.duration}</div>
              </div>
              {work.description && <div className="work-description">{work.description}</div>}
              {work.skills && work.skills.length > 0 && (
                <div className="project-skills">
                  {work.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
