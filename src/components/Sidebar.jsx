import React from 'react';
import './Sidebar.css';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const QuestionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const TheoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const TipsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 9 11 19 5 19 5 13 15 3"></polyline></svg>;
const InterviewsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const CollapseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const AIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="8" height="8" rx="2"/><path d="M8 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2"/><path d="M16 12h4"/><path d="M18 10v4"/></svg>;


const Sidebar = ({ currentPage, setCurrentPage, isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Questions', icon: <QuestionsIcon /> },
    { name: 'Theory', icon: <TheoryIcon /> },
    { name: 'Tips & Tricks', icon: <TipsIcon /> },
    { name: 'Interviews', icon: <InterviewsIcon /> },
    { name: 'AI Hub', icon: <AIIcon /> }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div>
        <div className="sidebar-header">
          <h2>{"</>"}</h2> 
          <span className="sidebar-title">PrepGenie</span>
        </div>
        <nav>
          <ul>
            {menuItems.map(item => (
              <li key={item.name}>
                <a 
                  href="#" 
                  className={currentPage === item.name ? 'active' : ''}
                  onClick={() => setCurrentPage(item.name)}
                  title={item.name}
                >
                  {item.icon}
                  <span className="link-text">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
          <button onClick={toggleSidebar} className="collapse-button">
              <CollapseIcon />
              <span className="link-text">Collapse</span>
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;