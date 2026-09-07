const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

const WEBHOOK = new URLSearchParams(location.search).get("webhook") || "";

const TOTAL_ADS = 4;
let current = 1;

const btn = document.getElementById("watchBtn");
const title = document.getElementById("title");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");

function updateUI(){

counter.innerHTML = `${current-1}/${TOTAL_ADS}`;
progress.style.width = `${((current-1)/TOTAL_ADS)*100}%`;
title.innerHTML = `Ad ${current} is ready`;
btn.innerHTML = `▶ Watch Ad ${current} of ${TOTAL_ADS}`;

}

updateUI();

btn.onclick = async ()=>{

btn.disabled = true;
title.innerHTML = "Opening rewarded ad...";

try{

await show_11702925();

if(current < TOTAL_ADS){

current++;
updateUI();
btn.disabled = false;

return;

}

progress.style.width = "100%";

document.getElementById("taskCard").style.display = "none";
document.getElementById("successCard").style.display = "block";

if(WEBHOOK){

await fetch(WEBHOOK,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:user.id,
status:"success",
ads_completed:4,
reward:0.04
})
});

}

tg.HapticFeedback.notificationOccurred("success");

setTimeout(()=>{
tg.close();
},1500);

}catch(e){

btn.disabled = false;
title.innerHTML = `Ad ${current} not completed`;

}

};};justify-content:space-between;
margin:18px 0 12px;
color:#ccc;
}

.statusBox{
background:#171717;
border-radius:16px;
padding:15px;
display:flex;
gap:12px;
align-items:center;
margin-bottom:18px;
}

.dot{
width:14px;
height:14px;
border-radius:50%;
background:#CFFF4D;
box-shadow:0 0 12px #CFFF4D;
}

.statusBox p{
color:#888;
font-size:13px;
margin-top:4px;
}

button{
width:100%;
padding:16px;
border:none;
border-radius:16px;
background:#CFFF4D;
font-size:17px;
font-weight:bold;
color:#111;
}

button:disabled{
opacity:.7;
}

.reward{
text-align:right;
margin-top:12px;
color:#CFFF4D;
font-weight:bold;
}

.success{
display:none;
text-align:center;
}

.check{
width:88px;
height:88px;
margin:0 auto 18px;
border-radius:50%;
background:#CFFF4D;
color:#111;
display:flex;
align-items:center;
justify-content:center;
font-size:48px;
font-weight:bold;
}

.amount{
font-size:40px;
font-weight:bold;
color:#D5FF53;
margin:18px 0;
}

.tags span{
display:inline-block;
margin:4px;
padding:8px 14px;
background:#18200E;
border-radius:20px;
color:#BFFF43;
font-size:12px;
  }          tg.HapticFeedback.notificationOccurred("success");

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
