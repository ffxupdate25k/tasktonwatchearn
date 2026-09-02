const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

// Get webhook from URL
const params = new URLSearchParams(window.location.search);
const WEBHOOK = params.get("webhook");

// DEBUG
alert("Webhook:\n" + WEBHOOK);
console.log("Webhook:", WEBHOOK);

const watchBtn = document.getElementById("watchBtn");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const icon = document.getElementById("icon");
const progress = document.getElementById("progress");

watchBtn.onclick = function () {

  watchBtn.disabled = true;
  status.innerHTML = "Opening rewarded ad...";

  show_11702925().then(() => {

    status.innerHTML = "Watching ad...";
    let sec = 15;

    const countdown = setInterval(() => {

      timer.innerHTML = sec;
      progress.style.width = ((15 - sec) / 15) * 100 + "%";
      sec--;

      if (sec < 0) {

        clearInterval(countdown);

        icon.innerHTML = "✅";
        timer.innerHTML = "+20";
        status.innerHTML = "Verifying reward...";

        fetch(WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user.id,
            status: "success",
            reward: 20
          })
        })
        .then(res => res.text())
        .then(data => {
          console.log("Webhook Response:", data);
          status.innerHTML = "Reward credited successfully";
        })
        .catch(err => {
          console.log(err);
          status.innerHTML = "Webhook failed";
        });

      }

    }, 1000);

  }).catch(() => {

    watchBtn.disabled = false;
    status.innerHTML = "Ad not completed.";

  });

};
