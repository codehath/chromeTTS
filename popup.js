document.addEventListener('DOMContentLoaded', function() {
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');
    var stopButton = document.getElementById('stopButton');

    playButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, {action: "START_TTS"});
        });
    });

    pauseButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, {action: "PAUSE_TTS"});
        });
    });

    stopButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, {action: "STOP_TTS"});
        });
    });
});