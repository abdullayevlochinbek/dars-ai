const essayInput = document.getElementById("essayInput");
const submitEssayBtn = document.getElementById("submitEssayBtn");
const feedbackBox = document.getElementById("feedbackBox");
const wordCount = document.getElementById("wordCount");
const timer = document.getElementById("timer");
const clearBtn = document.getElementById("clearBtn");

const generateTopicBtn = document.getElementById("generateTopicBtn");
const topicType = document.getElementById("topicType");
const topicTitle = document.getElementById("topicTitle");
const topicQuestion = document.getElementById("topicQuestion");

const customTopicInput = document.getElementById("customTopicInput");
const useCustomTopicBtn = document.getElementById("useCustomTopicBtn");

const isLocalHost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalHost
  ? "http://localhost:3000"
  : "https://YOUR-RENDER-LINK";

let totalSeconds = 60 * 60;
let timerInterval = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  if (!timer) return;

  timer.textContent = formatTime(totalSeconds);

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      timer.textContent = formatTime(totalSeconds);
    } else {
      clearInterval(timerInterval);
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
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setTopicFromObject(topicObj) {
  if (!topicObj) return;

  topicType.textContent = topicObj.type || "Topic";
  topicTitle.textContent = topicObj.topic || "Untitled Topic";
  topicQuestion.textContent = topicObj.question || "";
}

function generateRandomTopic() {
  if (typeof ieltsTopics === "undefined" || !Array.isArray(ieltsTopics) || ieltsTopics.length === 0) {
    topicType.textContent = "Error";
    topicTitle.textContent = "Topics file not loaded";
    topicQuestion.textContent = "Check that topics.js is linked before writing.js.";
    return;
  }

  const randomTopic = ieltsTopics[Math.floor(Math.random() * ieltsTopics.length)];
  setTopicFromObject(randomTopic);
}

function useCustomTopic() {
  const customTopic = customTopicInput.value.trim();

  if (!customTopic) {
    topicType.textContent = "Warning";
    topicTitle.textContent = "Please type your topic first";
    topicQuestion.textContent = "";
    return;
  }

  topicType.textContent = "Custom";
  topicTitle.textContent = customTopic;
  topicQuestion.textContent = "This is your custom IELTS writing topic.";
}

function renderFeedback(data) {
  const feedback = data.feedback;

  if (typeof feedback === "string") {
    feedbackBox.innerHTML = `<pre style="white-space: pre-wrap; margin: 0;">${escapeHTML(feedback)}</pre>`;
    return;
  }

  const criterion = feedback.criterionScores || {};
  const mainMistakes = Array.isArray(feedback.mainMistakes) ? feedback.mainMistakes : [];
  const suggestions = Array.isArray(feedback.suggestions) ? feedback.suggestions : [];

  feedbackBox.innerHTML = `
    <h3>Overall Band: ${escapeHTML(feedback.overallBand ?? "N/A")}</h3>

    <h3>Criterion Scores</h3>
    <p><strong>Task Response:</strong> ${escapeHTML(criterion.taskResponse ?? "N/A")}</p>
    <p><strong>Coherence & Cohesion:</strong> ${escapeHTML(criterion.coherenceCohesion ?? "N/A")}</p>
    <p><strong>Lexical Resource:</strong> ${escapeHTML(criterion.lexicalResource ?? "N/A")}</p>
    <p><strong>Grammar:</strong> ${escapeHTML(criterion.grammaticalRangeAccuracy ?? "N/A")}</p>

    <h3>Summary</h3>
    <p>${escapeHTML(feedback.summary ?? "No summary provided.")}</p>

    <h3>Main Mistakes</h3>
    <ul>
      ${
        mainMistakes.length > 0
          ? mainMistakes.map(item => `<li>${escapeHTML(item)}</li>`).join("")
          : "<li>No mistakes returned.</li>"
      }
    </ul>

    <h3>Suggestions</h3>
    <ul>
      ${
        suggestions.length > 0
          ? suggestions.map(item => `<li>${escapeHTML(item)}</li>`).join("")
          : "<li>No suggestions returned.</li>"
      }
    </ul>

    <h3>Improved Essay</h3>
    <p>${escapeHTML(feedback.improvedEssay ?? "No improved version provided.")}</p>
  `;
}

essayInput.addEventListener("input", updateWordCount);

generateTopicBtn.addEventListener("click", generateRandomTopic);
useCustomTopicBtn.addEventListener("click", useCustomTopic);

clearBtn.addEventListener("click", () => {
  essayInput.value = "";
  feedbackBox.textContent = "Your feedback will appear here...";
  wordCount.textContent = "0";
  customTopicInput.value = "";
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
    const response = await fetch('https://dars-ai.onrender.com/analyze-writing', {
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
generateRandomTopic();