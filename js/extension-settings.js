(async function runOnPopupOpened() {})();

let publishMenuPreferenceEl = document.querySelector(
  "select#input-publish-menu-preference",
);

let settingsFormEl = document.querySelector("form");

function saveOptions(e) {
  e.preventDefault();

  if (!publishMenuPreferenceEl) {
    console.error(
      "unable to save settings: one or more elements could not be selected on the settings page",
    );
    return;
  }

  const settings = {
    preferredPublishMenu: publishMenuPreferenceEl.value,
  };

  browser.storage.sync.set({
    settings,
  });
}

function loadOptions() {
  function updatePageFromStorage(result) {
    publishMenuPreferenceEl.value =
      result.settings.preferredPublishMenu ?? "v1";
  }

  function onError(error) {
    console.error(
      "unable to load extension options from browser storage:",
      error,
    );
  }

  browser.storage.sync.get("settings").then(updatePageFromStorage, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.addEventListener("submit", saveOptions);
