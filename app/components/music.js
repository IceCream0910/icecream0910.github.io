import React, { useEffect, useState, useRef } from 'react';
import Spacer from "../components/spacer";
import IonIcon from '@reacticons/ionicons';
import { parseStringPromise } from 'xml2js';
import { prominent } from 'color.js'

const Music = () => {
    const audioPlayer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [data, setData] = useState([]);
    const [mediaId, setMediaId] = useState('');
    const [color, setColor] = useState('rgb(255, 205, 41)');
    const [color2, setColor2] = useState('rgb(255, 205, 41)');
    const [image, setImage] = useState('');
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [lyrics, setLyrics] = useState([]);
    const [currentLyric, setCurrentLyric] = useState('');
    const [nextLyric, setNextLyric] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/music/recent');
            const data = await response.json();
            setData(data.data[0].attributes);
            setMediaId(data.data[0].id);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;
        setImage(data.artwork.url.replace('{w}x{h}', '1000x1000'));
        setArtist(data.artistName);
        setTitle(data.name);
        setColor('#' + data.artwork.bgColor);
        setColor2('#' + data.artwork.textColor);
        searchYouTube(`${data.artistName} ${data.name} audio`);

        prominent(data.artwork.url.replace('{w}x{h}', '1000x1000'), { amount: 2 }).then(colors => {
            const cssColor1 = `rgb(${colors[0].join(', ')})`;
            const rgbValues = cssColor1.match(/\d+/g).map(Number);
            const cssColor2 = `rgb(${rgbValues.map(value => 255 - value).join(', ')})`;
            setColor(cssColor1)
            setColor2(cssColor2)

        })

        const fetchLyrics = async () => {
            const lyricsResponse = await fetch(`/api/music/lyrics/${mediaId}`);
            const lyricsData = await lyricsResponse.json();
            console.log(lyricsData);
            const ttml = lyricsData.data[0].attributes.ttml;
            parseLyrics(ttml);
        };

        fetchLyrics();
    }, [data]);

    const parseLyrics = async (ttml) => {
        const parsed = await parseStringPromise(ttml);
        const lyricsData = [];
        parsed.tt.body[0].div.forEach((div) => {
            div.p.forEach((p) => {
                lyricsData.push({
                    begin: parseTime(p.$.begin),
                    end: parseTime(p.$.end),
                    text: p._
                });
            });
        });
        setLyrics(lyricsData);
    };

    const searchYouTube = async (query) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&key=AIzaSyDvRGoK-YRlAW5UGjgQ7J-5LqkzIKpNIlc`);
        const data = await response.json();
        const videoId = data.items[0].id.videoId;
        const videoTitle = data.items[0].snippet.title.replaceAll('&#39;', '\'');
        const videoUrl = `https://youtu.be/${videoId}`;
        console.log(videoUrl, videoTitle);

        const audioResponse = await fetch(`https://metube.yuntae.in/audio_download/${encodeURIComponent(videoTitle)}.mp3?date=${new Date().getTime()}`, { cache: "no-store" });
        if (audioResponse.status !== 404) {
            setUrl(`https://metube.yuntae.in/audio_download/${encodeURIComponent(videoTitle)}.mp3`);
        } else {
            const addtoQueue = await fetch("https://metube.yuntae.in/add", {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Whale\";v=\"3\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"124\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\""
                },
                "referrer": "https://metube.yuntae.in/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `{\"url\":\"${videoUrl}\",\"quality\":\"128\",\"format\":\"mp3\",\"auto_start\":true}`,
                "method": "POST",
                "mode": "cors",
                "credentials": "omit"
            });
            setTimeout(() => {
                getAudio();
            }, 3000);
        }


        async function getAudio() {
            const audioResponse = await fetch(`https://metube.yuntae.in/audio_download/${encodeURIComponent(videoTitle)}.mp3?date=${new Date().getTime()}`, { cache: "no-store" });
            if (audioResponse.status !== 404) {
                setUrl(`https://metube.yuntae.in/audio_download/${encodeURIComponent(videoTitle)}.mp3`);
            } else {
                setTimeout(() => {
                    getAudio();
                }, 3000);
            }
        }
    };

    const parseTime = (timeStr) => {
        const timeArr = timeStr.split(':');
        let minutes = 0;
        let seconds = 0;
        if (timeArr.length === 2) {
            minutes = parseFloat(timeArr[0]);
            seconds = parseFloat(timeArr[1]);
        } else if (timeArr.length === 1) {
            seconds = parseFloat(timeArr[0]);
        }
        return minutes * 60 + seconds;
    };

    const handlePlayPause = () => {
        const audio = audioPlayer.current;
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleAudioEnd = () => {
        const audio = audioPlayer.current;
        audio.currentTime = 0;
        setIsPlaying(false);
        setAudioProgress(0);
        setCurrentLyric('');
    };

    const handleTimeUpdate = () => {
        const audio = audioPlayer.current;
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);

        // Update current lyric
        const currentTime = audio.currentTime;

        const currentIndex = lyrics.findIndex((lyric) => lyric.begin <= currentTime && lyric.end >= currentTime);
        if (currentIndex !== -1) {
            setCurrentLyric(lyrics[currentIndex].text);
            if (lyrics[currentIndex + 1]) {
                setNextLyric(lyrics[currentIndex + 1].text);
            } else {
                setNextLyric('');
            }
        }
    };

    return (
        <div className="card card-1x1">
            <audio ref={audioPlayer} onEnded={handleAudioEnd} onTimeUpdate={handleTimeUpdate} style={{ display: 'none' }} controls>
                <source key={url} src={url} type="audio/mpeg" />
            </audio>
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: `${isPlaying ? '0.1' : '0.3'}`,
                borderRadius: '20px',
                zIndex: '0'
            }} />
            <b style={{ position: 'absolute', zIndex: '1' }}>지금 듣고 있는 노래</b>
            <Spacer y={150} />

            <div
                className="progress-bar"
                style={{
                    width: `${audioProgress}%`,
                    maxWidth: 'calc(100% - 90px)',
                    height: '5px',
                    backgroundColor: `${color2}`,
                    borderRadius: '20px',
                    position: 'absolute',
                    bottom: '35px',
                    left: '70px',
                    filter: 'brightness(1.4)',
                }}
            />

            {!isPlaying && <span style={{
                position: 'absolute',
                bottom: '70px',
                left: '20px', zIndex: '1',
                maxWidth: 'calc(100% - 40px)',
            }}>
                <b>{title}</b><br></br>
                <span style={{ opacity: 0.8, fontSize: '15px' }}>{artist}</span>
            </span>}

            <div className='incard-button'
                style={{
                    position: 'absolute',
                    backgroundColor: `${color}`,
                    color: `${color2}`,
                    fontSize: '18px',
                    bottom: '20px',
                    left: '20px'
                }}
                onClick={handlePlayPause}>
                {isPlaying ? <IonIcon name="pause" /> : <IonIcon name="play" />}
            </div>

            {isPlaying && (
                <div style={{
                    position: 'absolute',
                    bottom: '70px',
                    left: '20px', zIndex: '1', fontWeight: 'bolder',
                    maxWidth: 'calc(100% - 40px)',
                }}>
                    {currentLyric}
                    <div style={{ opacity: 0.5 }}>{nextLyric}</div>
                </div>
            )}
        </div >
    );
};

export default Music;
