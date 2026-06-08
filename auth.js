/**
 * auth.js — Auth_Module
 * Mengelola autentikasi pengguna via Supabase Auth.
 * Menggunakan pola dual export: window.AuthModule untuk browser, module.exports untuk Jest.
 */

// ---------------------------------------------------------------------------
// Validasi Kredensial Lokal
// ---------------------------------------------------------------------------

/**
 * Memvalidasi email dan password sebelum dikirim ke Supabase Auth.
 *
 * Aturan email:
 *   - Harus mengandung tepat satu karakter '@'
 *   - Minimal satu karakter sebelum '@'
 *   - Setelah '@', harus ada domain dengan minimal satu titik,
 *     minimal satu karakter sebelum titik terakhir, dan minimal satu karakter sesudahnya
 *
 * Aturan password:
 *   - Panjang antara 8 hingga 72 karakter (inklusif)
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateCredentials(email, password) {
  const errors = [];

  // --- Validasi email ---
  // Regex: satu atau lebih karakter, '@', satu atau lebih karakter, '.', satu atau lebih karakter
  const emailRegex = /^[^@]+@[^@.]+\.[^@.]+/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    errors.push('email');
  }

  // --- Validasi password ---
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
    errors.push('password');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// AuthModule — public interface (akan dilengkapi di task 3.3)
// ---------------------------------------------------------------------------

const AuthModule = {
  validateCredentials,
  // Placeholder untuk fungsi-fungsi yang diimplementasikan di task 3.3:
  // init, login, register, logout, getCurrentUser, isAuthenticated
};

// ---------------------------------------------------------------------------
// Export: kondisional agar kompatibel dengan Jest (Node.js) dan browser
// ---------------------------------------------------------------------------

if (typeof window !== 'undefined') {
  window.AuthModule = AuthModule;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateCredentials, AuthModule };
}
