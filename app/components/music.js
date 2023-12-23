
import React, { useEffect } from 'react';
import Spacer from "../components/spacer";
import { useState, useRef } from "react";
import { prominent } from 'color.js'

const Music = ({ title, artist, src, image }) => {

    const audioPlayer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [color, setColor] = useState('rgb(255, 205, 41)');
    const [color2, setColor2] = useState('rgb(255, 205, 41)')


    useEffect(() => {
        prominent(image, { amount: 2 }).then(colors => {
            const cssColor1 = `rgb(${colors[0].join(', ')})`;
            setColor(cssColor1);
            const cssColor2 = `rgb(${colors[1].join(', ')})`;
            setColor2(cssColor2);
        })
    }, [])

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
            <b style={{ position: 'absolute', zIndex: '1' }}>요즘 듣고 있는 음악</b>
            <Spacer y={150} />
            <audio ref={audioPlayer} style={{ display: 'none' }} onEnded={handleAudioEnd} onTimeUpdate={handleTimeUpdate}>
                <source src={src} />
            </audio>

            <span style={{
                position: 'absolute',
                bottom: '30px',
                left: '20px', zIndex: '1'
            }}>
                <b>{title}</b><br></br>
                <span style={{ opacity: 0.8, fontSize: '15px' }}>{artist}</span>
            </span>
            <div
                className="progress-bar"
                style={{
                    width: `${audioProgress}%`,
                    maxWidth: 'calc(100% - 40px)',
                    height: '3px',
                    backgroundColor: `${color2}`,
                    borderRadius: '10px',
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    filter: 'brightness(1.4)',
                }}
            />
            <div className='play-pause-button'
                style={{ opacity: 0.8 }}
                onClick={handlePlayPause}>
                {isPlaying ? "II" : "▶️"}
            </div>
        </div>
    );
};

export default Music;
