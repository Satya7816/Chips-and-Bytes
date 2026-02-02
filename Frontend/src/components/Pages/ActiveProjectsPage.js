import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { activeProjects } from '../../data/constants';
import { FaGithub } from 'react-icons/fa';
import './ProjectsPage.css';

const ActiveProjectsPage = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

  const scroll = useCallback((direction) => {
    const scrollAmount = isMobile ? (window.innerWidth <= 375 ? 200 : 250) : 320;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, [isMobile]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = useCallback((e) => {
    if (!touchStart) return;
    const current = e.touches[0].clientX;
    const diff = touchStart - current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && canScrollRight) scroll('right');
      else if (diff < 0 && canScrollLeft) scroll('left');
      setTouchStart(null);
    }
  }, [touchStart, canScrollLeft, canScrollRight, scroll]);
  const handleTouchEnd = () => setTouchStart(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    checkScrollPosition();
    slider.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    if (isMobile) {
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    return () => {
      slider.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      if (isMobile) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        slider.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, touchStart, canScrollLeft, canScrollRight, handleTouchMove]);

  return (
    <div className="Projects-page">
      <h1 className="tab-heading">Active Projects</h1>
      <p className="tab-desc">Explore active projects by our community members.</p>

      <div className="carousel-wrapper">
        {canScrollLeft && (
          <button className="scroll-arrow left-arrow" onClick={() => scroll('left')} aria-label="Scroll Left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
          </button>
        )}

        <div className={`blog-slider ${isMobile ? 'mobile-slider' : ''}`} ref={sliderRef}>
          {activeProjects.map((proj, idx) => (
            <div className={`Projects-card ${isMobile ? 'mobile-card' : ''}`} key={proj.id || idx}>
              <div className="cards-content">
                <div className="text-content">
                  <h3 className="Projects-title">{proj.title}</h3>
                  <p className="Projects-description">{proj.description}</p>
                  <p className="project-author">By: {proj.author} • <a href={proj.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="continue-link" aria-label={`Repo for ${proj.title}`}>
                    <FaGithub size={20} style={{ marginRight: '8px' }} />View Repo
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* More... card */}
          <div className={`Projects-card more-card ${isMobile ? 'mobile-card' : ''}`}>
            <Link to="/projects/active" className="more-card-link">
              <div className="card-content more-card-content">
                <div className="more-card-inner">
                  <div className="more-icon">
                    <svg width={isMobile ? "50" : "70"} height={isMobile ? "50" : "70"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><circle cx="12" cy="5" r="3"></circle><circle cx="12" cy="19" r="3"></circle></svg>
                  </div>
                  <h3 className="more-title">More...</h3>
                  <p className="more-description">Explore all active projects and contributors</p>
                  <div className="more-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7,7 17,7 17,17"></polyline></svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {canScrollRight && (
          <button className="scroll-arrow right-arrow" onClick={() => scroll('right')} aria-label="Scroll Right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
          </button>
        )}
      </div>

      <div className="read-more-container">
        <Link to="/projects/active" className="read-more-link">View All Active Projects →</Link>
      </div>
    </div>
  );
};

export default ActiveProjectsPage;
