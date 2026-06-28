import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Gift, Phone, Copy, BookOpen, Home, Users, Image, MessageSquare, CheckCircle } from 'lucide-react';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';
import MusicPlayer from './components/MusicPlayer';
import ScrollReveal from './components/ScrollReveal';
import TypingText from './components/TypingText';
import ParticleBackground from './components/ParticleBackground';
import PhotoGallery from './components/PhotoGallery';
import ThreadDivider from './components/ThreadDivider';
import PageBorder from './components/PageBorder';
import JooxPlayer from './components/JooxPlayer';

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Initialize and manage global audio lifecycle
  useEffect(() => {
    const audio = new Audio('./lagu1.MP3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audioRef.current = null;
    };
  }, []);

  // Sync isPlaying React state to native Audio element
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Audio playback blocked by browser user interaction rules:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const [guestName] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        return decodeURIComponent(to);
      }
    }
    return 'Sahabat & Kerabat';
  });
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [toast, setToast] = useState(null);

  // Bank accounts config
  const accounts = [
    { id: 'bca', bankName: 'BCA', number: '7245776349', holder: 'Annisa Rahmadani' },
    { id: 'bca', bankName: 'BCA', number: '7245077505', holder: 'Dicky Asa Dewa Pitaloeka' }
  ];

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    // Smooth scroll to top of details
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCopy = (number, bankId) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedAccount(bankId);
      setToast('Nomor rekening berhasil disalin! 📋✨');

      // Auto hide alerts after 2.5 seconds
      setTimeout(() => {
        setToast(null);
        setCopiedAccount(null);
      }, 2500);
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const googleMapsUrl = 'https://maps.google.com/?q=Hotel+Fortune+Convention+Kendari';
  const whatsappConfirmUrl = 'https://wa.me/6282229344852?text=Halo%20Ica%20%26%20Dicky,%20saya%20ingin%20mengonfirmasi%20pengiriman%20kado...';

  // Cover Overlay Screen
  if (!isOpen) {
    return (
      <div style={styles.coverOverlay} className="animate-fade-in">
        <ParticleBackground />
        <PageBorder />
        <div style={styles.coverCard}>
          <div style={styles.coverTagline} className="font-playful animate-float">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <span style={{ display: 'inline-block', textAlign: 'center' }}>
                <TypingText
                  text={"  THESE KIDS\nARE GETTING\nMARRIED"}
                  speed={80}
                  delay={600}
                />
              </span>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
            </span>
          </div>

          <div style={styles.coverIllustration}>
            <img
              src="./extracted_images/profil1.png"
              alt="Dicky and Ica Childhood Illustration"
              style={styles.coupleImage}
            />
          </div>

          <h1 style={styles.coverNames} className="font-serif">Dicky <span>&</span> Ica</h1>
          <p style={styles.coverDate} className="font-playful">04.07.26</p>

          <div style={styles.guestBox}>
            <p style={styles.guestLabel}>Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            <h2 style={styles.guestName} className="font-playful">{guestName}</h2>
          </div>

          <button onClick={handleOpenInvitation} className="btn-primary btn-pulse">
            <BookOpen size={20} /> Open Invitation
          </button>
        </div>
      </div>
    );
  }

  // Main Page Content
  return (
    <>
      {/* Background canvas particles */}
      <ParticleBackground />

      {/* Page Border Overlay */}
      <PageBorder />

      {/* Floating/Fixed Desktop Top Nav Bar */}
      <div className="top-nav">
        <button onClick={() => scrollToSection('home')} className="top-nav-item">
          <Home size={18} />
          <span>Cover</span>
        </button>
        <button onClick={() => scrollToSection('couple')} className="top-nav-item">
          <Users size={18} />
          <span>Profil</span>
        </button>
        <button onClick={() => scrollToSection('event')} className="top-nav-item">
          <Calendar size={18} />
          <span>Acara</span>
        </button>
        <button onClick={() => scrollToSection('gallery')} className="top-nav-item">
          <Image size={18} />
          <span>Galeri</span>
        </button>
        <button onClick={() => scrollToSection('rsvp')} className="top-nav-item">
          <MessageSquare size={18} />
          <span>RSVP</span>
        </button>
        <button onClick={() => scrollToSection('gift')} className="top-nav-item">
          <Gift size={18} />
          <span>Gift</span>
        </button>
      </div>

      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <div className="app-container animate-fade-in" id="home">

      {/* Hero Section */}
      <section className="section">
        <div className="section-content">
          <ScrollReveal>
            <div className="font-playful save-date-header" style={styles.saveDateHeader}>
              <TypingText
                text={" SAVE\nTHE\nDATE!"}
                speed={120}
                delay={400}
                triggerOnScroll={true}
              />
            </div>

            {/* Hands Illustration decoration */}
            <div style={styles.handsContainer}>
              <img 
                src="./extracted_images/tangan.png" 
                alt="Save the Date Illustration" 
                style={styles.handsImage}
                className="animate-float"
              />
            </div>

            {/* Quran Verse */}
            <div style={styles.verseCard} className="card">
              <p style={styles.verseTranslation}>
                <TypingText
                  text={`“ Di antara tanda-tanda (kebesaran)-Nya ialah bahwa
Dia menciptakan pasangan-pasangan untukmu dari
(jenis) dirimu sendiri agar kamu cenderung dan
merasa tenteram kepadanya, dan Dia menjadikan di
antaramu rasa cinta dan kasih sayang. Sesungguhnya
pada yang demikian itu benar-benar terdapat tanda-
tanda (kebesaran Allah) bagi kaum yang berpikir.”`}
                  speed={38}
                  delay={400}
                  triggerOnScroll={true}
                />
              </p>
              <span style={styles.verseRef} className="font-playful">QS Ar-Rum: 21</span>
            </div>

            {/* JOOX-Style Music Player */}
            <JooxPlayer 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying} 
              currentTime={currentTime} 
              duration={duration} 
              onSeek={handleSeek} 
            />

            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Bride & Groom Section */}
      <section className="section" id="couple">
        <div className="section-content">
          <ScrollReveal>
            {/* Bismillah Calligraphy */}
            <div style={styles.bismillahContainer}>
              <img 
                src="./extracted_images/kaligrafi.png" 
                alt="Bismillah" 
                style={styles.bismillahImage}
              />
            </div>

            <p style={styles.introGreeting}>
              Assalamu'alaikum Warahmatullahi Wabarakatuh<br /><br />
              Dengan memohon rahmat dan ridho Allah SWT,<br></br>

