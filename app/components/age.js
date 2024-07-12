import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Age = ({ birth }) => {
    const [age, setAge] = useState(0);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentDate = new Date().getDate();
        const birthYear = parseInt(birth.toString().slice(0, 4));
        const birthMonth = parseInt(birth.toString().slice(4, 6));
        const birthDate = parseInt(birth.toString().slice(6, 8));

        let calculatedAge = currentYear - birthYear + 1;
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate < birthDate)) {
            calculatedAge -= 2;
        } else {
            calculatedAge -= 1;
        }

        setAge(calculatedAge);
    }, [birth]);

    return (
        <div className="card card-1x1 purple">
            <b>{birth.toString().slice(0, 4)}년에 태어났고,<br /></b>제 나이는<br />
            <span style={{ fontSize: '12px', opacity: 0.5 }}>(만 나이 기준)</span>
            <div className='content' style={{ right: '25px', bottom: "15px" }}>
                <h1 className="mbti" style={{ fontWeight: 100, fontSize: '3em' }}>{age}세</h1>
            </div>
        </div>
    );
};

export default Age;
