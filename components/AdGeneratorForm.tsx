
import React, { useState } from 'react';
import { AdRequest, Platform } from '../types';
import { PLATFORMS, TONE_EXAMPLES } from '../constants';
import { Button } from './Button';

interface AdGeneratorFormProps {
  onSubmit: (data: AdRequest) => void;
  isLoading: boolean;
}

export const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<AdRequest>({
    productName: '',
    description: '',
    audience: '',
    tone: '',
    cta: 'Learn More',
    budget: '',
    platforms: [Platform.INSTAGRAM],
    variations: 3,
  });

  const togglePlatform = (p: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p) 
        ? prev.platforms.filter(item => item !== p)
        : [...prev.platforms, p]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass p-8 rounded-2xl max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Product or Service Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Luminara Smart Lamp"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            value={formData.productName}
            onChange={e => setFormData({ ...formData, productName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">What are you selling?</label>
          <textarea
            required
            rows={3}
            placeholder="Describe the key features and benefits..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern homeowners 25-45"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              value={formData.audience}
              onChange={e => setFormData({ ...formData, audience: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Call to Action</label>
            <input
              type="text"
              required
              placeholder="e.g. Shop Now, Join Today"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              value={formData.cta}
              onChange={e => setFormData({ ...formData, cta: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Tone or Vibe</label>
          <input
            type="text"
            required
            placeholder="Describe the personality..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all mb-2"
            value={formData.tone}
            onChange={e => setFormData({ ...formData, tone: e.target.value })}
          />
          <div className="flex flex-wrap gap-2">
            {TONE_EXAMPLES.map(ex => (
              <button
                key={ex}
                type="button"
                onClick={() => setFormData({ ...formData, tone: ex })}
                className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-4">Select Platforms</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PLATFORMS.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => togglePlatform(p)}
                className={`py-3 px-4 rounded-xl border text-sm transition-all flex items-center gap-2 ${
                  formData.platforms.includes(p)
                    ? "bg-violet-600/20 border-violet-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                <i className={`fab fa-${p.toLowerCase().replace(/\s/g, '')}`}></i>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Monthly Budget</label>
            <input
              type="text"
              placeholder="e.g. $500 - $1000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Variations</label>
            <input
              type="number"
              min={1}
              max={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              value={formData.variations}
              onChange={e => setFormData({ ...formData, variations: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>
      </div>

      <Button type="submit" loading={isLoading} className="w-full text-lg py-4">
        Generate My Ads <i className="fas fa-sparkles ml-1"></i>
      </Button>
    </form>
  );
};
