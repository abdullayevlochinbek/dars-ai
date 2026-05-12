const essayInput = document.getElementById("essayInput");
const submitEssayBtn = document.getElementById("submitEssayBtn");
const feedbackBox = document.getElementById("feedbackBox");
const wordCount = document.getElementById("wordCount");
const timer = document.getElementById("timer");
const clearBtn = document.getElementById("clearBtn");

let totalSeconds = 60 * 60; // 60 minutes

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
    if (!timer) return;

    timer.textContent = formatTime(totalSeconds);

    setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            timer.textContent = formatTime(totalSeconds);
        }
    }, 1000);
}

function updateWordCount() {
    const text = essayInput.value.trim();

    if (!text) {
        wordCount.textContent = "0";
        return;
    }

    const words = text.split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderFeedback(data) {
    const feedback = data.feedback;

    const mainMistakes = Array.isArray(feedback.mainMistakes)
        ? feedback.mainMistakes
        : [];

    const suggestions = Array.isArray(feedback.suggestions)
        ? feedback.suggestions
        : [];

    feedbackBox.innerHTML = `
        <h3>Overall Band: ${escapeHTML(String(feedback.overallBand ?? "N/A"))}</h3>

        <h3>Criterion Scores</h3>
        <p><strong>Task Response:</strong> ${escapeHTML(String(feedback.criterionScores?.taskResponse ?? "N/A"))}</p>
        <p><strong>Coherence & Cohesion:</strong> ${escapeHTML(String(feedback.criterionScores?.coherenceCohesion ?? "N/A"))}</p>
        <p><strong>Lexical Resource:</strong> ${escapeHTML(String(feedback.criterionScores?.lexicalResource ?? "N/A"))}</p>
        <p><strong>Grammar:</strong> ${escapeHTML(String(feedback.criterionScores?.grammaticalRangeAccuracy ?? "N/A"))}</p>

        <h3>Summary</h3>
        <p>${escapeHTML(String(feedback.summary ?? "No summary provided."))}</p>

        <h3>Main Mistakes</h3>
        <ul>
            ${mainMistakes.length > 0
                ? mainMistakes.map(item => `<li>${escapeHTML(item)}</li>`).join("")
                : "<li>No mistakes returned.</li>"}
        </ul>

        <h3>Suggestions</h3>
        <ul>
            ${suggestions.length > 0
                ? suggestions.map(item => `<li>${escapeHTML(item)}</li>`).join("")
                : "<li>No suggestions returned.</li>"}
        </ul>

        <h3>Improved Essay</h3>
        <p>${escapeHTML(String(feedback.improvedEssay ?? "No improved version provided."))}</p>
    `;
}

essayInput.addEventListener("input", updateWordCount);

clearBtn.addEventListener("click", () => {
    essayInput.value = "";
    feedbackBox.textContent = "Your feedback will appear here...";
    wordCount.textContent = "0";
    essayInput.focus();
});

submitEssayBtn.addEventListener("click", async () => {
    const essay = essayInput.value.trim();

    if (!essay) {
        feedbackBox.textContent = "Please write your essay first.";
        return;
    }

    feedbackBox.textContent = "AI is analyzing your essay...";

    try {
        const response = await fetch("https://dars-ai.onrender.com/analyze-writing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ essay })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            feedbackBox.textContent = data.error || "AI analysis failed.";
            return;
        }

        renderFeedback(data);
    } catch (error) {
        console.error(error);
        feedbackBox.textContent = "Server connection failed.";
    }
});

startTimer();
updateWordCount();