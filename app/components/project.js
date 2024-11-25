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
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const screenshotsRef = useRef(null);

    const variants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    if (!data) return null;

    const checkScrollButtons = () => {
        const { scrollLeft, scrollWidth, clientWidth } = screenshotsRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 100);
    };

    useEffect(() => {
        if (!screenshotsRef.current) return;
        checkScrollButtons();
        // Optional: Debounce this if it's too sensitive or adds performance issues
        const handleScroll = () => checkScrollButtons();
        const container = screenshotsRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [screenshotsRef.current]);

    const scrollScreenshots = (direction) => {
        const { current: container } = screenshotsRef;
        const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

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
                    cornerRadius={20}
                    cornerSmoothing={1} className="card card-1x1"
                    style={{
                        aspectRatio: 'unset',
                        cursor: 'pointer',
                    }}>
                    <motion.h3 layoutId={`title-${title}`} className="card-title">
                        {title}
                    </motion.h3>
                    <motion.p layoutId={`summary-${title}`} style={{ opacity: 0.7, fontSize: '15px' }}>
                        {summary}
                    </motion.p>
                    <div className="content" style={{ right: '20px', top: '25px' }}>
                        <IonIcon name="add" />
                    </div>
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

                                    <div className='info-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-between' }}>
                                        <div style={{ textAlign: 'center', width: '33%' }}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>기간</span>
                                            <h3>{data.date}</h3>
                                        </div>
                                        <div style={{ textAlign: 'center', width: '33%' }}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>상태</span>
                                            <h3>{data.status}</h3>
                                        </div>
                                        <div style={{ textAlign: 'center', width: '33%' }}>
                                            <span style={{ opacity: .8, fontSize: '12px' }}>참여 인원</span>
                                            <h3>{data.participants}</h3>
                                        </div>
                                    </div>

                                    <Spacer y={50} />
                                    <div className='screenshots-container'>
                                        <div className='screenshots' ref={screenshotsRef} style={{ overflowX: 'auto', display: 'flex' }}>
                                            {showLeftButton && <button className='scroll-btn-left' onClick={() => scrollScreenshots('left')}><IonIcon name='chevron-back' /></button>}

                                            {data.image && data.image.map((img, i) => (
                                                <img className='screenshot' key={i} src={img} />
                                            ))}
                                            {showRightButton && <button className='scroll-btn-right' onClick={() => scrollScreenshots('right')}><IonIcon name='chevron-forward' /></button>}

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