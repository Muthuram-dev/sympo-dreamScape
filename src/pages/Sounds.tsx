import React, { useRef, useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sounds() {
  const soundCategories = [
    {
      name: 'Nature',
      sounds: [{ name: 'Rain', src: '/audio/rain.mp3' }],
    },
    {
      name: 'Ambient',
      sounds: [{ name: 'White Noise', src: '/audio/white-noise.mp3' }],
    },
    {
      name: 'Musical',
      sounds: [{ name: 'Soft Piano', src: '/audio/soft-piano.mp3' }],
    },
  ];

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({});
  const [mutedCategories, setMutedCategories] = useState<{ [key: string]: boolean }>({});
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});

  const handleVolumeChange = (sound: string, value: number) => {
    setVolumes((prev) => ({ ...prev, [sound]: value }));
    const audio = audioRefs.current[sound];
    if (audio) {
      audio.volume = value / 100;
    }
  };

  const toggleMuteCategory = (category: string) => {
    const isMuted = !mutedCategories[category];
    setMutedCategories((prev) => ({ ...prev, [category]: isMuted }));

    soundCategories
      .find((cat) => cat.name === category)
      ?.sounds.forEach((sound) => {
        const audio = audioRefs.current[sound.name];
        if (audio) {
          audio.volume = isMuted ? 0 : (volumes[sound.name] || 50) / 100;
        }
      });
  };

  const togglePlayPause = (soundName: string) => {
    const audio = audioRefs.current[soundName];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlayingStates((prev) => ({ ...prev, [soundName]: true }));
      } else {
        audio.pause();
        setPlayingStates((prev) => ({ ...prev, [soundName]: false }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#2C2E4A] text-[#F1EAFE]">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-[#D6D3F0] hover:text-[#E09EFF] mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sound Library</h1>

          {soundCategories.map((category) => (
            <div key={category.name} className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <button
                  onClick={() => toggleMuteCategory(category.name)}
                  className="text-[#E09EFF] hover:text-[#F1EAFE] transition"
                >
                  {mutedCategories[category.name] ? (
                    <VolumeX size={24} />
                  ) : (
                    <Volume2 size={24} />
                  )}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.sounds.map((sound) => (
                  <div
                    key={sound.name}
                    className="bg-[#3F3B6C]/50 rounded-xl p-6 hover:bg-[#3F3B6C] transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">{sound.name}</h3>
                      <button
                        onClick={() => togglePlayPause(sound.name)}
                        className="bg-[#E09EFF] text-[#2C2E4A] p-2 rounded-full hover:scale-105 transition"
                      >
                        {playingStates[sound.name] ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </button>
                      <audio
                        src={sound.src}
                        ref={(el) => (audioRefs.current[sound.name] = el)}
                        className="hidden"
                        onEnded={() =>
                          setPlayingStates((prev) => ({ ...prev, [sound.name]: false }))
                        }
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={
                        mutedCategories[category.name]
                          ? 0
                          : volumes[sound.name] || 50
                      }
                      onChange={(e) =>
                        handleVolumeChange(sound.name, parseInt(e.target.value))
                      }
                      className="w-full accent-[#E09EFF]"
                      disabled={mutedCategories[category.name]}
                    />
                    <p className="text-sm mt-2 text-right opacity-70">
                      Volume:{' '}
                      {mutedCategories[category.name]
                        ? 0
                        : volumes[sound.name] || 50}
                      %
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sounds;
