import { useRef, useState, type ChangeEvent } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

const media = {
  cover: '/cover.png',
  background: '/background.jpg',
  couple: '/couple.jpg',
  song: '/song.mp3',
};

const lyrics = [
  'يا غايتي ومناي بين المخاليق',
  'قلبي لغيرك بالهوى ماتنقّى',
  'يلوح لي في لذة النوم وأفيق',
  'قلبي لغيرك بالهوى ماتنقّى',
  'يلوح لي في لذة النوم وأفيق',
  'شريان قلبي من غرامك تسقّى',
  'والظلم حت غصون قلبٍ مواريق',
];

const songTitle = 'يا غايتي ومناي بين المخاليق';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play();
      setIsPlaying(true);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const seekAudio = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
    setProgress(Number(event.target.value));
  };

  return (
    <main className="wedding-page" dir="rtl">
      <div className="bg-layer" />
      <div className="bg-overlay" />

      {/* Cover screen — first thing visitors see */}
      <section
        className={`cover-screen ${isOpened ? 'cover-screen--opened' : ''}`}
        aria-hidden={isOpened}
      >
        <button
          className="cover-button"
          onClick={() => setIsOpened(true)}
          aria-label="فتح الدعوة"
        >
          <img src={media.cover} alt="غلاف الدعوة" />
          <span className="cover-hint">اضغط للفتح</span>
        </button>
      </section>

      {/* Main content */}
      <div className={`invitation-content ${isOpened ? 'invitation-content--visible' : ''}`}>
        {/* Calligraphy header */}
        <header className="calligraphy-section">
          <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <div className="ornament-divider" aria-hidden="true"><span>✦</span></div>
          <h1 className="amp-sign">A &amp; M</h1>
          <p className="amp-label">عُقْدُ القُرْآن</p>
          <p className="wedding-date">1 / 10 / 2026</p>
        </header>

        {/* Couple photo */}
        <section className="couple-section" aria-label="صورة العروسين">
          <div className="couple-frame">
            <div className="couple-frame__inner">
              <img src={media.couple} alt="صورة العروسين" />
            </div>
          </div>
        </section>

        {/* Lyrics */}
        <section className="lyrics-section" aria-label="كلمات المقطع">
          <div className="lyrics-card">
            <div className="lyrics">
              {lyrics.map((line, index) => (
                <p key={`${index}-${line}`}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Audio player — white theme, rounded */}
        <section className="player-section" aria-label="المقطع الصوتي">
          <div className="audio-player">
            <button
              className="play-button"
              onClick={toggleAudio}
              aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <div className="player-info">
              <div className="player-title">
                <Volume2 size={14} />
                <span>{songTitle}</span>
              </div>
              <input
                className="progress-bar"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={seekAudio}
                aria-label="تقدم المقطع"
              />
            </div>
            <span className="music-note">♪</span>
            <audio
              ref={audioRef}
              onTimeUpdate={updateProgress}
              onEnded={() => setIsPlaying(false)}
              src={media.song}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
