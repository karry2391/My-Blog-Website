document.addEventListener('DOMContentLoaded', function() {
    // 音乐播放器相关元素
    const audioPlayer = new Audio();
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.querySelector('.progress-bar'); // 获取进度条容器
    const musicProgress = document.getElementById('musicProgress');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');
    const albumCover = document.getElementById('albumCover');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const musicPlaylist = document.getElementById('musicPlaylist');

    // 视频播放器相关元素
    const videoPlayer = document.getElementById('mainVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoVolumeSlider = document.getElementById('videoVolumeSlider');
    const videoProgress = document.getElementById('videoProgress');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoPlaylist = document.getElementById('videoPlaylist');

    // 状态变量
    let currentMusicIndex = 0;
    let currentVideoIndex = 0;
    let isDragging = false; // 用于跟踪是否正在拖动进度条

    // 音乐列表数据
    const musicList = [
        {
            title: '昨日青空',
            artist: '尤长靖',
            cover: 'Image/M&V/music/昨日青空.jpg',
            src: 'Image/M&V/music/昨日青空 - 尤长靖.mp3'
        },
		{
		    title: '勿忘心安_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/我是歌手.jpg',
		    src: 'Image/M&V/music/勿忘心安_(Live)_-_张杰.flac'
		},
		{
		    title: '鲜花_(Live)',
		    artist: '回春丹',
		    cover: 'Image/M&V/music/鲜花_(Live).jpg',
		    src: 'Image/M&V/music/鲜花_(Live)_-_回春丹.flac'
		},
		{
		    title: '回到拉萨_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/我是歌手.jpg',
		    src: 'Image/M&V/music/回到拉萨_(Live)_-_张杰.flac'
		},
		{
		    title: '默_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/歌手第5期.jpg',
		    src: 'Image/M&V/music/默_(Live)_-_张杰.flac'
		},
		{
		    title: 'You_Raise_Me_Up_(Live)',
		    artist: '张杰,刘润潼',
		    cover: 'Image/M&V/music/歌手第13期.jpg',
		    src: 'Image/M&V/music/You_Raise_Me_Up_(Live)_-_张杰,刘润潼.flac'
		},
		{
		    title: '我的未来不是梦_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/我是歌手.jpg',
		    src: 'Image/M&V/music/我的未来不是梦_(Live)_-_张杰.flac'
		},
		{
		    title: '夜空中最亮的星_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/我是歌手.jpg',
		    src: 'Image/M&V/music/夜空中最亮的星_(Live)_-_张杰.flac'
		},
		{
		    title: '最美的太阳+翅膀_(Live)',
		    artist: '张杰,林俊杰',
		    cover: 'Image/M&V/music/我是歌手.jpg',
		    src: 'Image/M&V/music/最美的太阳+翅膀_(Live)_-_张杰,林俊杰.flac'
		},
		{
		    title: '自己_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/歌手第10期.jpg',
		    src: 'Image/M&V/music/自己_(Live)_-_张杰.flac'
		},
		{
		    title: '直到世界尽头_(Live)',
		    artist: '张杰',
		    cover: 'Image/M&V/music/歌手.jpg',
		    src: 'Image/M&V/music/直到世界尽头_(Live)_-_杨坤,张杰.flac'
		},
		{
		    title: '一起吹过晚风的街',
		    artist: '聂思诗',
		    cover: 'Image/M&V/music/一起吹过晚风的街.jpg',
		    src: 'Image/M&V/music/一起吹过晚风的街 - 聂思诗.mp3'
		},
		{
		    title: '말해! 뭐해',
		    artist: 'K.Will',
		    cover: 'Image/M&V/music/말해! 뭐해.jpg',
		    src: 'Image/M&V/music/말해! 뭐해 - K.Will.mp3'
		},
		{
		    title: '风是从哪儿来',
		    artist: 'Bell玲惠',
		    cover: 'Image/M&V/music/风是从哪儿来.jpg',
		    src: 'Image/M&V/music/风是从哪儿来_-_Bell玲惠.flac'
		},
		{
		    title: '安静',
		    artist: '黄子韬',
		    cover: 'Image/M&V/music/安静.jpg',
		    src: 'Image/M&V/music/安静 - 黄子韬.flac'
		},
		{
		    title: 'YEU 5',
		    artist: 'Remix',
		    cover: 'Image/M&V/music/YEU 5.jpg',
		    src: 'Image/M&V/music/YEU 5.flac'
		},
		{
		    title: 'Whisper_Of_The_Heart',
		    artist: 'ECHORISE',
		    cover: 'Image/M&V/music/Whisper_Of_The_Heart.jpg',
		    src: 'Image/M&V/music/Whisper_Of_The_Heart_-_ECHORISE.flac'
		},
		{
		    title: 'WAKE_UP!',
		    artist: 'Dragangz',
		    cover: 'Image/M&V/music/WAKE_UP!.jpg',
		    src: 'Image/M&V/music/WAKE_UP!_(Sped_Up)_-_Dragangz.flac'
		},
		{
		    title: 'Two_Different_Worlds',
		    artist: 'KoruSe,mzmff',
		    cover: 'Image/M&V/music/Two_Different_Worlds.jpg',
		    src: 'Image/M&V/music/Two_Different_Worlds_-_KoruSe,mzmff.flac'
		},
		{
		    title: 'Thank You',
		    artist: '怪我太痴迷',
		    cover: 'Image/M&V/music/Thank You.jpg',
		    src: 'Image/M&V/music/Thank You - VGod,怪我太痴迷.flac'
		},
		{
		    title: 'Take_a_Walk',
		    artist: 'Passion_Pit',
		    cover: 'Image/M&V/music/Take a Walk.jpg',
		    src: 'Image/M&V/music/Take_a_Walk_-_Passion_Pit.flac'
		},
		{
		    title: 'Shooting_Star',
		    artist: 'Anna_Yvette',
		    cover: 'Image/M&V/music/Shooting_Star.jpg',
		    src: 'Image/M&V/music/Shooting_Star_-_Anna_Yvette.flac'
		},
		{
		    title: 'Resonance',
		    artist: 'Home',
		    cover: 'Image/M&V/music/Resonance.jpg',
		    src: 'Image/M&V/music/Resonance - Home.flac'
		},
		{
		    title: 'RAIN',
		    artist: 'Ben_Platt',
		    cover: 'Image/M&V/music/RAIN.jpg',
		    src: 'Image/M&V/music/RAIN_-_Ben_Platt.flac'
		},
		{
		    title: 'Last_Goodbye',
		    artist: 'Union_J',
		    cover: 'Image/M&V/music/Last Goodbye.jpg',
		    src: 'Image/M&V/music/Last_Goodbye_-_Union_J.flac'
		},
		{
		    title: 'Good Things',
		    artist: 'NINE PERCENT',
		    cover: 'Image/M&V/music/Good Things.jpg',
		    src: 'Image/M&V/music/Good Things - NINE PERCENT.flac'
		},
		{
		    title: 'Forever_Beat',
		    artist: 'Twillights_Dusk',
		    cover: 'Image/M&V/music/Forever_Beat.jpg',
		    src: 'Image/M&V/music/Forever_Beat_-_Twillights_Dusk.flac'
		},
		{
		    title: 'EEYUH!_x_Fluxxwave',
		    artist: 'Clovis_Reyes,HR,Irokz',
		    cover: 'Image/M&V/music/EEYUH!_x_Fluxxwave.jpg',
		    src: 'Image/M&V/music/EEYUH!_x_Fluxxwave_-_Clovis_Reyes,HR,Irokz.flac'
		},
		{
		    title: 'DOWN!',
		    artist: 'AIR_ALERT',
		    cover: 'Image/M&V/music/DOWN.jpg',
		    src: 'Image/M&V/music/DOWN!_-_AIR_ALERT.flac'
		},
		{
		    title: 'Cry_For_Me_(feat._Ami)',
		    artist: 'Michita',
		    cover: 'Image/M&V/music/Cry_For_Me.jpg',
		    src: 'Image/M&V/music/Cry_For_Me_(feat._Ami)_-_Michita.flac'
		},
		{
		    title: 'Better',
		    artist: 'Hugel',
		    cover: 'Image/M&V/music/Better.jpg',
		    src: 'Image/M&V/music/Better.flac'
		},
        // 添加更多音乐...
    ];

    // 视频列表数据
    const videoList = [
        {
            title: '银翼杀手2049',
            src: 'Image/M&V/video/银翼杀手2049.mp4',
            thumbnail: 'Image/M&V/video/银翼杀手2049.jpg'
        },
		{
			title: '除三害',
			src: 'Image/M&V/video/除三害.mp4',
			thumbnail: 'Image/M&V/video/除三害.jpg'
		},
		{
			title: '干饭',
			src: 'Image/M&V/video/干饭.mp4',
			thumbnail: 'Image/M&V/video/干饭.jpg'
		},
		{
			title: '梅西',
			src: 'Image/M&V/video/梅西.mp4',
			thumbnail: 'Image/M&V/video/梅西.jpg'
		},
		{
			title: '司马懿',
			src: 'Image/M&V/video/司马懿.mp4',
			thumbnail: 'Image/M&V/video/司马懿.jpg'
		},
		{
			title: '打呼噜',
			src: 'Image/M&V/video/打呼噜.mp4',
			thumbnail: ''
		},
		{
			title: '吹牛逼呢',
			src: 'Image/M&V/video/吹牛逼呢.mp4',
			thumbnail: ''
		},
		{
			title: '骑行',
			src: 'Image/M&V/video/骑行.mp4',
			thumbnail: ''
		},
		{
			title: '河南话',
			src: 'Image/M&V/video/河南话.mp4',
			thumbnail: ''
		},
		{
			title: '沙和尚',
			src: 'Image/M&V/video/沙和尚.mp4',
			thumbnail: ''
		},
		{
			title: '空心',
			src: 'Image/M&V/video/空心.mp4',
			thumbnail: ''
		},
		{
			title: '跳枪',
			src: 'Image/M&V/video/跳枪.mp4',
			thumbnail: ''
		},
		{
			title: '下车',
			src: 'Image/M&V/video/下车.mp4',
			thumbnail: ''
		},
        // ... 其他视频数据 ...
    ];

    // 初始化音乐播放器
    function initMusicPlayer() {
        // 加载音乐列表
        musicList.forEach((music, index) => {
            const li = document.createElement('li');
            li.textContent = `${music.title} - ${music.artist}`;
            li.addEventListener('click', () => playMusic(index));
            musicPlaylist.appendChild(li);
        });

        // 进度条相关事件监听
        progressBar.addEventListener('click', handleProgressBarClick);
        progressBar.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', handleDragging);
        document.addEventListener('mouseup', stopDragging);

        // 播放控制事件监听
        playBtn.addEventListener('click', toggleMusic);
        prevBtn.addEventListener('click', playPrevMusic);
        nextBtn.addEventListener('click', playNextMusic);
        
        // 音量控制
        volumeSlider.addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value / 100;
        });

        // 进度更新
        audioPlayer.addEventListener('timeupdate', updateMusicProgress);
        
        // 音乐结束时播放下一首
        audioPlayer.addEventListener('ended', playNextMusic);

        // 加载第一首歌
        loadMusic(0);
    }

    // 初始化视频播放器
    function initVideoPlayer() {
        // 加载视频列表
        videoList.forEach((video, index) => {
            const li = document.createElement('li');
            li.textContent = video.title;
            li.addEventListener('click', () => playVideo(index));
            videoPlaylist.appendChild(li);
        });

        // 播放/暂停按钮事件
        videoPlayBtn.addEventListener('click', toggleVideo);
        
        // 音量控制
        videoVolumeSlider.addEventListener('input', (e) => {
            videoPlayer.volume = e.target.value / 100;
        });

        // 全屏按钮事件
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        // 视频进度更新
        videoPlayer.addEventListener('timeupdate', updateVideoProgress);

        // 加载第一个视频
        loadVideo(0);
    }

    // 音乐播放器功能
    function loadMusic(index) {
        const music = musicList[index];
        audioPlayer.src = music.src;
        albumCover.src = music.cover;
        songTitle.textContent = music.title;
        artistName.textContent = music.artist;
        currentMusicIndex = index;
        updatePlaylistSelection(musicPlaylist, index);
    }

    function toggleMusic() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function playMusic(index) {
        loadMusic(index);
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function playPrevMusic() {
        const newIndex = (currentMusicIndex - 1 + musicList.length) % musicList.length;
        playMusic(newIndex);
    }

    function playNextMusic() {
        const newIndex = (currentMusicIndex + 1) % musicList.length;
        playMusic(newIndex);
    }

    function updateMusicProgress() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        musicProgress.style.width = `${progress}%`;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        totalTimeSpan.textContent = formatTime(audioPlayer.duration);
    }

    // 视频播放器功能
    function loadVideo(index) {
        const video = videoList[index];
        videoPlayer.src = video.src;
        videoPlayer.poster = video.thumbnail;
        currentVideoIndex = index;
        updatePlaylistSelection(videoPlaylist, index);
    }

    function toggleVideo() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function playVideo(index) {
        loadVideo(index);
        videoPlayer.play();
        videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function updateVideoProgress() {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        videoProgress.style.width = `${progress}%`;
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // 进度条控制函数
    function handleProgressBarClick(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const progressPercentage = (clickPosition / rect.width) * 100;
        const newTime = (audioPlayer.duration * progressPercentage) / 100;
        
        if (!isNaN(newTime)) {
            audioPlayer.currentTime = newTime;
            musicProgress.style.width = `${progressPercentage}%`;
        }
    }

    function startDragging(e) {
        isDragging = true;
        progressBar.style.cursor = 'grabbing';
    }

    function handleDragging(e) {
        if (!isDragging) return;

        const rect = progressBar.getBoundingClientRect();
        let progressPercentage = ((e.clientX - rect.left) / rect.width) * 100;
        
        // 限制百分比在0-100之间
        progressPercentage = Math.max(0, Math.min(100, progressPercentage));
        
        // 更新进度条显示
        musicProgress.style.width = `${progressPercentage}%`;
        
        // 计算并更新当前时间
        const newTime = (audioPlayer.duration * progressPercentage) / 100;
        if (!isNaN(newTime)) {
            audioPlayer.currentTime = newTime;
        }
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            progressBar.style.cursor = 'pointer';
        }
    }

    // 工具函数
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function updatePlaylistSelection(playlist, activeIndex) {
        const items = playlist.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            items[i].classList.toggle('active', i === activeIndex);
        }
    }

    // CSS样式更新
    progressBar.style.cursor = 'pointer';

    // 初始化播放器
    initMusicPlayer();
    initVideoPlayer();
});