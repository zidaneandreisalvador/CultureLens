import React, { useState, useRef, useEffect } from "react";
import { SendIcon, MicIcon, CompassIcon, GlobeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BuddyScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "buddy",
      text: "🌍 Hello traveler! I'm your AI cultural guide — here to share tips, customs, and insights about any destination. Where shall we begin?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  const handleSendMessage = async () => {
  const trimmedMessage = message.trim();
  if (!trimmedMessage) return;

  const userMessage = {
    id: chatHistory.length + 1,
    sender: "user",
    text: trimmedMessage,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  setChatHistory(prev => [...prev, userMessage]);
  setMessage("");
  setIsTyping(true);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a friendly AI travel companion." },
          { role: "user", content: trimmedMessage },
        ],
      }),
    });

    const data = await res.json();

    const buddyResponse = {
      id: chatHistory.length + 2,
      sender: "buddy",
      text: data.choices?.[0]?.message?.content || "⚠️ Could not generate a response.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory(prev => [...prev, buddyResponse]);
  } catch (error) {
    console.error(error);
    setChatHistory(prev => [
      ...prev,
      {
        id: chatHistory.length + 2,
        sender: "buddy",
        text: "⚠️ Could not connect to AI.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8dd] flex flex-col font-serif">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fefcf0] p-5 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-[#fefcf0] rounded-full flex items-center justify-center">
              <CompassIcon size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold">Travel Companion</h1>
              <p className="text-xs italic opacity-90">Your AI Cultural Guide</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/translate")}
            className="bg-[#d3b88c]/30 hover:bg-[#d3b88c]/60 p-2 rounded-md transition-all"
          >
            <GlobeIcon size={18} className="text-[#fefcf0]" />
          </button>
        </div>
      </header>

      {/* Chat Section */}
      <div className="flex-1 p-4 overflow-y-auto mb-28">
        <div className="space-y-4">
          {chatHistory.map(chat => (
            <div key={chat.id} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
              <div
                className={`p-4 rounded-2xl shadow-md max-w-[80%] relative font-serif ${chat.sender === "user" ? "bg-[#b99664] text-[#fefcf0]" : "bg-[#d8c49e] text-[#2f1b14]"}`}
                style={{ borderRadius: chat.sender === "user" ? "1rem 0 1rem 1rem" : "0 1rem 1rem 1rem" }}
              >
                <p className="italic font-medium" style={{ fontFamily: "'Courier New', monospace" }}>{chat.text}</p>
                <div className={`text-xs opacity-70 mt-1 ${chat.sender === "user" ? "text-right" : ""}`}>{chat.time}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#d8c49e] text-[#2f1b14] px-4 py-2 rounded-2xl shadow-sm italic font-serif">Buddy is typing...</div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-[90px] left-0 right-0 bg-[#fefcf0] border-t border-[#d4c4a8] p-2 max-w-md mx-auto shadow-lg rounded-t-xl">
        <div className="flex items-center bg-[#fcf8dd] border border-[#d4c4a8] rounded-full p-1">
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none h-10 py-2 px-3 text-[#2f1b14] font-serif"
            placeholder="Ask your travel buddy..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ fontFamily: "'Courier New', monospace" }}
          />
          <button className="p-2 text-[#8b7355] hover:text-[#5d3a28] mr-1"><MicIcon size={20} /></button>
          <button onClick={handleSendMessage} className="bg-[#754b34] text-[#fefcf0] p-2 rounded-full hover:bg-[#5d3a28] transition-colors"><SendIcon size={20} /></button>
        </div>
      </div>
    </div>
  );
};
