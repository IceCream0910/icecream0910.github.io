"use client";
import Image from "next/image";
import Spacer from "./components/spacer";
import Music from "./components/music";
import Contribution from "./components/contribution";
import { useState, useRef, useEffect } from "react";
import Mbti from "./components/mbti";
import Age from "./components/age";
import SolvedAc from "./components/solvedAc";
import SkillSet from "./components/skillset";
import Project from "./components/project";
import IonIcon from '@reacticons/ionicons';
import { SP } from "next/dist/shared/lib/utils";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
              #노래🎧 #집🏠<br /><span className="tag pink">#뚝딱뚝딱🔨</span></h1>
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

          <div className="card card-1x1" style={{ color: "#d8abdb" }}>
            <svg width="20px" height="20px" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M105.92 1.13855C101.387 -0.379518 98.6132 -0.379518 94.0804 1.13855C84.3803 4.38722 83.5585 22.8208 85.8095 42.9072C85.9416 44.0866 84.0933 44.5841 83.6157 43.4977C75.4802 24.9952 65.5166 9.46461 55.4963 11.5238C50.814 12.4861 48.415 13.8783 45.2567 17.4665C38.5977 25.0317 46.7905 41.0192 58.5378 57.0231C59.239 57.9785 57.8891 59.3314 56.9322 58.6322C40.9025 46.9201 24.8971 38.7624 17.3465 45.438C13.7653 48.6042 12.3783 51.0062 11.4263 55.6907C9.40359 65.6442 24.7215 75.5038 43.0677 83.5669C44.1534 84.0441 43.6583 85.8917 42.4794 85.762C22.5597 83.5706 4.36414 84.4492 1.13855 94.0804C-0.379518 98.6132 -0.379518 101.387 1.13855 105.92C4.36414 115.551 22.5597 116.429 42.4794 114.238C43.6583 114.108 44.1534 115.956 43.0676 116.433C24.7214 124.496 9.4035 134.356 11.4262 144.309C12.3782 148.994 13.7652 151.396 17.3464 154.562C24.8969 161.238 40.9021 153.08 56.9317 141.368C57.8886 140.669 59.2385 142.022 58.5372 142.977C46.7901 158.981 38.5975 174.968 45.2564 182.533C48.4147 186.122 50.8137 187.514 55.496 188.476C65.5164 190.535 75.4802 175.004 83.6157 156.501C84.0934 155.415 85.9417 155.913 85.8096 157.092C83.5584 177.179 84.3802 195.613 94.0804 198.861C98.6132 200.38 101.387 200.38 105.92 198.861C115.62 195.613 116.442 177.178 114.19 157.091C114.058 155.912 115.907 155.414 116.384 156.501C124.52 175.004 134.484 190.535 144.504 188.476C149.187 187.514 151.586 186.122 154.744 182.533C161.403 174.968 153.21 158.981 141.463 142.977C140.762 142.022 142.112 140.669 143.069 141.368C159.098 153.08 175.103 161.238 182.654 154.562C186.235 151.396 187.622 148.994 188.574 144.309C190.597 134.356 175.279 124.496 156.933 116.433C155.847 115.956 156.342 114.108 157.521 114.238C177.441 116.429 195.636 115.551 198.861 105.92C200.38 101.387 200.38 98.6132 198.861 94.0804C195.636 84.4493 177.441 83.5706 157.521 85.7619C156.342 85.8916 155.847 84.0441 156.933 83.5669C175.279 75.5038 190.597 65.6442 188.574 55.6907C187.622 51.0062 186.235 48.6042 182.654 45.438C175.103 38.7624 159.098 46.9201 143.068 58.6322C142.111 59.3313 140.761 57.9785 141.463 57.0231C153.21 41.0192 161.403 25.0317 154.744 17.4665C151.585 13.8783 149.186 12.4861 144.504 11.5238C134.484 9.46457 124.52 24.9957 116.384 43.4987C115.907 44.585 114.058 44.0875 114.19 42.9082C116.442 22.8214 115.62 4.38727 105.92 1.13855Z"></path></svg>
            <Spacer y={5} />
            <h4><b>Seoul</b> is now</h4>
            <h1>{new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000)).toLocaleTimeString('en', { hour12: true, hour: '2-digit', minute: '2-digit' })}</h1>
            <div className="content">
              <IonIcon name="earth" />
            </div>
          </div>

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
          <Project title={"쏙"}
            summary={"성일고등학교의 급식, 시간표, 학사일정 등 정보를 한 눈에 볼 수 있는 서비스."}
            desc={"성일고등학교의 급식, 학사일정 등 정보 제공. PWA 웹앱 적용. Firebase 데이터베이스 연동해 반 별 TODO 리스트와 커뮤니티, 실시간 급식 리액션 기능 구현. 안드로이드 하이브리드 앱 개발해 위젯, 매일 아침 급식 푸시 알림 기능 구현."}
            links={[
              { name: "소스코드", url: "https://github.com/icecream0910/ssoak" },
              { name: "웹 버전", url: "https://sungil.me" },
              { name: "플레이스토어", url: "https://play.google.com/store/apps/details?id=com.icecream.sungilmeal" }
            ]}
            date={"22.01 ~ 24.03 | 서비스 중"}
            icon={"/ssoak.webp"}
            image={"https://camo.githubusercontent.com/9f4e9135d1684ceea7d1ad2ecdd8d4b3790d4da72502fd2ec4931817f5d7e906/68747470733a2f2f79756e7461652e696e2f73736f616b5f7468756d622e706e67"}
          />


          <Project title={"유니터뷰"}
            summary={"대학 생기부 기반 면접 준비를 도와주는 AI 서비스."}
            desc={`대학 생기부 기반 면접 대비를 위한 AI 서비스.
            생기부 파일 분석해 텍스트 추출 및 GPT API 활용해 예상 질문 및 요약 생성 기능.
            Next.js로 개발. Auth.js 이용한 소셜로그인 기능 구현.
            GPT기반 채팅 모의면접 '챗터뷰' 기능 개발. 학생 정보 관리할 수 있는 관리자 페이지 개발.`}
            links={[
              { name: "웹사이트", url: "https://uniterview.sungil.me" },
            ]}
            date={"23.09 ~ 23.12 | 서비스 중"}
            icon={"/uniterview.png"}
            image={"/uniterview_sc.JPG"}
          />

          <Project title={"코로나콕"}
            summary={"코로나19 현황과 정보를 시각화하여 보여주는 대시보드 서비스."}
            desc={`코로나19 현황과 정보를 시각화하여 보여주는 대시보드 서비스.<br></br>
            웹사이트로 개발, Socket 통신을 활용한 실시간 확진자 집계 기능 제공.<br></br>
            확진자 동선, 현황 등 JSON 데이터를 API로 불러와 Chart와 지도로 시각화 처리.<br></br>
            안드로이드 앱을 통한 위젯 및 푸시 알림 기능 제공.`}
            links={[
              { name: "소스코드", url: "https://github.com/icecream0910/coronacoc" },
              { name: "웹 버전", url: "https://coronacoc.vercel.app/app/" },
              { name: "원스토어", url: "https://m.onestore.co.kr/mobilepoc/apps/appsDetail.omp?prodId=0000756996" }
            ]}
            date={"20.03 ~ 22.05 | 서비스 종료"}
            icon={"/coronacoc.png"}
            image={"/coronacoc_thumb.png"}
          />

          <Project title={"라디오"}
            summary={"파편화된 국내 라디오를 한번에 모아 스트리밍할 수 있는 인터넷 라디오 스트리밍 서비스."}
            desc={`Next.js 사용. hls 형식 스트리밍 구현.<br />
            user-agent에 따라 네이버 웨일 사이드바앱, 웹앱, 안드로이드 하이브리드 앱 동작 각각 구현.<br />
            안드로이드 앱에서 종료 타이머, 백그라운드 재생 등 기능 구현. 웹뷰와 Bridge를 이용한 통신 구현.`}
            links={[
              { name: "웹 버전", url: "https://radio.yuntae.in" },
              { name: "플레이스토어", url: "https://play.google.com/store/apps/details?id=com.icecream.simplemediaplayer" },
              { name: "웨일 확장앱", url: "https://store.whale.naver.com/detail/mebmjdmdebnhodookpfemachpamkjlkl" }
            ]}
            date={"23.12 ~ 진행 중 | 서비스 중"}
            icon={"https://radio.yuntae.in/icon.png"}
            image={"https://i.imgur.com/XPXVeSg.png"}
          />

          <Project title={"포켓라이브"}
            summary={"포켓몬고 게임 유저들을 위한 정보 공유 커뮤니티"}
            desc={`CMS 플랫폼인 그누보드 이용해 게임 '포켓몬고' 사용자를 위한 정보를 제공해주는 커뮤니티 앱 개발.
            Bridge 이용해 안드로이드 앱과 WebVIew 간 통신 구현.`}
            date={"20.05 ~ 21.05 | 서비스 종료"}
            icon={"https://lh3.googleusercontent.com/cx7cp9T47vJJR4Le3UqjeY7OKxw6H15Zn_5pdOHYSFqZ5byBT5sK9CScqCZ-_LGuDHu1"}
          />

          <Project title={"웨일 확장앱"}
            summary={"누적 다운로드 수 합산 약 50만 회"}
            desc={`Google Keep in Sidebar<br></br>
            T-REX RUNNER in Sidebar<br></br>
            Breaklock<br></br>
            Blockit<br></br>
            브라우저 이용 중 불편한 점이나 있었으면 좋겠다고 생각했었던 서비스들을 확장앱으로 만들어 볼 수 있어서 재미있었습니다. 이후 실제 서비스를 배포하여 많은 사용자들이 다운로드해 사용하는 것을 보고 신기하기도 했고, 직접 다양한 피드백들을 받아보고, 이를 반영해 서비스를 개선하는 값진 경험을 할 수 있었습니다.`}
            date={"20.05 ~ 21.05 | 서비스 종료"}
            links={[
              { name: "개발기 보러가기", url: "https://blog.yuntae.in/browser-extensions" }
            ]}
          />

          <Project title={"0yak"}
            summary={"2022 대한민국 대통령 선거 후보 공약 정리 서비스"}
            desc={`제 21대 대통령 선거 후보 별 공약, 공약 비교, 주요 이슈에 대한 후보들의 입장 등을 정리, HTML, CSS, JS 사용.`}
            links={[
              { name: "소스코드", url: "https://github.com/IceCream0910/0yak" },
              { name: "웹사이트", url: "https://0yak.vercel.app/" }
            ]}
            date={"22.02 ~ 22.03 | 서비스 종료"}
            icon={"/0yak.png"}
          />

          <div className="card card-2x1" style={{ background: 'none' }}>
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

              <div className="card card-1x1 blue">
                <h4>일단 <b>도전</b>합니다.</h4>
                <p style={{ fontSize: '15px' }}>실패를 두려워하면 변화는 없기에, 생각을 행동으로 뚝딱뚝딱 만들어봅니다.</p>
                <svg style={{ position: 'absolute', bottom: '30px', right: '30px' }} width="30%" height="30%" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M99.9647 96.4182C152.547 96.4182 195.676 57.5059 199.904 7.9969C200.279 3.59465 196.662 -7.42775e-07 192.244 0L7.68592 3.10268e-05C3.26764 3.17695e-05 -0.350008 3.59468 0.0259045 7.99694C4.25352 57.5059 47.383 96.4182 99.9647 96.4182ZM100.035 103.582C47.4535 103.582 4.32412 142.494 0.0965162 192.003C-0.279395 196.405 3.33825 200 7.75653 200L192.314 200C196.732 200 200.35 196.405 199.974 192.003C195.747 142.494 152.617 103.582 100.035 103.582Z"></path></svg>
              </div>

              <div className="card card-1x1 red">
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
