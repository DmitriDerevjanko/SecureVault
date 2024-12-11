export async function encryptData(
  data: string,
  masterKey: string,
): Promise<string> {
  const encodedData = new TextEncoder().encode(data);
  const encodedKey = new TextEncoder().encode(masterKey);
  const key = await crypto.subtle.digest('SHA-256', encodedKey);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt'],
  );

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encodedData,
  );

  // Преобразование IV и зашифрованных данных в Base64
  const base64EncryptedData = arrayBufferToBase64(encryptedData);
  const base64Iv = arrayBufferToBase64(iv);
  // Склеиваем IV и зашифрованные данные, разделяя их точкой
  return `${base64Iv}.${base64EncryptedData}`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
