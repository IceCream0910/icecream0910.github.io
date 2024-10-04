
import React from 'react';
import Spacer from "../components/spacer";
import { useState } from 'react';
import { Squircle } from "@squircle-js/react";

const Mbti = () => {
    const [mbtiDesc, setMbtiDesc] = useState('이런 성격이에요');

    return (
        <Squircle
            cornerRadius={20}
            cornerSmoothing={1} className="card card-1x1 mint" data-swapy-item="6">
            저는 <b>{mbtiDesc}</b><br />
            <del style={{ fontSize: '11px', opacity: 0.5 }}>MBTI 4자에 모든걸 담을 수 없으니 재미로</del>

            <div className='content' style={{ right: '25px', bottom: "15px" }}>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em' }} onMouseEnter={() => setMbtiDesc('조용하고 신중해요')}>I</h1>
                    <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em' }} onMouseEnter={() => setMbtiDesc('새로움와 상상을 좋아해요')}>N</h1>
                    <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em' }} onMouseEnter={() => setMbtiDesc('원칙적이고 논리적이에요')}>T</h1>
                    <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em' }} onMouseEnter={() => setMbtiDesc('계획적이고 체계적이에요')}>J</h1>
                </div>
            </div>
        </Squircle>
    );
};

export default Mbti;
