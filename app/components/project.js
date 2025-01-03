import "../project/project.css"
import projectData from "../project/data";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import Spacer from '../components/spacer';
import IonIcon from '@reacticons/ionicons';
import { Squircle } from "@squircle-js/react";
import { useRouter } from "next/navigation";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function Project({ title, icon, summary, ...props }) {
    const data = projectData.find((project) => project.title === decodeURIComponent(title));
    const [isSelected, setIsSelected] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const screenshotsRef = useRef(null);
    const controlsTimerRef = useRef(null);

    const variants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    if (!data) return null;

    const scrollScreenshots = (direction) => {
        const { current: container } = screenshotsRef;
        const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const handleScreenshotsHover = (isHovering) => {
        if (isHovering) {
            setShowControls(true);
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        } else {
                setShowControls(false);
        }
    };

    useEffect(() => {
        return () => {
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isSelected) {
            disableBodyScroll(document.body);
            window.history.pushState({ overlay: true }, '');

            const handlePopState = () => {
                setIsSelected(false);
            };
            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        } else {
            enableBodyScroll(document.body);
        }

        return () => {
            enableBodyScroll(document.body);
        };
    }, [isSelected]);

    return (
        <>
            <motion.div
                layoutId={`card-${title}`}
                onClick={() => setIsSelected(true)}
            >
                <Squircle
              cornerRadius={15}
              cornerSmoothing={1} className="card card-1x1"
                    style={{
                        aspectRatio: 'unset',
                        cursor: 'pointer',
                        background: 'rgba(255, 255, 255, 0.05)',
                        paddingBottom: '10px'
                    }}>
                    <motion.b layoutId={`title-${title}`} className="card-title" style={{ fontSize: '16px' }}>
                        {title}
                    </motion.b>
                    <motion.p layoutId={`summary-${title}`} style={{ opacity: 0.6, fontSize: '15px', marginTop: '5px' }}>
                        {summary}
                    </motion.p>
                </Squircle>
            </motion.div>

            <AnimatePresence>
                {isSelected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="overlay-background"
                            onClick={() => setIsSelected(false)}
                        />
                        <main>


                            <motion.div
                                layoutId={`card-${title}`}
                                className="overlay-content"
                            >
                                <section className='content' style={{ padding: '20px' }}>

                                    <motion.div
                                        layoutId={`fixed-header-${title}`}
                                        className="fixed-header"
                                    >
                                        <div className='content'>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                <motion.img layoutId={`icon-${title}`} src={icon} />
                                                <motion.h2 layoutId={`title-${title}`} className='title'>{title}</motion.h2>
                                            </div>
                                            <Spacer y={15} />
                                            <motion.span layoutId={`summary-${title}`} style={{ opacity: .8 }}>{summary}</motion.span>
                                            <Spacer y={15} />
                                            {props.links && (
                                                <div className='modal-links'>
                                                    {props.links.map((link, i) => (
                                                        <a key={i} href={link.url} target='_blank'>{link.name}</a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                    </motion.div>
                                    <div
                                        className='incard-button modal-close'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsSelected(false);
                                        }}
                                    >
                                        <IonIcon name='close' />
                                    </div>

                                    <Spacer y={30} />

                                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                                        <div style={{ textAlign: 'center', width: '100%'}}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>기간</span>
                                            <h3>{data.date}</h3>
                                        </div>
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>상태</span>
                                            <h3>{data.status}</h3>
                                        </div>
                                        <div style={{ textAlign: 'center', width: '100%'}}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>참여 인원</span>
                                            <h3>{data.participants}</h3>
                                        </div>
                                    </div>

                                    <Spacer y={50} />
                                    <div className='screenshots-container'>
                                        <div 
                                            className='screenshots' 
                                            ref={screenshotsRef} 
                                            style={{ overflowX: 'auto', display: 'flex', overflowY: 'hidden' }}
                                            onMouseEnter={() => handleScreenshotsHover(true)}
                                            onMouseLeave={() => handleScreenshotsHover(false)}
                                        >
                                            {showControls && (
                                                <>
                                                    <button 
                                                        className='scroll-btn-left' 
                                                        onClick={() => scrollScreenshots('left')}
                                                        style={{
                                                            opacity: showControls ? 1 : 0,
                                                            transition: 'opacity 0.3s ease'
                                                        }}
                                                    >
                                                        <IonIcon name='chevron-back' />
                                                    </button>
                                                    <button 
                                                        className='scroll-btn-right' 
                                                        onClick={() => scrollScreenshots('right')}
                                                        style={{
                                                            opacity: showControls ? 1 : 0,
                                                            transition: 'opacity 0.3s ease'
                                                        }}
                                                    >
                                                        <IonIcon name='chevron-forward' />
                                                    </button>
                                                </>
                                            )}
                                            {data.image && data.image.map((img, i) => (
                                                <div key={i} style={{ 
                                                    position: 'relative', 
                                                    flexShrink: 0,
                                                    width: '30%',
                                                    marginRight: '20px'
                                                }}>
                                                    <img 
                                                        className='screenshot' 
                                                        src={img}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Spacer y={10} />
                                    <p className='scroll-to-visible' dangerouslySetInnerHTML={{ __html: data.desc }}></p>
                                    <Spacer y={50} />
                                </section>
                            </motion.div>
                        </main>
                    </>
                )}
            </AnimatePresence >
        </>
    );
}