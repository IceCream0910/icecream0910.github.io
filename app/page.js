"use client";
import Image from "next/image";
import Spacer from "./components/spacer";
import Music from "./components/music";
import Contribution from "./components/contribution";
import { useState, useRef, useEffect } from "react";
import Mbti from "./components/mbti";
import Age from "./components/age";

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    if (cardContainerRef.current) {
      if (showMore) {
        cardContainerRef.current.style.display = "grid";
        cardContainerRef.current.animate(
          { transform: 'scale(1.01)', opacity: 1 },
          { duration: 300, easing: 'ease' }
        );
      } else {
        cardContainerRef.current.animate(
          { transform: 'scale(1.01)', opacity: 0 },
          { duration: 700, easing: 'ease' }
        );
        setTimeout(() => {
          cardContainerRef.current.style.display = "none";
        }, 500);
      }
    }
  }, [showMore]);

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
          <a href="#github" id="only-pc">깃허브 통계</a><Spacer y={20} />
          <a href="#projects">프로젝트</a>
        </div>
      </section>

      <section className="right" id="main-section">
        <h3 id="about">&nbsp;&nbsp;&nbsp;저는 이런 사람이에요 ✨</h3><Spacer y={15} />
        <div className="card-container">

          <div className="card card-1x1">
            새로움에 끊임없이 <span className="underlined"><b>도전</b></span>하는 <b>개발자</b>입니다.
          </div>

          <div className="card card-2x1">
            이런 것들을 <Image src="/heart.png" width={17} height={15} style={{ position: 'relative', top: '2px' }} />해요.
            <Spacer y={5} />
            <div style={{ display: 'flex' }}>
              <h1>#개발 <span className="tag blue">{`#코딩/>`}</span> #웹🌐 <span className="tag green">#UI/UX</span><br></br>
                #집🏠 <span className="tag pink">#뚝딱뚝딱🔨</span> #음악🎹</h1>
            </div>
          </div>

          <div className="card card-2x1">
            <b>이런 걸 다룰 수 있어요 💻</b><Spacer y={10} />
            <span style={{ fontSize: '17px' }}>언어</span><Spacer y={10} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <img className="lang-tag" src="https://img.shields.io/badge/Javascript-efd81b?style=flat-square&logo=javascript&logoColor=black" />
              <img className="lang-tag" src="https://img.shields.io/badge/Java-db1d20?style=flat-square&logo=oracle&logoColor=white" />
              <img className="lang-tag" src="https://img.shields.io/badge/Kotlin-d258ff?style=flat-square&logo=kotlin&logoColor=white" />
              <img style={{ opacity: 0.8 }} className="lang-tag" src="https://img.shields.io/badge/Python-316897?style=flat-square&logo=python&logoColor=white" />
              <img style={{ opacity: 0.5 }} className="lang-tag" src="https://img.shields.io/badge/C-005697?style=flat-square&logo=C&logoColor=white" />
            </div><Spacer y={15} />
            <span style={{ fontSize: '17px' }}>Front-end</span><Spacer y={10} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <img className="lang-tag" src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" />
              <img className="lang-tag" src="https://img.shields.io/badge/React-00c6f7?style=flat-square&logo=React&logoColor=white" />
              <img className="lang-tag" src="https://img.shields.io/badge/jQuery-279efb?style=flat-square&logo=jQuery&logoColor=white" />
            </div>
            <Spacer y={15} />
            <span style={{ fontSize: '17px' }}>Back-end</span><Spacer y={10} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <img className="lang-tag" src="https://img.shields.io/badge/node.js-488d3b?style=flat-square&logo=Node.js&logoColor=white" />
              <img className="lang-tag" src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
              <img style={{ opacity: 0.5 }} className="lang-tag" src="https://img.shields.io/badge/Spring-9cff5c?style=flat-square&logo=spring&logoColor=black" />
              <img style={{ opacity: 0.5 }} className="lang-tag" src="https://img.shields.io/badge/mongoDB-5eec69?style=flat-square&logo=mongoDB&logoColor=black" />
            </div>



          </div>

          <Music src={'https://p.scdn.co/mp3-preview/ba00e93c4d1db36997f606a6073c9f2747f1243b'}
            image={'https://i.scdn.co/image/ab67616d00001e02f694adfa02990eaca79fec1b'} />
        </div>
        <Spacer y={20} />

        <div className="card-container" ref={cardContainerRef} style={{ display: 'none' }}>
          <Age birth={2005} />

          <Mbti />

          <div className="card card-1x1">
            좋아하는 문구<Spacer y={10} />
            <span className="handwriting">오롯이 너만의 속도를 따라가야,<br></br>
              어떤 기류에도 흔들리지 않을테니까</span>
            <Spacer y={10} />
            <span style={{ fontSize: '12px', opacity: 0.5, float: 'right' }}>ㅡ ｢Airplane - IZ*ONE｣  중</span>
          </div>
        </div>
        <Spacer y={20} />

        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}
          onClick={() => setShowMore(!showMore)}>
          <span className="tag" style={{
            background: 'var(--foreground)', color: 'var(--background)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '25px'
          }}><span style={{ marginTop: '-5px' }}>{showMore ? '-' : '+'}</span></span>{showMore ? 'TMI 그만보기' : 'TMI 더보기'}
        </div>

        <Spacer y={80} />
        <h3 id="github">&nbsp;&nbsp;&nbsp;Github 통계 📂</h3><Spacer y={15} />
        <div className="card-container">

          <Contribution />

          <div className="card card-2x1" id="only-pc" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="http://github-readme-streak-stats.herokuapp.com?user=icecream0910&theme=transparent&hide_border=true&locale=ko&date_format=%5BY.%5Dn.j&ring=46AAFF&currStreakNum=46AAFF&sideNums=46AAFF&fire=FF0000&excludeDaysLabel=46AAFF&sideLabels=46AAFF&dates=347DBC" alt="GitHub Streak" width={'100%'} />
          </div>

        </div>


        <Spacer y={80} />
        <h3 id="projects" >&nbsp;&nbsp;&nbsp;지금까지 이런 프로젝트들을 해왔어요 🛠️</h3><Spacer y={15} />

        <div className="card-container">
          <div className="card card-2x1">
            <h1>쏙</h1>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              성일고등학교의 급식, 학사일정 등 정보 제공. <br></br>
              PWA 웹앱 적용. Firebase 데이터베이스 연동해 반 별 TODO 리스트와 커뮤니티, 실시간 급식 리액션 기능 구현.<br></br>
              안드로이드 하이브리드 앱 개발해 위젯, 매일 아침 급식 푸시 알림 기능 구현.
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://github.com/icecream0910/sungil-meal-app" target="_blank">소스코드</a>&nbsp;&nbsp;
              <a href="https://sungil.me" target="_blank">웹 버전</a>&nbsp;&nbsp;
              <a href="https://play.google.com/store/apps/details?id=com.icecream.sungilmeal" target="_blank">플레이스토어</a>
            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>22.01 ~ 진행 중</span>
            <Spacer y={90} />
            <Image id="only-mobile" className="image" src="/ssoak.webp" width={80} height={80} style={{ bottom: '20px' }} />

          </div>

          <div id="only-pc" className="card card-1x1" style={{ backgroundImage: `url('/ssoak_thumb.png')`, backgroundSize: 'cover' }}>
          </div>


          <div id="only-pc" className="card card-1x1" style={{ backgroundImage: `url('/uniterview_sc.JPG')`, backgroundSize: 'cover' }}>
          </div>

          <div className="card card-2x1">
            <h1>유니터뷰</h1>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              대학 생기부 기반 면접 대비를 위한 AI 서비스.<br></br>
              생기부 파일 분석해 텍스트 추출 및 GPT API 활용해 예상 질문 및 요약 생성 기능.<br></br>
              Next.js로 개발. Auth.js 이용한 소셜로그인 기능 구현.<br></br>
              GPT기반 채팅 모의면접 '챗터뷰' 기능 개발. 학생 정보 관리할 수 있는 관리자 페이지 개발.
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://uniterview.sungil.me" target="_blank">웹사이트</a>&nbsp;&nbsp;
            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>23.09 ~ 진행 중</span>
            <Spacer y={90} />
            <Image className="image" src="/uniterview.png" width={100} height={100} />
          </div>


          <div className="card card-2x1">
            <h1>코로나콕</h1>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              코로나19 현황과 정보를 시각화하여 보여주는 대시보드 서비스.<br></br>
              웹사이트로 개발, Socket 통신을 활용한 실시간 확진자 집계 기능 제공.<br></br>
              확진자 동선, 현황 등 JSON 데이터를 API로 불러와 Chart와 지도로 시각화 처리.<br></br>
              안드로이드 앱을 통한 위젯 및 푸시 알림 기능 제공.
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://github.com/icecream0910/coronacoc" target="_blank">소스코드</a>&nbsp;&nbsp;
              <a href="https://coronacoc.vercel.app/app/" target="_blank">웹 버전</a>&nbsp;&nbsp;
              <a href="https://m.onestore.co.kr/mobilepoc/apps/appsDetail.omp?prodId=0000756996" target="_blank">원스토어</a>
            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>20.03 ~ 22.05 (서비스 종료)</span>
            <Spacer y={90} />
            <Image className="image" src="/coronacoc.png" width={80} height={80} style={{ bottom: '20px' }} />

          </div>

          <div id="only-pc" className="card card-1x1" style={{ backgroundImage: `url('/coronacoc_thumb.png')`, backgroundSize: 'cover' }}>
          </div>

          <div className="card card-1x1">
            <h1>포켓라이브</h1>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              CMS 플랫폼인 그누보드 이용해 게임 '포켓몬고' 사용자를 위한 정보를 제공해주는 커뮤니티 앱 개발.
              Bridge 이용해 안드로이드 앱과 WebVIew 간 통신 구현.
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://m.onestore.co.kr/mobilepoc/apps/appsDetail.omp?prodId=0000753610" target="_blank">원스토어</a>
            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>20.05 ~ 21.05 (서비스 종료)</span>
            <Spacer y={60} />
          </div>

          <div className="card card-1x1">
            <h3>웨일 브라우저 확장앱</h3>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              Google Keep in Sidebar<br></br>
              T-REX RUNNER in Sidebar<br></br>
              Breaklock<br></br>
              Blockit<br></br>
              누적 다운로드 수 합산 약 50만 회
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>
              <a href="https://icecream0910.github.io/projects/extensions" target="_blank">개발기 보러가기</a>
            </span>
            <Spacer y={60} />
          </div>

          <div className="card card-1x1">
            <h3>굴절 시뮬레이터</h3>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              물리학I 시간에 배운 스넬의 굴절법칙을 활용한 굴절 시뮬레이터<br></br>
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://github.com/IceCream0910/physics-reflection-simulator" target="_blank">소스코드</a>&nbsp;&nbsp;
              <a href="https://gulzzul.sungil.me/" target="_blank">웹사이트</a>

            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>22.08</span>

            <Spacer y={60} />
          </div>

          <div className="card card-1x1">
            <h3>0yak</h3>
            <Spacer y={10} />
            <span style={{ opacity: 0.7, fontSize: '15px' }}>
              2022 대한민국 대통령 선거 후보 공약 정리 서비스<br></br>
            </span>

            <span style={{ opacity: 0.6, fontSize: '13px', position: 'absolute', bottom: '40px', left: '20px' }}>
              <a href="https://github.com/IceCream0910/0yak" target="_blank">소스코드</a>&nbsp;&nbsp;
              <a href="https://0yak.vercel.app/" target="_blank">웹사이트</a>

            </span>
            <span style={{ opacity: 0.5, fontSize: '13px', position: 'absolute', bottom: '20px', left: '20px' }}>22.02 ~ 22.03</span>

            <Spacer y={60} />
          </div>


          <div className="card card-2x1" style={{ background: 'none' }}>
            더 많은 <span className="tag green">프로젝트→</span>
            <Spacer y={5} />
            <span className="tag yellow">뚝딱뚝딱</span> 예정
          </div>

        </div>


        <Spacer y={80} />

        <div className="card-container">
          <div className="card card-1x1">
            <b>학력 🏫</b><Spacer y={15} />
            <h3>성일고등학교&nbsp;<span style={{ fontSize: '13px', fontWeight: '100' }}>일반 인문계</span></h3>
            <span className="tag green">→대학 입시중</span>
          </div>

          <div className="card card-2x1">
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
    </>
  )
}
