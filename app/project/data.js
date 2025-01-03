export default [
    {
        "title": "KLAS+",
        "category": "KWU",
        "pin": true,
        "summary": "광운대학교 KLAS 앱의 기능과 UI를 추가 및 수정한 안드로이드 앱.",
        "desc": "⚠️ 주의 : 개인 사용 용도로 제작된 앱으로 학교의 공식 앱이 아닙니다. 불법적인 목적으로 사용 시 발생하는 불이익에 대해서 개발자는 어떠한 책임도 지지 않음을 밝힙니다.<br/><br/><h3>주요 기능</h3><br/>- 미수강 강의 및 미수강 과제 확인<br/>- 강의 홈에서 강의계획서 바로 조회<br/>- 모바일 학생증(중앙도서관 이용증) 위젯<br/>- KLAS 메뉴 목록 개선 및 검색 기능<br/>- 개선된 성적 페이지(학기 별 성적 표시, 성적 추이 그래프 표시 등)<br/>- 온라인 강의 백그라운드 재생/PIP 지원<br/>- QR 출석체크 진입 과정 간소화<br/>- KLAS 내 정보를 바탕으로 답변하는 KLAS GPT(Beta)<br/><br/><h3>참고</h3><br/>KLAS Helper 크롬 익스텐션 : <a href='https://github.com/kw-service/klas-helper-extension' target='_blank'>kw-service/klas-helper-extension</a><br/>중앙도서관 이용증 PoC : <a href='https://github.com/mirusu400/KWU-library-QR-PoC' target='_blank'>mirusu400/KWU-library-QR-PoC<a/>",
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
        "desc": `국내 라디오는 인터넷에서 청취하기 위해서는 각 방송사의 앱을 각각 설치해주어야 스트리밍할 수 있는 경우가 많습니다. 물론 자체 앱에서만 제공하는 실시간 댓글이나 보이는 라디오 등과 같은 기능 때문이기도 하겠지만, 단순히 라디오를 듣고자 하는 사용자 입장에서는 불편함이 있는 것이 사실입니다.<br/>따라서 국내 라디오 방송국의 스트리밍 프로토콜을 모아 재생할 수 있는 서비스를 만들고자 하였습니다.<br/><br/>- 세상의 모든 스테이션, 여기에서 한번에<br/>파편화된 라디오 앱을 방송사별로 설치하지 않아도 앱 하나로 주요 라디오를 모두 청취할 수 있습니다.<br/><br/>- 필요한 기능만 담은 깔끔한 플레이어<br/>라디오 감상에 집중할 수 있도록, 필요한 기능만 담아 감성적이고 깔끔한 디자인의 플레이어를 완성했습니다. 현재 방송 중인 프로그램명과 선곡 정보도 확인해보세요.<br/><br/>- 정해진 시간에 알아서 꺼지는 종료 타이머<br/>라디오를 틀어놓고 잠들어도 걱정 없도록, 플레이어에서🌙 아이콘을 눌러 종료 타이머를 설정할 수 있습니다. 정해진 시간에 재생중인 라디오가 알아서 종료됩니다.<br/><br/>- 자주 듣는 라디오는 모아뒀다가 바로<br/>자주 듣는 스테이션은 하트 버튼을 눌러 자주 듣는 리스트에 추가해보세요. 자주 듣는 스테이션만 바로 모아볼 수 있습니다.<br/><br/>Next.js를 기반으로 개발했습니다. Supabase DB를 이용해 각 스테이션 별 누적 청취자 수를 집계하여 표시하는 기능을 구현하였습니다.<br/>지역/방송사별로 정보를 정리한 JSON 파일을 만들고, 각 방송사별로 스트리밍 프로토콜을 가져오기 위해 API Routes를 만들어 사용했습니다.<br/><br/>안드로이드 앱은 WebView를 기반으로 동작하는 하이브리드 앱으로 개발하였습니다. 웹뷰와 통신하기 위해 Bridge를 사용하여 웹페이지와 안드로이드 앱의 함수를 서로 호출할 수 있도록 구현하였습니다.<br/>미디어 백그라운드 재생을 위해 안드로이드의 Media3 (ExoPlayer) API를 사용하였고, 종료 타이머를 구현하기 위해 CountDownTimer API를 사용했습니다.<br/><br/>네이버 웨일 브라우저의 사이드바에서 서비스를 이용할 수 있도록 웨일 확장앱을 개발하였습니다.`,
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
        <pre>광운대학교 인공지능융합학부 2024학년도 2학기 공학설계입문 작품전시회에서 우수상을 수상한 작품입니다.</pre>
        <h3>개발 동기</h3>
최근 이른바 '응급실 뺑뺑이' 현상으로 인한 사망자 증가와 응급 환자의 적시 치료 실패 사례가 언론을 통해 보도되면서 심각한 사회적 문제로 대두되고 있다. 이는 특히 최근 전공의 집단행동과 함께 급증하고 있지만, 대규모 감염병 유행 사태  당시 하루 평균 12.9명 꼴로 재이송 사례가 발생한 것과 같이 비단 일시적인 문제는 아니다. 일부 지자체를 시작으로 병원 자동 매칭 시스템 등을 도입하고 있으나, 환자 상태를 정확하게 전달하지 못하거나 오히려 구급대원의 업무를 가중시키는 등의 또다른 문제가 나타나고 있다.
<br/><br/>
<h3>기술 스택</h3>
Frontend: Next.js<br/>
Backend: Nest.js, Supabase(PostgreSQL), postGIS<br/>
API: Kakao MAP SDK, Google Gemini<br/>
<br/>
<h3>주요 구현 기능</h3>
 - 환자 증상 상태 입력을 통한 KTAS 코드 자동 산출<br/>
 - 음성인식(STT)와 LLM을 사용해 음성 브리핑으로 환자 등록<br/>
 - 인근 병원에 요청 전송 및 수락/거절 여부 피드백<br/>
 - 구급대원 측에서 최종 이송 병원 확정 가능
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
        "image": ["https://i.imgur.com/kU1nQhC.png", "https://i.imgur.com/xJnijDg.png"],
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
        "desc": "생활기록부 파일을 업로드하면, 이를 자동으로 분석하여 텍스트를 추출하고, 대입 면접 예상 질문과 생기부 내용 요약을 생성합니다. Next.js로 개발되었으며, Auth.js를 이용한 네이버, 카카오 소셜 로그인 기능을 구현했습니다.<br/><br/>AI 기능에는 OpenAI의 GPT 모델을 사용하였습니다. 채팅으로 모의 면접을 진행할 수 있는 '챗터뷰'를 개발하였습니다. AI가 생기부 기반으로 생성한 질문 중 랜덤으로 사용자에게 질의하고, 이에 대한 사용자의 답변을 분석하여 피드백 제공 및 꼬리 질문을 생성합니다.<br/><br/>학생 정보를 관리할 수 있는 관리자 페이지를 개발되었습니다. 교사가 학생들의 면접 준비 진행 상황을 확인하고, 학생들이 작성해둔 답변을 읽고 피드백할 수 있습니다.<br/><br/>",
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
        "image": ["/uniterview_sc.JPG"]
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
        "pin": false,
        "summary": "Google Keep을 웨일 사이드바에 최적화된 UI로 사용할 수 있도록 한 확장앱",
        "desc": "누적 다운로드 수 약 28만 회 기록",
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
        "desc": "<a className='link' href='https://blog.yuntae.in/브라우저-확장앱-개발하기aka-회고록-019ce48f846c47e799302835287a8b60' target='_blank'>브라우저 확장앱 개발하기(aka. 회고록)</a>",
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