// Saves options to chrome.storage
function saveOptions() {
  const speed = document.getElementById('speed').value;
  const pitch = document.getElementById('pitch').value;
  const volume = document.getElementById('volume').value;
  const language = document.getElementById('language').value;

  const config = {
    speed: parseFloat(speed),
    pitch: parseFloat(pitch),
    volume: parseFloat(volume),
    language: language
  };

  chrome.storage.sync.set({ SpeechSynthesisConfig: config }, function() {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default values speed = 1, pitch = 1, volume = 1 and language = 'en-US'
  chrome.storage.sync.get({
    SpeechSynthesisConfig: {
      speed: 1,
      pitch: 1,
      volume: 1,
      language: 'en-US'
    }
  }, function(items) {
    document.getElementById('speed').value = items.SpeechSynthesisConfig.speed;
    document.getElementById('pitch').value = items.SpeechSynthesisConfig.pitch;
    document.getElementById('volume').value = items.SpeechSynthesisConfig.volume;
    document.getElementById('language').value = items.SpeechSynthesisConfig.language;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);