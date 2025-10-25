import React, { useState } from 'react';
import { SendIcon, MicIcon, ImageIcon, CompassIcon, GlobeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const BuddyScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([{
    id: 1,
    sender: 'buddy',
    text: "Hello! I'm your AI travel companion. Ask me anything about your travels!",
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }]);
  const handleSendMessage = () => {
    if (!message.trim()) return;
    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    // Simulated AI reply
    setTimeout(() => {
      const buddyResponse = {
        id: chatHistory.length + 2,
        sender: 'buddy',
        text: "I'm here to help you explore cultural customs, travel tips, and local etiquette. What destination are you curious about?",
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setChatHistory(prevChat => [...prevChat, buddyResponse]);
    }, 1000);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div className="min-h-screen bg-[#fef7e0] flex flex-col">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fcf8dd] p-5 rounded-t-3xl shadow-md">
        <div className="flex items-center justify-between">
          {/* Left side: Chat icon + Title + Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
              <CompassIcon size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold font-serif">
                Travel Companion
              </h1>
              <p className="text-xs opacity-90 font-serif">
                Your AI Cultural Guide
              </p>
            </div>
          </div>
          {/* Right side: Translation button */}
          <button className="bg-[#d3b88c] bg-opacity-30 hover:bg-opacity-50 p-2 rounded-md" onClick={() => navigate('/translate')}>
            <GlobeIcon size={18} className="text-white" />
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto mb-24">
        <div className="space-y-4">
          {chatHistory.map(chat => <div key={chat.id} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`${chat.sender === 'user' ? 'bg-[#dcbd8c] text-white' : 'bg-[#bc9a60] text-white'} p-4 rounded-lg max-w-[80%] shadow-md font-serif relative`} style={{
            borderRadius: chat.sender === 'user' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem',
            boxShadow: '2px 2px 4px rgba(139, 90, 60, 0.2)'
          }}>
                <p className="italic font-bold" style={{
              fontFamily: "'Courier New', monospace"
            }}>
                  {chat.text}
                </p>
                <div className={`text-xs opacity-70 mt-1 ${chat.sender === 'user' ? 'text-right' : ''}`}>
                  {chat.time}
                </div>
                {/* Decorative Tail */}
                <div className={`absolute ${chat.sender === 'user' ? 'top-0 right-0' : 'top-0 left-0'} w-3 h-3 transform ${chat.sender === 'user' ? 'translate-x-1/4 -translate-y-1/4' : '-translate-x-1/4 -translate-y-1/4'}`} style={{
              backgroundColor: chat.sender === 'user' ? '#dcbd8c' : '#bc9a60',
              clipPath: chat.sender === 'user' ? 'polygon(0 0, 100% 100%, 100% 0)' : 'polygon(0 0, 100% 0, 0 100%)'
            }}></div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-[85px] left-0 right-0 bg-[#fefcf0] border-t border-[#d4c4a8] p-2 max-w-md mx-auto shadow-md">
        <div className="flex items-center bg-[#fef7e0] border border-[#d4c4a8] rounded-full p-1">
          <button className="p-2 text-[#8b7355] hover:text-[#744a32]">
          </button>
          <textarea className="flex-1 bg-transparent border-none focus:ring-0 resize-none h-10 py-2 px-3 font-serif" placeholder="Ask your travel buddy..." value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} style={{
          fontFamily: "'Courier New', monospace"
        }} />
          <button className="p-2 text-[#8b7355] hover:text-[#744a32] mr-1">
            <MicIcon size={20} />
          </button>
          <button className="bg-[#744a32] text-white p-2 rounded-full hover:bg-[#5d3a28]" onClick={handleSendMessage}>
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>;
};