import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IonIcon from '@reacticons/ionicons';
import Spacer from './spacer';


const Project = ({ title, summary, desc, links, date, icon, image }) => {
    const router = useRouter();
    return (<>
        <div className="card card-1x1"
            onClick={() => {
                router.push('/project/' + encodeURIComponent(title));
            }}
            style={{
                aspectRatio: 'unset',
                cursor: 'pointer',
            }}>
            <h3>{title}</h3>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
                {summary}
            </span>
            <div className="content" style={{ right: '20px', top: '25px' }}>
                <IonIcon name="add" />
            </div>
        </div>
    </>
    );

};

export default Project;
