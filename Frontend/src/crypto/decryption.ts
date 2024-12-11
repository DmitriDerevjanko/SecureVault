export async function decryptData(
  encryptedDataWithIv: string,
  masterKey: string,
): Promise<string> {
  try {
    console.log('Start decrypting data:', encryptedDataWithIv);

    const parts = encryptedDataWithIv.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid input string');
    }

    const base64Iv = parts[0];
    const base64EncryptedData = parts[1];

    console.log('IV:', base64Iv);
    console.log('Encrypted data:', base64EncryptedData);

    const iv = base64ToArrayBuffer(base64Iv);
    const encryptedData = base64ToArrayBuffer(base64EncryptedData);

    const encodedKey = new TextEncoder().encode(masterKey);
    const key = await crypto.subtle.digest('SHA-256', encodedKey);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['decrypt'],
    );

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encryptedData,
    );

    const result = new TextDecoder().decode(decryptedData);
    console.log('Decrypted data:', result);

    return result;
  } catch (error) {
    console.error('Error in decryptData:', error);
    throw error;
  }
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
