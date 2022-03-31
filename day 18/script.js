const counter = document.getElementById('counter');
const loading = document.getElementById('loading');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const year = document.getElementById('year');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`)


//set background year
year.innerHTML = currentYear + 1;

//update DOM time
function updateCountdown() {
    const currentTime = new Date()
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24 );
    const h = Math.floor(diff / 1000 / 60 / 60 ) % 24;
    const m = Math.floor(diff / 1000 / 60  ) % 60;
    const s = Math.floor(diff / 1000 ) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}
// animation loading
function animation() {
    setTimeout(() => {
        counter.style.display='flex'
        loading.remove();

    },300)
}
// get time every second
setInterval(updateCountdown,1000)

//init
animation();
updateCountdown();