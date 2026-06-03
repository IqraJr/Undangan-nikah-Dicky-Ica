import { useState, useEffect } from 'react';
import { Check, X, Send } from 'lucide-react';
import { supabase } from '../supabaseClient';

// Default initial wishes
const INITIAL_WISHES = [
  {
    id: 1,
    name: 'Tante Dina',
    wishes: 'Selamat menempuh hidup baru Dicky & Ica! Semoga sakinah mawaddah warahmah. Aamiin.',
    presence: 'hadir',
    date: '2026-06-01T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Sarah Amalia',
    wishes: 'Happy wedding Kak Ica dan Mas Dicky! Lancar-lancar sampai hari H. Doa terbaik untuk kalian berdua ya!',
    presence: 'hadir',
    date: '2026-06-01T14:30:00.000Z'
  },
  {
    id: 3,
    name: 'Rian Pratama',
    wishes: 'Wah selamat ya bro Dicky! Akhirnya sah juga. Semoga berbahagia selalu dengan Ica!',
    presence: 'hadir',
    date: '2026-06-01T18:15:00.000Z'
  }
];

// Check if Supabase is fully configured with actual keys
const isSupabaseReady = 
  supabase !== null &&
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';

const RSVPForm = ({ defaultGuestName }) => {
  const [name, setName] = useState(defaultGuestName || '');
  const [wishes, setWishes] = useState('');
  const [presence, setPresence] = useState('hadir');
  const [guestWishes, setGuestWishes] = useState(() => {
    // If Supabase is not ready yet, load from localStorage
    if (!isSupabaseReady) {
      const savedWishes = localStorage.getItem('wedding_wishes');
      if (savedWishes) {
        try {
          return JSON.parse(savedWishes);
        } catch (e) {
          console.error("Failed to parse saved wishes", e);
        }
      }
      return INITIAL_WISHES;
    }
    return [];
  });
  const [loading, setLoading] = useState(isSupabaseReady);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("Supabase connection configuration status:", isSupabaseReady ? "READY" : "NOT READY (Using Local Fallback)");
    if (!isSupabaseReady) {
      const savedWishes = localStorage.getItem('wedding_wishes');
      if (!savedWishes) {
        localStorage.setItem('wedding_wishes', JSON.stringify(INITIAL_WISHES));
      }
      return;
    }

    const fetchWishes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Gagal mengambil ucapan dari Supabase:', error);
      } else if (data) {
        console.log("Wishes successfully loaded from Supabase. Total count:", data.length);
        setGuestWishes(data);
      }
      setLoading(false);
    };

    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !wishes.trim()) return;

    const newWish = {
      name: name.trim(),
      wishes: wishes.trim(),
      presence,
      date: new Date().toISOString()
    };

    if (isSupabaseReady) {
      console.log("Attempting to insert wish to Supabase:", newWish);
      // Simpan ke Supabase
      const { data, error } = await supabase
        .from('wishes')
        .insert([newWish])
        .select();

      if (error) {
        console.error('Gagal menyimpan ucapan ke Supabase:', error);
      } else if (data && data.length > 0) {
        console.log("Successfully saved wish to Supabase!", data[0]);
        setGuestWishes((prev) => [data[0], ...prev]);
      }
    } else {
      console.log("Supabase is not configured. Saving wish locally to localStorage...");
      // Simpan ke localStorage (fallback lokal)
      const localWish = {
        id: Date.now(),
        ...newWish
      };
      const updatedWishes = [localWish, ...guestWishes];
      setGuestWishes(updatedWishes);
      localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    }
    
    const coupleWhatsAppNumber = '6282229344852';
    const presenceStatus = presence === 'hadir' ? 'Hadir' : 'Tidak Hadir';
    
    const whatsappText = `Assalamualaikum Dicky & Ica, saya ingin mengonfirmasi kehadiran:\n\n` +
                         `*Nama:* ${name.trim()}\n` +
                         `*Kehadiran:* ${presenceStatus}\n` +
                         `*Ucapan & Doa:* ${wishes.trim()}`;
                         
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/${coupleWhatsAppNumber}?text=${encodedText}`;
    
    // Reset wishes input box
    setWishes('');
    setSubmitted(true);

    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const countHadir = guestWishes.filter(w => w.presence === 'hadir').length;
  const countTidakHadir = guestWishes.filter(w => w.presence === 'tidak_hadir').length;

  return (
    <div style={styles.container}>
      {/* RSVP Dashboard */}
      <div style={styles.dashboard}>
        <div style={styles.dashCard}>
          <Check size={20} color="#7A0C02" />
          <span style={styles.dashCount}>{countHadir}</span>
          <span style={styles.dashLabel}>Hadir</span>
        </div>
        <div style={styles.dashCard}>
          <X size={20} color="#5C4B49" />
          <span style={styles.dashCount}>{countTidakHadir}</span>
          <span style={styles.dashLabel}>Absen</span>
        </div>
      </div>

      {/* RSVP Form */}
      <form onSubmit={handleSubmit} className="card" style={styles.formCard}>
        <div className="form-group">
          <label htmlFor="rsvp-name">Nama Tamu</label>
          <input
            id="rsvp-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rsvp-wishes">Ucapan & Doa Restu</label>
          <textarea
            id="rsvp-wishes"
            className="form-input form-textarea"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            placeholder="Tulis ucapan indah Anda di sini..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Konfirmasi Kehadiran</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="hadir"
                name="presence"
                value="hadir"
                checked={presence === 'hadir'}
                onChange={() => setPresence('hadir')}
              />
              <label htmlFor="hadir" className="radio-label">
                <Check size={16} /> Hadir
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="tidak_hadir"
                name="presence"
                value="tidak_hadir"
                checked={presence === 'tidak_hadir'}
                onChange={() => setPresence('tidak_hadir')}
              />
              <label htmlFor="tidak_hadir" className="radio-label">
                <X size={16} /> Tidak Hadir
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={styles.submitBtn}>
          <Send size={16} /> Kirim via WhatsApp
        </button>

        {submitted && (
          <p style={styles.successMsg} className="font-playful animate-fade-in">
            Mengalihkan ke WhatsApp... Terima kasih! ❤️
          </p>
        )}
      </form>

      {/* Wishes Board */}
      <h3 style={styles.boardTitle} className="font-playful">Daftar Ucapan</h3>
      <div style={styles.boardContainer}>
        {loading ? (
          <p style={styles.emptyText}>Memuat ucapan... ⏳</p>
        ) : guestWishes.length === 0 ? (
          <p style={styles.emptyText}>Belum ada ucapan. Jadilah yang pertama! 😊</p>
        ) : (
          guestWishes.map((wish, index) => (
            <div key={`wish-${wish.id || 'no-id'}-${index}`} style={styles.wishCard}>
              <div style={styles.wishHeader}>
                <span style={styles.wishName} className="font-playful">{wish.name}</span>
                <span 
                  style={{
                    ...styles.wishBadge,
                    backgroundColor: wish.presence === 'hadir' ? 'var(--burgundy-bg-trans)' : '#F3ECE0',
                    color: wish.presence === 'hadir' ? 'var(--burgundy-primary)' : '#5C4B49',
                  }}
                >
                  {wish.presence === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                </span>
              </div>
              <p style={styles.wishText}>{wish.wishes}</p>
              <span style={styles.wishDate}>
                {new Date(wish.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    textAlign: 'left',
  },
  dashboard: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  dashCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(122, 12, 2, 0.03)',
    border: '1px solid rgba(122, 12, 2, 0.05)',
  },
  dashCount: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    margin: '4px 0',
  },
  dashLabel: {
    fontSize: '0.8rem',
    color: '#8A7A78',
    fontWeight: '600',
  },
  formCard: {
    marginBottom: '32px',
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '8px',
  },
  successMsg: {
    textAlign: 'center',
    color: '#7A0C02',
    marginTop: '12px',
    fontSize: '0.95rem',
  },
  boardTitle: {
    fontSize: '1.3rem',
    color: '#7A0C02',
    marginBottom: '16px',
    borderBottom: '2px solid var(--burgundy-border-trans)',
    paddingBottom: '8px',
  },
  boardContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingRight: '4px',
  },
  wishCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAE4D8',
    borderRadius: '14px',
    padding: '14px 16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.01)',
  },
  wishHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  wishName: {
    fontWeight: '600',
    color: '#7A0C02',
    fontSize: '1rem',
  },
  wishBadge: {
    fontSize: '0.75rem',
    padding: '3px 8px',
    borderRadius: '50px',
    fontWeight: '600',
  },
  wishText: {
    fontSize: '0.9rem',
    color: '#5C4B49',
    lineHeight: '1.45',
    margin: '0 0 6px 0',
  },
  wishDate: {
    fontSize: '0.75rem',
    color: '#8A7A78',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8A7A78',
    padding: '20px',
  },
};

export default RSVPForm;
