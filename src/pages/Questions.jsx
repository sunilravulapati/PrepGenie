import React, { useState } from 'react';
import AIResponseFormatter from '../components/AIResponseFormatter';
import './Questions.css';

const topics = ["Arrays", "Strings", "Trees", "Dynamic Programming", "Linked Lists", "System Design"];

const SolutionModal = ({ content, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content solution-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <AIResponseFormatter text={content} />
            </div>
        </div>
    );
};

const QuestionItem = ({ question, updateQuestionStatus, showSolutionInModal }) => {
    const [answer, setAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAIResponse = async (type) => {
        setIsLoading(type);
        if (type === 'hint') setAnswer(null);

        const prompt = type === 'hint'
            ? `Provide a single, concise hint for solving the following interview question, without giving away the full solution: "${question.title}"`
            : `For the interview question "${question.title}", provide a complete response formatted in markdown. Include these sections: 
               #### Explanation: A step-by-step explanation of the approach.
               #### Code Solution: A complete and well-commented code solution in Python.
               #### Test Cases: An example input/output and two edge cases with their expected outputs.`;

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API key not configured.");
            
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

            if (type === 'hint') {
                setAnswer({ type, content: text });
            } else {
                showSolutionInModal(text);
            }
        } catch (error) {
            console.error(`Error getting ${type}:`, error);
            if (type === 'hint') {
                setAnswer({ type: 'error', content: `Failed to load ${type}.` });
            } else {
                showSolutionInModal(`### Error\nFailed to load solution.`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`question-item-wrapper ${question.status}`}>
            <div className="question-item">
                <p>{question.title}</p>
                <div className="question-actions">
                    <button className="action-btn" onClick={() => updateQuestionStatus(question.id, 'done')}>Mark as Done</button>
                    <button className="action-btn" onClick={() => getAIResponse('hint')} disabled={isLoading === 'hint'}>
                        {isLoading === 'hint' ? '...' : 'Hint'}
                    </button>
                    <button className="action-btn" onClick={() => getAIResponse('code')} disabled={isLoading === 'code'}>
                        {isLoading === 'code' ? '...' : 'Solution'}
                    </button>
                    <button className="action-btn review" onClick={() => updateQuestionStatus(question.id, 'review')}>Add to Review</button>
                </div>
            </div>
            {answer && answer.type === 'hint' && (
                <div className="answer-container">
                    <AIResponseFormatter text={answer.content} />
                </div>
            )}
        </div>
    );
};

const Questions = ({ questions, updateQuestionStatus, addGeneratedQuestions }) => {
  const [filter, setFilter] = useState({ topic: 'All', difficulty: 'All' });
  const [aiTopic, setAiTopic] = useState(topics[0]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleGenerateQuestions = async () => {
      setIsLoadingAI(true);
      const prompt = `Generate 5 interview questions for a software engineering interview on the topic of "${aiTopic}". The questions should range in difficulty. Return the response as a JSON array of objects, where each object has a "title" and "difficulty" (Easy, Medium, or Hard). Example format: [{"title": "Question text...", "difficulty": "Easy"}]`;
      
      try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey) throw new Error("API key is not configured.");
          const payload = {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" }
          };
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
          const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
          const result = await response.json();
          const text = result.candidates[0].content.parts[0].text;
          const parsedJson = JSON.parse(text);
          const questionsWithTopic = parsedJson.map(q => ({...q, topic: aiTopic, status: 'unseen'}));
          addGeneratedQuestions(questionsWithTopic);
      } catch (error) {
          console.error("Error generating questions:", error);
      } finally {
          setIsLoadingAI(false);
      }
  };

  const filteredQuestions = questions.filter(q => 
    (filter.topic === 'All' || q.topic === filter.topic) &&
    (filter.difficulty === 'All' || q.difficulty === filter.difficulty)
  );

  return (
    <div>
        {modalContent && <SolutionModal content={modalContent} onClose={() => setModalContent(null)} />}
        <div className="card">
            <h2>Generate Questions with AI</h2>
            <p>Select a topic and let our AI generate fresh questions for you to practice.</p>
            <div className="ai-generator-controls">
                <select value={aiTopic} onChange={(e) => setAiTopic(e.target.value)}>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button onClick={handleGenerateQuestions} disabled={isLoadingAI}>
                    {isLoadingAI ? 'Generating...' : 'Generate'}
                </button>
            </div>
        </div>
        <div className="card">
            <h2>Question List</h2>
            <div className="filter-card">
                <select name="topic" onChange={handleFilterChange}>
                    <option value="All">All Topics</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select name="difficulty" onChange={handleFilterChange}>
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div className="questions-list">
                {filteredQuestions.map(q => (
                    <QuestionItem key={q.id} question={q} updateQuestionStatus={updateQuestionStatus} showSolutionInModal={setModalContent} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Questions;