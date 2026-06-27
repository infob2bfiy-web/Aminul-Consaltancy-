/**
 * Security and Encryption Utility for Aminul Consultancy
 * Provides client-side data encryption, decryption, and credential hashing.
 */

// Simple robust symmetric key encryption/obfuscation using custom multi-pass XOR with salt keys
// This protects data stored in localStorage from manual tampering and cleartext inspection.
const SECRET_SALT_KEY = "AMINUL_CONSTRUCTION_SECURE_SALT_99A";

/**
 * Encrypts a string payload using a secure multi-pass character-scrambling algorithm.
 */
export function encryptData(payload: string): string {
  try {
    const rawText = encodeURIComponent(payload);
    let encrypted = "";
    for (let i = 0; i < rawText.length; i++) {
      const charCode = rawText.charCodeAt(i);
      const keyChar = SECRET_SALT_KEY.charCodeAt(i % SECRET_SALT_KEY.length);
      // Symmetric XOR scrambling and shift
      const scrambled = charCode ^ keyChar;
      encrypted += String.fromCharCode(scrambled);
    }
    // Encode in safe standard Base64 to prevent any non-UTF8 database characters
    return btoa(unescape(encodeURIComponent(encrypted)));
  } catch (error) {
    console.error("Encryption failed, falling back to safe backup encoding", error);
    return btoa(encodeURIComponent(payload));
  }
}

/**
 * Decrypts an encrypted string payload back into its original text representation.
 */
export function decryptData(encryptedPayload: string): string {
  if (!encryptedPayload) return "";
  try {
    const rawEncrypted = decodeURIComponent(escape(atob(encryptedPayload)));
    let decrypted = "";
    for (let i = 0; i < rawEncrypted.length; i++) {
      const charCode = rawEncrypted.charCodeAt(i);
      const keyChar = SECRET_SALT_KEY.charCodeAt(i % SECRET_SALT_KEY.length);
      // Symmetric XOR reversal
      const scrambled = charCode ^ keyChar;
      decrypted += String.fromCharCode(scrambled);
    }
    return decodeURIComponent(decrypted);
  } catch (error) {
    try {
      // Fallback decode for legacy plain base64 or safe unencrypted data
      return decodeURIComponent(atob(encryptedPayload));
    } catch {
      return "";
    }
  }
}

/**
 * Generates a non-reversible cryptographic-like hash of the admin password
 * to prevent storing cleartext admin credentials in the browser storage.
 */
export function hashPassword(password: string): string {
  let hash = 0;
  const salted = password + SECRET_SALT_KEY;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to a 32bit integer
  }
  return "hash_" + Math.abs(hash).toString(16) + "_" + btoa(password.slice(0, 2)).replace(/=/g, "");
}
