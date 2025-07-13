import React, { useState } from 'react';
import { Search, Bell, User, MessageCircle, ArrowUp, ArrowDown, Share2, Clock, Filter, TrendingUp, Bot, Send, X, Minimize2 } from 'lucide-react';
const Chatbox = () => {
     
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm here to help you with any questions.", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

     const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };
const sendMessage = async () => {
  if (inputMessage.trim()) {
    const newMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    setChatMessages([...chatMessages, newMessage]);
    setInputMessage('');

    try {
      // Call your backend route
      const res = await fetch('http://localhost:5000/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: inputMessage }),
      });

      const data = await res.json();

      const aiResponse = {
        id: chatMessages.length + 2,
        text: data.answer,
        sender: 'ai'
      };
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
    }
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

    return (
        <div>
               {!isChatOpen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1></h1>
          <button
            onClick={toggleChat}
            className="fixed bottom-6  sm:right-6 lg:right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            style={{ right: 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))' }}
          >
            <span className='text-sm'>Need help?</span><Bot className="w-6 h-6" /> 
          </button>
        </div>
      )}

      {isChatOpen && (
        <div className="max-w-7xl mx-auto mr-3 sm:px-6 lg:px-8 relative">
          <div 
            className={`fixed bottom-6 z-50 transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-80 h-96'
            }`}
            style={{ 
              right: 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))',
              maxWidth: 'calc(100vw - 2rem)'
            }}
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={minimizeChat}
                    className="hover:bg-blue-700 p-1 rounded transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="hover:bg-blue-700 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white ml-auto'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default Chatbox;