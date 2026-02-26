let realHeadlines = [];

async function loadHeadlines() {
  const res = await fetch("/api/headlines");
  realHeadlines = await res.json();

  document.getElementById("real-headlines").innerHTML =
    "<h3>Today's Headlines:</h3>" +
    realHeadlines.slice(0, 5).map(h => `<p>• ${h}</p>`).join("");
}

async function submitHeadline() {
  const headline = document.getElementById("headlineInput").value;

  const res = await fetch("/api/grade", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ headline, realHeadlines })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <h2>Score: ${data.score}</h2>
    <p>${data.feedback}</p>
    <p>${data.originality}</p>
  `;
}

loadHeadlines();
