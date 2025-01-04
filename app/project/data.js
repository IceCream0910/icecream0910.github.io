export default [
    {
        "title": "KLAS+",
        "category": "KWU",
        "pin": true,
        "summary": "광운대학교 KLAS 앱의 기능과 UI를 추가 및 수정한 안드로이드 앱.",
        "desc": `
        <h3 style="margin-bottom:10px">소개</h3>
        광운대학교 학생들이 사용하는 학사정보시스템인 KLAS 앱의 기능과 UI를 개선한 안드로이드 앱입니다. 기존 앱의 불편한 점을 개선하고, 추가적인 기능을 제공하여 학생들이 더 편리하게 사용할 수 있도록 하였습니다.<br/><br/><br/> 

        <h3 style="margin-bottom:10px">사용 기술</h3>
        - <b>Kotlin</b>: 안드로이드 앱 개발을 위해 사용하였습니다. WebView와의 데이터 통신을 위해 JavascriptInterface를 사용하였습니다. Null Safe 언어이며, Java에 비해 가독성이 높다는 점과 Android 기본 개발 언어로 채택되었다는 점에서 Kotlin을 사용하였습니다.<br/> <br/> 
        - <b>NextJS 14</b>: WebView 페이지 개발을 위해 사용하였습니다. 각 UI 요소를 컴포넌트화하여 재사용성을 높이고, API Router를 사용해 Serverless하게 필요한 데이터를 불러올 수 있도록 하였습니다.<br/> <br/> 
        - <b>react-big-calendar</b>: 캘린더 기능을 구현하기 위해 해당 라이브러리를 사용하였습니다. 캘린더 표시 뿐만 아니라 일정 관리와 드래그 앤 드롭 등 다양한 기능을 제공하고 있어 채택하였습니다.<br/> <br/> 
        - <b>Google QR Code Scanner API</b>: 앱에 카메라 권한을 받지 않고 QR 스캔을 구현할 수 있는 Google ML Kit 라이브러리를 사용했습니다. QR 코드 위치를 인식하여 자동으로 줌이 되는 기능을 적용하여 인식률을 개선하였습니다.<br/> <br/>
        - <b>OpenAI GPT-4o-mini</b>: LLM 모델에게 외부 함수 호출을 허용하는 Function Calling 기능을 활용하여, 실제 사용자의 학사 정보에 기반한 질의 응답이 가능하도록 챗봇을 구현하였습니다.<br/> <br/> 
        <br/>
        <h3 style="margin-bottom:10px">문제 해결</h3>
        - <a className='link' href='https://blog.yuntae.in/2024-10-05-115fc9b9-3eca-8095-af16-c1c2db4f9eb2#115fc9b93eca807aa810e9e3512bb708' target='_blank'>비정상 종료 발생률을 7.24% → 0.14%로 개선했습니다.</a><br/>
        - <a className='link' href='https://blog.yuntae.in/122fc9b93eca80eba117f601be34afa2' target='_blank'>react-big-calendar 터치 환경 이슈 해결</a>
        <br/>
        `,
        "links": [
            {
                "name": "Play Store",
                "url": "https://play.google.com/store/apps/details?id=com.icecream.kwklasplus"
            },
            {
                "name": "Github",
                "url": "https://github.com/IceCream0910/kw-klas-plus"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "24.03 ~"
            },
            {
                "name": "상태",
                "value": "진행 중"
            },
            {
                "name": "사용자",
                "value": "500+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "https://play-lh.googleusercontent.com/D3VIroKtbnjKShdEXLZ0JtPC6if-ewnTK2JNkO3Lh6EbJRwZMj-fmbYNz4zFljSIkw=w480-h960-rw",
        "image": ["https://i.imgur.com/mKwd1Ae.png", "https://i.imgur.com/wLz4Bri.png", "https://i.imgur.com/fF9M5sn.png", "https://i.imgur.com/X4kMSua.png"],
    },
    {
        "title": "라디오",
        "category": ["App", "Web", "Browser Extension"],
        "pin": true,
        "summary": "파편화된 라디오 앱 설치 없이 사용 가능한 인터넷 라디오 스트리밍 앱.",
        "desc": `
        <h3 style="margin-bottom:10px">소개</h3>
         국내 라디오는 인터넷에서 청취하기 위해서는 각 방송사의 앱을 각각 설치해주어야 스트리밍할 수 있는 경우가 많습니다.
        물론 자체 앱에서만 제공하는 실시간 댓글이나 보이는 라디오 등과 같은 기능 때문이기도 하겠지만, 단순히 라디오를 듣고자 하는 사용자 입장에서는 불편함이 있는 것이 사실입니다.<br/>
        따라서 국내 라디오 방송국의 스트리밍 프로토콜을 모아 재생할 수 있는 서비스를 만들고자 하였습니다.<br/><br/><br/>
        <h3 style="margin-bottom:10px">주요 기능</h3>
        - 파편화된 라디오 앱을 방송사별로 설치하지 않아도 앱 하나로 주요 라디오를 모두 청취할 수 있습니다.<br/><br/>
        - 라디오 감상에 집중할 수 있도록, 필요한 기능만 담아 감성적이고 깔끔한 디자인의 플레이어를 완성했습니다. 현재 방송 중인 프로그램명과 선곡 정보도 확인해보세요.<br/><br/>
        - 즐겨찾기 기능 구현: 자주 듣는 스테이션은 하트 버튼을 눌러 자주 듣는 리스트에 추가해보세요. 자주 듣는 스테이션만 바로 모아볼 수 있습니다.<br/><br/>
        - 종료 타이머 구현: 라디오를 틀어놓고 잠들어도 걱정 없도록, 플레이어에서🌙 아이콘을 눌러 종료 타이머를 설정할 수 있습니다. 정해진 시간에 재생중인 라디오가 알아서 종료됩니다.<br/><br/>
        - 글자 크기 조절 기능: 사용 연령대가 높다는 것을 확인한 후 UI 요소의 크기를 조절할 수 있는 옵션을 추가하였습니다.
        <br/> <br/> <br/>
        <h3 style="margin-bottom:10px">사용 기술</h3>
        - <b>NextJS 14</b>: 지역/방송사별로 정보를 정리한 JSON 파일을 만들고, 각 방송사별로 스트리밍 프로토콜을 가져오기 위해 API Routes를 만들어 사용했습니다.<br/><br/> 
        - <b>Supabase Database</b>: 각 스테이션 별 누적 청취자 수를 집계하여 표시하는 기능을 구현하였습니다.<br/> <br/> 
        - <b>Kotlin</b>: 웹뷰와 통신하기 위해 Bridge를 사용하여 웹페이지와 안드로이드 앱의 함수를 서로 호출할 수 있도록 구현하였습니다.<br/> <br/> 
        - <b>Media3 API</b>: 미디어 백그라운드 재생을 위해 안드로이드의 Media3 (ExoPlayer) API를 사용하였습니다.<br/> <br/>
        - <b>CountDownTimer API</b>: 종료 타이머를 구현하기 위해 CountDownTimer API를 사용했습니다.<br/> <br/> 
        <br/>`,
        "links": [
            {
                "name": "웹 버전",
                "url": "https://radio.yuntae.in"
            },
            {
                "name": "플레이스토어",
                "url": "https://play.google.com/store/apps/details?id=com.icecream.simplemediaplayer"
            },
            {
                "name": "웨일 확장앱",
                "url": "https://store.whale.naver.com/detail/mebmjdmdebnhodookpfemachpamkjlkl"
            },
            {
                "name": "Github",
                "url": "https://github.com/IceCream0910/radio-web"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "23.12 ~"
            },
            {
                "name": "상태",
                "value": "진행 중"
            },
            {
                "name": "사용자",
                "value": "8,000+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "participants": "개인",
        "icon": "https://radio.yuntae.in/icon.png",
        "image": ["https://play-lh.googleusercontent.com/YizavywxqvnCmeq4UQ0jTc0ub8j3Rh7pOtXzq_GgOEUKNCjvTN-vOphZ6eSS5mG9ykM=w1052-h592-rw", "https://play-lh.googleusercontent.com/KbtUy6kECpil1B-4P62YLvglz0p7X3vZ6--fbPSYO3E3PpBQ6BHRJdt2Z89aVEVz_9A=w1052-h592-rw", "https://play-lh.googleusercontent.com/nEFlgpSrNrFOcAgL7lnqCzzXRZuhqm4bQcxN-LmFrWsGGiFH5a2b34b2Od9UKKaTlmA=w1052-h592-rw", "https://play-lh.googleusercontent.com/UxQuODSPCb6uxq4JplYym4NPJdgf9HNNZayCMu62BxSpDAfHDs9B01W5iEuodRt1lko=w1052-h592-rw", "https://play-lh.googleusercontent.com/Z-Q7VJlYq1lWCigz3Qerqe4yEEZHaqFw1TDqhgBjIqo_1SqcKwGyezAbMRBHoJdIhCQ=w1052-h592-rw"]
    },
    {
        "title": "LifeLink",
        "category": "KWU",
        "pin": false,
        "summary": "응급실 뺑뺑이 문제 해결을 위한 응급 환자 이송 병원 탐색 솔루션",
        "desc": `
        <div style="display:flex; justify-content:center; align-items:center; flex-direction:row; gap:10px">
<img src="https://i.imgur.com/kU1nQhC.png" width="50%" style="border-radius:15px"/>
<img src="https://i.imgur.com/xJnijDg.png" width="50%" style="border-radius:15px"/>
</div>
<br/>
        <pre>광운대학교 인공지능융합학부 2024학년도 2학기 공학설계입문 작품전시회에서 우수상을 수상한 작품입니다.</pre>
        <h3 style="margin-bottom:10px">개발 동기</h3>
최근 이른바 '응급실 뺑뺑이' 현상으로 인한 사망자 증가와 응급 환자의 적시 치료 실패 사례가 언론을 통해 보도되면서 심각한 사회적 문제로 대두되고 있다. 이는 특히 최근 전공의 집단행동과 함께 급증하고 있지만, 대규모 감염병 유행 사태  당시 하루 평균 12.9명 꼴로 재이송 사례가 발생한 것과 같이 비단 일시적인 문제는 아니다. 일부 지자체를 시작으로 병원 자동 매칭 시스템 등을 도입하고 있으나, 환자 상태를 정확하게 전달하지 못하거나 오히려 구급대원의 업무를 가중시키는 등의 또다른 문제가 나타나고 있다.
<br/><br/>
<h3 style="margin-bottom:10px">기술 스택</h3>
- Frontend: Next.js<br/>
- Backend: Nest.js, Supabase(PostgreSQL), postGIS<br/>
- Test: k6<br/>
- API: Kakao MAP SDK, Google Gemini<br/><br/>
<img src="https://i.imgur.com/Ioyu2Uw.png" width="100%" style="border-radius:15px"/>
<br/><br/><br/>
<h3 style="margin-bottom:10px">주요 구현 기능</h3>
 - 환자 증상 상태 입력을 통한 KTAS 코드 자동 산출<br/>
 - 음성인식(STT)와 LLM을 사용해 음성 브리핑으로 환자 등록<br/>
 - 인근 병원에 요청 전송 및 수락/거절 여부 피드백<br/>
 - 구급대원 측에서 최종 이송 병원 확정 가능<br/><br/>
<img src="https://i.imgur.com/RBtuMRs.png" width="100%" style="border-radius:15px"/>
<br/><br/><br/>
<h3 style="margin-bottom:10px">성능 개선</h3>
10초간 2568건의 사용 사이클을 테스트한 결과 서버의 최대 응답시간이 1.8초로 기대치보다 오래 걸리는 것을 확인하였습니다. 이를 해결하기 위해 중복 쿼리를 줄이고, 쿼리 함수 최적화를 통해 동일 조건에서의 최대 응답 시간을 576ms로 개선했습니다.<br/><br/>
<img src="https://i.imgur.com/L9ht07g.png" width="100%" style="border-radius:15px"/>
<br/><br/><br/>
 <h3 style="margin-bottom:10px">관련 포스팅</h3>
        - <a className='link' href='https://blog.yuntae.in/nestjs%EB%A1%9C-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-151fc9b93eca8095aa28e3a46e7511ca' target='_blank'>nestJS로 백엔드 구축하기</a><br/>
        - <a className='link' href='https://blog.yuntae.in/k6%EB%A1%9C-api-%EC%84%B1%EB%8A%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0-151fc9b93eca80eba0cecc26760ef2d2' target='_blank'>k6로 API 성능 테스트하기</a>
        <br/>
        `,
        "links": [
            {
                "name": "Github(FE)",
                "url": "https://github.com/icecream0910/lifelink-frontend"
            },
            {
                "name": "Github(BE)",
                "url": "https://github.com/icecream0910/lifelink-backend"
            },
        ],
        "info": [
            {
                "name": "기간",
                "value": "24.09 ~ 24.12"
            },
            {
                "name": "상태",
                "value": "종료"
            },
            {
                "name": "참여 인원",
                "value": "2인"
            },
            {
                "name": "기여도",
                "value": "FE/BE 개발"
            }
        ],
        "icon": "",
        "image": [],
    },
    {
        "title": "비빔랭",
        "category": ["Esolang"],
        "pin": false,
        "summary": "넷플릭스 시리즈 '흑백요리사'의 비빔대왕 밈에서 착안해 개발된 난해한 프로그래밍 언어",
        "desc": "",
        "directLink": "https://bibim-docs.yuntae.in/",
        "icon": "",
        "image": []
    },
    {
        "title": "아재 말투 변환기",
        "category": "Web",
        "pin": false,
        
        "directLink": "https://aze.yuntae.in/",
        "summary": "텍스트를, 입력하면..~ 아재.말투로.. 변환해줍니다..^^",
        "desc": ``,
        "links": [
            {
                "name": "Web",
                "url": "https://aze.yuntae.in/"
            },
            {
                "name": "Github",
                "url": "https://github.com/IceCream0910/aze-tone-converter"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "24.08"
            },
            {
                "name": "상태",
                "value": "서비스 중"
            },
            {
                "name": "사용자",
                "value": "600+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "",
        "image": ["https://i.imgur.com/HJPtsTB.png", "https://i.imgur.com/X2rLiAu.png"],
    },
    {
        "title": "쏙",
        "category": ["App", "Web"],
        "pin": false,
        "summary": "성일고등학교의 급식, 시간표, 학사일정 등 정보를 한 눈에 볼 수 있는 서비스.",
        "desc": "당시 재학 중이던 고등학교의 학생들을 위해 다양한 정보를 제공하는 서비스입니다. 급식과 시간표, 학사일정을 나이스 오픈 API를 통해 받아와 표시해주고, 학교 홈페이지 크롤링을 통해 공지사항 및 가정통신문 정보를 제공하였습니다.<br/><br/>당일의 급식 메뉴에 좋아요와 싫어요로 리액션을 표시할 수 있도록 구현하였습니다.<br/>또, 등록해둔 알레르기 정보에 따라 급식 메뉴를 빨간색으로 표시해주거나 맛있는 메뉴에는 형광펜 효과를 적용하는 등 재미있는 시각화 경험을 제공하기 위해 노력했습니다.<br/><br/>학교 커뮤니티 기능을 개발했습니다. OAuth를 통해 교내 구글 계정으로 로그인할 수 있도록 했고, 게시물은 물론 투표를 만들고 참여할 수 있도록 했습니다. 커뮤니티 규칙에 위반되는 게시물이나 댓글을 신고할 수 있는 시스템을 구현했습니다.<br/><br/><a className='link' href='https://blog.yuntae.in/slack으로-신고-기능-빠르게-구현하기-04716aefe6ad43a393e4f0486fe15a0e' target='_blank'>Slack으로 신고 기능 빠르게 구현하기</a><br/><br/><br/>안드로이드 하이브리드 앱을 개발하여 위젯 기능과 매일 아침 급식 푸시 알림 기능을 구현하였습니다.<br/>추가로, PWA 웹앱을 지원하여 iOS와 데스크톱에서도 앱 형태로 설치해 서비스에 접근할 수 있도록 하였습니다.<br/><br/><a className='link' href='https://blog.yuntae.in/웹인-듯-웹-아닌-앱-같은-너--pwa-4574741752b74b06b3fac50d365627df' target='_blank'>웹인 듯 웹 아닌 앱 같은 너 - PWA</a><br/><br/><br/>급식 피드백, 반 별 TODO리스트, 커뮤니티 등 실시간성이 필요한 기능을 구현하는 데에는 Firebase Cloud Firestore를 사용하였습니다.<br/><br/><a className='link' href='https://blog.yuntae.in/firebase-데이터베이스-보안-설정하기-7e0608d2a2a142c4b7c1dfcdaf30d623' target='_blank'>Firebase 데이터베이스 보안 설정하기</a><br/><br/><br/>2023년 나이스 개편 당시, 장기간 나이스 서비스에 장애가 발생하여 이에 대응하기 위해 Redis의 캐시 기능을 이용해 정보를 정상적으로 제공하였습니다.<br/><br/><a className='link' href='https://blog.yuntae.in/학교-앱에서-4달-동안-급식-api가-멈춘다면-bbe33b6f19e74f3fb8a1062219317a83' target='_blank'>학교 앱에서 4달 동안 급식 API가 멈춘다면</a>",
        "links": [
            {
                "name": "Github",
                "url": "https://github.com/icecream0910/ssoak"
            },
            {
                "name": "웹 버전",
                "url": "https://sungil.vercel.app"
            },
            {
                "name": "플레이스토어",
                "url": "https://play.google.com/store/apps/details?id=com.icecream.sungilmeal"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "22.01 ~ 24.01"
            },
            {
                "name": "상태",
                "value": "종료"
            },
            {
                "name": "사용자",
                "value": "100+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "date": "22.01 ~ 24.01",
        "participants": "개인",
        "icon": "/ssoak.webp",
        "image": [
            "https://play-lh.googleusercontent.com/F5sjnKun6Quga1sicKGBDh7q3rQTUN7bz9oy-Jcu-Dd_qC01dola-OLuN2B83Hr2YQ=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/SWABm8PtWAOsjGsp4W9gYp0ud3jwa0zN5PLy_1WXE3EuX5yglFHCrcjTrpBZ8QBcVUw=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/D35ECmLL5nwQRtYoV3Thq_UgfmOGs0NxYh4Qa-6gYb0H2-SqmzGuqQXqL2OmHSv1KLo=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/NlNVcFdj2gBoJvA5YUhJ0Wr6c8Nqoe7aj6EfJwXDdr2v8r56Vt7jNzm3BNNSLE0CKI3d=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/R55RoJLcbqUMhdGhp20S80w4MnxDV1H9bEkgxZRMxadp6jNJB7ne-f75k8OiwdYS1_8=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/zUukJYTiLyD5WRNTylc4OvlaZhMJ7TCHLX13a72w3Ojr7v6TRxXiwPtPcacI7EdTYg=w5120-h2880-rw",
            "https://play-lh.googleusercontent.com/_Mj8tm-U9XZOnkFiRmvoxSAn3WuoS9CWH3bkceyqaMtfIV-hXkl8qbxCmdedvu2yLA=w5120-h2880-rw"
        ]
    },
    {
        "title": "유니터뷰",
        "category": ["Web"],
        "pin": false,
        "summary": "AI를 이용해 대학 생기부 기반 면접 준비를 도와주는 사이트.",
        "desc": `
        <h3 style="margin-bottom:10px">개발 동기</h3>
        고등학교 때 대학 입시 과정에서, 면접을 준비하는 학생들이 생활기록부(이하 '생기부')를 일일이 분석하고 예상 질문을 만드는 데 어려움을 겪고 있음을 인식했습니다. AI 기술로 이를 해결하여 본인을 포함해 대입 면접을 준비하는 학생들이 조금이나마 도움을 받을 수 있는 서비스를 제공하고자 하였습니다.
        <br/><br/><br/>
        <h3 style="margin-bottom:10px">주요 기능</h3>
        - 생기부 PDF 파일을 업로드하면, 이를 자동으로 분석하여 대입 면접 예상 질문과 생기부 내용 요약을 생성합니다.<br/><br/>
        <img src="https://i.imgur.com/GUDGJVx.png" width="100%" style="border-radius:15px"/>
        <br/><br/>
        - 예상 질문에 대해 답변을 작성해보고, 이를 PDF로 출력할 수 있는 기능을 제공합니다.<br/><br/>
         <img src="https://i.imgur.com/PxATADr.png" width="100%" style="border-radius:15px"/>
<br/><br/>
        - AI 기능을 활용한 '챗터뷰' 기능을 제공합니다. 사용자의 답변에 따라 꼬리 질문도 혼합하여 모의 면접을 진행해볼 수 있습니다.<br/><br/>
        <img src="https://i.imgur.com/wfsK1tu.png" width="100%" style="border-radius:15px"/><br/><br/>
        - 학생 정보를 관리할 수 있는 관리자 페이지를 개발하였습니다. 교사가 학생들의 면접 준비 진행 상황을 확인하고, 학생들이 작성해둔 답변을 읽고 피드백할 수 있습니다.<br/><br/>
        <img src="https://i.imgur.com/20zMJwV.png" width="100%" style="border-radius:15px"/><br/><br/><br/>
<h3 style="margin-bottom:10px">기술 스택</h3>
- NextJS 13<br/><br/>
- Firebase Realtime DB: 각 과목의 생기부 항목 내에서 예상 질문, 질문에 대한 답변, 메모 등이 하위 분류 형태로 저장되는 구조로 설계하였습니다. 이에 적합하다고 판단되는 문서 기반 데이터베이스인 Firebase를 채택하였습니다.<br/><br/>
- jspdf: 생기부 PDF 파일을 업로드하면 이를 텍스트로 전환한 후 PDF 형식에 맞춰 과목 별 기재 내용을 파싱할 수 있도록 구현해야 했습니다. 또한 예상 질문 내역을 PDF로 변환하여 출력할 수 있도록 하기 위해 PDF 문서를 생성하는 기능도 필요했습니다. 이를 위해 jspdf라는 라이브러리를 사용하였습니다.<br/><br/>
- Auth.js(NextAuth.js): 로그인 기능을 구현하기 위해 사용하였습니다. 카카오, 네이버 계정과의 OAuth 연동을 통해 별도 회원가입없이 빠르게 로그인할 수 있도록 했습니다.<br/><br/>
- react-cropper: 생기부 수동 입력 모드에서 사진을 찍은 후 필요한 부분만 웹페이지 내에서 자를 수 있도록 하기 위해 사용하였습니다.<br/><br/>
- Google OCR API: 생기부 수동 입력 모드에서 텍스트를 자동으로 추출하여 직접 타이핑하지 않고도 입력할 수 있도록 하였습니다.<br/><br/>
- OpenAI GPT-3.5: 생기부 요약 및 예상 질문 생성, 답변에 대한 피드백 생성 등을 위해 LLM 모델을 사용하였습니다.<br/><br/>
<br/><br/>`,
        "links": [
            {
                "name": "Github",
                "url": "https://github.com/IceCream0910/uniterview"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "23.09 ~ 23.12"
            },
            {
                "name": "상태",
                "value": "종료"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "/uniterview.png",
        "image": []
    },
    {
        "title": "박명수 짤 검색기",
        "category": ["Web"],
        "directLink": "https://myungsu.vercel.app/",
        "pin": false,
        "summary": "키워드로 박명수 짤을 검색할 수 있는 웹 사이트",
        "desc": "",
        "links": [
        ],
        "info": [
        ],
        "icon": "",
        "image": []
    },
    {
        "title": "굴절 시뮬레이터",
        "category": ["Web"],
        "directLink": "https://gulzeol.vercel.app/",
        "pin": false,
        "summary": "고등학교 때 물리학 과목의 셍기부를 쓰려고 만든 굴절 시뮬레이터",
        "desc": "",
        "links": [
        ],
        "info": [
        ],
        "icon": "",
        "image": []
    },
    {
        "title": "0yak",
        "category": ["Web"],
        "directLink": "https://0yak.vercel.app/",
        "pin": false,
        "summary": "제20대 대한민국 대통령 선거 후보자 정보와 공약을 비교하여 확인할 수 있는 웹사이트",
        "desc": "",
        "links": [
        ],
        "info": [
        ],
        "icon": "",
        "image": []
    },
    {
        "title": "T-REX Runner in Sidebar",
        "category": ["Browser Extension"],
        "directLink": "https://store.whale.naver.com/detail/oopeaffdcbgoeicbcibbmialglioebkj",
        "pin": false,
        "summary": "Chrome 이스터에그인 공룡 게임을 리메이크해 웨일 사이드바에서 플레이할 수 있는 확장앱 ",
        "desc": "",
        "links": [
            {
                "name": "Whale Store",
                "url": "https://store.whale.naver.com/detail/oopeaffdcbgoeicbcibbmialglioebkj"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "2021."
            },
            {
                "name": "상태",
                "value": "서비스 중"
            },
            {
                "name": "사용자",
                "value": "25만+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "https://whale-store.pstatic.net/20190511_299/1557549546406F0N2J_PNG/b35b6b3c-5f36-4ed2-81e0-cd13a103120a.png",
        "image": ["https://whale-store.pstatic.net/20190222_297/1550821710781qBrwX_PNG/%BD%BD%B6%F3%C0%CC%B5%E50001.png"]
    },
    {
        "title": "Google Keep in Sidebar",
        "category": ["Browser Extension"],
        "directLink": "https://store.whale.naver.com/detail/mpigbcflpddfcbidjdnaadbccaffdene",
        "pin": false,
        "summary": "Google Keep을 웨일 사이드바에 최적화된 UI로 사용할 수 있도록 한 확장앱",
        "desc": "",
        "links": [
            {
                "name": "Whale Store",
                "url": "https://store.whale.naver.com/detail/mpigbcflpddfcbidjdnaadbccaffdene"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "2020."
            },
            {
                "name": "상태",
                "value": "서비스 중"
            },
            {
                "name": "사용자",
                "value": "27만+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "https://whale-store.pstatic.net/20200513_156/1589334213679CIxx6_PNG/icon-128.png",
        "image": ["https://whale-store.pstatic.net/20181114_263/15421901137710girQ_PNG/slide1.png"]
    },
    {
        "title": "Blockit",
        "category": ["Browser Extension"],
        "pin": false,
        "summary": "특정 사이트 접속 차단 기능을 제공하는 브라우저 확장앱",
        "desc": `
        <h3 style="margin-bottom:10px">관련 포스팅</h3>
        <a className='link' href='https://blog.yuntae.in/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%ED%99%95%EC%9E%A5%EC%95%B1-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0aka-%ED%9A%8C%EA%B3%A0%EB%A1%9D-019ce48f846c47e799302835287a8b60#2a3a960c54224010a72ee389a8f3feca' target='_blank'>브라우저 먹통시켜서 네이버에서 연락받은 썰 - 브라우저 확장앱 개발하기</a>`,
        "links": [
            {
                "name": "Whale Store",
                "url": "https://store.whale.naver.com/detail/gfdaidimgcibdjiidpmbobhhaojnjbfd"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "2021."
            },
            {
                "name": "상태",
                "value": "서비스 중"
            },
            {
                "name": "사용자",
                "value": "2만+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "https://whale-store.pstatic.net/20191229_273/1577545398389nNCXJ_PNG/icon_128.png",
        "image": ["https://whale-store.pstatic.net/20191229_257/1577546353275xMyTc_PNG/1.png", "https://whale-store.pstatic.net/20191229_236/1577546357699txSDe_PNG/2.png", "https://whale-store.pstatic.net/20191229_268/15775463577022v9rD_PNG/3.png"]
    },
    {
        "title": "코로나콕",
        "category": ["App", "Web"],
        "pin": false,
        "summary": "코로나19 현황과 정보를 시각화하여 보여주는 대시보드 서비스.",
        "desc": "코로나19 바이러스의 국내 확산 현황과 동선 등을 질병관리청 API 및 홈페이지 크롤링를 통해 수집하고, 이를 차트와 지도 등으로 시각화하여 사용자에게 직관적으로 표시하도록 했습니다.<br/><br/>Socket 통신을 활용하여 당일 실시간 확진자 집계 기능을 구현하였습니다.<br/>또한, 안드로이드 앱을 통해 위젯 및 푸시 알림 브리핑 기능을 제공하여 사용자들이 최신 정보를 빠르게 받아볼 수 있도록 하였습니다.<br/><br/><img src='https://i.imgur.com/i3SeZ5t.png' width='100%' style='border-radius: 15px'><br/><br/>누적 페이지 뷰 약 17000회를 기록하였으며, 사용자의 피드백을 받아 기능을 추가하거나 수정하는 등 처음으로 많은 사람들이 이용하는 서비스를 운영해보는 경험을 할 수 있었습니다.",
        "links": [
            {
                "name": "소스코드",
                "url": "https://github.com/icecream0910/coronacoc"
            },
            {
                "name": "웹 버전",
                "url": "https://coronacoc.vercel.app/app/"
            },
            {
                "name": "원스토어",
                "url": "https://m.onestore.co.kr/mobilepoc/apps/appsDetail.omp?prodId=0000756996"
            }
        ],
        "info": [
            {
                "name": "기간",
                "value": "20.03 ~ 22.05"
            },
            {
                "name": "상태",
                "value": "종료"
            },
            {
                "name": "사용자",
                "value": "500+"
            },
            {
                "name": "기여도",
                "value": "개인"
            }
        ],
        "icon": "/coronacoc.png",
        "image": ["https://img.onestore.co.kr/thumbnails/img_sac/0_0_A20_40/data12/android/202107/14/SE201907221631509800045734/0000756996/img/preview/0000756996_DP000103_20210714083813.png", "https://img.onestore.co.kr/thumbnails/img_sac/0_0_A20_40/data12/android/202107/14/SE201907221631509800045734/0000756996/img/preview/0000756996_DP000104_20210714083816.png", "https://img.onestore.co.kr/thumbnails/img_sac/0_0_A20_40/data12/android/202107/14/SE201907221631509800045734/0000756996/img/preview/0000756996_DP000105_20210714083820.png", "https://img.onestore.co.kr/thumbnails/img_sac/0_0_A20_40/data12/android/202107/14/SE201907221631509800045734/0000756996/img/preview/0000756996_DP000106_20210714083824.png"]
    },
];