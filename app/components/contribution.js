import React, { useState, useEffect, useRef } from 'react';
import { Squircle } from "@squircle-js/react";
import Spacer from "../components/spacer";

const Contribution = () => {
    const [data, setData] = useState({
        total: 0,
        contributions: [],
        stats: {}
    });
    const containerRef = useRef(null);
    const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const svgRes = await fetch('/api/github/stats');
            const svgText = await svgRes.text();

            const totalStarsMatch = svgText.match(/Total Stars Earned:\s*<\/text>[\s\S]*?>(\d+)</);
            const totalCommitsMatch = svgText.match(/Total Commits.*?>(\d+)</);
            const totalPRsMatch = svgText.match(/Total PRs:\s*<\/text>[\s\S]*?>(\d+)</);
            const totalIssuesMatch = svgText.match(/Total Issues:\s*<\/text>[\s\S]*?>(\d+)</);
            const contributedMatch = svgText.match(/Contributed to \(last year\):<\/text>[\s\S]*?>(\d+)</);

            const newStats = {
                stars: totalStarsMatch ? parseInt(totalStarsMatch[1]) : 0,
                commits: totalCommitsMatch ? parseInt(totalCommitsMatch[1]) : 0,
                prs: totalPRsMatch ? parseInt(totalPRsMatch[1]) : 0,
                issues: totalIssuesMatch ? parseInt(totalIssuesMatch[1]) : 0,
                contributedLastYear: contributedMatch ? parseInt(contributedMatch[1]) : 0,
            };

            const res = await fetch('https://github-contributions-api.jogruber.de/v4/icecream0910');
            const jsonData = await res.json();
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 50);

            const last = jsonData.contributions
                .filter((c) => {
                    const d = new Date(c.date);
                    return d >= tenDaysAgo && d <= now;
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            setData({
                stats: newStats,
                contributions: last
            });
        };

        fetchData();
    }, []);

    const getLevelColor = (level) => {
        switch (level) {
            case 0: return '#c9c9c9';
            case 1: return '#c6e48b';
            case 2: return '#7bc96f';
            case 3: return '#239a3b';
            case 4: return '#196127';
            default: return '#c9c9c9';
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

    const renderStatsCard = () => {
        const { stats } = data;
        return (<>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    <b>{stats?.stars || 0}개</b>의 <span className='emoji'>⭐</span>를 받았어요.
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    <b>{stats?.prs || 0}건</b>의 Pull Request를 보냈어요.
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    <b>{stats?.issues || 0}건</b>의 이슈를 발행했어요.
                </div>
                </>
        );
    };

    const renderGraph = () => {
        const containerWidth = containerRef.current?.offsetWidth || 300;
        const cellSize = 18;
        const gap = 2;
        const columnsCount = Math.floor((containerWidth - 24) / (cellSize + gap));

        const rows = [];
        const contributions = [...data.contributions];
        while (contributions.length > 0) {
            rows.push(contributions.splice(0, columnsCount));
        }

        if (rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            while (lastRow.length < columnsCount) {
                lastRow.push({ level: 0, count: 0, date: '' });
            }
        }

        return (
            <div style={{position: 'absolute', bottom: 0, width: '100%', padding: '10px'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '12px'
                }}>
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
                                gap: '2px',
                                width: '100%'
                            }}
                        >
                            {row.map((day, i) => (
                                <div
                                    key={i}
                                    style={{
                                        backgroundColor: getLevelColor(day.level),
                                        borderRadius: '3px',
                                        transition: 'background-color 0.2s',
                                        cursor: day.date ? 'pointer' : 'default',
                                        width: '100%',
                                        aspectRatio: '1',
                                    }}
                                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            className="card card-1x1"
        >
            <b>Github Stats</b>
            <Spacer y={10} />
                {renderStatsCard()}

                <div
                    ref={containerRef}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {renderGraph()}
                    {tooltip.show && (
                        <div
                            style={{
                                position: 'absolute',
                                left: `${tooltip.x}px`,
                                top: `${tooltip.y + 80}px`,
                                transform: 'translateX(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                zIndex: 50
                            }}
                        >
                            {tooltip.text}
                        </div>
                    )}
                </div>
        </Squircle>
    );
};

export default Contribution;