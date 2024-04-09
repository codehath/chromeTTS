// lib/google_cloud_tts.js

class GoogleCloudTTS {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  }

  synthesizeSpeech(text, config, callback) {
    const body = {
      input: { text: text },
      voice: {
        languageCode: config.languageCode || 'en-US',
        ssmlGender: config.ssmlGender || 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: config.pitch || 0,
        speakingRate: config.speakingRate || 1
      }
    };

    fetch(this.endpoint + '?key=' + this.apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Google Cloud TTS Error:', data.error);
        callback(null);
      } else {
        callback(data.audioContent);
      }
    })
    .catch(error => {
      console.error('Google Cloud TTS Fetch Error:', error);
      callback(null);
    });
  }
}

// Export the GoogleCloudTTS class to be used in other parts of the extension
const ttsEngine = new GoogleCloudTTS('YOUR_GOOGLE_CLOUD_API_KEY');
export { ttsEngine };