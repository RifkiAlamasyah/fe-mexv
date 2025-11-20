import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Ambil token JWT dari localStorage (sesuaikan dengan project kamu)

    const token = sessionStorage.getItem("token");
    // 🔥 Connect ke socket.io
    socketRef.current = io("http://localhost:6960", {
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.IO Connected", socketRef.current.id);
    });

    // 🔥 Terima pesan dari server
    socketRef.current.on("receive_message", (data) => {
      console.log("Pesan masuk:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  // Auto scroll tiap update
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!open) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      from: "me",
      text: input.trim()
    };

    // Tempel di UI sendiri
    setMessages((prev) => [...prev, newMsg]);

    // 🔥 Kirim ke server
    socketRef.current.emit("send_message", {
      text: input.trim(),
    });

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg border z-[9999]">
      <div className="p-3 bg-indigo-600 text-white rounded-t-lg flex justify-between">
        <span className="font-semibold">Chat Support</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="p-3 h-64 overflow-y-auto text-sm text-gray-700 space-y-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`p-2 rounded max-w-[75%] ${
              msg.from === "me"
                ? "bg-indigo-100 ml-auto"
                : "bg-gray-100"
            }`}
          >
            {msg.text}
          </p>
        ))}
        <div ref={msgEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          className="w-full border rounded px-3 py-2 text-sm resize-none"
          placeholder="Ketik pesan..."
        />

        <button onClick={handleSend} className="mb-3">
          <img src="/icon/send.svg" className="w-10 h-10" alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
