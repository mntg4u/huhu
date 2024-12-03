import React, { useState } from 'react';

const BotTokenForm = () => {
  const [botToken, setBotToken] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Processing...');
    try {
      // Send the token to the server to start the bot interaction
      const response = await fetch('/api/start-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: botToken }),
      });
      
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Error interacting with the bot.');
    }
  };

  return (
    <div>
      <h2>Submit your Bot Token</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={botToken}
          onChange={(e) => setBotToken(e.target.value)}
          placeholder="Enter Bot Token"
          required
        />
        <button type="submit">Start Bot</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default BotTokenForm;
