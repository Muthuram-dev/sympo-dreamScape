import React, { useRef, useState } from 'react';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

function Relax() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#2C2E4A] text-[#F1EAFE]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-[#D6D3F0] hover:text-[#E09EFF] mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Guided Meditation</h1>

          <div className="bg-[#3F3B6C] rounded-2xl p-8 mb-8">
            <div className="aspect-video bg-[#2C2E4A] rounded-lg mb-6 relative overflow-hidden">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg"
                src="/video/evening-calm.mp4" // <- Place your video here
              />
              <button 
                onClick={togglePlay}
                className="absolute bottom-4 left-4 w-16 h-16 bg-[#5D50C6] hover:bg-[#E09EFF] rounded-full flex items-center justify-center transition-all"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Evening Calm</h2>
            <p className="text-[#D6D3F0] mb-6">
              A 10-minute guided meditation to help you unwind and prepare for restful sleep.
            </p>

            <div className="w-full bg-[#2C2E4A] rounded-full h-2">
              <div className="bg-[#E09EFF] h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {['Morning Light', 'Afternoon Reset', 'Deep Focus', 'Bedtime Wind-down'].map((session) => (
              <div key={session} className="bg-[#3F3B6C]/50 rounded-xl p-6 hover:bg-[#3F3B6C] transition-all cursor-pointer">
                <h3 className="font-semibold mb-2">{session}</h3>
                <p className="text-[#D6D3F0] text-sm">15 minutes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relax;
