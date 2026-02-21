
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/Button';
import { APP_NAME } from './constants';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('adai_privacy_acknowledged', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Privacy <span className="gradient-text">Policy</span></h1>
          <p className="text-gray-500">Your privacy is our priority.</p>
        </header>

        <div className="glass p-8 md:p-12 rounded-[2rem] border-white/5 space-y-8 text-gray-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>At {APP_NAME}, we value your trust. This Privacy Policy explains how we collect, use, and protect your personal information when you use our AI advertising platform.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Information Collected</h2>
            <p>We collect information to provide a better experience. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information: Your email address and login credentials.</li>
              <li>Usage data: History of ad generations, selected platforms, and custom settings.</li>
              <li>Technical data: Device type, browser version, and basic interaction analytics.</li>
              <li>Preferences: Language settings and saved brand tones.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. How Information Is Used</h2>
            <p>Your data allows us to maintain your account, save your generated ads for future use, and continuously improve the performance and reliability of our AI models. We also use data to prevent platform abuse and ensure a secure environment.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. AI & Generated Content</h2>
            <p>Your product descriptions and audience inputs are processed by our AI models to generate ads. While these assets belong to you, we may analyze anonymized input data to improve generation quality. We never sell your personal data to third parties.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. Cookies & Tracking</h2>
            <p>We use essential cookies for authentication and preference management. You can control cookie settings in your browser, though some features may be limited if cookies are disabled.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">6. Data Storage & Security</h2>
            <p>We implement industry-standard security measures to protect your data. While no system is completely impenetrable, we use best practices in encryption and secure cloud storage to safeguard your campaign data.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">7. Data Sharing</h2>
            <p>We do not sell your personal information. We only share data when legally required or with trusted service providers necessary for the operation of {APP_NAME}, under strict confidentiality agreements.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">8. User Rights</h2>
            <p>You have the right to access, update, or request the deletion of your personal data at any time. You can manage these settings directly in your account dashboard.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">9. Changes to This Policy</h2>
            <p>We may update this policy periodically. Significant updates will be communicated through the platform. Your continued use of the platform constitutes acknowledgment of the updated policy.</p>
          </section>
        </div>

        <div className="flex justify-center pt-8">
          <Button onClick={handleAcknowledge} className="px-12 py-4 text-lg rounded-2xl">
            I Understand & Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
};