kami bermaksud mengundang Bapak/Ibu/Saudara/i <br></br>
untuk menghadiri pernikahan kami
            </p>
            <h2 style={styles.sectionTitle} className="font-playful">Bride & Groom</h2>

            <div style={{ margin: '32px 0 40px 0', display: 'flex', justifyContent: 'center' }}>
              <div className="polaroid-wrapper animate-float" style={styles.polaroidWrapper}>
                {/* Wreath Emas SVG */}
                <svg className="polaroid-wreath" viewBox="0 0 100 100" style={styles.wreathSvg} xmlns="http://www.w3.org/2000/svg">
                  {/* Outer dotted gold ring */}
                  <circle cx="50" cy="50" r="46" stroke="var(--gold-primary)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" fill="none" />
                  {/* Inner gold ring */}
                  <circle cx="50" cy="50" r="43" stroke="var(--gold-primary)" strokeWidth="0.8" opacity="0.35" fill="none" />
                  {/* Curved botanical branches flanking left and right */}
                  <path d="M 50 93 C 26 93 7 74 7 50 C 7 26 26 7 50 7" stroke="var(--gold-primary)" strokeWidth="1.2" fill="none" opacity="0.65" strokeLinecap="round" />
                  <path d="M 50 93 C 74 93 93 74 93 50 C 93 26 74 7 50 7" stroke="var(--gold-primary)" strokeWidth="1.2" fill="none" opacity="0.65" strokeLinecap="round" />
                  {/* Leaf clusters along the paths */}
                  <path d="M 12 62 Q 8 60, 9 66 M 88 62 Q 92 60, 91 66" fill="none" stroke="var(--gold-primary)" strokeWidth="1.2" opacity="0.6" />
                  <path d="M 21 82 Q 18 78, 22 83 M 79 82 Q 82 78, 78 83" fill="none" stroke="var(--gold-primary)" strokeWidth="1.2" opacity="0.6" />
                  <path d="M 9 40 Q 5 42, 8 46 M 91 40 Q 95 42, 92 46" fill="none" stroke="var(--gold-primary)" strokeWidth="1.2" opacity="0.6" />
                  <path d="M 22 17 Q 19 21, 23 23 M 78 17 Q 81 21, 77 23" fill="none" stroke="var(--gold-primary)" strokeWidth="1.2" opacity="0.6" />
                  {/* Sparkling mini dots */}
                  <circle cx="50" cy="7" r="2.5" fill="var(--gold-primary)" opacity="0.8" />
                  <circle cx="50" cy="93" r="2.5" fill="var(--gold-primary)" opacity="0.8" />
                </svg>

                <div className="polaroid-frame" style={styles.polaroidContainer}>
                  <img
                    src="./extracted_images/foto-kecil.png"
                    alt="Ica & Dicky"
                    style={styles.polaroidImg}
                  />
                  <div className="caption">Ica & Dicky</div>
                </div>
              </div>
            </div>
            {/* Profiles in a 2-column grid on desktop */}
            <div className="grid-2">
              {/* Bride */}
              <div className="card profile-card" style={styles.profileCard}>
                {/* Gold Laurel Leaf Branches */}
                <svg className="profile-leaf-left" width="18" height="50" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 C10 32, 2 22, 2 12 M10 42 C10 28, 18 20, 18 10 M10 32 C6 22, 2 17, 2 7 M10 22 C12 12, 18 10, 18 3 M10 60 L10 0" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
                </svg>
                <svg className="profile-leaf-right" width="18" height="50" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 C10 32, 2 22, 2 12 M10 42 C10 28, 18 20, 18 10 M10 32 C6 22, 2 17, 2 7 M10 22 C12 12, 18 10, 18 3 M10 60 L10 0" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
                </svg>

                {/* Card Corner Borders inside */}
                <div className="profile-card-inner-border"></div>

                <h3 style={styles.profileName} className="font-playful">Annisa Rahmadani, S.Pd. (Ica)</h3>
                <p style={styles.parents}>
                  Putri dari<br />
                  <strong>Bapak Lahati</strong><br />
                  dan <strong>Almh. Ibu Suniyati</strong>
                </p>
                <a 
                  href="https://www.instagram.com/panggilsajaicaa/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="instagram-btn"
                >
                  <Instagram size={14} />
                  <span>@panggilsajaicaa</span>
                </a>
              </div>

              {/* Groom */}
              <div className="card profile-card" style={styles.profileCard}>
                {/* Gold Laurel Leaf Branches */}
                <svg className="profile-leaf-left" width="18" height="50" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 C10 32, 2 22, 2 12 M10 42 C10 28, 18 20, 18 10 M10 32 C6 22, 2 17, 2 7 M10 22 C12 12, 18 10, 18 3 M10 60 L10 0" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
                </svg>
                <svg className="profile-leaf-right" width="18" height="50" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 C10 32, 2 22, 2 12 M10 42 C10 28, 18 20, 18 10 M10 32 C6 22, 2 17, 2 7 M10 22 C12 12, 18 10, 18 3 M10 60 L10 0" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
                </svg>

                {/* Card Corner Borders inside */}
                <div className="profile-card-inner-border"></div>

                <h3 style={styles.profileName} className="font-playful">Dicky Asa Dewa Pitaloeka, S.Kom. (Dicky)</h3>
                <p style={styles.parents}>
                  Putra dari<br />
                  <strong>Bapak Pitono</strong><br />
                  dan <strong>Ibu Ludia Kabolo</strong>
                </p>
                <a 
                  href="https://www.instagram.com/dicky_pitaloeka/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="instagram-btn"
                >
                  <Instagram size={14} />
                  <span>@dicky_pitaloeka</span>
                </a>
              </div>
            </div>

            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="section" id="event">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Waktu & Tempat</h2>

            <div className="grid-2" style={{ alignItems: 'center' }}>
              {/* Custom Mini Calendar */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={styles.calendarWidget} className="card">
                  <div style={styles.calendarMonth} className="font-playful">JULI 2026</div>
                  <div style={styles.calendarGrid}>
                    <div style={styles.calDayName}>Min</div>
                    <div style={styles.calDayName}>Sen</div>
                    <div style={styles.calDayName}>Sel</div>
                    <div style={styles.calDayName}>Rab</div>
                    <div style={styles.calDayName}>Kam</div>
                    <div style={styles.calDayName}>Jum</div>
                    <div style={styles.calDayName}>Sab</div>

                    <div></div>
                    <div></div>
                    <div></div>
                    <div style={styles.calDay}>1</div>
                    <div style={styles.calDay}>2</div>
                    <div style={styles.calDay}>3</div>

                    <div style={styles.calDDay}>
                      <span className="font-playful">4</span>
                      <span style={styles.calDDayLabel}>D-day</span>
                    </div>

                    <div style={styles.calDay}>5</div>
                    <div style={styles.calDay}>6</div>
                    <div style={styles.calDay}>7</div>
                    <div style={styles.calDay}>8</div>
                    <div style={styles.calDay}>9</div>
                    <div style={styles.calDay}>10</div>
                    <div style={styles.calDay}>11</div>
                    <div style={styles.calDay}>12</div>
                  </div>
                </div>
              </div>

              {/* Event Cards */}
              <div style={{ width: '100%' }}>
                {/* Akad */}
                <div className="card event-card" style={styles.eventCard}>
                  {/* Wedding Venue Silhouette Watermark */}
                  <svg className="venue-silhouette" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 H80 M30 80 V45 Q50 25 70 45 V80 M50 25 V15 M45 15 H55 M50 10 V15" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                    <path d="M38 80 V55 H62 V80 M50 55 V80" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.25" />
                    <path d="M30 45 H70" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.2" />
                  </svg>

                  {/* Connecting Arrows pointing to Calendar */}
                  {/* Desktop arrow (floated left, points left) */}
                  <svg className="event-arrow desktop-arrow" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 12 Q25 5 12 25" stroke="var(--gold-primary)" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                    <path d="M18 25 L12 25 L14 19" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {/* Mobile arrow (floated top, points up) */}
                  <svg className="event-arrow mobile-arrow" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 42 Q30 22 15 8" stroke="var(--gold-primary)" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                    <path d="M10 14 L15 8 L21 10" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  {/* Inner gold frame and brackets */}
                  <div className="event-card-inner-border"></div>

                  <div style={styles.cardHeader}>
                    <Calendar size={20} color="#7A0C02" className="event-card-icon" />
                    <h3 style={styles.eventCardTitle} className="font-playful">Akad Nikah</h3>
                  </div>
                  <p style={styles.eventDetail}>
                    <strong>Sabtu, 4 Juli 2026</strong><br />
                    Pukul 10.00 WITA<br />
                    Hotel Fortune & Convention Kendari<br />
                    ( FORTUNE GRAND HALL )
                  </p>
                </div>

                {/* Resepsi */}
                <div className="card event-card" style={styles.eventCard}>
                  {/* Wedding Venue Silhouette Watermark */}
                  <svg className="venue-silhouette" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 H80 M30 80 V45 Q50 25 70 45 V80 M50 25 V15 M45 15 H55 M50 10 V15" stroke="var(--gold-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                    <path d="M38 80 V55 H62 V80 M50 55 V80" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.25" />
                    <path d="M30 45 H70" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.2" />
                  </svg>

                  {/* Connecting Arrows pointing to Calendar */}
                  {/* Desktop arrow (floated left, points left) */}
                  <svg className="event-arrow desktop-arrow" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 28 Q25 35 12 15" stroke="var(--gold-primary)" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                    <path d="M14 21 L12 15 L18 15" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  {/* Inner gold frame and brackets */}
                  <div className="event-card-inner-border"></div>

                  <div style={styles.cardHeader}>
                    <Calendar size={20} color="#7A0C02" className="event-card-icon" />
                    <h3 style={styles.eventCardTitle} className="font-playful">Resepsi</h3>
                  </div>
                  <p style={styles.eventDetail}>
                    <strong>Sabtu, 4 Juli 2026</strong><br />
                    Pukul 11.00 - 14.00 WITA<br />
                    Hotel Fortune & Convention Kendari<br />
                    ( FORTUNE GRAND HALL )<br />
                    <span style={styles.address}>Jl. Kedondong No. 889, Anduonohu, Kec. Poasia, Kota Kendari, Sulawesi Tenggara</span>
                  </p>
                </div>
              </div>
            </div>

            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '20px' }}>
              <MapPin size={18} /> Lihat Lokasi Maps
            </a>

            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section" id="gallery">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Galeri Foto</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-medium)', marginBottom: '32px', fontSize: '0.95rem', fontStyle: 'italic', marginTop: '-8px' }}>
              Momen-momen indah yang terabadikan dalam kisah cinta kami
            </p>
            <PhotoGallery />
            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="section">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Our Big Day Awaits</h2>
            <Countdown />
            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="section">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Love Story</h2>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-title">Awal Pertemuan</div>
                <div className="timeline-content">
                  Tidak ada yang benar-benar kebetulan di dunia ini. Setiap pertemuan telah diatur dengan indah, hanya menunggu waktu yang tepat untuk terjadi. Berawal dari sebuah perkenalan sederhana, tanpa banyak rencana atau harapan berlebihan, kami dipertemukan dalam cara yang tidak pernah kami duga sebelumnya.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-title">Perjalanan Bersama</div>
                <div className="timeline-content">
                  Seiring berjalannya waktu, kebersamaan kecil yang kami lalui perlahan tumbuh menjadi sesuatu yang lebih berarti. Dalam setiap cerita, tentu ada tawa, ada juga tantangan. Namun dari situlah kami belajar untuk saling memahami, menerima, dan melengkapi satu sama lain.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-title">Komitmen</div>
                <div className="timeline-content">
                  Hingga akhirnya kami menyadari bahwa perjalanan ini bukan lagi tentang dua orang yang berjalan sendiri, melainkan tentang dua hati yang memilih untuk melangkah bersama. Dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk mengikat janji suci dan memulai babak baru dalam kehidupan kami.
                </div>
              </div>
            </div>

            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="section" id="rsvp">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Ucapan & Kehadiran</h2>
            <RSVPForm defaultGuestName={guestName === 'Sahabat & Kerabat' ? '' : guestName} />
            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Wedding Gift Section */}
      <section className="section" id="gift">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Wedding Gift</h2>
            <p style={styles.giftDesc}>
              Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui rekening di bawah ini:
            </p>

            {/* Bank accounts in 2-column grid on desktop */}
            <div className="grid-2" style={{ marginBottom: '24px' }}>
              {accounts.map((acc) => (
                <div key={acc.id} className="card" style={styles.giftCard}>
                  <div style={styles.giftCardHeader}>
                    <Gift size={22} color="#7A0C02" />
                    <span style={styles.bankTag} className="font-playful">{acc.bankName}</span>
                  </div>
                  <p style={styles.giftNumber} className="font-playful">{acc.number}</p>
                  <p style={styles.giftHolder}>Atas nama: {acc.holder}</p>

                  <button
                    onClick={() => handleCopy(acc.number, acc.id)}
                    className="btn-secondary"
                    style={styles.copyBtn}
                  >
                    <Copy size={14} />
                    {copiedAccount === acc.id ? 'Tersalin!' : 'Salin Rekening'}
                  </button>
                </div>
              ))}
            </div>

            <p style={styles.giftPhysicalDesc}>
              Anda juga dapat mengirimkan hadiah fisik secara langsung dengan konfirmasi melalui WhatsApp di bawah ini:
            </p>

            <a href={whatsappConfirmUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Phone size={18} /> Nomor WhatsApp
            </a>

            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Section */}
      <section className="section">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.footerThanks} className="font-handwritten">See You!</h2>
            <h3 style={styles.footerNames} className="font-playful">Dicky + Ica</h3>
            <p style={styles.footerDate}>04.07.2026</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Toast Alert Popups */}
      {toast && (
        <div className="toast-notification toast-animation">
          <CheckCircle size={18} color="#FFFFFF" />
          <span>{toast}</span>
        </div>
      )}

    </div>

    {/* Floating IOS style bottom nav bar */}
    <div className="bottom-nav">
      <button onClick={() => scrollToSection('home')} className="nav-item">
        <Home size={20} />
        <span>Cover</span>
      </button>
      <button onClick={() => scrollToSection('couple')} className="nav-item">
        <Users size={20} />
        <span>Profil</span>
      </button>
      <button onClick={() => scrollToSection('event')} className="nav-item">
        <Calendar size={20} />
        <span>Acara</span>
      </button>
      <button onClick={() => scrollToSection('gallery')} className="nav-item">
        <Image size={20} />
        <span>Galeri</span>
      </button>
      <button onClick={() => scrollToSection('rsvp')} className="nav-item">
        <MessageSquare size={20} />
        <span>RSVP</span>
      </button>
      <button onClick={() => scrollToSection('gift')} className="nav-item">
        <Gift size={20} />
        <span>Gift</span>
      </button>
    </div>
  </>
);
}

