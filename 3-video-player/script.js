const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and Pause Video
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play button
function updateIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Update progress bar time 
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100

    //Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10 ) {
        mins = '0' + String(mins);
    }

    //Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10 ) {
        secs = '0' + String(secs);
    }

    timestamp.innerText = mins + ":" + secs;
}

// Set progress bar time 
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100
}

// Stop video 
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event listeners 
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updateIcon);
video.addEventListener('play', updateIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);