import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Memoize the greeting message function to avoid useEffect warning
  const getGreetingMessage = useCallback(() => {
    const userName = user ? `${user.firstName}` : 'there';
    
    // Using 'Hello' instead of time-based greetings, simplified without titles
    const greeting = 'Hello';
    
    return `${greeting} ${userName}, greetings of the day!`;
  }, [user]);

  // Initialize chatbot with greeting message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingTimeout = setTimeout(() => {
        const greeting = getGreetingMessage();
        setMessages([
          {
            id: 1,
            text: greeting,
            sender: 'bot',
            timestamp: new Date()
          },
          {
            id: 2,
            text: "How may I help you today?",
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }, 500);

      return () => clearTimeout(greetingTimeout);
    }
  }, [isOpen, messages.length, getGreetingMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response (replace with AI integration)
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Simple response patterns (replace with AI integration)
    if (lowerMessage.includes('help') || lowerMessage.includes('assistance')) {
      return "I'm here to help! You can ask me about alumni directory, events, mentorship programs, or any other features of the platform.";
    } else if (lowerMessage.includes('profile')) {
      return "To update your profile, click on the 'My Profile' section from the dashboard. You can edit your personal and professional information there.";
    } else if (lowerMessage.includes('event')) {
      return "You can find upcoming events in the Events section. You can also create and manage your own events from there.";
    } else if (lowerMessage.includes('alumni') || lowerMessage.includes('directory')) {
      return "The Alumni Directory helps you connect with fellow graduates. You can search by graduation year, department, or industry.";
    } else if (lowerMessage.includes('mentor')) {
      return "Our Mentorship program connects students with experienced alumni. You can request mentorship or offer to be a mentor.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you today? I can help with navigation, features, or answer questions about the platform.";
    } else {
      return "I understand you're asking about that. While I'm currently learning to provide better assistance, you can explore the different sections of the platform or contact support for detailed help. Is there anything specific about the platform features I can help explain?";
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
          theme === 'dark' 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        style={{
          background: user?.role === 'student' 
            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
            : user?.role === 'alumni'
            ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
        }}
      >
        <svg 
          className="w-6 h-6 text-white mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          {/* Header */}
          <div 
            className="p-4 rounded-t-lg text-white flex justify-between items-center"
            style={{
              background: user?.role === 'student' 
                ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                : user?.role === 'alumni'
                ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">AlumniConnect Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <button 
              onClick={closeChatbot}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                  style={message.sender === 'user' ? {
                    background: user?.role === 'student' 
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : user?.role === 'alumni'
                      ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  } : {}}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-4 py-2 rounded-lg text-white font-medium text-sm disabled:opacity-50"
                style={{
                  background: user?.role === 'student' 
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : user?.role === 'alumni'
                    ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
