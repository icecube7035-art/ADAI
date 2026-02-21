
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/Button';

interface ContactPageProps {
  userEmail: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ userEmail }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Simulate API call to send email to icecubes7035@gmail.com
      console.log("Sending feedback to: icecubes7035@gmail.com");
      console.log("From:", userEmail);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("Timestamp:", new Date().toLocaleString());

      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen py-24 px-6 bg-[#0a0a0a] flex items-center justify-center">
        <div className="glass max-w-md w-full p-12 rounded-[2rem] text-center space-y-6 animate-fade-up">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-check text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold">Message Sent!</h2>
          <p className="text-gray-400">Thank you for your feedback. Our team will review your message and get back to you shortly.</p>
          <Button onClick={() => navigate('/gallery')} className="w-full py-4 rounded-xl">Back to Gallery</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto space-y-12">
        <header className="space-y-4 text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Contact & <span className="gradient-text">Feedback</span></h1>
          <p className="text-gray-500 text-lg">Have feedback, questions, or ideas? Send them directly to us.</p>
        </header>

        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2rem] border-white/5 space-y-8 animate-fade-up delay-100">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Sender Email</label>
            <input
              type="email"
              readOnly
              value={userEmail}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-gray-400 cursor-not-allowed outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Subject</label>
            <input
              type="text"
              required
              placeholder="What is this regarding?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Message</label>
            <textarea
              required
              rows={6}
              placeholder="Tell us more about your experience or request..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" loading={isSending} className="flex-1 py-4 text-lg rounded-2xl shadow-xl">
              Send Message
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1 py-4 text-lg rounded-2xl border-white/10 text-gray-400">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
