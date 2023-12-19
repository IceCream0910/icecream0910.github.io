
import React, { useEffect } from 'react';
import Spacer from "../components/spacer";
import { useState, useRef } from "react";
import { prominent } from 'color.js'

const Music = ({ title, artist, src, image }) => {

    const audioPlayer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [color, setColor] = useState('rgb(255, 205, 41)')

    useEffect(() => {
        prominent(image, { amount: 1 }).then(color => {
            const cssColor = `rgb(${color.join(', ')})`;
            setColor(cssColor);
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
        <div className="card card-1x1"
            style={{
                backgroundColor: `${color.replace("rgb", "rgba").replace(")", ", 0.5)")}`
            }}>
            <b>요즘 듣고 있는 음악</b>
            <Spacer y={20} />
            <img src={image} style={{ width: '50%', objectFit: 'cover', borderRadius: '20px' }} />
            <Spacer y={10} />
            <audio ref={audioPlayer} style={{ display: 'none' }} onEnded={handleAudioEnd} onTimeUpdate={handleTimeUpdate}>
                <source src={src} />
            </audio>
            <span >
                <b>{title}</b><br></br>
                <span style={{ opacity: 0.7, fontSize: '15px' }}>{artist}</span>
            </span>
            <div className='play-pause-button' onClick={handlePlayPause}>
                {isPlaying ? "II" : "▶️"}
            </div>
            <Spacer y={10} />
            <div
                className="progress-bar"
                style={{
                    width: `${audioProgress}%`,
                    maxWidth: 'calc(100% - 40px)',
                    height: '2px',
                    backgroundColor: `${color}`,
                }}
            />
        </div>
    );
};

export default Music;
