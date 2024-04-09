let currentTabId = null;
let ttsEngine = null;

chrome.runtime.onInstalled.addListener(() => {
  console.log('Text to Speech extension installed.');
});

chrome.tabs.onActivated.addListener(activeInfo => {
  currentTabId = activeInfo.tabId;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'START_TTS') {
    startReading(request.data);
  } else if (request.message === 'PAUSE_TTS') {
    pauseReading();
  } else if (request.message === 'STOP_TTS') {
    stopReading();
  } else if (request.message === 'UPDATE_TTS_CONFIG') {
    updateTTSConfig(request.config);
  }
});

function initTTS() {
  // Initialize Google Cloud Text-to-Speech engine here
  // This is a placeholder for actual initialization code
  ttsEngine = {}; // Replace with actual TTS engine initialization
}

function startReading(data) {
  if (currentTabId && ttsEngine) {
    chrome.tabs.sendMessage(currentTabId, {
      message: 'START_TTS',
      data: data
    });
  }
}

function pauseReading() {
  if (currentTabId && ttsEngine) {
    chrome.tabs.sendMessage(currentTabId, {
      message: 'PAUSE_TTS'
    });
  }
}

function stopReading() {
  if (currentTabId && ttsEngine) {
    chrome.tabs.sendMessage(currentTabId, {
      message: 'STOP_TTS'
    });
  }
}

function updateTTSConfig(config) {
  if (ttsEngine) {
    // Update the TTS engine configuration here
    // This is a placeholder for actual configuration update code
    // ttsEngine.updateConfig(config); // Replace with actual TTS engine configuration update
  }
}

initTTS();