import "../project/project.css"
import projectData from "../project/data";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import Spacer from '../components/spacer';
import IonIcon from '@reacticons/ionicons';
import { Squircle } from "@squircle-js/react";

export default function Project({ title, icon, summary, directLink, ...props }) {
    const data = projectData.find((project) => project.title === decodeURIComponent(title));
    const [isSelected, setIsSelected] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const screenshotsRef = useRef(null);
    const controlsTimerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const modalRef = useRef(null);

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
            document.body.style.overflow = 'hidden';
            document.getElementById('main-section').style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.getElementById('main-section').style.overflow = 'auto';
        }
    }, [isSelected]);

    useEffect(() => {
        setIsReady(true);
        return () => setIsReady(false);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <motion.div
                layoutId={`card-${title}`}
                onClick={() => {
                    if (directLink) window.open(directLink, '_blank');
                    else setIsSelected(true);
                }}
                initial={false}
                layout
            >
                <Squircle
                    cornerRadius={15}
                    cornerSmoothing={1} className="card card-1x1"
                    style={{
                        aspectRatio: 'unset',
                        cursor: 'pointer',
                        background: 'var(--card-tonal)',
                        padding: '15px 20px 20px 20px'
                    }}>
                    <motion.b layoutId={`title-${title}`} className="card-title" style={{ fontSize: '16px', margin: 0 }}>
                        {title}
                        {directLink && <IonIcon name='arrow-forward-outline' style={{ marginLeft: '5px', fontSize: '16px', opacity: .6, position: 'relative', top: '3px', transform: 'rotate(-45deg)' }} />}
                    </motion.b>
                    <motion.p layoutId={`summary-${title}`} style={{ opacity: 0.6, fontSize: '15px', margin: 0, marginTop: '5px' }}>
                        {summary}
                    </motion.p>
                </Squircle>
            </motion.div>

            <AnimatePresence mode="wait">
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
                                ref={modalRef}
                                layoutId={`card-${title}`}
                                className="overlay-content"
                                style={{
                                    maxHeight: '100vh',
                                    overflowY: 'auto'
                                }}
                            >
                                <section className='content' style={{ padding: '20px' }}>

                                    <motion.div
                                        layoutId={`fixed-header-${title}`}
                                        className="fixed-header"
                                    >
                                        <div className='content'>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                {icon && <motion.img layoutId={`icon-${title}`} src={icon} />}
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
                                        {data.info && data.info.map((info, i) => (
                                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span style={{ fontSize: '14px', opacity: 0.6 }}>{info.name}</span>
                                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{info.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Spacer y={30} />
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
                                                <div key={i} className="screenshot-wrap" style={{
                                                    position: 'relative',
                                                    flexShrink: 0,
                                                    marginRight: '20px'
                                                }}>
                                                    <img
                                                        className='screenshot'
                                                        src={img}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            borderRadius: '15px',
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Spacer y={10} />
                                    <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
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