import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the back-end server
      await axios.post('/contact', { email, subject, message });
      // Clear the form inputs
      setEmail('');
      setSubject('');
      setMessage('');
      // Display a success message to the user
      alert('Email sent successfully!');
    } catch (error) {
      // Display an error message to the user
      alert('Failed to send the email. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </label>
      <br />
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      </label>
      <br />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default ContactForm;
