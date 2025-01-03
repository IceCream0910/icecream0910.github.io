import React, { useEffect, useState, useRef } from 'react';
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
            const response = await fetch('/api/github/routine');
            const data = await response.text();
            const { morning, daytime, evening, night } = parseCommitTimes(data);

            setCommitStats({ morning, daytime, evening, night });
            const max = Math.max(morning, daytime, evening, night);
            setMaxText(max === morning ? '아침' : max === daytime ? '오후' : max === evening ? '저녁' : '밤과 새벽');

        } catch (error) {
            console.error('Error fetching commit data:', error);
            setCommitStats({ morning: 0, daytime: 0, evening: 0, night: 0 });
            setMaxText('...');
        }
    };

    function parseCommitTimes(text) {
        const patterns = {
            morning: /🌞 Morning.*?(\d+\.?\d*)%/,
            daytime: /🌆 Daytime.*?(\d+\.?\d*)%/,
            evening: /🌃 Evening.*?(\d+\.?\d*)%/,
            night: /🌙 Night.*?(\d+\.?\d*)%/
        };
    
        const result = {};
    
        for (const [timeOfDay, pattern] of Object.entries(patterns)) {
            const match = text.match(pattern);
            if (match) {
                result[timeOfDay] = parseFloat(match[1]);
            } else {
                result[timeOfDay] = 0;
            }
        }
    
        return result;
    }

    const SpeedometerGauge = () => {
        const containerRef = useRef(null);
        const [radius, setRadius] = useState(120);

        useEffect(() => {
            const updateSize = () => {
                if (containerRef.current) {
                    const container = containerRef.current.parentElement;
                    const maxSize = Math.min(
                        container.offsetWidth,
                        container.offsetHeight - 80 
                    );
                    setRadius(Math.max(Math.min(maxSize / 2, 120), 100));
                }
            };

            updateSize();
            window.addEventListener('resize', updateSize);
            return () => window.removeEventListener('resize', updateSize);
        }, []);

        const strokeWidth = radius * 0.2;
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
                        cursor: 'pointer',
                        filter: hoveredStat === timeOfDay ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                />
            );
        };

        let currentPercentage = 0;

        return (
            <div ref={containerRef} className='guage-container' style={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
                        fontSize: `${radius * 0.25}px`,
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
                        fontSize: `${radius * 0.12}px`,
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
                position: 'relative',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <div>
                주로 코딩하는 시간은<br />
                <b>{maxText}이에요.</b>
            </div>
            <div style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 0
            }}>
                <SpeedometerGauge />
            </div>
        </Squircle>
    );
};

export default Routine;
