
import React, { useEffect, useState } from 'react';
import Spacer from "../components/spacer";

const SolvedAc = () => {
    const [tier, setTier] = useState('');
    const [rating, setRating] = useState('');
    const [solvedCount, setSolvedCount] = useState('');
    const [maxStreak, setMaxStreak] = useState('');
    const [rank, setRank] = useState('');

    useEffect(() => {
        fetch('/api/solvedac', { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setTier(data.tier);
                setRating(data.rating);
                setSolvedCount(data.solvedCount);
                setMaxStreak(data.maxStreak);
                setRank(data.rank);
            })
    }, []);

    function convertTier(level) {
        const tierRankList = [
            'Bronze',
            'Silver',
            'Gold',
            'Platinum',
            'Diamond',
            'Ruby',
            'Master',
        ];
        const tierDivisionList = ['I', 'II', 'III', 'IV', 'V'];

        if (level) {
            const tierRank = tierRankList[Math.floor((level - 1) / 5)];
            const tierDivision = tierDivisionList[4 - ((level - 1) % 5)];

            if (tierRank === 'Master') {
                return tierRank;
            }
            return [tierRank, tierDivision].join(' ');
        }
        return 'Unrated';
    };



    return (
        <div className="card card-1x1">
            <a href="https://solved.ac/profile/taein2370" target='_blank' style={{ textDecoration: 'none' }}><b>solved.ac</b></a>
            <Spacer y={20} />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                <img style={{
                    width: '20%',
                    objectFit: 'cover',
                    borderRadius: '5px'
                }} src={`https://static.solved.ac/tier_small/${tier}.svg`}></img>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3><b>{convertTier(tier)}</b></h3>
                    <span style={{ opacity: 0.7 }}>{rating}</span>
                </div>
            </div>
            <Spacer y={20} />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ opacity: 0.7, fontSize: '13px' }}>전체 랭킹</span>
                    <h4><b>{rank}<span style={{ opacity: 0.7, fontSize: '13px' }}>위</span></b></h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ opacity: 0.7, fontSize: '13px' }}>푼 문제 수</span>
                    <h4><b>{solvedCount}<span style={{ opacity: 0.7, fontSize: '13px' }}>개</span></b></h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ opacity: 0.7, fontSize: '13px' }}>최대 연속 해결</span>
                    <h4><b>{maxStreak}<span style={{ opacity: 0.7, fontSize: '13px' }}>일</span></b></h4>
                </div>
            </div>

        </div >
    );
};

export default SolvedAc;
