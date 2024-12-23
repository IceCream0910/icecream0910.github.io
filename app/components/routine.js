import React, { useEffect, useState } from 'react';
import { Squircle } from "@squircle-js/react";

const Routine = () => {
    const [commitStats, setCommitStats] = useState({
        morning: 0,
        daytime: 0,
        evening: 0,
        night: 0
    });
    const [maxText, setMaxText] = useState('');
    const [hoveredStat, setHoveredStat] = useState(null);

    useEffect(() => {
        fetchCommitData();
    }, []);

    const fetchCommitData = async () => {
        try {
            const response = await fetch('https://gist.githubusercontent.com/IceCream0910/07bf65d3a9488bcabb2e9de9e6a6264a/raw/6afa7db086e71497a71d10f17910edf6c7f7f478/I%27m%2520a%2520night%2520%25F0%259F%25A6%2589');
            const data = await response.text();

            const morning = parseFloat(data.match(/Morning.*?(\d+\.?\d*)%/)[1]);
            const daytime = parseFloat(data.match(/Daytime.*?(\d+\.?\d*)%/)[1]);
            const evening = parseFloat(data.match(/Evening.*?(\d+\.?\d*)%/)[1]);
            const night = parseFloat(data.match(/Night.*?(\d+\.?\d*)%/)[1]);

            setCommitStats({ morning, daytime, evening, night });
            const max = Math.max(morning, daytime, evening, night);
            setMaxText(max === morning ? '아침' : max === daytime ? '오후' : max === evening ? '저녁' : '밤과 새벽');
        } catch (error) {
            console.error('Error fetching commit data:', error);
        }
    };

    const SpeedometerGauge = () => {
        const radius = 120;
        const strokeWidth = 25;
        const normalizedRadius = radius - strokeWidth / 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        const colors = {
            morning: '#9cc9e6',
            daytime: '#FFD700',
            evening: '#ff9fb1',
            night: '#1d1a5e'
        };

        const createArc = (startPercentage, percentage, timeOfDay) => {
            const arcLength = (percentage / 100) * (circumference * 0.8);
            const rotation = 180 + (startPercentage / 100) * 290;

            return (
                <circle
                    key={timeOfDay}
                    stroke={colors[timeOfDay]}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${arcLength} ${circumference}`}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    onMouseEnter={() => setHoveredStat(timeOfDay)}
                    onMouseLeave={() => setHoveredStat(null)}
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: '50% 50%',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        filter: hoveredStat === timeOfDay ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                />
            );
        };

        let currentPercentage = 0;

        return (
            <div className='guage-container' style={{ position: 'relative' }}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    style={{
                        transform: 'rotate(-55deg)',
                        filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))'
                    }}
                >
                    <circle
                        stroke="#E3F2FD"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        strokeDasharray={`${circumference * 0.8} ${circumference}`}
                        style={{
                            transform: 'rotate(180deg)',
                            transformOrigin: '50% 50%'
                        }}
                    />
                    {createArc(currentPercentage, commitStats.morning, 'morning')}
                    {createArc(currentPercentage += commitStats.morning, commitStats.daytime, 'daytime')}
                    {createArc(currentPercentage += commitStats.daytime, commitStats.evening, 'evening')}
                    {createArc(currentPercentage += commitStats.evening, commitStats.night, 'night')}
                </svg>

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                }}>
                    <span style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '4px'
                    }}>
                        {hoveredStat ?
                            `${commitStats[hoveredStat]}%` :
                            `${commitStats[Object.entries(commitStats).reduce((a, b) => commitStats[a] > commitStats[b] ? a : b[0])]}%`
                        }
                    </span>
                    <span style={{
                        fontSize: '14px',
                        opacity: 0.8,
                        fontWeight: '500'
                    }}>
                        {hoveredStat ?
                            (hoveredStat === 'morning' ? '아침' :
                                hoveredStat === 'daytime' ? '오후' :
                                    hoveredStat === 'evening' ? '저녁' :
                                        '밤과 새벽') :
                            maxText
                        }
                    </span>
                </div>
            </div>
        );
    };

    return (
        <Squircle
            className='card card-1x1'
            cornerRadius={20}
            cornerSmoothing={1}
            style={{
                position: 'relative'
            }}
        >
            <div style={{
                marginBottom: '20px'
            }}>
                주로 코딩하는 시간은<br />
                <b>{maxText}이에요.</b>
            </div>
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px'
            }}>
                <SpeedometerGauge />
            </div>
        </Squircle>
    );
};

export default Routine;
