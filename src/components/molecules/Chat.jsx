import React, { useState, useRef, useEffect } from "react";

const Chat = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    // { from: "bot", text: "Halo, ada yang bisa dibantu?" },
  ]);

  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
  const socketRef = useRef(null);

  // Connect WebSocket sekali saja
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:6960");

    socketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data)
        setMessages((prev) => [...prev, data]);
        console.log(messages)
      } catch {
        console.error("Invalid WS data:", event.data);
      }
    };

    return () => socketRef.current.close();
  }, []);

  // Auto scroll tiap pesan masuk
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!open) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]);

    // Kirim ke WebSocket
    socketRef.current.send(
      JSON.stringify({ from: "user", text: input.trim() })
    );

    setInput("");
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
              msg.from === "user"
                ? "bg-indigo-100 ml-auto"
                : "bg-gray-100"
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
          className="mb-3 rounded-full text-white hover:bg-indigo-700 active:scale-95 transition"
        >
          <img src="/icon/send.svg" className="w-10 h-10" alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
