
import React, { useEffect } from 'react';
import Spacer from "../components/spacer";
import { useState, useRef } from "react";
import { prominent } from 'color.js'
import IonIcon from '@reacticons/ionicons';

const Music = () => {

    const audioPlayer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [data, setData] = useState([]);
    const [color, setColor] = useState('rgb(255, 205, 41)');
    const [color2, setColor2] = useState('rgb(255, 205, 41)');
    const [image, setImage] = useState('')
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/music/recent');
            const data = await response.json();
            setData(data.data[0].attributes);
        };

        fetchData();

        const interval = setInterval(fetchData, 180000); // Fetch every 3 minutes

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (data.length === 0) return;
        setImage(data.artwork.url.replace('{w}x{h}', '1000x1000'))
        setArtist(data.artistName)
        setTitle(data.name)
        setUrl(data.previews[0].url)

        prominent(data.artwork.url.replace('{w}x{h}', '1000x1000'), { amount: 2 }).then(colors => {
            const cssColor1 = `rgb(${colors[0].join(', ')})`;
            const rgbValues = cssColor1.match(/\d+/g).map(Number);
            const cssColor2 = `rgb(${rgbValues.map(value => 255 - value).join(', ')})`;
            setColor(cssColor1)
            setColor2(cssColor2)

        })
    }, [data])

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
    };

    const handleTimeUpdate = () => {
        const audio = audioPlayer.current;
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
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
                opacity: '0.3',
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

            <span style={{
                position: 'absolute',
                bottom: '70px',
                left: '20px', zIndex: '1'
            }}>
                <b>{title}</b><br></br>
                <span style={{ opacity: 0.8, fontSize: '15px' }}>{artist}</span>
            </span>

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
        </div >
    );
};

export default Music;
