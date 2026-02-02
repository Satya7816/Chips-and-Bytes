import React from 'react';
import { activeProjects } from '../../data/constants';
import './ProjectsPage.css';

const ActiveProjectsFullPage = () => {
  return (
    <div className="ActiveProjectsFull-page">
      <h1 className="tab-heading">Active Projects — All</h1>
      <p className="tab-desc">Full list of active projects with descriptions and authors.</p>

      <div className="active-projects-full-list" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem'}}>
        {activeProjects.map(proj => (
          <div key={proj.id} className="active-project-full-card" style={{background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)'}}>
            <h2 style={{color: '#22d3ee'}}>{proj.title}</h2>
            <p>{proj.description}</p>
            <p style={{color: 'rgba(255,255,255,0.8)'}}><strong>Author:</strong> {proj.author} {proj.linkedin ? (<span>• <a href={proj.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>) : null}</p>
            <div style={{marginTop: '0.5rem'}}>
              <a href={proj.url} target="_blank" rel="noreferrer" className="read-more-link">View Repo →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProjectsFullPage;
