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

watchBtn.onclick = function(){

  if(!WEBHOOK){
    status.innerHTML = "Webhook not found!";
    return;
  }

  watchBtn.disabled = true;
  status.innerHTML = "Opening rewarded ad...";

  show_11702925().then(()=>{

    status.innerHTML = "Watching ad...";
    let sec = 15;

    const count = setInterval(()=>{

      timer.innerHTML = sec;

      const percent = (15-sec)/15;
      progress.style.strokeDashoffset =
        circumference - (percent*circumference);

      sec--;

      if(sec < 0){

        clearInterval(count);

        progress.style.strokeDashoffset = 0;

        icon.innerHTML = "✅";
        icon.classList.add("done");
        timer.innerHTML = "DONE";
        status.innerHTML = "Completed";

        fetch(WEBHOOK,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            user_id:user.id,
            status:"success",
            reward:20
          })
        });

        tg.HapticFeedback.notificationOccurred("success");

        setTimeout(()=>{
          tg.close();
        },1200);

      }

    },1000);

  }).catch(()=>{

    watchBtn.disabled = false;
    status.innerHTML = "Ad not completed.";

  });

};
