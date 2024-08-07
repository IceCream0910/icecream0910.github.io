import IonIcon from '@reacticons/ionicons';
import React, { useState, useEffect } from 'react';
import Spacer from './spacer';

const LightSensor = ({ birth }) => {
    const [brightness, setBrightness] = useState(0);
    const [lux, setLux] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('/api/iot/lightSensor', { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setBrightness(data.components.main.relativeBrightness.brightnessIntensity.value);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!brightness) return;
        const luxRanges = [
            { min: 0, max: 1 },
            { min: 1, max: 20 },
            { min: 21, max: 80 },
            { min: 81, max: 250 },
            { min: 251, max: 800 },
            { min: 801, max: 3000 },
            { min: 3000, max: Infinity }
        ];

        const range = luxRanges[brightness - 1];
        const mid = (range.min + range.max) / 2;
        let randomLux = Math.floor(Math.random() * 40) + Math.floor(mid) - 10;
        if (randomLux < 0) {
            randomLux = 0;
        }

        setLux(randomLux);
    }, [brightness]);

    return (
        <div className="card card-1x1 pink-gradient" data-swapy-item="9">

            <IonIcon name="sunny" style={{ fontSize: '30px' }} />
            <Spacer y={5} />
            지금 내 방의 <b>밝기는</b><br />
            <div className='content' style={{ right: '25px', bottom: "25px", width: 'calc(100% - 50px)' }}>
                <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em', marginBottom: '20px' }}>{lux}<span style={{ fontWeight: '800', fontSize: '0.4em', marginLeft: '10px' }}>lux</span></h1>
                <div className="bar">
                    <div className='progress' style={{ width: `${brightness * 14.4857}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default LightSensor;
