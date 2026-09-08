const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;
const WEBHOOK = new URLSearchParams(location.search).get("webhook") || "";

const TOTAL = 4;
let current = 1;

const btn = document.getElementById("watchBtn");
const title = document.getElementById("title");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");

function updateUI() {
  counter.innerHTML = `${current - 1}/${TOTAL}`;
  progress.style.width = `${((current - 1) / TOTAL) * 100}%`;
  title.innerHTML = `Ad ${current} is ready`;
  btn.innerHTML = `▶ Watch Ad ${current} of ${TOTAL}`;
}

updateUI();

btn.addEventListener("click", () => {
  btn.disabled = true;
  title.innerHTML = "Opening rewarded ad...";

  show_11702925().then(async () => {

    if (current < TOTAL) {
      current++;
      updateUI();
      btn.disabled = false;
      return;
    }

    progress.style.width = "100%";
    document.getElementById("taskCard").style.display = "none";
    document.getElementById("successCard").style.display = "block";

    if (WEBHOOK) {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          status: "success",
          ads_completed: 4,
          reward: 0.008
        })
      });
    }

    tg.HapticFeedback.notificationOccurred("success");
    setTimeout(() => tg.close(), 1500);

  }).catch(() => {
    btn.disabled = false;
    title.innerHTML = `Ad ${current} not completed`;
  });
});
