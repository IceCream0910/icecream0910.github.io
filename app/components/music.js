
import React, { useEffect } from 'react';
import Spacer from "../components/spacer";
import { useState, useRef } from "react";
import { prominent } from 'color.js'
import IonIcon from '@reacticons/ionicons';

const Music = () => {
    const [data, setData] = useState([]);
    const [color, setColor] = useState('rgb(255, 205, 41)');
    const [color2, setColor2] = useState('rgb(255, 205, 41)');
    const [image, setImage] = useState('')
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/music/recent');
            const data = await response.json();
            setData(data.data[0].attributes);
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (data.length === 0) return;
        setImage(data.artwork.url.replace('{w}x{h}', '500x500'))
        setArtist(data.artistName)
        setTitle(data.name)
        setUrl(data.previews[0].url)

        prominent(data.artwork.url.replace('{w}x{h}', '500x500'), { amount: 2 }).then(colors => {
            const cssColor1 = `rgb(${colors[0].join(', ')})`;
            const rgbValues = cssColor1.match(/\d+/g).map(Number);
            const cssColor2 = `rgb(${rgbValues.map(value => 255 - value).join(', ')})`;
            setColor(cssColor1)
            setColor2(cssColor2)

        })
    }, [data]);

    return (
        <div className="card card-1x1" data-swapy-item="3" style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover' }}>
            <h4><b>최근에 들은 노래</b><span className='emoji'> 💿</span></h4>
            <div style={{ position: 'absolute', bottom: '0px', width: '100%', left: 0, padding: '10px' }}>

                <div style={{ padding: '20px 15px', borderRadius: '15px', width: '100%', backgroundColor: 'var(--blur)', backdropFilter: 'blur(5px)' }} data-swapy-handle>
                    <h3>{title}</h3>
                    <span style={{ opacity: 0.7, fontSize: '15px' }}>
                        {artist}
                    </span>
                </div>


                <div className="content" style={{ bottom: '25px', right: '25px', cursor: 'pointer' }} onClick={() => window.open("https://music.yuntae.in", "_blank")}>
                    <IonIcon name="add" />
                </div>
            </div>
        </div >
    );
};

export default Music;