import React, { useState } from 'react';
import axios from 'axios';

function ChatInterface({ onClose, projectId, testCases, onUpdateTestCases }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis là pour vous aider avec vos cas de test. Comment puis-je vous aider ?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;
    
    const userMessage = { role: 'user', content: currentMessage };
    setMessages([...messages, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    
    try {
      // Create an EventSource for the streaming response
      const params = new URLSearchParams({
        message: currentMessage,
        project_id: projectId,
        test_cases: testCases
      }).toString();
      
      const eventSource = new EventSource(`/chat_with_assistant?${params}`);
      
      let responseText = '';
      
      eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
          setMessages([...messages, userMessage, { role: 'assistant', content: responseText }]);
          setIsLoading(false);
          eventSource.close();
          
          // Check if the response contains updated test cases
          if (responseText.includes("```") && onUpdateTestCases) {
            const codeBlocks = responseText.match(/```(?:.*?)\n([\s\S]*?)```/g);
            if (codeBlocks && codeBlocks.length > 0) {
              // Extract the code from the first code block
              const code = codeBlocks[0].replace(/```(?:.*?)\n([\s\S]*?)```/g, '$1').trim();
              onUpdateTestCases(code);
            }
          }
        } else {
          const data = JSON.parse(event.data);
          if (data.chunk) {
            responseText += data.chunk;
            // Update the message in real-time as chunks arrive
            setMessages([
              ...messages,
              userMessage,
              { role: 'assistant', content: responseText, isPartial: true }
            ]);
          }
        }
      };
      
      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        setMessages([
          ...messages,
          userMessage,
          { role: 'assistant', content: 'Désolé, une erreur est survenue lors de la communication avec le serveur.' }
        ]);
        setIsLoading(false);
        eventSource.close();
      };
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages([
        ...messages,
        userMessage,
        { role: 'assistant', content: 'Désolé, une erreur est survenue. Veuillez réessayer.' }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">Assistant IA</h3>
        <button
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-indigo-100 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.isPartial && (
                <div className="mt-2 flex justify-end">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1].role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Tapez votre message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading || !currentMessage.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;