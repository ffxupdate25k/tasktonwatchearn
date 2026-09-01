const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe.user;

const WEBHOOK = "PASTE_YOUR_TELEBOTCREATOR_WEBHOOK";

const watchBtn = document.getElementById("watchBtn");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const icon = document.getElementById("icon");
const progress = document.getElementById("progress");

watchBtn.onclick = function () {

    watchBtn.disabled = true;
    status.innerHTML = "Opening rewarded ad...";

    // MONETAG REWARDED AD
    show_9795549().then(() => {

        status.innerHTML = "Verifying reward...";

        let sec = 20;

        const countdown = setInterval(() => {

            sec--;

            timer.innerHTML = sec;
            progress.style.width = (sec / 20) * 100 + "%";

            if (sec <= 0) {

                clearInterval(countdown);

                icon.innerHTML = "✅";
                timer.innerHTML = "+20";
                status.innerHTML = "Reward credited successfully";

                fetch(WEBHOOK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        reward: 20,
                        status: "completed"
                    })
                });

            }

        }, 1000);

    }).catch(() => {

        watchBtn.disabled = false;
        status.innerHTML = "Ad not completed.";

    });

};
