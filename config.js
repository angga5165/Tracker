/**
 * config.js — Konfigurasi Supabase terpusat
 *
 * File ini menyediakan SUPABASE_URL dan SUPABASE_ANON_KEY untuk seluruh
 * aplikasi. Ganti nilai placeholder di bawah dengan kredensial proyek
 * Supabase Anda sebelum deploy.
 *
 * Keamanan: File ini menggunakan `anon` (public) key, bukan `service_role`
 * key. Anon key aman untuk di-expose di frontend karena diproteksi oleh
 * Row Level Security (RLS) di sisi database.
 *
 * Requirements: 7.1, 7.2, 7.4
 */

const SUPABASE_URL = 'https://<project-ref>.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...'; // Ganti dengan anon key proyek Anda

// Guard validasi: hentikan inisialisasi jika konfigurasi tidak lengkap.
// Requirement 7.4: jika URL atau key bernilai falsy, tampilkan pesan error
// di DOM dan lempar Error untuk menghentikan eksekusi lebih lanjut.
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;' +
        'height:100vh;font-family:sans-serif;color:#c4705a;font-size:1.1rem;' +
        'text-align:center;padding:2rem;">' +
        'Konfigurasi Supabase tidak lengkap. Hubungi administrator.' +
        '</div>';
    });
  }
  throw new Error('Konfigurasi Supabase tidak lengkap. Hubungi administrator.');
}

// Ekspor ke global scope untuk browser (digunakan oleh auth.js dan sync.js).
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
}

// Ekspor via module.exports untuk Node.js / Jest.
// Kondisi typeof check memastikan kode ini tidak melempar error di browser
// yang tidak mengenal `module`.
if (typeof module !== 'undefined') {
  module.exports = { SUPABASE_URL, SUPABASE_ANON_KEY };
}
