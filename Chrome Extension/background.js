chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("tab updated:", tab.url);
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("youtube.com") &&
    !tab.url.includes("accounts.google.com")
  ) {
    chrome.storage.sync.get("token", (data) => {
      if (data.token) {
        fetchAccounts(data.token, tab.url, tabId)
          .then((accounts) => {
            console.log("searching for purpose youtube");
            const youtubeAccount = accounts.find((account) =>
              account.purpose.includes("youtube")
            );
            if (youtubeAccount) {
              console.log("purpose youtube found:", youtubeAccount);
              console.log(
                "Sending showLoginPopup message:",
                new Date().toISOString()
              );
              chrome.tabs.sendMessage(tabId, {
                action: "showLoginPopup",
                data: youtubeAccount,
              });
            } else {
              console.log("purpose youtube not found");
            }
          })
          .catch((error) => console.error(error));
      }
    });
  }
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("accounts.google.com")
  ) {
    chrome.storage.sync.get("token", (data) => {
      if (data.token) {
        fetchAccounts(data.token, tab.url, tabId)
          .then((accounts) => {
            console.log("searching for account details");
            const youtubeAccount = accounts.find((account) =>
              account.purpose.includes("youtube")
            );
            if (youtubeAccount) {
              console.log("account data found:", youtubeAccount);
              console.log(
                "Sending fillGoogleLoginForm message:",
                new Date().toISOString()
              );
              chrome.tabs.sendMessage(tabId, {
                action: "fillGoogleLoginForm",
                email: youtubeAccount.login,
                password: youtubeAccount.passwordValue,
              });
            } else {
              console.log("account details not found");
            }
          })
          .catch((error) => console.error(error));
      }
    });
  }
});
async function fetchAccounts(token, url, tabId) {
  try {
    const response = await fetch("https://localhost:7150/api/password", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка запроса к API");
    }

    const accounts = await response.json();
    console.log("Recieved accounts:", accounts);
    return accounts;
  } catch (error) {
    console.error("error fetching data:", error);
    return [];
  }
}
