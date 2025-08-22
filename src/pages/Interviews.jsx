import React, { useState } from 'react';
import './Interviews.css';

const AddInterviewModal = ({ onAdd, onClose }) => {
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!role || !company || !date) return;
        onAdd({ id: Date.now(), role, company, date });
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Add New Interview</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Job Role (e.g., Frontend Developer)" required />
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company Name" required />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-add">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Accept interviews and addInterview as props
const Interviews = ({ interviews, addInterview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="card">
            <div className="interviews-header">
                <h2>Interviews to Attend</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-interview-btn">+ Add Interview</button>
            </div>
            <div className="interviews-list">
                {interviews.length > 0 ? interviews.map(interview => (
                    <div key={interview.id} className="interview-item">
                        <div>
                            <strong>{interview.role}</strong>
                            <p>{interview.company}</p>
                        </div>
                        <span>{interview.date}</span>
                    </div>
                )) : (
                    <p>No upcoming interviews scheduled.</p>
                )}
            </div>
            {isModalOpen && <AddInterviewModal onAdd={addInterview} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Interviews;