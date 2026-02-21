
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AdRequest, GeneratedAd, AdType, Platform, ImageSize, AspectRatio } from './types';
import { APP_NAME, TAGLINE, PLATFORMS } from './constants';
import { AdGeneratorForm } from './components/AdGeneratorForm';
import { Button } from './components/Button';
import { ApiKeyDialog } from './components/ApiKeyDialog';
import { 
  generateTextAds, 
  generateImageAd, 
  generateVideoAd, 
  editImage 
} from './services/gemini';
import { TermsPage } from './TermsPage';
import { PrivacyPage } from './PrivacyPage';
import { ContactPage } from './ContactPage';

// --- Sub-component: EntryAnimation ---
const EntryAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isSkippable, setIsSkippable] = useState(false);
  
  useEffect(() => {
    const skipTimer = setTimeout(() => setIsSkippable(true), 1500);
    const endTimer = setTimeout(onComplete, 4500);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden animate-entry-fade-out">
      {/* Background Abstract Swiping Ads */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[10%] w-64 h-80 glass rounded-3xl opacity-0 animate-entry-swipe blur-sm delay-100"></div>
        <div className="absolute right-[15%] w-72 h-96 glass rounded-3xl opacity-0 animate-entry-swipe blur-md delay-500"></div>
        <div className="absolute left-[40%] w-48 h-64 glass rounded-3xl opacity-0 animate-entry-swipe blur-sm delay-300"></div>
        <div className="absolute right-[5%] w-64 h-80 glass rounded-3xl opacity-0 animate-entry-swipe blur-lg delay-700"></div>
      </div>

      {/* Centered Messaging */}
      <div className="relative z-10 text-center space-y-4 px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter animate-fade-up animate-text-pulse">
          Ads, made <span className="gradient-text">instantly.</span>
        </h1>
        <p className="text-gray-500 font-light text-lg animate-fade-up delay-200">
          Intelligence powered creative tools.
        </p>
      </div>

      {/* Skip Button */}
      {isSkippable && (
        <button 
          onClick={onComplete}
          className="absolute bottom-10 right-10 text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 hover:text-white transition-colors animate-fade-up"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
};

// --- Sub-component: HeroAdPreview ---
const HeroAdPreview: React.FC = () => {
  const [currentType, setCurrentType] = useState<number>(0); // 0: Text, 1: Image, 2: Video
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentType((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto h-80 flex items-center justify-center animate-fade-up delay-500">
      <div className="absolute inset-0 bg-violet-600/10 blur-[100px] rounded-full"></div>
      
      <div className="glass w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 border-white/10">
        <div className="p-3 border-b border-white/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <i className="fas fa-sparkles text-violet-400"></i>
            {currentType === 0 ? 'Text Ad' : currentType === 1 ? 'Image Ad' : 'Video Ad'}
          </div>
        </div>

        <div className="h-64 relative overflow-hidden transition-all duration-500">
          {currentType === 0 && (
            <div className="p-6 space-y-3 animate-fade-up">
              <div className="h-4 w-3/4 bg-white/10 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-2/3 bg-white/5 rounded"></div>
              </div>
              <div className="pt-4">
                <div className="h-8 w-24 bg-violet-600/20 border border-violet-500/30 rounded-lg"></div>
              </div>
            </div>
          )}

          {currentType === 1 && (
            <div className="h-full w-full bg-black/40 flex items-center justify-center animate-fade-up">
              <div className="relative group">
                <div className="w-48 h-48 rounded-xl bg-gradient-to-tr from-violet-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
                   <i className="fas fa-image text-4xl text-white/20"></i>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md"></div>
              </div>
            </div>
          )}

          {currentType === 2 && (
            <div className="h-full w-full flex flex-col items-center justify-center animate-fade-up bg-black">
              <div className="w-full aspect-video bg-white/5 flex items-center justify-center relative">
                <i className="fas fa-play text-white/40 text-3xl"></i>
                <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                   <div className="h-1 flex-1 bg-violet-500 rounded-full"></div>
                   <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                   <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <div className="p-4 w-full space-y-2">
                <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                <div className="h-2 w-1/3 bg-white/5 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="hero-glow"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] animate-fade-up">
              Ads. Done.<br />
              <span className="gradient-text">Instantly.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-xl mx-auto lg:mx-0 animate-fade-up delay-100 leading-relaxed">
              Create high-quality ads with AI — text, images, and video — in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 animate-fade-up delay-200">
              <Link to="/create">
                <Button className="py-5 px-10 text-lg rounded-2xl shadow-xl">Get Started Free</Button>
              </Link>
              <Button variant="outline" className="py-5 px-10 text-lg rounded-2xl border-white/10">See how it works</Button>
            </div>
          </div>
          
          <div className="relative">
            <HeroAdPreview />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl font-bold mb-4">Speed is our superpower</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Go from product concept to platform-ready ad creative in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", icon: "fas fa-comment-dots", title: "Describe product", desc: "Just tell us what you're selling and who it's for." },
              { step: "02", icon: "fas fa-layer-group", title: "Choose platform", desc: "Select from Instagram, TikTok, LinkedIn, and more." },
              { step: "03", icon: "fas fa-bolt", title: "Get instant ads", desc: "Download high-converting text, images, and video." }
            ].map((step, idx) => (
              <div key={idx} className={`reveal delay-${(idx + 1) * 100} space-y-6 group`}>
                <div className="flex items-end justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                    <i className={`${step.icon} text-2xl`}></i>
                  </div>
                  <span className="text-4xl font-black text-white/5 group-hover:text-violet-600/10 transition-colors">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500 mb-12 reveal">Optimized for every screen</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
            {PLATFORMS.map((p, idx) => (
              <div key={p} className={`reveal delay-${idx * 100} group flex flex-col items-center gap-3`}>
                <i className={`fab fa-${p.toLowerCase().replace(/\s/g, '')} text-4xl group-hover:text-violet-400 transition-colors`}></i>
                <span className="text-[10px] font-bold uppercase tracking-widest">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10 reveal">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to launch?</h2>
          <p className="text-xl text-gray-400 font-light">Join thousands of creators making world-class ads in seconds.</p>
          <div className="flex justify-center">
            <Link to="/create">
              <Button className="py-5 px-12 text-lg rounded-2xl">Start Creating Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Create Component ---
const CreateAd: React.FC<{ onAdsGenerated: (ads: GeneratedAd[]) => void }> = ({ onAdsGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (data: AdRequest) => {
    // @ts-ignore
    const hasKey = await window.aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      setShowKeyDialog(true);
      return;
    }

    setLoading(true);
    try {
      const results: GeneratedAd[] = [];

      // 1. Text Ads
      const { ads, groundingUrls } = await generateTextAds(data);
      ads.forEach((ad: any, i: number) => {
        results.push({
          id: `text-${Date.now()}-${i}`,
          type: AdType.TEXT,
          platform: ad.platform as Platform,
          content: JSON.stringify(ad),
          metadata: { groundingUrls },
          createdAt: Date.now()
        });
      });

      // 2. Image Ads
      const imageUrl = await generateImageAd(data, '1K', '1:1');
      results.push({
        id: `img-${Date.now()}`,
        type: AdType.IMAGE,
        platform: data.platforms[0],
        content: imageUrl,
        createdAt: Date.now()
      });

      // 3. Video Ad
      const videoUrl = await generateVideoAd(data, '16:9');
      results.push({
        id: `vid-${Date.now()}`,
        type: AdType.VIDEO,
        platform: Platform.YOUTUBE,
        content: videoUrl,
        createdAt: Date.now()
      });

      onAdsGenerated(results);
      navigate('/gallery');
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("Requested entity was not found")) {
        setShowKeyDialog(true);
      } else {
        alert("Something went wrong during generation. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-black/40">
      {showKeyDialog && <ApiKeyDialog onClose={() => setShowKeyDialog(false)} />}
      <div className="max-w-4xl mx-auto mb-12 text-center reveal">
        <h2 className="text-4xl font-bold mb-4">New Campaign</h2>
        <p className="text-gray-400">Tell us about your product and let AdAI handle the magic.</p>
      </div>
      <div className="reveal delay-100">
        <AdGeneratorForm onSubmit={handleGenerate} isLoading={loading} />
      </div>
      
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
          <div className="text-center space-y-8 max-w-md">
            <div className="inline-block relative">
              <div className="w-24 h-24 border-2 border-white/5 border-t-violet-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-sparkles text-2xl text-violet-500 animate-pulse"></i>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">Crafting your ads...</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We're using deep reasoning and real-time trends to generate high-converting creative just for you.</p>
            </div>
            <div className="flex flex-col gap-2 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
               <span className="animate-pulse">Analyzing Product Logic</span>
               <span className="animate-pulse delay-75">Fetching Search Data</span>
               <span className="animate-pulse delay-150">Synthesizing Visuals</span>
               <span className="animate-pulse delay-300">Rendering 1080p Video</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Gallery Component ---
const Gallery: React.FC<{ ads: GeneratedAd[], onEdit: (id: string, newContent: string) => void }> = ({ ads, onEdit }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageEdit = async (ad: GeneratedAd) => {
    setIsEditing(true);
    try {
      const newUrl = await editImage(ad.content, editPrompt);
      onEdit(ad.id, newUrl);
      setEditingId(null);
      setEditPrompt('');
    } catch (err) {
      alert("Failed to edit image.");
    } finally {
      setIsEditing(false);
    }
  };

  if (ads.length === 0) {
    return (
      <div className="py-48 text-center flex flex-col items-center justify-center animate-fade-up">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5">
          <i className="fas fa-box-open text-4xl text-gray-700"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-500 mb-4">Your gallery is empty</h2>
        <p className="text-gray-600 mb-10 max-w-sm">Ready to create something amazing? Start your first campaign today.</p>
        <Link to="/create">
          <Button className="rounded-2xl py-4 px-8">New Campaign</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
        <div>
          <h2 className="text-5xl font-bold mb-4">Creative Archive</h2>
          <p className="text-gray-500">Managing {ads.length} generated ad assets</p>
        </div>
        <Link to="/create">
          <Button variant="outline" className="rounded-xl px-6">Generate More</Button>
        </Link>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ads.map((ad, idx) => (
          <div key={ad.id} className={`glass rounded-3xl overflow-hidden group flex flex-col reveal delay-${(idx % 3) * 100}`}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <span className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
                <i className={`fab fa-${ad.platform.toLowerCase().replace(/\s/g, '')} text-sm`}></i>
                {ad.platform}
              </span>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                 <span className="text-[10px] font-bold text-gray-600">{new Date(ad.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex-1">
              {ad.type === AdType.IMAGE && (
                <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">
                  <img src={ad.content} alt="Ad Visual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 backdrop-blur-sm">
                    <Button variant="secondary" className="rounded-xl shadow-2xl" onClick={() => setEditingId(ad.id)}>
                      <i className="fas fa-wand-magic-sparkles"></i> AI Refine
                    </Button>
                  </div>
                </div>
              )}

              {ad.type === AdType.VIDEO && (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <video src={ad.content} controls className="w-full h-full object-cover" />
                </div>
              )}

              {ad.type === AdType.TEXT && (
                <div className="p-8 space-y-5">
                  {(() => {
                    const data = JSON.parse(ad.content);
                    return (
                      <>
                        <h4 className="text-xl font-bold text-white tracking-tight">{data.headline}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">{data.body}</p>
                        <div className="pt-4">
                          <span className="text-xs font-black uppercase tracking-widest bg-violet-600 text-white px-5 py-2.5 rounded-xl inline-block shadow-lg shadow-violet-600/20">{data.cta}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {ad.metadata?.groundingUrls && ad.metadata.groundingUrls.length > 0 && (
              <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-3 font-black">Contextually Grounded</p>
                <div className="flex flex-wrap gap-2">
                  {ad.metadata.groundingUrls.slice(0, 3).map((link, i) => (
                    <a 
                      key={i} 
                      href={link.uri} 
                      target="_blank" 
                      className="text-[10px] text-gray-500 hover:text-violet-400 transition-colors flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md"
                    >
                      <i className="fas fa-link text-[8px]"></i>
                      <span className="truncate max-w-[80px]">{link.title || "Source"}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-5 flex gap-3 bg-white/[0.01]">
              <Button variant="outline" className="flex-1 rounded-xl py-3 text-xs uppercase tracking-widest font-black">Download Asset</Button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-gray-500 transition-colors">
                <i className="fas fa-ellipsis"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[150] flex items-center justify-center p-6">
          <div className="glass max-w-lg w-full p-10 rounded-[2rem] space-y-8 shadow-2xl border-white/10">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">AI Refinement</h3>
              <p className="text-gray-500 text-sm">Describe the adjustment. Our vision model will interpret your request and modify the asset.</p>
            </div>
            <textarea
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none text-gray-200"
              placeholder="e.g. 'Make it look more cinematic with warm lighting' or 'Add a city skyline in the background'..."
              value={editPrompt}
              onChange={e => setEditPrompt(e.target.value)}
            />
            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => setEditingId(null)} className="flex-1 rounded-2xl py-4">Cancel</Button>
              <Button 
                onClick={() => handleImageEdit(ads.find(a => a.id === editingId)!)} 
                loading={isEditing} 
                disabled={!editPrompt.trim()}
                className="flex-1 rounded-2xl py-4"
              >
                Refine Creative
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Entry ---
const App: React.FC = () => {
  const [savedAds, setSavedAds] = useState<GeneratedAd[]>([]);
  const [showEntryAnimation, setShowEntryAnimation] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>({ email: 'user@example.com' }); // Mocked logged-in user

  // Use session storage to ensure animation only plays once per session
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('adai_entry_played');
    const isRoot = window.location.hash === '' || window.location.hash === '#/';
    
    // Condition: first visit or refresh on home
    if (!hasPlayed && isRoot) {
      setShowEntryAnimation(true);
    }
  }, []);

  const handleEntryComplete = () => {
    setShowEntryAnimation(false);
    sessionStorage.setItem('adai_entry_played', 'true');
  };

  const handleAdsGenerated = (newAds: GeneratedAd[]) => {
    setSavedAds(prev => [...newAds, ...prev]);
  };

  const handleEditAd = (id: string, newContent: string) => {
    setSavedAds(prev => prev.map(ad => ad.id === id ? { ...ad, content: newContent } : ad));
  };

  const handleLogoutSim = () => {
    sessionStorage.removeItem('adai_entry_played');
    setUser(null);
    window.location.hash = '#/';
    window.location.reload();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-violet-500/30">
        {showEntryAnimation && <EntryAnimation onComplete={handleEntryComplete} />}
        
        <nav className="border-b border-white/5 sticky top-0 bg-black/60 backdrop-blur-2xl z-[100]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <i className="fas fa-bolt text-white text-xl"></i>
              </div>
              <span className="text-2xl font-black tracking-tighter">AdAI</span>
            </Link>
            <div className="flex items-center gap-6 md:gap-10">
              <Link to="/gallery" className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Gallery</Link>
              <Link to="/create">
                <Button className="rounded-xl px-4 md:px-6 py-2 shadow-lg shadow-violet-600/10 text-xs md:text-sm">New Campaign</Button>
              </Link>
              {user && (
                <button onClick={handleLogoutSim} className="text-gray-700 hover:text-red-400 transition-colors">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateAd onAdsGenerated={handleAdsGenerated} />} />
            <Route path="/gallery" element={<Gallery ads={savedAds} onEdit={handleEditAd} />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={user ? <ContactPage userEmail={user.email} /> : <Dashboard />} />
          </Routes>
        </main>

        <footer className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-6 h-6 gradient-bg rounded-md flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-[10px]"></i>
                </div>
                <span className="text-lg font-black tracking-tighter uppercase">AdAI</span>
              </div>
              <p className="text-gray-600 text-sm">{TAGLINE}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-widest text-gray-600">
               <Link to="/privacy" className="hover:text-violet-400 transition-colors">Privacy</Link>
               <Link to="/terms" className="hover:text-violet-400 transition-colors">Terms</Link>
               <Link to="/contact" className="hover:text-violet-400 transition-colors">Contact</Link>
            </div>

            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} AdAI AI Technologies</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
