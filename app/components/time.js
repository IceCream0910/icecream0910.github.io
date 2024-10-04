"use client";
import { useState, useEffect } from "react";
import Spacer from "../components/spacer";
import { Squircle } from "@squircle-js/react";

const Time = () => {
    const [time, setTime] = useState(new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000)));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Squircle
            cornerRadius={20}
            cornerSmoothing={1} className="card card-1x1 red" data-swapy-item="8">
            <svg width="20px" height="20px" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M105.92 1.13855C101.387 -0.379518 98.6132 -0.379518 94.0804 1.13855C84.3803 4.38722 83.5585 22.8208 85.8095 42.9072C85.9416 44.0866 84.0933 44.5841 83.6157 43.4977C75.4802 24.9952 65.5166 9.46461 55.4963 11.5238C50.814 12.4861 48.415 13.8783 45.2567 17.4665C38.5977 25.0317 46.7905 41.0192 58.5378 57.0231C59.239 57.9785 57.8891 59.3314 56.9322 58.6322C40.9025 46.9201 24.8971 38.7624 17.3465 45.438C13.7653 48.6042 12.3783 51.0062 11.4263 55.6907C9.40359 65.6442 24.7215 75.5038 43.0677 83.5669C44.1534 84.0441 43.6583 85.8917 42.4794 85.762C22.5597 83.5706 4.36414 84.4492 1.13855 94.0804C-0.379518 98.6132 -0.379518 101.387 1.13855 105.92C4.36414 115.551 22.5597 116.429 42.4794 114.238C43.6583 114.108 44.1534 115.956 43.0676 116.433C24.7214 124.496 9.4035 134.356 11.4262 144.309C12.3782 148.994 13.7652 151.396 17.3464 154.562C24.8969 161.238 40.9021 153.08 56.9317 141.368C57.8886 140.669 59.2385 142.022 58.5372 142.977C46.7901 158.981 38.5975 174.968 45.2564 182.533C48.4147 186.122 50.8137 187.514 55.496 188.476C65.5164 190.535 75.4802 175.004 83.6157 156.501C84.0934 155.415 85.9417 155.913 85.8096 157.092C83.5584 177.179 84.3802 195.613 94.0804 198.861C98.6132 200.38 101.387 200.38 105.92 198.861C115.62 195.613 116.442 177.178 114.19 157.091C114.058 155.912 115.907 155.414 116.384 156.501C124.52 175.004 134.484 190.535 144.504 188.476C149.187 187.514 151.586 186.122 154.744 182.533C161.403 174.968 153.21 158.981 141.463 142.977C140.762 142.022 142.112 140.669 143.069 141.368C159.098 153.08 175.103 161.238 182.654 154.562C186.235 151.396 187.622 148.994 188.574 144.309C190.597 134.356 175.279 124.496 156.933 116.433C155.847 115.956 156.342 114.108 157.521 114.238C177.441 116.429 195.636 115.551 198.861 105.92C200.38 101.387 200.38 98.6132 198.861 94.0804C195.636 84.4493 177.441 83.5706 157.521 85.7619C156.342 85.8916 155.847 84.0441 156.933 83.5669C175.279 75.5038 190.597 65.6442 188.574 55.6907C187.622 51.0062 186.235 48.6042 182.654 45.438C175.103 38.7624 159.098 46.9201 143.068 58.6322C142.111 59.3313 140.761 57.9785 141.463 57.0231C153.21 41.0192 161.403 25.0317 154.744 17.4665C151.585 13.8783 149.186 12.4861 144.504 11.5238C134.484 9.46457 124.52 24.9957 116.384 43.4987C115.907 44.585 114.058 44.0875 114.19 42.9082C116.442 22.8214 115.62 4.38727 105.92 1.13855Z"></path></svg>
            <Spacer y={5} />
            <h4>지금, <b>Seoul</b>은</h4>
            <h1>{time.toLocaleTimeString('en', { hour12: true, hour: '2-digit', minute: '2-digit' })}</h1>
            <div className="content" style={{ opacity: .7 }}>
                <AnalogClock time={time} />
            </div>
        </Squircle>
    );
};

export default Time;

const AnalogClock = ({ time }) => {
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

    return (
        <div style={{ position: "relative", bottom: "0px", right: "0px" }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="1" transform={`rotate(${secondDegrees} 50 50)`} />
                <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="4" transform={`rotate(${minuteDegrees} 50 50)`} />
                <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="4" transform={`rotate(${hourDegrees} 50 50)`} />
                {Array.from({ length: 12 }).map((_, index) => {
                    const angle = (index + 1) * (360 / 12);
                    const x = 50 + Math.sin(angle * (Math.PI / 180)) * 45;
                    const y = 50 - Math.cos(angle * (Math.PI / 180)) * 45;
                    return <circle key={index} cx={x} cy={y} r="1" fill="currentColor" />;
                })}
            </svg>
        </div>
    );
};
