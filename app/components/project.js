import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IonIcon from '@reacticons/ionicons';
import Spacer from './spacer';
import { Squircle } from "@squircle-js/react";

const Project = ({ title, summary, desc, links, date, icon, image }) => {
    const router = useRouter();
    return (<>
        <Squircle
            cornerRadius={20}
            cornerSmoothing={1} className="card card-1x1"
            onClick={() => {
                window.open('/project/' + encodeURIComponent(title));
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
        </Squircle>
    </>
    );

};

export default Project;
