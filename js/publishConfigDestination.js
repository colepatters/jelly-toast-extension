updatePublishLinkDestination();

function updatePublishLinkDestination() {
  const retryLimit = 20;
  let tryNo = 0;

  let navbarPublishLinkEl = document.querySelector(
    `a[href="/restaurants/admin/configchanges"]`,
  );

  while (!navbarPublishLinkEl && tryNo < retryLimit) {
    console.error(
      "unable to replace publish link, couldn't locate link, trying again...",
    );
    setTimeout(updatePublishLinkDestination, 1000);
    tryNo++;
    return;
  }

  function updatePageFromStorage(result) {
    switch (result.settings.preferredPublishMenu) {
      case null || "v1":
        break;
      case "v2":
        navbarPublishLinkEl.href = "/restaurants/admin/configchangesv2";
        break;
      case "publishCenter":
        navbarPublishLinkEl.href = "/restaurants/admin/publishing/history";
        break;
    }
  }

  function onError(error) {
    console.error(
      "unable to load extension options from browser storage:",
      error,
    );
  }

  browser.storage.sync.get("settings").then(updatePageFromStorage, onError);
}
