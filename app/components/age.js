import React, { useState, useEffect } from 'react';

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
        <div className="card card-1x1">
            저는 <b>{birth.toString().slice(0, 4)}년생,</b>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'end' }}>
                <h1 className="mbti" style={{ fontWeight: 100 }}>{age}</h1>
                <span style={{ marginBottom: '5px' }}>살이죠.</span>
            </div>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>(만 나이 기준)</span>
        </div>
    );
};

export default Age;
