import React from 'react';
import './not-found.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className='message-container'>
                <div className="message" style={{ backgroundColor: "#ff987c", color: "#871d00" }}>Oops :(</div>
            </div>
            <br />
            <div className='message-container'>
                <div className="message" style={{ backgroundColor: "#9a9cd4", color: "#382b76" }}>Not</div>
                <div className="message">Found{'/>'}</div>
            </div>

            <p>페이지를 찾을 수 없습니다</p>
        </div>
    );
}