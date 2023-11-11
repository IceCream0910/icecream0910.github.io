
import React from 'react';
import Spacer from "../components/spacer";
import { useState } from 'react';

const Mbti = () => {
    const [mbtiDesc, setMbtiDesc] = useState('이런 성격이에요');

    return (
        <div className="card card-1x1">
            저는 <b>{mbtiDesc}</b>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <h1 className="mbti" onMouseEnter={() => setMbtiDesc('조용하고 신중해요')}>I</h1>
                <h1 className="mbti" onMouseEnter={() => setMbtiDesc('새로움와 상상을 좋아해요')}>N</h1>
                <h1 className="mbti" onMouseEnter={() => setMbtiDesc('원칙적이고 논리적이에요')}>T</h1>
                <h1 className="mbti" onMouseEnter={() => setMbtiDesc('계획적이고 체계적이에요')}>J</h1>
            </div>

            <del style={{ fontSize: '13px', opacity: 0.5 }}>MBTI 4자에 모든걸 담을 수 없으니 재미로</del>
        </div>
    );
};

export default Mbti;
