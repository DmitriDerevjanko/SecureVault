chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received:", request.action);

  chrome.storage.sync.get("decryptedPasswords", function (data) {
    const decryptedData = data.decryptedPasswords[0];
    if (data && data.decryptedPasswords) {
      if (request.action === "showLoginPopup") {
        showLoginPopup(decryptedData);
      } else if (request.action === "clickLoginYoutube") {
        clickLoginButton();
      } else if (request.action === "fillGoogleLoginForm") {
        const account = data.decryptedPasswords.find(
          (entry) => entry.id === decryptedData.id
        );
        autofillGoogleLogin(account);
      }
    }
  });
});
function clickLoginButton() {
  console.log("Trying to click login button on YouTube");

  const loginButton = document.evaluate(
    '//span[text()="Sign in"]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (loginButton) {
    console.log("Button found");

    loginButton.click();
  } else {
    console.log("Button not found");
  }
}
function clickNextButton() {
  console.log("Trying to click the Next button on Google");

  const nextButton = document.querySelector("button.VfPpkd-LgbsSe");

  if (nextButton) {
    console.log("Next button found");

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    nextButton.dispatchEvent(clickEvent);
  } else {
    console.log("Next button not found");
  }
}
function autofillGoogleLogin(account) {
  console.log("Account used in autofillGoogle:", account);

  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) {
    console.log("Account login used in autofillGoogle:", account.login);
    emailInput.value = account ? account.login : "Unknown";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    clickNextButton();
    setTimeout(() => {
      const passwordInput = document.querySelector('input[type="password"]');
      if (passwordInput) {
        console.log(
          "Account password used in autofillGoogle:",
          account.passwordValue
        );
        passwordInput.value = account ? account.passwordValue : "Unknown";
        passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

        clickNextButton();
      }
    }, 1000);
  }
}
function showLoginPopup(decryptedData) {
  console.log("Showing login popup with account data:", decryptedData);

  // Retrieve the decrypted passwords from the storage
  chrome.storage.sync.get("decryptedPasswords", function (data) {
    if (data && data.decryptedPasswords) {
      const decryptedPasswords = data.decryptedPasswords;
      console.log(
        "Retrieved decrypted passwords from storage:",
        decryptedPasswords
      );

      const account = decryptedPasswords.find(
        (entry) => entry.id === decryptedData.id
      );
      const decryptedLogin = account ? account.login : "Unknown";

      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = "20px";
      popup.style.left = "20px";
      popup.style.backgroundColor = "white";
      popup.style.border = "1px solid black";
      popup.style.padding = "10px";
      popup.style.zIndex = "10000";

      popup.innerHTML = `
                <div>
                    <p>Sign into account: ${decryptedLogin}?</p>
                    <button id="confirmLogin">Sign in</button>
                </div>
            `;
      document.body.appendChild(popup);

      const confirmLoginButton = document.getElementById("confirmLogin");
      confirmLoginButton.addEventListener("click", function () {
        clickLoginButton();
      });
    } else {
      console.log("No decrypted passwords found in storage");
    }
  });
}
