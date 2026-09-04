import React, { useState } from 'react';
import { ASSETS } from '../data/shipments';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'courier' | 'user';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'courier',
      text: '¡Hola Carlos! Ya voy en ruta hacia tu dirección con la Dell XPS 15.',
      time: '14:18',
    },
    {
      id: '2',
      sender: 'courier',
      text: 'El tráfico está fluido, calculo llegar en unos 15 minutos.',
      time: '14:20',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulated reply from Mateo
    setTimeout(() => {
      const courierReplies = [
        '¡Entendido! Te aviso apenas esté estacionando frente al edificio.',
        'Perfecto, tengo anotado el piso 6. Subiré directamente.',
        'De acuerdo, recuerda tener a mano el código PIN 8492.',
        '¡Listo! Estoy a 2 cuadras por Av. Angamos.',
      ];
      const randomReply = courierReplies[Math.floor(Math.random() * courierReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'courier',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-background/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl flex flex-col h-[520px] max-h-[90vh] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Chat Header */}
        <div className="bg-surface-container-low px-space-md py-3 flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src={ASSETS.courierMateo}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ASSETS.courierMateoRemote;
                }}
                alt="Mateo Morales"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-label-md font-bold text-on-surface text-sm">Mateo Morales</span>
                <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <span className="text-[11px] text-tertiary font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                En ruta • Honda Roja 4821-VX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="tel:+51999888777"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
              title="Llamar a Mateo"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-space-md overflow-y-auto flex flex-col gap-space-xs bg-surface">
          <div className="text-center my-1">
            <span className="bg-surface-container-low text-secondary text-[11px] px-3 py-1 rounded-full font-medium">
              Entrega en curso: Guía #VX-94821
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-xs'
                    : 'bg-surface-container-lowest text-on-surface rounded-bl-xs border border-surface-container'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-secondary mt-0.5 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-space-md py-1.5 bg-surface border-t border-surface-container-low flex gap-1.5 overflow-x-auto no-scrollbar">
          {['Ya estoy en portería', '¿A qué hora llegas aprox?', 'Tengo el PIN listo', 'Dejar con vigilante'].map(
            (chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="shrink-0 bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-on-surface text-[11px] px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            )
          )}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-space-xs bg-surface-container-lowest border-t border-surface-container flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe un mensaje a Mateo..."
            className="flex-1 bg-surface-container-low text-on-surface text-xs px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm hover:bg-primary-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
