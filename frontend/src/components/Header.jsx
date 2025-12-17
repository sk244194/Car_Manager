import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export function Header() {
    // Check if user is logged in to show appropriate links?
    // For now, just a static header or one that links home. (Simplifying based on request)
    return (
        <header className="main-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    Car Manager
                </Link>
                {/* Add standard nav links if needed, but user just asked for heading */}
            </div>
        </header>
    );
}
