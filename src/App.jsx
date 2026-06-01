import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Gift, Phone, Copy, Heart, BookOpen, Music, Home, Users, Image, MessageSquare, CheckCircle } from 'lucide-react';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';
import MusicPlayer from './components/MusicPlayer';
import ScrollReveal from './components/ScrollReveal';
import TypingText from './components/TypingText';
import ParticleBackground from './components/ParticleBackground';
import PhotoGallery from './components/PhotoGallery';
import ThreadDivider from './components/ThreadDivider';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState('Sahabat & Kerabat');
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [toast, setToast] = useState(null);

  // Bank accounts config
  const accounts = [
    { id: 'bni', bankName: 'BNI', number: '1277492834', holder: 'Annisa Rahmadani' },
    { id: 'bca', bankName: 'BCA', number: '7829402948', holder: 'Dicky Asa Dewa P.' }
  ];

  useEffect(() => {
    // Read query parameter 'to' for guest name
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, []);

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
  const whatsappConfirmUrl = 'https://wa.me/6281234567890?text=Halo%20Ica%20%26%20Dicky,%20saya%20ingin%20mengonfirmasi%20pengiriman%20kado...';

  // Cover Overlay Screen
  if (!isOpen) {
    return (
      <div style={styles.coverOverlay} className="animate-fade-in">
        <div style={styles.coverCard}>
          <div style={styles.coverTagline} className="font-playful animate-float">
            <span>✨ <TypingText text="THESE KIDS ARE GETTING MARRIED" speed={80} delay={600} /> ✨</span>
          </div>

          <div style={styles.coverIllustration}>
            <img 
              src="./extracted_images/X10_1.png" 
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
    <div className="app-container animate-fade-in" id="home">
      {/* Background canvas particles */}
      <ParticleBackground />

      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* Hero Section */}
      <section className="section">
        <div className="section-content">
          <ScrollReveal>
            <div className="font-playful" style={styles.saveDateHeader}>SAVE THE DATE!</div>
            
            {/* Quran Verse */}
            <div style={styles.verseCard} className="card">
              <p style={styles.verseArabic} className="font-serif">
                وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَzْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
              </p>
              <p style={styles.verseTranslation}>
                <TypingText 
                  text="“Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”" 
                  speed={15} 
                  delay={400} 
                  triggerOnScroll={true} 
                />
              </p>
              <span style={styles.verseRef} className="font-playful">QS Ar-Rum: 21</span>
            </div>
            
            <ThreadDivider />
          </ScrollReveal>
        </div>
      </section>

      {/* Bride & Groom Section */}
      <section className="section" id="couple">
        <div className="section-content">
          <ScrollReveal>
            <h2 style={styles.sectionTitle} className="font-playful">Bride & Groom</h2>
            
            <div style={{ margin: '16px 0 32px 0' }}>
              <div className="polaroid-frame" style={styles.polaroidContainer}>
                <img 
                  src="./extracted_images/X18_2.png" 
                  alt="Dicky and Ica" 
                  style={styles.polaroidImg}
                />
                <div className="caption">Dicky & Ica</div>
              </div>
            </div>

            <p style={styles.introGreeting}>
              Assalamu'alaikum Warahmatullahi Wabarakatuh<br /><br />
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:
            </p>

            {/* Profiles in a 2-column grid on desktop */}
            <div className="grid-2">
              {/* Bride */}
              <div className="card" style={styles.profileCard}>
                <h3 style={styles.profileName} className="font-playful">Annisa Rahmadani, S.Pd. (Ica)</h3>
                <p style={styles.parents}>
                  Putri dari<br />
                  <strong>Bapak Lahati</strong><br />
                  dan <strong>Almh. Ibu Suniyati</strong>
                </p>
              </div>

              {/* Groom */}
              <div className="card" style={styles.profileCard}>
                <h3 style={styles.profileName} className="font-playful">Dicky Asa Dewa Pitaloeka, S.Kom. (Dicky)</h3>
                <p style={styles.parents}>
                  Putra dari<br />
                  <strong>Bapak Pitono</strong><br />
                  dan <strong>Ibu Ludia Kabolo</strong>
                </p>
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
                <div className="card" style={styles.eventCard}>
                  <div style={styles.cardHeader}>
                    <Calendar size={20} color="#7A0C02" />
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
                <div className="card" style={styles.eventCard}>
                  <div style={styles.cardHeader}>
                    <Calendar size={20} color="#7A0C02" />
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
      </div>
    </div>
  );
}

const styles = {
  coverOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAF7F2',
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
    backgroundColor: '#FAF7F2',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
  },
  coverTagline: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    letterSpacing: '1px',
    marginBottom: '20px',
  },
  coverIllustration: {
    width: '180px',
    height: '180px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coupleImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
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
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAE4D8',
    borderRadius: '16px',
    padding: '16px 24px',
    width: '100%',
    maxWidth: '320px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(122, 12, 2, 0.02)',
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
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    letterSpacing: '2px',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  verseCard: {
    padding: '24px 20px',
    lineHeight: '1.6',
  },
  verseArabic: {
    fontSize: '1.5rem',
    color: '#7A0C02',
    direction: 'rtl',
    marginBottom: '15px',
    lineHeight: '1.8',
  },
  verseTranslation: {
    fontSize: '1.05rem',
    fontStyle: 'italic',
    color: '#5C4B49',
    marginBottom: '12px',
    lineHeight: '1.6',
  },
  verseRef: {
    fontSize: '0.95rem',
    color: '#7A0C02',
    fontWeight: 'bold',
  },
  polaroidContainer: {
    width: '260px',
  },
  polaroidImg: {
    borderRadius: '4px',
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
