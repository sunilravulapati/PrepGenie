import React from 'react';
import { UserButton } from "@clerk/clerk-react";
import './Header.css';

const Header = ({ currentPage, user }) => {
  return (
    <header className="header">
      <div className="header-left">
          {/* The toggle button has been removed from here */}
          <h1 className="header-title">{currentPage}</h1>
      </div>
      <div className="user-profile">
        {user && (
            <>
                <span>Welcome, {user.firstName || 'User'}!</span>
                <UserButton afterSignOutUrl="/"/>
            </>
        )}
      </div>
    </header>
  );
};

export default Header;