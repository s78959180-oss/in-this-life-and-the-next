import { useRef, useState, type ChangeEvent } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

const photos = {
  couple: "/photo_2026-09-25_18-43-27%20copy.jpg",
  envelope: "/photo_2026-09-25_18-43-12%20copy.jpg",
  texture: "/photo_2026-09-25_18-42-59.jpg",
};

const lyrics = [
  'ريحتك يا ورد فاحت',
  'نظرة العين استراحت',
  'في هوى بدر التمام',
  'ابتدأ أحلى غرام',
  '',
  'فز قلبي يهلي',
  'من نظرها ما يملي',
  'فز قلبي يهلي',
  'من نظرها ما يملي',
  '',
  'بعد ما كانت غريبة',
  'أصبحت مني قريبة',
  'بعد ما كانت غريبة',
  'أصبحت مني قريبة',
];

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
      <div className="ambient-glow" />
      <section className={`invitation-cover ${isOpened ? 'invitation-cover--opened' : ''}`} aria-hidden={isOpened}>
        <button className="envelope-button" onClick={() => setIsOpened(true)} aria-label="فتح الدعوة">
          <img src={photos.envelope} alt="ظرف الدعوة البنفسجي" />
        </button>
      </section>

      <div className={`invitation-content ${isOpened ? 'invitation-content--visible' : ''}`}>
        <header className="hero-section">
          <div className="gold-line" />
          <h1>ليلة من العمر</h1>
          <p className="hero-script">بفرحنا تكتمل الحكاية</p>
          <div className="ornament-divider" aria-hidden="true"><span>✦</span></div>
          <p className="date-label">26 / 09 / 2026</p>
          <div className="hero-image-frame">
            <img className="couple-photo" src={photos.couple} alt="صورة رومانسية للعروسين" />
          </div>
        </header>

        <section className="lyrics-section" aria-label="كلمات الأغنية">
          <div className="lyrics-card">
            <div className="lyrics">
              {lyrics.map((line, index) => line ? <p key={`${line}-${index}`}>{line}</p> : <div className="lyrics-space" key={`space-${index}`} />)}
            </div>
            <div className="music-player">
              <button className="play-button" onClick={toggleAudio} aria-label={isPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}>
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <div className="player-details">
                <div className="player-title"><Volume2 size={15} /> لحن الغرام</div>
                <input className="progress-bar" type="range" min="0" max="100" value={progress} onChange={seekAudio} aria-label="تقدم الأغنية" />
              </div>
              <span className="music-note">♪</span>
              <audio ref={audioRef} onTimeUpdate={updateProgress} onEnded={() => setIsPlaying(false)} src="https://github.com/s78959180-oss/sound/raw/main/videoplayback%20(1)_%5Bcut_61sec%5D.mp3" />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default App;
