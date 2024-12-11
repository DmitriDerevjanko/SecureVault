console.log("popup.js is loading...");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "decryptData") {
    const decryptedData = decryptData(request.data, request.masterKey);
    sendResponse({ decryptedData: decryptedData });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const masterKey = document.getElementById("masterKey").value;

    const result = await login(username, password, masterKey);
    if (result.success) {
      const encryptedPasswords = await fetchPasswords(result.token);
      const decryptedPasswords = await Promise.all(
        encryptedPasswords.map(async (entry) => {
          const decryptedLogin = await decryptData(entry.login, masterKey);
          const decryptedPasswordValue = await decryptData(
            entry.passwordValue,
            masterKey
          );
          return {
            ...entry,
            login: decryptedLogin,
            passwordValue: decryptedPasswordValue,
          };
        })
      );
      console.log("Decrypted passwords:", decryptedPasswords);
      chrome.storage.sync.set(
        { decryptedPasswords: decryptedPasswords },
        function () {
          console.log("Decrypted passwords saved to storage");
          chrome.runtime.sendMessage({ action: "decryptedPasswordsSaved" });
        }
      );
    } else {
      console.error(result.message);
    }
  });
});
async function login(username, password, masterKey) {
  console.log("Login attempt:", { username, password });
  try {
    const response = await fetch(
      "https://localhost:7150/api/authenticate/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }

    const data = await response.json();
    console.log("Login response:", data);
    chrome.storage.sync.set({ token: data.token });
    chrome.storage.sync.set({ masterKey: masterKey });

    console.log("Saved token:", data.token);
    console.log("Saved masterKey:", masterKey);

    return { success: true, message: "Login successful!", token: data.token };
  } catch (error) {
    let errorMessage = "An error occurred during login.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
document.getElementById("loginButton").addEventListener("click", async () => {
  console.log("Login button pressed");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const masterKey = document.getElementById("masterKey").value;

  console.log("Login details:", { username, password, masterKey });

  const result = await login(username, password, masterKey);

  if (result.success) {
    console.log("Log in successful");
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("folders").style.display = "block";

    fetchPasswords(result.token);
  } else {
    console.log("Log in unsuccessful");
    console.error(result.message);
  }
});
async function fetchPasswords(token) {
  console.log("Fetching passwords with token:", token);

  try {
    const response = await fetch("https://localhost:7150/api/password", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const passwords = await response.json();
    console.log("Received data from server:", passwords);
    return passwords;
  } catch (error) {
    console.error("Ошибка при получении паролей:", error);
  }
}
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
async function decryptData(encryptedDataWithIv, masterKey) {
  console.log(
    "Decrypting data:",
    encryptedDataWithIv,
    "with masterKey:",
    masterKey
  );

  try {
    const parts = encryptedDataWithIv.split(".");
    if (parts.length !== 2) {
      throw new Error("Invalid input string");
    }
    const iv = base64ToArrayBuffer(parts[0]);
    const encryptedData = base64ToArrayBuffer(parts[1]);

    const encodedKey = new TextEncoder().encode(masterKey);
    const key = await crypto.subtle.digest("SHA-256", encodedKey);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      encryptedData
    );
    console.log("Decrypted data:", decryptedData);
    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error("Error in decryptData:", error);
    throw error;
  }
}
