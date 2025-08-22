import React, { useState, useEffect } from 'react';
import { SignInButton } from "@clerk/clerk-react";
import './HomePage.css';

const motivationalQuotes = [
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "Every expert was once a beginner."
];

const HomePage = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
        }, 7000); // Changed quote speed to 7 seconds

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    return (
        <div className="homepage-container">
            <div className="animated-bg"></div>
            <header className="homepage-header">
                <div className="logo">
                    <span className="logo-symbol">{"</>"}</span>
                    <span>PrepGenie</span>
                </div>
                <div className="motivational-quote">
                    <p>"{motivationalQuotes[quoteIndex]}"</p>
                </div>
                <nav className="homepage-nav">
                    <a href="#features">Why Us?</a>
                </nav>
            </header>
            <main className="homepage-main">
                <div className="hero-section">
                    <h2>Ace Your Next Tech Interview.</h2>
                    <p className="subtitle">Your personalized companion for cracking coding interviews at top tech companies.</p>
                    <SignInButton mode="modal">
                        <button className="cta-button">Let's Get Started</button>
                    </SignInButton>
                </div>
                <section id="features" className="features-section">
                    <h3>Why Use PrepGenie?</h3>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h4>Structured Practice</h4>
                            <p>Follow a curated roadmap of questions from easy to hard, covering all essential topics.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Boost Your Chances</h4>
                            <p>Users who consistently practice with our tool report a 70% higher success rate in technical rounds.</p>
                        </div>
                        <div className="feature-card">
                            <h4>AI-Powered Insights</h4>
                            <p>Use our AI Hub to get personalized learning plans and hints, targeting your weak spots.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="homepage-footer">
                <p>&copy; 2024 PrepGenie. All rights reserved.</p>
            </footer>
        </div>
    );
};
export default HomePage;