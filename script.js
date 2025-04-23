const API_KEY = '';
const plusButton = document.getElementById('plus-button');
const phoneWrap = document.getElementById('phone-wrap');
const youtubeApp = document.getElementById('youtube-app');
const gamesFolder = document.getElementById('games-folder');
const watchpartyApp = document.getElementById('watchparty-app');
const whiteboardApp = document.getElementById('whiteboard-app');
const happytalkApp = document.getElementById('happytalk-app');
const feedApp = document.getElementById('feed-app');
const socialApp = document.getElementById('social-app');
const movieApp = document.getElementById('movie-app');
const aitoolsApp = document.getElementById('aitools-app');
const appScreen = document.getElementById('app-screen');
const gamesScreen = document.getElementById('games-screen');
const youtubeContainer = document.getElementById('youtube-container');
const watchpartyScreen = document.getElementById('watchparty-screen');
const happytalkScreen = document.getElementById('happytalk-screen');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const youtubeSearchInput = document.getElementById('youtube-search-input');
const youtubeSearchButton = document.getElementById('youtube-search-button');
const timeWidget = document.getElementById('time-widget');
const homeButton = document.getElementById('home-button');
const searchButton = document.getElementById('search-button');
const expandButton = document.getElementById('expand-button');
const backButton = document.getElementById('back-button');

// Toggle Phone Interface
plusButton.addEventListener('click', () => {
    phoneWrap.classList.add('active');
    plusButton.style.display = 'none';
    timeWidget.style.display = appScreen.classList.contains('active') ? 'block' : 'none';
});

// Helper function to switch screens
function switchScreen(currentScreen, newScreen) {
    currentScreen.classList.remove('active');
    newScreen.classList.add('active');
    timeWidget.style.display = newScreen === appScreen ? 'block' : 'none';
    searchContainer.classList.remove('active');
    searchInput.value = ''; // Clear search input
    // Reset app visibility when switching back to app screen
    if (newScreen === appScreen) {
        const appItems = document.querySelectorAll('.app-item');
        appItems.forEach(item => item.style.display = 'flex');
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => item.style.display = 'flex');
        const watchpartyItems = document.querySelectorAll('.watchparty-item');
        watchpartyItems.forEach(item => item.style.display = 'flex');
    }
    // Reset YouTube iframe when leaving YouTube screen
    if (currentScreen === youtubeContainer) {
        document.getElementById('youtube-iframe').src = '';
        document.getElementById('youtube-iframe').classList.add('hidden');
    }
}

// App Navigation
youtubeApp.addEventListener('click', () => {
    switchScreen(appScreen, youtubeContainer);
});

gamesFolder.addEventListener('click', () => {
    switchScreen(appScreen, gamesScreen);
});

watchpartyApp.addEventListener('click', () => {
    switchScreen(appScreen, watchpartyScreen);
});

whiteboardApp.addEventListener('click', () => {
    alert('Whiteboard app not implemented.');
});

happytalkApp.addEventListener('click', () => {
    switchScreen(appScreen, happytalkScreen);
});

feedApp.addEventListener('click', () => {
    alert('Feed app not implemented.');
});

socialApp.addEventListener('click', () => {
    alert('Social app not implemented.');
});

movieApp.addEventListener('click', () => {
    alert('Movie app not implemented.');
});

aitoolsApp.addEventListener('click', () => {
    alert('AI Tools app not implemented.');
});

// Home Button
homeButton.addEventListener('click', () => {
    const currentScreen = document.querySelector('.app-screen.active, .games-screen.active, .youtube-container.active, .watchparty-screen.active, .happytalk-screen.active');
    if (currentScreen && currentScreen !== appScreen) {
        switchScreen(currentScreen, appScreen);
    }
});

// Search Button
searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (!searchContainer.classList.contains('active')) {
        searchInput.value = '';
        // Reset visibility of all items when closing search
        const appItems = document.querySelectorAll('.app-item');
        appItems.forEach(item => item.style.display = 'flex');
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => item.style.display = 'flex');
        const watchpartyItems = document.querySelectorAll('.watchparty-item');
        watchpartyItems.forEach(item => item.style.display = 'flex');
    }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (searchContainer.classList.contains('active') && !searchContainer.contains(e.target) && e.target !== searchButton) {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        // Reset visibility of all items
        const appItems = document.querySelectorAll('.app-item');
        appItems.forEach(item => item.style.display = 'flex');
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => item.style.display = 'flex');
        const watchpartyItems = document.querySelectorAll('.watchparty-item');
        watchpartyItems.forEach(item => item.style.display = 'flex');
    }
});

// Back Button
backButton.addEventListener('click', () => {
    const currentScreen = document.querySelector('.app-screen.active, .games-screen.active, .youtube-container.active, .watchparty-screen.active, .happytalk-screen.active');
    if (currentScreen !== appScreen) {
        switchScreen(currentScreen, appScreen);
    } else {
        phoneWrap.classList.remove('active');
        plusButton.style.display = 'flex';
    }
});

// Search Functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (appScreen.classList.contains('active')) {
        const appItems = document.querySelectorAll('.app-item');
        appItems.forEach(item => {
            const title = item.querySelector('.app-title').textContent.toLowerCase();
            item.style.display = title.includes(query) ? 'flex' : 'none';
        });
    } else if (gamesScreen.classList.contains('active')) {
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            const title = item.querySelector('.game-title').textContent.toLowerCase();
            item.style.display = title.includes(query) ? 'flex' : 'none';
        });
    } else if (watchpartyScreen.classList.contains('active')) {
        const watchpartyItems = document.querySelectorAll('.watchparty-item');
        watchpartyItems.forEach(item => {
            const title = item.querySelector('.watchparty-title').textContent.toLowerCase();
            item.style.display = title.includes(query) ? 'flex' : 'none';
        });
    }
});

youtubeSearchButton.addEventListener('click', () => {
    const query = youtubeSearchInput.value;
    searchYouTube(query);
});

youtubeSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchYouTube(youtubeSearchInput.value);
    }
});

function searchYouTube(query) {
    if (!query) return;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const videoList = document.getElementById('youtube-video-list');
            videoList.innerHTML = '';
            data.items.forEach(item => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item bg-gray-700 rounded-lg overflow-hidden';
                videoItem.innerHTML = `
                    <img alt="${item.snippet.title}" src="${item.snippet.thumbnails.medium.url}" class="w-full"/>
                    <div class="p-2">
                        <h3 class="font-bold text-sm">${item.snippet.title}</h3>
                        <p class="text-gray-400 text-xs">${item.snippet.channelTitle}</p>
                    </div>
                `;
                videoItem.addEventListener('click', () => playYouTubeVideo(item.id.videoId));
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function playYouTubeVideo(videoId) {
    const iframe = document.getElementById('youtube-iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.classList.remove('hidden');
}

// Time Widget
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('time-display').innerHTML = `${hours}:${minutes} <span class="ampm">${ampm}</span>`;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-widget').innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateTime, 1000);
updateTime();
