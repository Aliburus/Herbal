import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { chatAssist } from "../../services/api";
import { useNavigate } from "react-router-dom";

type ChatMessage = { from: string; text: string; link?: string };

const DUMMY_MESSAGES: ChatMessage[] = [
  { from: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
];

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<{
    text: string;
    link: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");
    setSuggestion(null);
    try {
      const res = await chatAssist(input);
      if (res.data.suggestion && res.data.link) {
        setSuggestion({ text: res.data.suggestion, link: res.data.link });
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: res.data.suggestion, link: res.data.link },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            from: "bot",
            text: "Sorunuzu daha iyi anlamam için lütfen daha fazla detay verin.",
          },
        ]);
      }
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Bir hata oluştu. Lütfen tekrar deneyin." },
      ]);
    }
  };

  const handleSuggestionClick = (link: string) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 left-6 z-50 bg-primary-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center focus:outline-none transition-all opacity-50 hover:opacity-100 focus:opacity-100 hover:bg-primary-700"
        onClick={() => setOpen((v) => !v)}
        aria-label="Sohbeti Aç/Kapat"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-primary-600 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold">Sohbet Asistanı</span>
            <button
              className="text-white hover:text-gray-200 ml-2"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-4 py-3 overflow-y-auto max-h-72 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] shadow-sm ${
                    msg.from === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.text}
                  {msg.link && (
                    <button
                      className="block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 text-xs font-semibold transition"
                      onClick={() => handleSuggestionClick(msg.link!)}
                    >
                      İlgili sayfaya git
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center border-t border-gray-200 bg-white px-2 py-2"
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200 text-sm"
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSend();
              }}
            />
            <button
              type="submit"
              className="ml-2 p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white focus:outline-none"
              aria-label="Gönder"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