const styles = {
  coverOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    padding: '20px',
  },
  coverCard: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(122, 12, 2, 0.08)',
    borderRadius: '24px',
    boxShadow: '0 12px 32px rgba(122, 12, 2, 0.04), 0 2px 8px rgba(212, 175, 55, 0.08)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
  },
  coverTagline: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: '#7A0C02',
    letterSpacing: '2px',
    lineHeight: '1.4',
    marginBottom: '20px',
    whiteSpace: 'pre-line',
  },
  coverIllustration: {
    width: '180px',
    height: '180px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coupleImage: {
    width: '480px',
    height: '360px',
    maxWidth: 'none',
    maxHeight: 'none',
    objectFit: 'contain',
    position: 'absolute',
  },
  coverNames: {
    fontSize: '2.8rem',
    color: '#7A0C02',
    margin: '0 0 12px 0',
  },
  coverDate: {
    fontSize: '1.2rem',
    color: '#5C4B49',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  guestBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(122, 12, 2, 0.1)',
    borderRadius: '16px',
    padding: '16px 24px',
    width: '100%',
    maxWidth: '320px',
    marginBottom: '24px',
    boxShadow: '0 4px 16px rgba(122, 12, 2, 0.02)',
  },
  guestLabel: {
    fontSize: '0.9rem',
    color: '#8A7A78',
    margin: '0 0 8px 0',
  },
  guestName: {
    fontSize: '1.4rem',
    color: '#7A0C02',
    margin: 0,
    fontWeight: '600',
  },
  saveDateHeader: {
    fontSize: '3.6rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    letterSpacing: '4px',
    marginBottom: '24px',
    lineHeight: '1.3',
    whiteSpace: 'pre-line',
    textShadow: '0 2px 10px rgba(122, 12, 2, 0.05)',
  },
  handsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px 0 24px 0',
    width: '100%',
  },
  handsImage: {
    width: '100%',
    maxWidth: '480px',
    height: 'auto',
    opacity: 0.95,
  },
  verseCard: {
    padding: '28px 24px',
    lineHeight: '1.8',
    maxWidth: '520px',
    margin: '0 auto 20px auto',
  },
  verseArabic: {
    fontSize: '1.5rem',
    color: '#7A0C02',
    direction: 'rtl',
    marginBottom: '15px',
    lineHeight: '1.8',
  },
  verseTranslation: {
    fontSize: '1.12rem',
    fontStyle: 'italic',
    color: '#5C4B49',
    marginBottom: '12px',
    lineHeight: '1.85',
    letterSpacing: '0.3px',
    whiteSpace: 'pre-line',
  },
  verseRef: {
    fontSize: '0.95rem',
    color: '#7A0C02',
    fontWeight: 'bold',
  },
  polaroidWrapper: {
    position: 'relative',
    display: 'inline-block',
    padding: '24px',
    margin: '0 auto',
  },
  wreathSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    transform: 'scale(1.15)',
    pointerEvents: 'none',
  },
  polaroidContainer: {
    width: '260px',
    marginBottom: 0,
  },
  polaroidImg: {
    borderRadius: '4px',
  },
  bismillahContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '-50px auto 20px auto',
    width: '100%',
  },
  bismillahImage: {
    maxWidth: '220px',
    width: '100%',
    height: 'auto',
    opacity: 0.85,
  },
  introGreeting: {
    fontSize: '1rem',
    lineHeight: '1.65',
    color: '#5C4B49',
    margin: '20px 0',
    padding: '0 10px',
  },
  profileCard: {
    padding: '24px 20px',
    width: '100%',
    marginBottom: 0,
  },
  profileName: {
    fontSize: '1.25rem',
    color: '#7A0C02',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  parents: {
    fontSize: '0.95rem',
    color: '#5C4B49',
    lineHeight: '1.5',
  },
  calendarWidget: {
    maxWidth: '280px',
    width: '100%',
    margin: '0 auto 20px auto',
    padding: '16px',
    borderColor: '#7A0C02',
    borderWidth: '1.5px',
    marginBottom: 0,
  },
  calendarMonth: {
    fontSize: '1.1rem',
    color: '#7A0C02',
    fontWeight: 'bold',
    marginBottom: '10px',
    borderBottom: '1px solid #7A0C02',
    paddingBottom: '6px',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px',
    fontSize: '0.85rem',
  },
  calDayName: {
    fontWeight: 'bold',
    color: '#7A0C02',
    paddingBottom: '4px',
  },
  calDay: {
    color: '#8A7A78',
    padding: '4px',
  },
  calDDay: {
    backgroundColor: '#7A0C02',
    color: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 0',
    gridRow: 'span 1',
    aspectRatio: '1',
    boxShadow: '0 2px 6px rgba(122, 12, 2, 0.3)',
    position: 'relative',
    transform: 'scale(1.15)',
  },
  calDDayLabel: {
    fontSize: '0.45rem',
    textTransform: 'uppercase',
    marginTop: '1px',
    fontWeight: 'bold',
  },
  eventCard: {
    textAlign: 'left',
    padding: '18px 20px',
    marginBottom: '16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    borderBottom: '1px solid var(--cream-dark)',
    paddingBottom: '8px',
  },
  eventCardTitle: {
    fontSize: '1.1rem',
    color: '#7A0C02',
    margin: 0,
  },
  eventDetail: {
    fontSize: '1rem',
    color: '#5C4B49',
    lineHeight: '1.6',
  },
  address: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#8A7A78',
    marginTop: '6px',
    lineHeight: '1.45',
  },
  giftDesc: {
    fontSize: '1rem',
    lineHeight: '1.55',
    color: '#5C4B49',
    marginBottom: '20px',
  },
  giftCard: {
    padding: '24px',
    marginBottom: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  giftCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  bankTag: {
    fontSize: '1.15rem',
    fontWeight: 'bold',
    color: '#7A0C02',
  },
  giftNumber: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    margin: '6px 0',
    letterSpacing: '1px',
  },
  giftHolder: {
    fontSize: '0.9rem',
    color: '#5C4B49',
    marginBottom: '14px',
  },
  copyBtn: {
    padding: '6px 14px',
    fontSize: '0.8rem',
  },
  giftPhysicalDesc: {
    fontSize: '1rem',
    color: '#5C4B49',
    margin: '24px 0 12px 0',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#7A0C02',
    marginBottom: '20px',
  },
  footerThanks: {
    fontSize: '2.5rem',
    color: '#7A0C02',
    margin: '0 0 10px 0',
  },
  footerNames: {
    fontSize: '1.4rem',
    color: '#5C4B49',
    margin: '0 0 4px 0',
  },
  footerDate: {
    fontSize: '0.9rem',
    color: '#8A7A78',
    fontWeight: 'bold',
  }
};

export default App;
