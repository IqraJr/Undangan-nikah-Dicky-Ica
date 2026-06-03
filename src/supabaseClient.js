import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log("=== DIAGNOSTIK KONEKSI SUPABASE ===");
console.log("URL Supabase yang terbaca:", supabaseUrl || "(KOSONG/TIDAK ADA)");
console.log("Panjang Anon Key yang terbaca:", supabaseAnonKey ? supabaseAnonKey.length : 0);

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' && 
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    // Validasi format URL untuk mencegah crash tipe data URL
    new URL(supabaseUrl);
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Status: Supabase Client berhasil diinisialisasi.");
  } catch (err) {
    console.warn("Status: Supabase gagal diinisialisasi (Format URL salah):", err);
  }
} else {
  console.log("Status: Supabase dinonaktifkan (Kredensial kosong atau berupa template placeholder).");
}

export const supabase = supabaseClient;
