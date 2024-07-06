"use client";
import './project.css'
import projectData from "../data";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Spacer from '../../components/spacer';
import IonIcon from '@reacticons/ionicons';

export default function ProjectPage(props) {
  const router = useRouter();
  const data = projectData.find((project) => project.title === decodeURIComponent(props.params.title));
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const screenshotsRef = useRef(null);

  if (!data) return null;

  const checkScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = screenshotsRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 100);
  };

  useEffect(() => {
    checkScrollButtons();
    // Optional: Debounce this if it's too sensitive or adds performance issues
    const handleScroll = () => checkScrollButtons();
    const container = screenshotsRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollScreenshots = (direction) => {
    const { current: container } = screenshotsRef;
    const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <main>
      <div className='fixed-header'>
        <div className='content'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={data.icon} />
            <h2 className='title'>{data.title}</h2>
          </div>
          <Spacer y={15} />
          <span style={{ opacity: .8 }}>{data.summary}</span>
          <Spacer y={15} />
          {data.links && <div className='modal-links'>
            {data.links.map((link, i) => <a key={i} style={{ marginRight: '10px', opacity: 0.9, fontSize: '15px' }} href
              ={link.url} target='_blank'>{link.name}</a>)}
          </div>}
        </div>

        <div className='incard-button modal-close' onClick={() => router.replace('/#projects')}><IonIcon name='close' /></div>
      </div>

      <section className='content' style={{ padding: '20px' }}>
        <Spacer y={180} />
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
    </main >
  );
}