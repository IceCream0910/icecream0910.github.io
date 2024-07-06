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

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    // 페이지 이동 후 저장되어 있던 위치로 스크롤 복원
    const _scroll = sessionStorage.getItem(`__next_scroll_${window.history.state.idx}`);
    if (_scroll) {
      // 스크롤 복원 후 저장된 위치 제거
      const { x, y } = JSON.parse(_scroll);
      window.scrollTo(x, y);
      sessionStorage.removeItem(`__next_scroll_${window.history.state.idx}`);
    }
    if (router && router.events) {
      router.events.on('routeChangeComplete', routeChangeCompleteHandler);
      return () => {
        router.events.off('routeChangeComplete', routeChangeCompleteHandler);
      };
    } else {
      console.error('Router or router.events is undefined');
      return;
    }
  }, []);

  return (
    <>
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
        <div className="card-container">

          <div className="card card-1x1 purple" onClick={() => setIsOpen(true)}>
            <Image src="/stickers/star.svg" width={80} height={80} style={{ position: 'absolute', bottom: '20px', left: '20px' }} />
            <h4>새로움에 끊임없이 <b>도전</b>하는<b><br />개발자</b>입니다.</h4>
            <div className="content">
              <div className='incard-button'>
                <IonIcon name="add" />
              </div>
            </div>
          </div>

          <div className="card card-1x1"
            style={{
              aspectRatio: 'unset'
            }}>
            이런 것들을 <Image src="/heart.png" width={17} height={15} style={{ position: 'relative', top: '2px' }} />해요.
            <Spacer y={20} />
            <h1 style={{ wordBreak: 'keep-all' }}><span className="tag blue">{`#코딩/>`}</span> #개발<br />
              #웹🌐 <span className="tag green">#UI/UX</span><br />
              #노래🎧 #집🏠<br /><span className="tag pink">#계획🔨</span></h1>
          </div>

          <Music />

          <SkillSet />

          <Age birth={20050910} />

          <Mbti />

          <div className="card card-1x1 yellow">
            <b>My Motto</b>
            <Spacer y={20} />
            <span className="handwriting" style={{ textAlign: 'right' }}>오롯이 너만의 속도를 따라가야,<br></br>
              어떤 기류에도 흔들리지 않을테니까</span>
            <div className="content">
              <span style={{ fontSize: '12px', opacity: 0.5, float: 'right' }}>ㅡ ｢Airplane - IZ*ONE｣  중</span>
            </div>
          </div>


          <Time />

          <LightSensor />

          <Media />

        </div >

        <Spacer y={50} />
        <h3 id="github">&nbsp;&nbsp;&nbsp;통계 📂</h3><Spacer y={15} />
        <div className="card-container">

          <Contribution />
          <SolvedAc />

        </div>


        <Spacer y={80} />
        <h3 id="projects" >&nbsp;&nbsp;&nbsp;프로젝트 ⚗️</h3><Spacer y={15} />

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
            <b>학력 🏫</b><Spacer y={15} />
            <h3>성일고등학교&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>일반 인문계</span></h3>
            <h3><span className="tag green">→광운대학교</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>소프트웨어학부</span></h3>
          </div>

          <div className="card card-2x1" style={{ aspectRatio: 'unset' }}>
            <b>자격증 🪪</b><Spacer y={15} />
            <Spacer y={5} />
            <h3>
              <span className="tag blue">#정보처리기능사↙</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2017</span></h3>
            <Spacer y={5} />
            <h3><span className="tag pink">#컴퓨터활용능력_2급</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2016</span></h3>
            <Spacer y={5} />
            <h3><span className="tag yellow">#GTQ_그래픽기술자격_1급</span>&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>2017</span></h3>
          </div>

        </div>
        <div id="only-pc">
          <Spacer y={400} />
        </div>
      </section >

      {isOpen && <div className='modal-container'>
        <div className='modal-backdrop' onClick={() => setIsOpen(false)}></div>
        <div className='modal' >
          <div className='modal-content'>
            <div className='incard-button modal-close' onClick={() => setIsOpen(false)}><IonIcon name='close' /></div>
            <h1>새로움에 끊임없이 <b>도전</b>하는<b><br />개발자</b>입니다.</h1>
            <Spacer y={10} />

            <p style={{ fontSize: '15px', lineHeight: '1.5', wordBreak: 'keep-all' }}>사소한 아이디어일지라도 무언가를 기획하고 개발해 다른 사람이 편리하게 사용할 수 있는 <span className="underlined">서비스를 만드는 일에 설렘</span>을 느낍니다.
              <br /><br />새로운 기술이나 지식에 끊임없이 도전하고 배우며 팀원들과 <span className="underlined">함께 성장하는 개발자</span>가 되고 싶습니다.
            </p>
            <Spacer y={20} />
            <div className="card-container inmodal">

              <div className="card card-1x1 blue" style={{ animation: 'unset' }}>
                <h4>일단 <b>도전</b>합니다.</h4>
                <p style={{ fontSize: '15px' }}>실패를 두려워하면 변화는 없기에, 생각을 행동으로 뚝딱뚝딱 만들어봅니다.</p>
                <svg style={{ position: 'absolute', bottom: '30px', right: '30px' }} width="30%" height="30%" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M99.9647 96.4182C152.547 96.4182 195.676 57.5059 199.904 7.9969C200.279 3.59465 196.662 -7.42775e-07 192.244 0L7.68592 3.10268e-05C3.26764 3.17695e-05 -0.350008 3.59468 0.0259045 7.99694C4.25352 57.5059 47.383 96.4182 99.9647 96.4182ZM100.035 103.582C47.4535 103.582 4.32412 142.494 0.0965162 192.003C-0.279395 196.405 3.33825 200 7.75653 200L192.314 200C196.732 200 200.35 196.405 199.974 192.003C195.747 142.494 152.617 103.582 100.035 103.582Z"></path></svg>
              </div>

              <div className="card card-1x1 red" style={{ animation: 'unset' }}>
                <h4><b>같이</b>의 가치를 이해합니다.</h4>
                <p style={{ fontSize: '15px' }}>나와 다른 의견을 가진 사람을 이해하려고 노력합니다. <br />문제 상황을 대화를 통해 함께 해결해나가고자 합니다.</p>
                <svg style={{ position: 'absolute', bottom: '30px', right: '30px' }} width="30%" height="30%" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M102.699 1.06732C101.166 -0.352109 98.7983 -0.352111 97.2649 1.06732L13.1058 78.9701C11.3954 80.5534 11.3954 83.2578 13.1058 84.841L25.4799 96.2952C27.1903 97.8785 27.1903 100.583 25.4799 102.166L12.2747 114.39C10.5643 115.973 10.5643 118.677 12.2747 120.261L97.2649 198.933C98.7983 200.352 101.166 200.352 102.699 198.933L187.69 120.261C189.4 118.677 189.4 115.973 187.69 114.39L174.484 102.166C172.774 100.583 172.774 97.8785 174.484 96.2952L186.858 84.841C188.569 83.2578 188.569 80.5534 186.858 78.9701L102.699 1.06732Z"></path></svg>
              </div>

            </div>

            <Spacer y={50} />
          </div>
        </div>
      </div>}
    </>
  )
}
