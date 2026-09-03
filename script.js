const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

const params = new URLSearchParams(window.location.search);
const WEBHOOK = decodeURIComponent(params.get("webhook") || "");

const watchBtn = document.getElementById("watchBtn");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const icon = document.getElementById("icon");
const progress = document.querySelector(".progress");

const radius = 85;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;

watchBtn.addEventListener("click", async () => {
  if (!WEBHOOK) {
    status.innerHTML = "Webhook not found!";
    return;
  }

  watchBtn.disabled = true;
  status.innerHTML = "Opening rewarded ad...";

  try {
    await show_11702925();

    status.innerHTML = "Watching ad...";
    let sec = 15;

    const count = setInterval(async () => {
      timer.innerHTML = sec;

      const percent = (15 - sec) / 15;
      progress.style.strokeDashoffset =
        circumference - (percent * circumference);

      sec--;

      if (sec < 0) {
        clearInterval(count);

        progress.style.strokeDashoffset = 0;
        icon.innerHTML = "✔️";
        timer.innerHTML = "Completed 🟢";
        status.innerHTML = "Crediting reward...";

        try {
          await fetch(WEBHOOK, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id: user.id,
              status: "success"
            })
          });

          status.innerHTML = "Reward credited!";
          tg.HapticFeedback.notificationOccurred("success");

          setTimeout(() => tg.close(), 500);
        } catch {
          watchBtn.disabled = false;
          status.innerHTML = "Webhook failed.";
        }
      }
    }, 1000);

  } catch {
    watchBtn.disabled = false;
    status.innerHTML = "Ad not completed.";
  }
});
