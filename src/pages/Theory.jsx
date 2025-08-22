import React, { useState, useEffect } from 'react';
import './Theory.css';

const Theory = ({ theoryContent, uploadedFiles, addUploadedFile }) => {
    const [topics, setTopics] = useState(Object.keys(theoryContent));
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);
    const [uploadStatus, setUploadStatus] = useState('');

    useEffect(() => {
        const newTopics = Object.keys(theoryContent);
        setTopics(newTopics);
        if (!newTopics.includes(selectedTopic)) {
            setSelectedTopic(newTopics[0]);
        }
    }, [theoryContent, selectedTopic]);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            addUploadedFile(file);
            setUploadStatus(`${file.name} uploaded successfully!`);
            // Reset the input value so the same file can be uploaded again if needed
            e.target.value = null; 
        }
    };

    const content = theoryContent[selectedTopic];

    if (!content) {
        return <div className="card">Please select a topic to view its content.</div>;
    }

    return (
        <div className="theory-container">
            <div className="theory-sidebar">
                <h3>Topics</h3>
                <ul>
                    {topics.map(topic => (
                        <li 
                            key={topic} 
                            className={selectedTopic === topic ? 'active' : ''}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            {topic}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="theory-content-wrapper">
                <div className="theory-content card">
                    <h2>{content.title}</h2>
                    <p className="summary">{content.summary}</p>
                    <h4>Key Points:</h4>
                    <ul>
                        {content.points.map((point, index) => (
                            <li key={index}>{point.replace(/^\s*(\*|\d+\.)\s*/, '')}</li>
                        ))}
                    </ul>
                </div>
                <div className="pdf-upload-card card">
                    <h3>Upload Your Notes</h3>
                    <p>Have your own notes or a PDF? Upload it here for easy access and revision during this session.</p>
                    <label htmlFor="pdf-upload" className="upload-button">
                        Choose a PDF File
                    </label>
                    <input type="file" id="pdf-upload" accept=".pdf" onChange={handleFileChange} />
                    {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
                    
                    <div className="uploaded-files-section">
                        <h4>Your Uploaded Notes</h4>
                        {uploadedFiles.length > 0 ? (
                            <ul className="uploaded-files-list">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index}>
                                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-files-text">No files uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Theory;