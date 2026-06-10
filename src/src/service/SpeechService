export const speakText = (text, onEndCallback) => {
  window.speechSynthesis.cancel(); // Para qualquer leitura anterior
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.1;


  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    
    const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }
  }
  
  utterance.onend = () => { 
    if (onEndCallback) onEndCallback(); 
  };
  
  utterance.onerror = (event) => { 
    console.error("Erro no SpeechSynthesis:", event.error);
    if (onEndCallback) onEndCallback();
  };
  
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};