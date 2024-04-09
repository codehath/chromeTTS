// content.js

let currentWordIndex = 0;
let wordsArray = [];
let speechSynthesisConfig = {};
let highlightConfig = {};

// Function to extract the main text from the current webpage
function extractMainText() {
  // This is a placeholder for the actual text extraction logic
  // You might use libraries or algorithms to extract the main content from a webpage
  return document.body.innerText;
}

// Function to initialize the text-to-speech engine
function initTTS() {
  // This function would initialize the Google Cloud Text-to-Speech engine
  // Since this is a placeholder, we will simulate the TTS engine with the browser's SpeechSynthesis
  speechSynthesisConfig = new SpeechSynthesisUtterance();
}

// Function to start reading the text
function startReading() {
  const textToRead = extractMainText();
  wordsArray = textToRead.split(/\s+/);
  speechSynthesisConfig.text = textToRead;
  speechSynthesis.speak(speechSynthesisConfig);
  speechSynthesisConfig.onboundary = handleWordBoundary;
}

// Function to pause reading
function pauseReading() {
  speechSynthesis.pause();
}

// Function to stop reading and clear highlights
function stopReading() {
  speechSynthesis.cancel();
  clearHighlights();
}

// Function to highlight a word in the text
function highlightWord(word) {
  const range = document.createRange();
  const selection = window.getSelection();
  const textNode = document.createTextNode(word);
  const span = document.createElement('span');
  span.className = 'highlight';
  span.appendChild(textNode);
  range.selectNodeContents(span);
  selection.removeAllRanges();
  selection.addRange(range);
}

// Function to update the text-to-speech configuration
function updateTTSConfig(newConfig) {
  speechSynthesisConfig = { ...speechSynthesisConfig, ...newConfig };
}

// Function to handle the 'onboundary' event for SpeechSynthesisUtterance
function handleWordBoundary(event) {
  const word = wordsArray[currentWordIndex++];
  highlightWord(word);
}

// Function to clear all highlights from the text
function clearHighlights() {
  const highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
}

// Listen for messages from the background or popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'START_TTS') {
    startReading();
  } else if (request.message === 'PAUSE_TTS') {
    pauseReading();
  } else if (request.message === 'STOP_TTS') {
    stopReading();
  } else if (request.message === 'UPDATE_TTS_CONFIG') {
    updateTTSConfig(request.config);
  }
});

// Inject the CSS for highlighting text
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `.highlight { background-color: yellow; }`;
document.head.appendChild(style);

// Initialize the TTS engine when the content script loads
initTTS();