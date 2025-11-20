import React, { useState, useRef, useEffect } from "react";

const Chat = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Halo, ada yang bisa dibantu?" },
  ]);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);

  // Auto scroll saat ada pesan baru
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!open) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    // Push pesan user
    const newMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    var balasan 
    if (newMsg.text == "Beni"){
        balasan = "QA Terbaik ga tuh"
    }else{
        balasan = "DEV TERBAIK"
    }

    // Dummy reply setelah 1 detik
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: balasan },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg border z-[9999] animate-slide-up">
      {/* Header */}
      <div className="p-3 bg-indigo-600 text-white rounded-t-lg flex justify-between">
        <span className="font-semibold">Chat Support</span>
        <button onClick={onClose}>✕</button>
      </div>

      {/* Messages */}
      <div className="p-3 h-64 overflow-y-auto text-sm text-gray-700 space-y-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`p-2 rounded w-fit max-w-[75%] ${
              msg.from === "bot" ? "bg-gray-100" : "bg-indigo-100 ml-auto"
            }`}
          >
            {msg.text}
          </p>
        ))}
        <div ref={msgEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          className="w-full border rounded px-3 py-2 text-sm resize-none"
          placeholder="Ketik pesan dan tekan Enter..."
        />

        <button
          onClick={handleSend}
          className=" mb-3 rounded-full text-white hover:bg-indigo-700 active:scale-95 transition"
        >
              <img src="/icon/send.svg" className="w-10 h-10" alt="send" />

        </button>
      </div>
    </div>
  );
};

export default Chat;
