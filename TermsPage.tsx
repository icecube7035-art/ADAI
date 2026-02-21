
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/Button';
import { APP_NAME } from './constants';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('adai_terms_accepted', 'true');
    localStorage.setItem('adai_terms_timestamp', new Date().toISOString());
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Terms & <span className="gradient-text">Services</span></h1>
          <p className="text-gray-500">Last Updated: October 2023</p>
        </header>

        <div className="glass p-8 md:p-12 rounded-[2rem] border-white/5 space-y-8 text-gray-400 leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>Welcome to {APP_NAME}. By accessing or using our platform, you agree to be bound by these Terms & Services. {APP_NAME} is an AI-powered advertising platform designed to help you generate text, image, and video content for digital marketing purposes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Eligibility</h2>
            <p>You must be at least 18 years of age or the legal age of majority in your jurisdiction to use this service. By using {APP_NAME}, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Account Registration</h2>
            <p>To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your login credentials and are fully responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Use of the Service</h2>
            <p>{APP_NAME} provides AI-generated advertising content. While we strive for high quality, all generated content is provided "as is." Users are solely responsible for reviewing, editing, and ensuring the accuracy and legality of all content before publication.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. Prohibited Use</h2>
            <p>You agree not to use the service for any illegal, deceptive, or harmful purposes. This includes, but is not limited to: generating fraudulent advertisements, distributing malware, impersonating others, or attempting to reverse-engineer our proprietary AI models.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">6. Intellectual Property</h2>
            <p>{APP_NAME} owns the platform, software, and branding. Users retain ownership of the specific ad assets they generate through the platform. However, you grant {APP_NAME} a limited license to use anonymized data from your usage to improve our services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">7. Payments & Subscriptions</h2>
            <p>Our service includes free-tier limits. Paid subscriptions unlock additional capabilities. All payments are non-refundable unless required by applicable law. We reserve the right to change our pricing upon reasonable notice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">8. Content Responsibility</h2>
            <p>You are responsible for ensuring your ads comply with the rules of the platforms where you publish them (e.g., Facebook, TikTok, LinkedIn). {APP_NAME} is not liable for ad performance, account suspensions, or content rejection by third-party platforms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">9. Limitation of Liability</h2>
            <p>In no event shall {APP_NAME} be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service. We make no guarantees regarding ad conversion rates or specific business results.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">10. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time for violations of these terms. You may stop using the service at any time by deleting your account or following the provided cancellation procedures.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">11. Changes to Terms</h2>
            <p>We may update these terms from time to time. Your continued use of the service after such changes constitutes acceptance of the new terms. We will notify you of significant changes via email or platform announcements.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">12. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of the jurisdiction in which {APP_NAME} operates, without regard to its conflict of law principles.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">13. Contact Information</h2>
            <p>For any legal inquiries or support regarding these terms, please contact us via the Feedback section or at legal@adai.com.</p>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button onClick={handleAccept} className="flex-1 py-4 text-lg rounded-2xl">
            I Accept the Terms & Services
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1 py-4 text-lg rounded-2xl border-white/10 text-gray-400">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
