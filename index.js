const speechRecognitionService = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionService = new speechRecognitionService();

const startBtn = document.querySelector(".btn-start");
const textLog = document.querySelector(".text-log");

const languages = {
    English: "en-US",
    Romanian: "ro-RO",
    Spanish: "es-ES"
};

startBtn.addEventListener("click", () => {
    recognitionService.lang = determineLanguage();
    recognitionService.continuous = true;
    recognitionService.onresult = handleResult;

    if (startBtn.classList.contains("btn-pulse")) {
        stopRecording();
    } else {
        startRecording();
    }


});

function determineLanguage() {
    const selected = document.querySelector("#language").value;
    switch (selected) {
        case "English":
            return languages.English;
        case "Romanian":
            return languages.Romanian;
        case "Spanish":
            return languages.Spanish;
        default:
            throw new Error("Languages not supported")
    }
}

function handleResult(event) {
    const results = [];
    for (const result of event.results) {
        results.push(`${result[0].transcript}`);
    }
    textLog.innerHTML += results.at(-1);
}

function stopRecording() {
    recognitionService.stop();
    startBtn.classList.remove("btn-pulse");
}

function startRecording(){
    recognitionService.start();
    startBtn.classList.add("btn-pulse");
}