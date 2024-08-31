"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Spacer from "./components/spacer";
import IonIcon from '@reacticons/ionicons';
import Music from "./components/music";
import Contribution from "./components/contribution";
import Mbti from "./components/mbti";
import Age from "./components/age";
import SolvedAc from "./components/solvedAc";
import SkillSet from "./components/skillset";
import Project from "./components/project";
import LightSensor from "./components/lightSensor";
import Time from "./components/time";
import Media from "./components/media";
import projectData from "./project/data";
import { useRouter } from "next/navigation";
import { createSwapy } from '../swapy'

export default function Home() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 1231px)').matches && !navigator.userAgent.includes("Firefox")) {
      createSwapy(document.querySelector('.swapy-container'), {
        animation: 'spring'
      });
    }

    window.addEventListener('scroll', handleScroll);
    console.clear();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  return (
    <>
      {showHeader &&
        <header>
          <h3>윤태인</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="https://blog.yuntae.in" target="_blank">
              <IonIcon name="reader-outline" />
            </a>
            <a href="mailto:hey@yuntae.in">
              <IonIcon name="mail-outline" />
            </a>

            <a href="https://github.com/icecream0910" target="_blank">
              <IonIcon name="logo-github" />
            </a>
          </div>
        </header>
      }

      <section className="left">
        <Image src="/profile.png" width={100} height={100} style={{ marginLeft: '-10px' }} />
        <Spacer y={20} />
        <h1>윤태인&nbsp;<span style={{ fontSize: '15px', fontWeight: '100' }}>@icecream</span></h1>
        <Spacer y={20} />

        <a href="https://github.com/icecream0910" target="_blank">Github</a>
        <Spacer y={20} />
        <a href="https://blog.yuntae.in" target="_blank">Blog</a>
        <Spacer y={20} />
        <a href="mailto:hey@yuntae.in" target="_blank">hey@yuntae.in</a>
        <div id="only-pc" className="nav">
          <Spacer y={80} />
          <a href="#about">소개</a><Spacer y={20} />
          <a href="#github" id="only-pc">통계</a><Spacer y={20} />
          <a href="#projects">프로젝트</a>
        </div>
      </section>

      <section className="right" id="main-section">
        <h3 id="about"></h3>
        <div className="card-container swapy-container">
          <div className="card-1x1" data-swapy-slot="1">
            <div className="card card-1x1 green-gradient" data-swapy-item="1">
              <Image className="sticker" src="/stickers/star.svg" width={80} height={80} style={{ position: 'absolute', bottom: '20px', right: '20px', filter: 'invert(56%) sepia(29%) saturate(300%) hue-rotate(100deg) brightness(180%) contrast(90%)' }} />
              <h4>안녕하세요 <span className="emoji">👋</span><br /><b> 새로움</b>에 끊임없이 <b>도전</b>하는<br />개발자입니다.</h4>
            </div>
          </div>


          <div className="card-1x1" data-swapy-slot="2" style={{
            aspectRatio: 'unset'
          }}>
            <div className="card card-1x1" data-swapy-item="2"
            >
              이런 것들을 <Image src="/heart.png" width={17} height={15} style={{ position: 'relative', top: '2px' }} />해요.
              <Spacer y={20} />
              <h1 style={{ wordBreak: 'keep-all' }}><span className="tag blue">{`#코딩/>`}</span> #개발<br />
                #웹<span className="emoji">🌐</span> <span className="tag green">#UI/UX</span><br />
                <span className="tag yellow">#음악<span className="emoji">💿</span></span> #집<span className="emoji">🏠</span><br />#계획<span className="emoji">🗒️</span></h1>
            </div>
          </div>

          <div className="card-1x1" data-swapy-slot="3">
            <Music />
          </div>

          <div className="card-1x1" data-swapy-slot="4">
            <SkillSet />
          </div>

          <div className="card-1x1" data-swapy-slot="5">
            <Age birth={20050910} />
          </div>

          <div className="card-1x1" data-swapy-slot="6">
            <Mbti />
          </div>

          <div className="card-1x1" data-swapy-slot="7">
            <div className="card card-1x1" style={{ color: 'var(--yellow)' }} data-swapy-item="7">
              <b>My Motto</b>
              <Spacer y={20} />
              <span className="handwriting" style={{ textAlign: 'right' }}>오롯이 너만의 속도를 따라가야,<br></br>
                어떤 기류에도 흔들리지 않을테니까</span>
              <div className="content">
                <span style={{ fontSize: '12px', opacity: 0.5, float: 'right' }}>ㅡ ｢Airplane - IZ*ONE｣  중</span>
              </div>
            </div>
          </div>

          <div className="card-1x1" data-swapy-slot="8">
            <Time />
          </div>

          <div className="card-1x1" data-swapy-slot="10">
            <Media />
          </div>

        </div >

        <Spacer y={50} />
        <h3 id="github">&nbsp;&nbsp;&nbsp;통계 <span className="emoji">📂</span></h3><Spacer y={15} />
        <div className="card-container">

          <Contribution />
          <SolvedAc />

        </div>


        <Spacer y={80} />
        <h3 id="projects" >&nbsp;&nbsp;&nbsp;프로젝트 <span className="emoji">⚗️</span></h3><Spacer y={15} />

        <div className="card-container">
          {projectData.map((project, index) => (
            <Project onClick={() => sessionStorage.setItem(
              `__next_scroll_${window.history.state.idx}`,
              JSON.stringify({
                x: window.pageXOffset,
                y: window.pageYOffset,
              })
            )} key={index} {...project} />
          ))}

          <div className="card card-2x1" style={{ background: 'none', aspectRatio: 'unset' }}>
            더 많은 <span className="tag green">프로젝트+</span>
            <Spacer y={5} />
            <span className="tag yellow">뚝딱뚝딱</span> 예정
          </div>

        </div>



        <Spacer y={80} />

        <div className="card-container">
          <div className="card card-1x1"
            style={{ aspectRatio: 'unset' }}>
            <b>학력 <span className="emoji">🏫</span></b><Spacer y={15} />
            <div className="school-info">
              <div className="school">
                <span className="dot"></span>
                <div>
                  <h3>성일고등학교</h3>
                  <p>2021~2024 | 일반 인문계</p>
                </div>
              </div>
              <div className="line"></div>
              <div className="school">
                <span className="dot active"></span>
                <div>
                  <h3><span className="tag green" style={{ cursor: 'pointer' }} onClick={() => window.open('https://www.kw.ac.kr')}>→광운대학교</span></h3>
                  <p>2024~ | 소프트웨어학부</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-2x1" style={{ aspectRatio: 'unset' }}>
            <b>자격증 <span className="emoji">🪪</span></b><Spacer y={15} />
            <Spacer y={5} />
            <h3>
              <span className="tag blue">#정보처리기능사↙</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2017</span></h3>
            <Spacer y={5} />
            <h3><span className="tag pink">#컴퓨터활용능력_2급</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2016</span></h3>
            <Spacer y={5} />
            <h3><span className="tag yellow">#GTQ_그래픽기술자격_1급</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2017</span></h3>
          </div>

        </div>

        <Spacer y={80} />
      </section >
    </>
  )
}
