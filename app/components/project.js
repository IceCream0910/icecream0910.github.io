import React, { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import Spacer from './spacer';
import Image from 'next/image';

const Project = ({ title, summary, desc, links, date, icon, image }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (<>
        <div className="card card-1x1" onClick={() => setIsOpen(true)}>
            <h1>{title}</h1>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
                {summary}
            </span>
            {image && <img className="image" src={icon} width={100} height={100} />}

            <div className="content" style={{ left: '20px', right: 'unset' }}>
                <div className='incard-button' style={{ opacity: .5 }}>
                    <IonIcon name="add" />
                </div>
            </div>
        </div>

        {isOpen && <div className='modal-container'>
            <div className='modal-backdrop' onClick={() => setIsOpen(false)}></div>
            <div className='modal' >
                <div className='modal-content'>
                    <div className='incard-button modal-close' onClick={() => setIsOpen(false)}><IonIcon name='close' /></div>
                    <h1>{title}</h1>
                    <span style={{ opacity: 0.7, fontSize: '15px' }}>{summary}</span>
                    <Spacer y={20} />
                    <span style={{ opacity: 0.8, fontSize: '15px' }}>{date}</span>
                    <Spacer y={5} />
                    {links && <div className='modal-links'>
                        {links.map((link, i) => <a key={i} style={{ marginRight: '10px', opacity: 0.9, fontSize: '15px' }} href
                            ={link.url} target='_blank'>{link.name}</a>)}
                    </div>}
                    <Spacer y={20} />
                    <img src={image} className='modal-image' />
                    <Spacer y={10} />
                    <p dangerouslySetInnerHTML={{ __html: desc }}></p>
                    <Spacer y={50} />
                </div>
            </div>
        </div>}

    </>
    );

};

export default Project;
