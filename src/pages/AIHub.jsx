import React, { useState } from 'react';
import AIResponseFormatter from '../components/AIResponseFormatter';
import './AIHub.css';

const AIHub = ({ addTheoryTopic }) => {
    const [topic, setTopic] = useState('');
    const [tips, setTips] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleGenerateTips = async () => {
        if (!topic) {
            setTips("Please enter a topic to get tips.");
            return;
        }
        setIsLoading(true);
        setTips('');
        setIsSaved(false); // Reset save state on new generation

        const prompt = `Provide some concise and helpful tips and tricks for a software engineering interview on the topic of: "${topic}". Structure the response clearly using markdown.`;

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API key is not configured.");

            const payload = { contents: [{ parts: [{ text: prompt }] }] };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            setTips(text);

        } catch (error) {
            console.error("Error generating tips:", error);
            setTips(`There was an error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSave = () => {
        addTheoryTopic(topic, tips);
        setIsSaved(true);
    };

    return (
        <div>
            <div className="card">
                <h2>AI Generated Tips & Tricks</h2>
                <p>Stuck on a concept? Get AI-powered explanations and tips for any topic.</p>
                <div className="ai-input-container">
                    <textarea 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'React Hooks', 'Big O Notation', 'System Design Interviews'"
                    />
                    <button onClick={handleGenerateTips} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Get Tips'}
                    </button>
                </div>
                {tips && (
                    <div className="ai-result-container">
                        <div className="result-header">
                            <h3>Tips for "{topic}"</h3>
                            <button onClick={handleSave} disabled={isSaved} className="save-btn">
                                {isSaved ? '✓ Saved' : 'Save to Theory'}
                            </button>
                        </div>
                        <AIResponseFormatter text={tips} />
                    </div>
                )}
            </div>
            <div className="card disabled-feature">
                <h2>AI-Powered Learning Plan</h2>
                <p>Get a customized learning plan based on your progress and goals. (Coming Soon)</p>
                <button disabled>Generate My Plan</button>
            </div>
            <div className="card disabled-feature">
                <h2>Personalized Question Suggestions</h2>
                <p>The AI will suggest questions based on your performance to target your weak areas. (Coming Soon)</p>
                <button disabled>Suggest Questions</button>
            </div>
        </div>
    );
};

export default AIHub;