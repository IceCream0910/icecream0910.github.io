import React, { useState, useEffect, useRef } from 'react';
import { Squircle } from "@squircle-js/react";
import Spacer from "../components/spacer";

const Contribution = () => {
    const [data, setData] = useState({
        total: {
            "2024": 0
        },
        contributions: []
    });
    const containerRef = useRef(null);
    const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

    useEffect(() => {
        fetch('https://github-contributions-api.jogruber.de/v4/icecream0910')
            .then(res => res.json())
            .then(data => {
                const ago = new Date();
                ago.setDate(ago.getDate() - 186);

                const recentContributions = data.contributions.filter(contribution => {
                    const contributionDate = new Date(contribution.date);
                    return contributionDate >= ago;
                });

                setData({
                    ...data,
                    contributions: recentContributions
                });
            });
    }, []);

    const getLevelColor = (level) => {
        switch (level) {
            case 0: return '#ebedf0';
            case 1: return '#9be9a8';
            case 2: return '#40c463';
            case 3: return '#30a14e';
            case 4: return '#216e39';
            default: return '#ebedf0';
        }
    };

    const handleMouseEnter = (e, day) => {
        const date = day.date ? new Date(day.date) : null;
        if (date) {
            const dateString = `${date.getMonth() + 1}월 ${date.getDate()}일: ${day.count}개`;
            const rect = e.target.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top;

            setTooltip({
                show: true,
                text: dateString,
                x,
                y
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip({ show: false, text: '', x: 0, y: 0 });
    };

    const renderYearlyStats = () => {
        const currentYear = new Date().getFullYear().toString();
        return (
            <div style={{ marginBottom: '16px', fontSize: '14px' }}>
                {currentYear}년에 {data.total[currentYear]}개의 잔디를 심었어요.
            </div>
        );
    };

    const renderContributionGraph = () => {
        const gridCount = 14;
        const cellSize = 18;
        const cells = [...data.contributions].slice(0, 196);
        const rows = [];

        for (let i = 0; i < gridCount; i++) {
            const row = [];
            for (let j = 0; j < gridCount; j++) {
                const index = i * gridCount + j;
                const contribution = cells[index] || { level: 0, count: 0, date: '' };
                row.push(contribution);
            }
            rows.push(row);
        }

        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridCount}, ${cellSize}px)`,
                gap: '3px',
                justifyContent: 'center',
                width: '100px'
            }}>
                {rows.flat().map((day, index) => (
                    <div
                        key={index}
                        style={{
                            width: `${cellSize}px`,
                            height: `${cellSize}px`,
                            backgroundColor: getLevelColor(day.level),
                            borderRadius: '4px',
                            transition: 'background-color 0.2s',
                            cursor: day.date ? 'pointer' : 'default'
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
        );
    };

    return (
        <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            className="card card-1x1"
        >
            <div style={{ position: 'absolute', top: 0, left: 0, padding: '5px', zIndex: 99, width: '100%' }} data-swapy-handle>
                <div style={{ border: '0.5px solid #a9a9a940', borderRadius: '15px', width: '100%', backgroundColor: 'var(--blur)', backdropFilter: 'blur(5px)', padding: '10px 15px 0px 15px' }}>
                    <Spacer y={5} />
                    <b>Github Contributions</b>
                    <Spacer y={5} />
                    <span style={{ opacity: 0.7, fontSize: '15px' }}>
                        {renderYearlyStats()}
                    </span>
                </div>
            </div>

            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    opacity: .3
                }}
            >
                <div style={{
                    position: 'relative',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {renderContributionGraph()}
                    {tooltip.show && (
                        <div
                            style={{
                                position: 'absolute',
                                left: `${tooltip.x}px`,
                                top: `${tooltip.y - 30}px`,
                                transform: 'translateX(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '13px',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                zIndex: 1000
                            }}
                        >
                            {tooltip.text}
                        </div>
                    )}
                </div>
            </div>
        </Squircle>
    );
};

export default Contribution;
