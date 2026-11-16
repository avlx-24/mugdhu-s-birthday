/**
 * Birthday Journey Website - Global Script
 * Handles Typed.js initialization and interactive Vinyl Record Music Player
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypedLetter();
    initVinylPlayer();
});

/* ==========================================================================
   1. TYPED.JS EFFECT (message.html)
   ========================================================================== */
function initTypedLetter() {
    const typedElement = document.getElementById('typed-text');
    
    // Only run if the element exists on the current page
    if (!typedElement) return;

    // Verify Typed library is loaded
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js is not loaded.');
        typedElement.textContent = "Happy Birthday! Today is all about celebrating you, the joy you bring into the world, and every unforgettable memory we share. Wishing you a year ahead filled with happiness, laughter, and endless adventure!";
        return;
    }

    new Typed('#typed-text', {
        strings: [
            "Today is all about celebrating you. ^600\n\nIt is a very special occasion to me today. ^800\n\nI met you on 2nd November 2026 and its been 26 days since that day. ^800\n\nWe talked and talked and got to know each other more since every passing day and even started to trust each other slowly. ^800\n\nGetting so close and being able to talk to you about everything has been the best part of this year and I genuinely hope we continue to talk forever and turn this incredible friendship into something more, completely on your terms. ^800\n\n Anyways this is a small gesture of our friendship, I know its not much but for now this is the best I can do. ^1000\n\nHappy Birthday Mugdhu! ✨🎂"
        ],
        typeSpeed: 35,
        backSpeed: 20,
        startDelay: 400,
        showCursor: true,
        cursorChar: '▍',
        autoInsertCss: true,
        loop: false,
        contentType: 'html'
    });
}

/* ==========================================================================
   2. VINYL RECORD PLAYER (music.html)
   ========================================================================== */
function initVinylPlayer() {
    const vinylRecord = document.getElementById('vinyl-record');
    const audioPlayer = document.getElementById('bday-song');
    const statusPill = document.getElementById('player-status');
    const statusText = document.getElementById('player-status-text');

    // Only run if the elements exist on the current page
    if (!vinylRecord || !audioPlayer) return;

    let isPlaying = false;

    // Toggle Play / Pause function
    function togglePlayback() {
        if (audioPlayer.paused) {
            // Attempt to play audio
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    updatePlayerUI(true);
                }).catch(err => {
                    console.error('Audio playback error:', err);
                });
            }
        } else {
            audioPlayer.pause();
            isPlaying = false;
            updatePlayerUI(false);
        }
    }

    // Update visuals & animations based on state
    function updatePlayerUI(playing) {
        if (playing) {
            // Start or resume spinning
            if (!vinylRecord.classList.contains('spinning')) {
                vinylRecord.classList.add('spinning');
            }
            vinylRecord.classList.remove('paused');

            // Update status indicator
            if (statusPill) statusPill.classList.add('playing');
            if (statusText) statusText.textContent = 'Now Playing • Click record to pause';
        } else {
            // Pause spinning without resetting the rotation position
            vinylRecord.classList.add('paused');

            // Update status indicator
            if (statusPill) statusPill.classList.remove('playing');
            if (statusText) statusText.textContent = 'Paused • Click record to play';
        }
    }

    // Click event on the vinyl record
    vinylRecord.addEventListener('click', togglePlayback);

    // Keyboard accessibility for vinyl record focus
    vinylRecord.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePlayback();
        }
    });

    // When the audio finishes playing
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        vinylRecord.classList.remove('spinning', 'paused');
        if (statusPill) statusPill.classList.remove('playing');
        if (statusText) statusText.textContent = 'Song Ended • Click to replay';
    });

    // Keyboard accessibility: Spacebar toggles playback
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            togglePlayback();
        }
    });
}
