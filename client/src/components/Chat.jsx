import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!username || !message) return;

    const msgData = {
      user: username,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('chat message', msgData);
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">💬 Live Chat</h2>

      <input
        type="text"
        placeholder="Enter your name"
        className="w-full mb-2 p-2 border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">
            <strong>{msg.user}</strong> <span className="text-sm text-gray-500">[{msg.time}]</span>: {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-grow p-2 border rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </form>
    </div>
  );
};

export default Chat;
