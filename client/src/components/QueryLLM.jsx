import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import '../styles/QueryLLM.css';

function QueryLLM() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnswer('');

    try {
      const response = await axios.post(`${API_URL}/query_llm`, {
        query: question.trim()
      });
      
      setAnswer(response.data.result || 'No answer received');
    } catch (error) {
      console.error('Error querying LLM:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError('Network error: Unable to connect to server');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer('');
    setError('');
  };

  // Minimal markdown formatter to support bold/italic/inline code/links and line breaks
  // 1) Escape HTML to prevent injection
  // 2) Apply simple markdown conversions
  const formatMarkdown = (text) => {
    if (!text) return '';
    const escapeHtml = (s) => s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    // Escape first
    let html = escapeHtml(text);

    // Inline code: `code`
    html = html.replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.12); padding: 2px 6px; border-radius: 4px;">$1</code>');

    // Bold: **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Links: [text](url)
    html = html.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color:#93c5fd;">$1</a>');

    // Unordered lists: lines starting with - or *
    html = html.replace(/(^|\n)[\t ]*[-*][\t ]+(.+)(?=\n|$)/g, (m, p1, item) => `${p1}<li>${item}</li>`);
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(?:<li>[^<]+<\/li>\n?)+/g, (m) => `<ul style="margin: 0 0 8px 16px; padding-left: 16px;">${m}</ul>`);

    // Paragraph breaks
    html = html.replace(/\n{2,}/g, '<br/><br/>' );
    // Single line breaks
    html = html.replace(/\n/g, '<br/>' );

    return html;
  };

  return (
    <div className="query-llm-container">
      <h2 className="query-llm-title">Ask AI Assistant</h2>
      
      <form onSubmit={handleSubmit} className="query-llm-form">
        <div className="query-llm-input-group">
          <label className="query-llm-label">
            Your Question:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="query-llm-textarea"
          />
        </div>

        <div className="query-llm-button-group">
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className={`query-llm-button query-llm-button-primary`}
          >
            {isLoading ? 'Thinking...' : 'Ask Question'}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="query-llm-button query-llm-button-secondary"
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="query-llm-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div className="query-llm-answer-card">
          <div className="query-llm-answer-header">
            <div className="query-llm-answer-icon">
              🤖
            </div>
            <h3 className="query-llm-answer-title">
              AI Response
            </h3>
          </div>
          <div
            className="query-llm-answer-content"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(answer) }}
          />
        </div>
      )}

      {isLoading && (
        <div className="query-llm-loading">
          <div className="query-llm-loading-title">
            🤔 AI is thinking...
          </div>
          <div className="query-llm-loading-subtitle">
            This may take a few moments
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryLLM;
