import React from 'react';
import './AIResponseFormatter.css';

const AIResponseFormatter = ({ text }) => {
    const elements = [];
    const lines = text.split('\n');

    let listItems = [];
    let listType = null;

    const flushList = (key) => {
        if (listItems.length > 0) {
            elements.push(React.createElement(listType, { key, className: 'ai-list' }, listItems));
            listItems = [];
            listType = null;
        }
    };

    lines.forEach((line, index) => {
        if (line.startsWith('### ')) {
            flushList(`list-${index}`);
            elements.push(<h3 key={index} className="ai-h3">{line.substring(4)}</h3>);
            return;
        }
        if (line.startsWith('#### ')) {
            flushList(`list-${index}`);
            elements.push(<h4 key={index} className="ai-h4">{line.substring(5)}</h4>);
            return;
        }
        if (line.trim() === '---') {
            flushList(`list-${index}`);
            elements.push(<hr key={index} className="ai-hr" />);
            return;
        }

        const ulMatch = line.match(/^\s*\*\s(.*)/);
        const olMatch = line.match(/^\s*\d+\.\s(.*)/);
        
        if (ulMatch) {
            if (listType !== 'ul') flushList(`list-${index}`);
            listType = 'ul';
            listItems.push(<li key={index}>{ulMatch[1]}</li>);
        } else if (olMatch) {
            if (listType !== 'ol') flushList(`list-${index}`);
            listType = 'ol';
            listItems.push(<li key={index}>{olMatch[1]}</li>);
        } else {
            flushList(`list-${index}`);
            if (line.trim() !== '') {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                elements.push(
                    <p key={index} className="ai-p">
                        {parts.map((part, i) => 
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                    </p>
                );
            }
        }
    });

    flushList('list-final');

    return <div className="ai-formatted-content">{elements}</div>;
};

export default AIResponseFormatter;