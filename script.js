const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

const WEBHOOK = "https://api.telebotcreator.com/new-webhook?data=gAAAAABql23x3Wso70wuU01NrUrs7I3i_X2zsWLFuInPZUHrQbGIxBzRqKXOTGABsQ4dmaK89s38ZjXLgUD97OJP50DLBw8fVD-Bf9Gsn6JKxyP-O6RIb_-j5uJWewNZMd0Ce2bjo9sBf1DI8kNDcjrOBL63RS1624opJ6PJ5gHKWsWYMWVHifHKugOVc1jXQLp6oj5EWkhL";

const watchBtn = document.getElementById("watchBtn");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const icon = document.getElementById("icon");
const progress = document.getElementById("progress");

watchBtn.onclick = async () => {
  watchBtn.disabled = true;
  status.innerHTML = "Opening rewarded ad...";

  try {
    await show_11702925();

    status.innerHTML = "Verifying reward...";
    let sec = 20;

    const cd = setInterval(async () => {
      sec--;
      timer.innerHTML = sec;
      progress.style.width = ((20 - sec) / 20) * 100 + "%";

      if (sec <= 0) {
        clearInterval(cd);

        icon.innerHTML = "✅";
        timer.innerHTML = "+20";
        status.innerHTML = "Reward credited successfully";

        await fetch(WEBHOOK, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            command: "verifyad",
            chat_id: user.id,
            reward: 20,
            status: "success"
          })
        });

        tg.HapticFeedback.notificationOccurred("success");
      }
    }, 1000);

  } catch {
    watchBtn.disabled = false;
    status.innerHTML = "Ad not completed.";
  }
};
