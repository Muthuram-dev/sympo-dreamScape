import React, { useEffect, useRef } from 'react';
import { Moon, Wind, BookOpen, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const starsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsContainerRef.current) return;

    // Clear existing stars
    starsContainerRef.current.innerHTML = '';

    // Create stars
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random animation properties
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 2;
      const baseOpacity = 0.3 + Math.random() * 0.7;
      
      star.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --base-opacity: ${baseOpacity};
      `;
      
      starsContainerRef.current.appendChild(star);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C2E4A] via-[#3F3B6C] to-[#2C2E4A]"></div>

      {/* Stars */}
      <div ref={starsContainerRef} className="stars-container"></div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="clouds-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`cloud cloud-${i + 1}`}
              style={{
                '--delay': `${i * 5}s`,
                '--duration': `${20 + i * 2}s`,
                '--scale': `${0.5 + Math.random() * 0.5}`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>

      {/* Mountains and Hills */}
      <div className="absolute inset-0 z-10">
        {/* Distant Mountains */}
        <div className="mountain mountain-back"></div>
        <div className="mountain mountain-mid"></div>
        
        {/* Rolling Hills */}
        <div className="hill hill-1"></div>
        <div className="hill hill-2"></div>
        <div className="hill hill-3"></div>

        {/* Foreground Elements */}
        <div className="absolute bottom-0 w-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="grass-blade"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#F1EAFE]">
            Unwind Your Mind
          </h1>
          <p className="text-xl md:text-2xl text-[#D6D3F0] mb-12">
            Discover a peaceful sanctuary where tranquil sounds and guided meditation help you find your perfect state of relaxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/relax')}
              className="px-8 py-4 bg-[#5D50C6] hover:bg-[#E09EFF] text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              <Play size={20} />
              Start Relaxing
            </button>
            <button 
              onClick={() => navigate('/sounds')}
              className="px-8 py-4 bg-[#D6D3F0]/20 hover:bg-[#D6D3F0]/30 text-[#F1EAFE] rounded-full font-semibold flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
            >
              Explore Sounds
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-20 bg-[#2C2E4A]/80 backdrop-blur-xl py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Guided Breathing */}
            <div className="bg-[#3F3B6C]/50 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg border border-[#D6D3F0]/20">
              <div className="bg-[#5D50C6] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Wind className="text-[#F1EAFE]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#F1EAFE]">Guided Breathing</h3>
              <p className="text-[#D6D3F0]">
                Follow gentle breathing exercises designed to reduce stress and increase mindfulness.
              </p>
            </div>

            {/* Sleep Sound Playlist */}
            <div className="bg-[#3F3B6C]/50 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg border border-[#D6D3F0]/20">
              <div className="bg-[#5D50C6] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Moon className="text-[#F1EAFE]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#F1EAFE]">Sleep Sound Playlist</h3>
              <p className="text-[#D6D3F0]">
                Curated collection of soothing sounds and melodies to help you drift into peaceful sleep.
              </p>
            </div>

            {/* Nighttime Journal */}
            <div className="bg-[#3F3B6C]/50 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg border border-[#D6D3F0]/20">
              <div className="bg-[#5D50C6] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <BookOpen className="text-[#F1EAFE]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#F1EAFE]">Nighttime Journal</h3>
              <p className="text-[#D6D3F0]">
                Document your thoughts and feelings in a private, calming digital space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;