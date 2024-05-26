"use client";
import { useState } from "react";
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

import Time from "./components/time";

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


          <Time />

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
            desc={`당시 재학 중이던 고등학교의 학생들을 위해 다양한 정보를 제공하는 서비스입니다. 급식과 시간표, 학사일정을 나이스 오픈 API를 통해 받아와 표시해주고, 학교 홈페이지 크롤링을 통해 공지사항 및 가정통신문 정보를 제공하였습니다.<br/><br/>당일의 급식 메뉴에 좋아요와 싫어요로 리액션을 표시할 수 있도록 구현하였습니다.<br/>또, 등록해둔 알레르기 정보에 따라 급식 메뉴를 빨간색으로 표시해주거나 맛있는 메뉴에는 형광펜 효과를 적용하는 등 재미있는 시각화 경험을 제공하기 위해 노력했습니다.<br/><br/>
            학교 커뮤니티 기능을 개발했습니다. OAuth를 통해 교내 구글 계정으로 로그인할 수 있도록 했고, 게시물은 물론 투표를 만들고 참여할 수 있도록 했습니다.
            커뮤니티 규칙에 위반되는 게시물이나 댓글을 신고할 수 있는 시스템을 구현했습니다.<br/><br/>
            <a class="link" href="https://blog.yuntae.in/slack-report" target="_blank">
            Slack으로 신고 기능 빠르게 구현하기
            </a>
            <br/><br/><br/>안드로이드 하이브리드 앱을 개발하여 위젯 기능과 매일 아침 급식 푸시 알림 기능을 구현하였습니다.<br/>추가로, PWA 웹앱을 지원하여 iOS와 데스크톱에서도 앱 형태로 설치해 서비스에 접근할 수 있도록 하였습니다.
            <br/><br/>
            <a class="link" href="https://blog.yuntae.in/pwa-web" target="_blank">
            웹인 듯 웹 아닌 앱 같은 너 - PWA
            </a>
            <br/><br/><br/>급식 피드백, 반 별 TODO리스트, 커뮤니티 등 실시간성이 필요한 기능을 구현하는 데에는 Firebase Cloud Firestore를 사용하였습니다.
            <br/><br/>
            <a class="link" href="https://blog.yuntae.in/firebase-security" target="_blank">
            Firebase 데이터베이스 보안 설정하기
            </a>
            <br/><br/><br/>
            2023년 나이스 개편 당시, 장기간 나이스 서비스에 장애가 발생하여 이에 대응하기 위해 Redis의 캐시 기능을 이용해 정보를 정상적으로 제공하였습니다.
            <br/><br/>
            <a class="link" href="https://blog.yuntae.in/neis-error" target="_blank">
            학교 앱에서 4달 동안 급식 API가 멈춘다면
            </a>
            `}
            links={[
              { name: "Github", url: "https://github.com/icecream0910/ssoak" },
              { name: "웹 버전", url: "https://sungil.vercel.app" },
              { name: "플레이스토어", url: "https://play.google.com/store/apps/details?id=com.icecream.sungilmeal" }
            ]}
            date={"22.01 ~ 24.01 | 서비스 중"}
            icon={"/ssoak.webp"}
            image={"https://camo.githubusercontent.com/9f4e9135d1684ceea7d1ad2ecdd8d4b3790d4da72502fd2ec4931817f5d7e906/68747470733a2f2f79756e7461652e696e2f73736f616b5f7468756d622e706e67"}
          />


          <Project title={"유니터뷰"}
            summary={"대학 생기부 기반 면접 준비를 도와주는 AI 서비스."}
            desc={`생활기록부 파일을 업로드하면, 이를 자동으로 분석하여 텍스트를 추출하고, 대입 면접 예상 질문과 생기부 내용 요약을 생성합니다.
            Next.js로 개발되었으며, Auth.js를 이용한 네이버, 카카오 소셜 로그인 기능을 구현했습니다.<br/><br/>
            AI 기능에는 OpenAI의 GPT 모델을 사용하였습니다. 채팅으로 모의 면접을 진행할 수 있는 '챗터뷰'를 개발하였습니다.
            AI가 생기부 기반으로 생성한 질문 중 랜덤으로 사용자에게 질의하고, 이에 대한 사용자의 답변을 분석하여 피드백 제공 및 꼬리 질문을 생성합니다.<br/><br/>
            학생 정보를 관리할 수 있는 관리자 페이지를 개발되었습니다. 교사가 학생들의 면접 준비 진행 상황을 확인하고, 학생들이 작성해둔 답변을 읽고 피드백할 수 있습니다.<br/><br/>`}
            links={[
              { name: "Github", url: "https://github.com/IceCream0910/uniterview" },
            ]}
            date={"23.09 ~ 23.12 | 서비스 종료"}
            icon={"/uniterview.png"}
            image={"/uniterview_sc.JPG"}
          />

          <Project title={"코로나콕"}
            summary={"코로나19 현황과 정보를 시각화하여 보여주는 대시보드 서비스."}
            desc={`
            코로나19 바이러스의 국내 확산 현황과 동선 등을 질병관리청 API 및 홈페이지 크롤링를 통해 수집하고, 이를 차트와 지도 등으로 시각화하여 사용자에게 직관적으로 표시하도록 했습니다.<br/><br/>
            Socket 통신을 활용하여 당일 실시간 확진자 집계 기능을 구현하였습니다.<br/>
            또한, 안드로이드 앱을 통해 위젯 및 푸시 알림 브리핑 기능을 제공하여 사용자들이 최신 정보를 빠르게 받아볼 수 있도록 하였습니다.<br/><br/>
            <img src="https://i.imgur.com/i3SeZ5t.png" width="100%" style="border-radius: 15px"><br/><br/>
            누적 페이지 뷰 약 17000회를 기록하였으며, 사용자의 피드백을 받아 기능을 추가하거나 수정하는 등 처음으로 많은 사람들이 이용하는 서비스를 운영해보는 경험을 할 수 있었습니다.`}
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
            desc={`
            국내 라디오는 인터넷에서 청취하기 위해서는 각 방송사의 앱을 각각 설치해주어야 스트리밍할 수 있는 경우가 많습니다. 물론 자체 앱에서만 제공하는 실시간 댓글이나 보이는 라디오 등과 같은 기능 때문이기도 하겠지만, 단순히 라디오를 듣고자 하는 사용자 입장에서는 불편함이 있는 것이 사실입니다.
            <br/>따라서 국내 라디오 방송국의 스트리밍 프로토콜을 모아 재생할 수 있는 서비스를 만들고자 하였습니다.<br/><br/>
            - 세상의 모든 스테이션, 여기에서 한번에<br/>
파편화된 라디오 앱을 방송사별로 설치하지 않아도 앱 하나로 주요 라디오를 모두 청취할 수 있습니다.<br/><br/>
- 필요한 기능만 담은 깔끔한 플레이어<br/>
라디오 감상에 집중할 수 있도록, 필요한 기능만 담아 감성적이고 깔끔한 디자인의 플레이어를 완성했습니다. 현재 방송 중인 프로그램명과 선곡 정보도 확인해보세요.
<br/><br/>
- 정해진 시간에 알아서 꺼지는 종료 타이머<br/>
라디오를 틀어놓고 잠들어도 걱정 없도록, 플레이어에서🌙 아이콘을 눌러 종료 타이머를 설정할 수 있습니다. 정해진 시간에 재생중인 라디오가 알아서 종료됩니다.
<br/><br/>
- 자주 듣는 라디오는 모아뒀다가 바로<br/>
자주 듣는 스테이션은 하트 버튼을 눌러 자주 듣는 리스트에 추가해보세요. 자주 듣는 스테이션만 바로 모아볼 수 있습니다.
<br/><br/>
Next.js를 기반으로 개발했습니다. Supabase DB를 이용해 각 스테이션 별 누적 청취자 수를 집계하여 표시하는 기능을 구현하였습니다.<br/>
지역/방송사별로 정보를 정리한 JSON 파일을 만들고, 각 방송사별로 스트리밍 프로토콜을 가져오기 위해 API Routes를 만들어 사용했습니다.<br/><br/>
안드로이드 앱은 WebView를 기반으로 동작하는 하이브리드 앱으로 개발하였습니다. 웹뷰와 통신하기 위해 Bridge를 사용하여 웹페이지와 안드로이드 앱의 함수를 서로 호출할 수 있도록 구현하였습니다.<br/>
미디어 백그라운드 재생을 위해 안드로이드의 Media3 (ExoPlayer) API를 사용하였고, 종료 타이머를 구현하기 위해 CountDownTimer API를 사용했습니다.
<br/><br/>
네이버 웨일 브라우저의 사이드바에서 서비스를 이용할 수 있도록 웨일 확장앱을 개발하였습니다.
`}
            links={[
              { name: "웹 버전", url: "https://radio.yuntae.in" },
              { name: "플레이스토어", url: "https://play.google.com/store/apps/details?id=com.icecream.simplemediaplayer" },
              { name: "웨일 확장앱", url: "https://store.whale.naver.com/detail/mebmjdmdebnhodookpfemachpamkjlkl" }
            ]}
            date={"23.12 ~ 진행 중 | 서비스 중"}
            icon={"https://radio.yuntae.in/icon.png"}
            image={"https://i.imgur.com/XPXVeSg.png"}
          />

          <Project title={"브라우저 확장앱"}
            summary={"네이버 웨일 브라우저 확장앱. 누적 다운로드 수 합산 약 50만 회"}
            desc={`
            <a class="link" href="https://blog.yuntae.in/browser-extensions" target="_blank">
            브라우저 확장앱 개발하기(aka. 회고록)
            </a>`}
            date={"20.05 ~ 21.05 | 서비스 종료"}
            links={[
              { name: "Google Keep", url: "https://store.whale.naver.com/detail/mpigbcflpddfcbidjdnaadbccaffdene" },
              { name: "T-REX Runner", url: "https://store.whale.naver.com/detail/oopeaffdcbgoeicbcibbmialglioebkj" },
              { name: "Breaklock", url: "https://store.whale.naver.com/detail/jindgfnppjdpmgdfiakaonemdkkjgcdj" },
              { name: "Blockit", url: "https://store.whale.naver.com/detail/gfdaidimgcibdjiidpmbobhhaojnjbfd" },

            ]}
            icon={"/whale.png"}
            image={"https://whale-store.pstatic.net/20190222_297/1550821710781qBrwX_PNG/%BD%BD%B6%F3%C0%CC%B5%E50001.png"}
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
