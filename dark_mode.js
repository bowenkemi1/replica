(function ($, Drupal) {
  "use strict";

  // Dark mode integration with Dark reader library.
  Drupal.behaviors.dark_mode_switch_dark_reader = {
    attach: function (context) {
      let darkmodeCss = document.head.querySelector(".darkmode-css");
      // Check if DarkReader is available.
      if (typeof DarkReader !== "undefined") {
        // Dark mode switch toggle.
        $("#dark-mode-switch").change(function () {
          let darkReaderEnabled = DarkReader.isEnabled();
          let darkModeStatus = $(this).is(":checked");
          if (darkModeStatus === false) {
            DarkReader.disable();
          }
          updateDarkMode(darkReaderEnabled, darkModeStatus);
          document.head.append(darkmodeCss);
        });
      }
    },
  };
})(jQuery, Drupal);

document.addEventListener("DOMContentLoaded", () => {
  loadDarkMode();
});

function loadDarkMode() {
  if (typeof DarkReader !== "undefined") {
    let darkReaderEnabled = DarkReader.isEnabled();
    let darkModeStatus = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if ("theme" in localStorage) {
      darkModeStatus = localStorage.theme === "false" ? false : true;
    }
    updateDarkMode(darkReaderEnabled, darkModeStatus);
  }
}

loadDarkMode();

function updateDarkMode(darkReaderEnabled, darkModeStatus) {
  if (darkReaderEnabled === false && darkModeStatus === true) {
    // Enable dark mode.
    DarkReader.setFetchMethod((url) => {
      let headers = new Headers();
      headers.append("Access-Control-Allow-Origin", "*");

      return window.fetch(url, {
        headers,
      });
    });
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
  }
}
