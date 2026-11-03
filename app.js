// Seed user accounts
const defaultUsers = [
    { username: "test", password: "1234", name: "김선생", email: "test@blink.kr", status: "APPROVED", job: "전문 심리상담사", certs: ["한국상담학회 전문상담사"] },
    { username: "director", password: "1234", name: "박센터장", email: "director@blink.kr", status: "APPROVED", job: "상담센터 센터장/운영자", certs: ["한국상담심리학회 상담심리사 1급"] },
    { username: "clinical", password: "1234", name: "이임상", email: "clinical@blink.kr", status: "APPROVED", job: "임상심리사", certs: ["임상심리사/정신건강임상심리사"] },
    { username: "trainee", password: "1234", name: "최수련", email: "trainee@blink.kr", status: "APPROVED", job: "수련생/대학원생", certs: ["청소년상담사"] },
    { username: "rhkdqufdl", password: "rhkdqufdl", name: "광별이", email: "rhkdqufdl@blink.kr", status: "APPROVED", job: "전문 심리상담사", certs: ["한국상담학회 전문상담사"] }
];

// Generator for 45 Virtual Expert Profiles across 5 pages
function generateVirtualExperts() {
    const familyNames = ["김", "박", "이", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍", "전", "고", "문", "양", "손"];
    const givenLastNames = ["재", "영", "훈", "진", "우", "현", "연", "은", "아", "희", "성", "경", "민", "수", "주", "혁", "원", "하", "림", "호", "준"];
    
    const jobs = [
        "전문 심리상담사 1급",
        "임상심리사 1급 / EAP 코치",
        "정신건강임상심리사 1급",
        "상담심리사 2급",
        "수퍼바이저 / 자문위원",
        "미술·매체치료 전문가",
        "청소년상담사 1급",
        "EAP 전문 상담사",
        "부부 및 가족치료사",
        "독서·매체 심리치료 전문가"
    ];

    const topics = [
        { cat: "부모교육/아동청소년", text: "부모교육 / 아동청소년 특강" },
        { cat: "기업EAP/조직소통", text: "기업 EAP / 임직원 힐링 코칭" },
        { cat: "위기개입/트라우마", text: "위기개입 / 재난 트라우마 파견" },
        { cat: "심리검사해설", text: "TCI / MBTI 심리검사 집단해설" },
        { cat: "슈퍼비전/사례자문", text: "사례 자문위원 / 수퍼비전 제공" }
    ];

    // 다양화된 활동 가능 지역 세부 목록
    const regions = [
        { cat: "광주광역시", text: "광주광역시 전체 (서구·남구·북구·광산구·동구)" },
        { cat: "광주광역시", text: "광주 서구·남구 및 화순 인근 지역" },
        { cat: "광주광역시", text: "광주 북구·광산구 및 장성 인근 지역" },
        { cat: "전남 서부권", text: "전남 서부권 (목포·나주·무안·영암·함평 등)" },
        { cat: "전남 서부권", text: "전남 나주시·무안군 및 신안·해남권" },
        { cat: "전남 서부권", text: "전남 목포시·영암군 및 강진·완도권" },
        { cat: "전남 동부권", text: "전남 동부권 (순천·여수·광양·구례·고흥 등)" },
        { cat: "전남 동부권", text: "전남 순천시·광양시 및 곡성·보성권" },
        { cat: "전남 동부권", text: "전남 여수시·순천시 전역" }
    ];

    const bios = [
        "15년간 아동청소년 상담 및 자아존중감 향상 집단 프로그램을 진행해 왔습니다.",
        "공공기관 및 기업 임직원 번아웃 예방 힐링 워크숍과 조직 코칭 전문가입니다.",
        "재난 및 현장 위기 사건 응급 심리 지원과 트라우마 개입 전문 상담사입니다.",
        "TCI, MBTI 및 HTP 검사를 활용한 소통 워크숍 및 1:1 심층 해설 진행.",
        "초심 상담사 및 기관 전담자를 위한 1:1 수퍼비전과 사례 자문을 제공합니다."
    ];

    const experts = [];
    for (let i = 0; i < 45; i++) {
        const f = familyNames[i % familyNames.length];
        const l = givenLastNames[i % givenLastNames.length];
        const maskedName = `${f}O${l}`;
        const topicObj = topics[i % topics.length];
        const regionObj = regions[i % regions.length];

        experts.push({
            id: `exp-${i + 1}`,
            name: maskedName,
            job: jobs[i % jobs.length],
            topicCategory: topicObj.cat,
            topicText: topicObj.text,
            regionCategory: regionObj.cat,
            regionText: regionObj.text,
            bio: bios[i % bios.length]
        });
    }
    return experts;
}

function calculateDDay() {
    const now = new Date();
    const deadline = new Date("2026-11-04T23:59:59");
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { text: "마감완료", isClosed: true };
    } else if (diffDays === 0) {
        return { text: "마감 D-Day (오늘 마감)", isClosed: false };
    } else {
        return { text: `마감 D-${diffDays} (~11.04)`, isClosed: false };
    }
}

function generateRequestsDataset() {
    const ddayStatus = calculateDDay();

    // 1페이지 최상단 고정 공고 (페이지투어)
    const featuredPost = {
        id: 'req-featured-book-traveler',
        category: '축제·행사 마음부스',
        title: '체험형 팝업스토어 \'페이지투어\' 진행 및 북트레블러 모집',
        org: '페이지투어 (Page Tour)',
        dateTime: '2026.11.07 (토) 14:00 ~ 19:30',
        target: '팝업스토어 방문객 및 책·여행 관심 참여자',
        fee: '상의 후 결정',
        qual: '심리상담사 / 전문 코치 / 매체치료 및 독서치료 전문가',
        body: `【공고 상세 내용】\n페이지투어에서 주관하는 체험형 팝업스토어 '페이지투어'에서 활약해주실 북트레블러 전문가를 모집합니다.\n\n- 행사명: 체험형 팝업스토어 '페이지투어'\n- 핵심 키워드: 책, 여행, 마음쉼, 라이프 코칭\n- 일시: 2026년 11월 7일(토) 14:00 ~ 19:30\n- 주요 역할: 방문객 대상 '책과 여행' 매개 숏상담, 정서 케어 부스 운영 및 라이프 코칭\n- 모집 마감일: 2026년 11월 4일(수)까지\n\n관심 있으신 상담사 및 코치 선생님들의 많은 신청 부탁드립니다.`,
        status: ddayStatus.isClosed ? '모집완료' : '모집중',
        date: '2026.10.28',
        isFeatured: true,
        ddayText: ddayStatus.text
    };

    const requests = [featuredPost];

    // 10페이지 구성을 위한 다양한 기관 및 주제 데이터베이스 (총 90개 추가 -> 91개 -> 10페이지)
    const categories = [
        "마음 특강·강연", "힐링 워크숍·체험", "소그룹·집단상담",
        "1:1 개인상담 파견", "축제·행사 마음부스", "사례 자문·슈퍼비전", "긴급 위기 지원"
    ];

    const orgTemplates = [
        "(사)마음이음 청소년지원협회", "사단법인 마음숲 정신건강나눔회", "나눔과쉼 다문화가족지원회",
        "(사)빛고을 마음돌봄협회", "순천 푸른숲 청소년문화나눔회", "(사)바다소리 지역복지나눔회",
        "여수 햇살 건강증진협의회", "(사)청년마음쉼표 학생지원회", "(사)아름다운동행 인권나눔회",
        "(사)마음건강 교육나눔협회", "(사)새싹돋움 육아나눔회", "광양 하늘빛 가족사랑회",
        "(사)푸른청년 대학생멘토링협회", "(사)마음온 직장인힐링협회", "(사)청년도약 창업나눔협회"
    ];

    const titleTemplates = [
        "청소년 마음건강 및 자아존중감 향상 특강 강사 모심",
        "지자체 청년층 대상 번아웃 예방 힐링 워크숍 진행 전문가 섭외",
        "다문화 가정 부모-자녀 정서 교감 집단상담 전문가 모집",
        "기업 임직원 스트레스 관리 및 감정조절 특강 강사 요청",
        "지역 사회복지관 독서 치료 및 마음케어 프로그램 진행자 모집",
        "초·중등 교원 대상 감정코칭 및 청소년 심리 이해 강연",
        "지역 청년 1:1 심리상담 파견 전문 상담사 모집",
        "공공기관 직원 마음건강 정기 상담 파견 전문가 위촉",
        "지역 문화 축제 '마음건강 힐링 부스' 상담 전문가 팀 모집",
        "아동·청소년 전문 수퍼바이저 및 사례 자문위원 모심",
        "위기 청소년 응급 심리 지원 및 긴급 개입 전문가 모집",
        "노인 복지관 우울 예방 및 자아통합감 미술치료 집단 모집",
        "취업 준비생 대상 TCI 심리검사 집단 해석 워크숍 섭외",
        "대학생 감정케어 및 또래상담자 멘토링 특강 수석강사 섭외",
        "가족관계 개선 및 소통 부모교육 전문강사 파견 요청"
    ];

    // 10월 31일부터 3월까지 최근 순서로 배치 (총 89개 생성)
    const totalCount = 89;
    const startDate = new Date(2026, 9, 31); // 10월 31일
    const endDate = new Date(2026, 2, 1);    // 3월 1일
    const timeRange = startDate.getTime() - endDate.getTime();

    for (let i = 0; i < totalCount; i++) {
        // 최근 날짜부터 서서히 과거 날짜로 배치
        const timeOffset = (i / totalCount) * timeRange + (Math.random() * 86400000 * 0.5);
        const itemDate = new Date(startDate.getTime() - timeOffset);
        const month = String(itemDate.getMonth() + 1).padStart(2, '0');
        const day = String(itemDate.getDate()).padStart(2, '0');
        const dateStr = `2026.${month}.${day}`;

        const cat = categories[i % categories.length];
        const org = orgTemplates[i % orgTemplates.length];
        const title = titleTemplates[i % titleTemplates.length];

        requests.push({
            id: `req-${i + 1}`,
            category: cat,
            title: title, // (숫자) 표기 제거
            org: org,
            dateTime: `2026.${month}.${Math.min(28, parseInt(day) + 2)} / 전남·광주 현장`,
            target: "관내 주민 및 대상자 30~50명",
            fee: "상의 후 결정",
            qual: "관련 분야 자격증 보유자 / 심리상담사 2급 이상",
            body: `본 프로그램은 ${org}에서 주관하는 전문 마음건강 사업의 일환입니다.\n선생님들의 많은 관심과 지원 부탁드립니다.`,
            status: i < 15 ? "모집중" : "모집완료",
            date: dateStr
        });
    }

    return requests;
}

function generatePostsDataset() {
    const posts = [];
    const familyNames = ["김", "박", "이", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍", "전", "고", "문", "양", "손"];
    
    const titles = [
        "비자발적으로 방문한 아동청소년 내담자 초기 라포 형성 노하우 공유해주실 분 계신가요?",
        "공공기관 연계 상담 시 개인정보 및 동의서 간소화 서식 양식 공유 가능할까요?",
        "TCI 검사 해석 시 프로파일 불일치 사례 다루는 수퍼비전 팁이 궁금합니다.",
        "성인 경계선 지능 의심 내담자 초기 평가 시 검사 도구 추천 부탁드립니다.",
        "프리랜서 상담사 종합소득세 신고 및 사업자 등록 관련 조언 부탁드립니다.",
        "트라우마 사건 경험 내담자 안정화 기법 적용 시 고려해야 할 점",
        "은둔형 외톨이 청년 상담 초기 개입 시 효과적인 대화 기법",
        "부부상담 중 갈등이 격화되는 상황에서 중재 노하우가 있으신가요?",
        "초심 상담사를 위한 수퍼비전 준비서 작성 양식 및 팁 공유",
        "지역 내 소모임 스터디 그룹(DSM-5-TR 사례 개념화) 모집합니다.",
        "학교현장 위기개입 시 교사와 학부모 간 소통 조율 노하우",
        "미술 매체 활용 시 라포 형성에 유용한 서식이나 워크북 추천",
        "사이버 상담 및 화상 상담 시 몰입도 유지 방안에 대하여",
        "내담자의 저항이 심할 때 상담자 본인의 번아웃 관리 방법",
        "다문화 가정 상담 시 언어 장벽 극복 및 매체 활용 사례"
    ];

    const bodies = [
        "부모님의 강요로 센터에 오게 된 중학교 2학년 내담자입니다.\n초기 2회기 동안 침묵으로 일관하거나 '모르겠어요'로만 응답하고 있는데, 매체 활용 전략이나 대화법 노하우가 궁금합니다.",
        "지자체 연계 사업으로 위탁 상담을 진행 중인데, 초기 수속 서류가 너무 복잡하여 간소화된 서식을 공유받고 싶습니다.",
        "TCI 기질 및 성격검사 시 자율성과 연대감이 극단적으로 낮게 나올 때 내담자 반응 다루기 수월한 팁이 있을까요?",
        "종합심리검사 실시 전 초기 면담 과정에서 경계선 지능 지표를 선별할 때 유용한 질문 구성이 궁금합니다.",
        "올해부터 개인 센터와 외부 기관 출강을 병행하게 되었는데 세무 관련 참고자료나 노하우가 필요합니다."
    ];

    // 100개 게시글 생성 -> 페이지당 10개씩 정확히 10페이지 구성
    const totalCount = 100;
    const startDate = new Date(2026, 9, 31); // 10월 31일
    const endDate = new Date(2026, 2, 1);    // 3월 1일
    const timeRange = startDate.getTime() - endDate.getTime();

    for (let i = 0; i < totalCount; i++) {
        // 최근 순서로 배치
        const timeOffset = (i / totalCount) * timeRange + (Math.random() * 86400000 * 0.3);
        const itemDate = new Date(startDate.getTime() - timeOffset);
        const month = String(itemDate.getMonth() + 1).padStart(2, '0');
        const day = String(itemDate.getDate()).padStart(2, '0');
        const dateStr = `2026.${month}.${day}`;

        const fn = familyNames[i % familyNames.length];
        const author = `${fn}**`;
        const category = i % 2 === 0 ? "현장고민" : "질의응답";
        const title = titles[i % titles.length];
        const body = bodies[i % bodies.length];

        posts.push({
            id: `post-${i + 1}`,
            category: category,
            title: title,
            body: body,
            author: author,
            date: dateStr
        });
    }
    return posts;
}

function getStoredRequests() {
    const stored = localStorage.getItem('blink_requests_v13');
    if (stored) {
        try { 
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length >= 80) return parsed;
        } catch (e) {}
    }
    const generated = generateRequestsDataset();
    localStorage.setItem('blink_requests_v13', JSON.stringify(generated));
    return generated;
}

function getStoredPosts() {
    const stored = localStorage.getItem('blink_posts_v12');
    if (stored) {
        try { 
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length >= 90) return parsed;
        } catch (e) {}
    }
    const generated = generatePostsDataset();
    localStorage.setItem('blink_posts_v12', JSON.stringify(generated));
    return generated;
}

function getStoredUsers() {
    const stored = localStorage.getItem('blink_users_v4');
    if (stored) {
        try {
            const users = JSON.parse(stored);
            // 기존 방문자 브라우저에도 새로 추가된 시드 계정이 들어가도록 병합
            let changed = false;
            defaultUsers.forEach(seed => {
                if (!users.some(u => u.username === seed.username)) { users.push(seed); changed = true; }
            });
            if (changed) localStorage.setItem('blink_users_v4', JSON.stringify(users));
            return users;
        } catch (e) { return defaultUsers; }
    }
    localStorage.setItem('blink_users_v4', JSON.stringify(defaultUsers));
    return defaultUsers;
}

let currentUser = JSON.parse(localStorage.getItem('blink_current_session') || 'null');
let userList = getStoredUsers();
let requestList = getStoredRequests();
let communityPosts = getStoredPosts();
let initialExperts = generateVirtualExperts();

let commCurrentPage = 1;
const commPageSize = 10;
let commCategoryFilter = 'ALL';
let commSearchQuery = '';

let reqCurrentPage = 1;
const reqPageSize = 9;

let expCurrentPage = 1;
const expPageSize = 9;

let activeReqDetail = null;
let activeExpertDetail = null;

document.addEventListener('DOMContentLoaded', () => {

    updateAuthHeader();

    const pageViews = {
        home: document.getElementById('page-home'),
        history: document.getElementById('page-history'),
        future: document.getElementById('page-future'),
        community: document.getElementById('page-community'),
        request: document.getElementById('page-request'),
        experts: document.getElementById('page-experts')
    };

    const desktopNavLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const pageTriggers = document.querySelectorAll('[data-page-target]');

    let animatedCountersDone = false;

    function navigateToPage(targetPage, opts = {}) {
        if (!pageViews[targetPage]) targetPage = 'home';

        Object.keys(pageViews).forEach(p => {
            if (p === targetPage) pageViews[p]?.classList.remove('hidden');
            else pageViews[p]?.classList.add('hidden');
        });

        desktopNavLinks.forEach(link => {
            const p = link.getAttribute('data-page-target');
            if (p === targetPage) {
                link.className = "nav-link px-3.5 py-2 rounded-full transition-all text-brand-600 font-bold bg-brand-50";
            } else {
                link.className = "nav-link px-3.5 py-2 rounded-full transition-all text-slate-600 hover:text-brand-600 hover:bg-slate-100";
            }
        });

        mobileNavLinks.forEach(link => {
            const p = link.getAttribute('data-page-target');
            if (p === targetPage) {
                link.className = "mobile-nav-link text-left hover:text-brand-600 py-1 font-bold text-brand-600";
            } else {
                link.className = "mobile-nav-link text-left hover:text-brand-600 py-1 text-slate-700";
            }
        });

        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.getElementById('menuOpenIcon')?.classList.remove('hidden');
            document.getElementById('menuCloseIcon')?.classList.add('hidden');
        }

        if (opts.scroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });

        // 현재 페이지를 주소 해시에 기록 (새로고침 시 같은 페이지 유지)
        if (opts.updateHash !== false && location.hash !== '#' + targetPage) {
            history.pushState(null, '', '#' + targetPage);
        }

        if (targetPage === 'history' && !animatedCountersDone) {
            setTimeout(animateCounters, 150);
            animatedCountersDone = true;
        }

        if (targetPage === 'request') renderRequestBoard();
        if (targetPage === 'experts') renderExpertGrid();
        if (targetPage === 'community') renderCommunityBoard();
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            if (!target) return;
            const duration = 1600;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }

    pageTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-page-target');
            navigateToPage(target);
        });
    });

    // History Year Filter Handling
    const historyFilterBtns = document.querySelectorAll('.history-filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    historyFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            historyFilterBtns.forEach(b => {
                b.className = "history-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-stone-100 text-slate-600 hover:bg-stone-200";
            });
            btn.className = "history-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all bg-brand-600 text-white shadow-xs";

            timelineItems.forEach(item => {
                const year = item.getAttribute('data-year');
                if (filter === 'all' || year === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Enter key modal dismissal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const statusModal = document.getElementById('statusModal');
            if (statusModal && !statusModal.classList.contains('hidden')) {
                statusModal.classList.add('hidden');
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            const openIcon = document.getElementById('menuOpenIcon');
            const closeIcon = document.getElementById('menuCloseIcon');
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }

    // Footer Modals
    document.getElementById('openTermsBtn')?.addEventListener('click', () => document.getElementById('termsModal')?.classList.remove('hidden'));
    document.getElementById('closeTermsModal')?.addEventListener('click', () => document.getElementById('termsModal')?.classList.add('hidden'));
    document.getElementById('confirmTermsModal')?.addEventListener('click', () => document.getElementById('termsModal')?.classList.add('hidden'));

    document.getElementById('openPrivacyBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.remove('hidden'));
    document.getElementById('closePrivacyModal')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.add('hidden'));
    document.getElementById('confirmPrivacyModal')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.add('hidden'));

    document.getElementById('openInquiryBtn')?.addEventListener('click', () => document.getElementById('inquiryModal')?.classList.remove('hidden'));
    document.getElementById('closeInquiryModal')?.addEventListener('click', () => document.getElementById('inquiryModal')?.classList.add('hidden'));
    document.getElementById('closeInquiryBtn')?.addEventListener('click', () => document.getElementById('inquiryModal')?.classList.add('hidden'));

    // Community apply modals
    const applyModal = document.getElementById('applyModal');
    document.querySelectorAll('.open-apply-btn').forEach(btn => {
        btn.addEventListener('click', () => applyModal?.classList.remove('hidden'));
    });
    document.getElementById('closeApplyModal')?.addEventListener('click', () => applyModal?.classList.add('hidden'));
    document.getElementById('openApplyFromLoginBtn')?.addEventListener('click', () => {
        document.getElementById('loginModal')?.classList.add('hidden');
        applyModal?.classList.remove('hidden');
    });

    document.getElementById('communityApplyForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('applyName').value.trim();
        const username = document.getElementById('applyUsername').value.trim();
        const password = document.getElementById('applyPassword').value.trim();
        const email = document.getElementById('applyEmail').value.trim();

        const existingUsers = getStoredUsers();
        const userIndex = existingUsers.findIndex(u => u.username === username);

        const newUser = { username, password, name, email, status: "APPROVED", job: "전문 상담사" };

        if (userIndex >= 0) {
            existingUsers[userIndex] = newUser;
        } else {
            existingUsers.push(newUser);
        }

        userList = existingUsers;
        localStorage.setItem('blink_users_v4', JSON.stringify(userList));

        applyModal.classList.add('hidden');
        document.getElementById('communityApplyForm').reset();
        showStatusModal('가입 신청 완료', `${name} 선생님, 회원 정보 등록이 완료되었습니다. 생성하신 아이디로 로그인해보세요!`, true);
        
        // Pre-fill username field in login form for convenience
        const loginUserField = document.getElementById('loginUsername');
        if (loginUserField) loginUserField.value = username;

        document.getElementById('loginModal')?.classList.remove('hidden');
    });

    // Login Modal & Auth
    const loginModal = document.getElementById('loginModal');
    document.getElementById('openLoginBtn')?.addEventListener('click', () => loginModal?.classList.remove('hidden'));
    document.getElementById('openLoginBtnMobile')?.addEventListener('click', () => loginModal?.classList.remove('hidden'));
    document.getElementById('closeLoginModal')?.addEventListener('click', () => loginModal?.classList.add('hidden'));

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const uInput = document.getElementById('loginUsername').value.trim();
        const pInput = document.getElementById('loginPassword').value.trim();
        const errorMsg = document.getElementById('loginErrorMsg');

        // Reload fresh user list from local storage
        userList = getStoredUsers();
        const found = userList.find(u => u.username === uInput && u.password === pInput);

        if (found) {
            currentUser = found;
            localStorage.setItem('blink_current_session', JSON.stringify(currentUser));
            if (errorMsg) errorMsg.classList.add('hidden');
            loginModal.classList.add('hidden');
            document.getElementById('loginForm').reset();
            updateAuthHeader();
            showStatusModal('로그인 성공', `${currentUser.name} 선생님, 환영합니다!`, true);
        } else {
            if (errorMsg) {
                errorMsg.innerText = "아이디 또는 비밀번호가 일치하지 않습니다.";
                errorMsg.classList.remove('hidden');
            }
        }
    });

    function updateAuthHeader() {
        const headerAuthArea = document.getElementById('headerAuthArea');
        const mobileAuthArea = document.getElementById('mobileAuthArea');

        if (currentUser) {
            const loggedInUI = `
                <div class="flex items-center gap-2">
                    <div class="px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>${currentUser.name} 선생님</span>
                    </div>
                    <button id="logoutBtn" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors">
                        로그아웃
                    </button>
                </div>
            `;
            if (headerAuthArea) headerAuthArea.innerHTML = loggedInUI;
            if (mobileAuthArea) mobileAuthArea.innerHTML = loggedInUI;

            document.querySelectorAll('#logoutBtn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentUser = null;
                    localStorage.removeItem('blink_current_session');
                    location.reload();
                });
            });
        }
    }

    // Write Community Post
    const writePostModal = document.getElementById('writePostModal');
    document.getElementById('openWritePostBtn')?.addEventListener('click', () => {
        if (!currentUser) {
            showStatusModal('로그인 필요', '게시글 작성은 로그인 후 이용 가능합니다.', false);
            loginModal?.classList.remove('hidden');
            return;
        }
        writePostModal?.classList.remove('hidden');
    });
    document.getElementById('closeWritePostModal')?.addEventListener('click', () => {
        writePostModal?.classList.add('hidden');
    });

    document.getElementById('createPostForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            writePostModal?.classList.add('hidden');
            showStatusModal('로그인 필요', '로그인 세션이 만료되었습니다. 다시 로그인해주세요.', false);
            loginModal?.classList.remove('hidden');
            return;
        }

        const cat = document.getElementById('writeCategory').value;
        const title = document.getElementById('writeTitle').value.trim();
        const body = document.getElementById('writeBody').value.trim();
        const authorName = currentUser.name ? `${currentUser.name.charAt(0)}**` : '익명';

        const newPost = {
            id: `post-${Date.now()}`,
            category: cat,
            title: title,
            body: body,
            author: authorName,
            date: '2026.10.31'
        };

        communityPosts.unshift(newPost);
        localStorage.setItem('blink_posts_v12', JSON.stringify(communityPosts));
        writePostModal?.classList.add('hidden');
        document.getElementById('createPostForm').reset();
        showStatusModal('작성 완료', '게시글이 성공적으로 등록되었습니다.', true);
        commCurrentPage = 1;
        renderCommunityBoard();
    });

    // Write Request / Lecture Notice
    const writeRequestModal = document.getElementById('writeRequestModal');
    document.getElementById('openWriteRequestBtn')?.addEventListener('click', () => {
        if (!currentUser) {
            showStatusModal('로그인 필요', '섭외 및 강연 요청서 작성은 로그인 후 이용하실 수 있습니다.', false);
            loginModal?.classList.remove('hidden');
            return;
        }
        writeRequestModal?.classList.remove('hidden');
    });
    document.getElementById('closeWriteReqModal')?.addEventListener('click', () => {
        writeRequestModal?.classList.add('hidden');
    });

    document.getElementById('createRequestForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            writeRequestModal?.classList.add('hidden');
            showStatusModal('로그인 필요', '로그인 세션이 만료되었습니다. 로그인 후 등록해주세요.', false);
            loginModal?.classList.remove('hidden');
            return;
        }

        const cat = document.getElementById('writeReqCategory').value;
        const title = document.getElementById('writeReqTitle').value.trim();
        const org = document.getElementById('writeReqOrg').value.trim();
        const dateTime = document.getElementById('writeReqDateTime').value.trim();
        const target = document.getElementById('writeReqTarget').value.trim();
        const fee = document.getElementById('writeReqFee').value;
        const qual = document.getElementById('writeReqQual').value.trim();
        const body = document.getElementById('writeReqBody').value.trim();

        const newReq = {
            id: `req-${Date.now()}`,
            category: cat,
            title: title,
            org: org,
            dateTime: dateTime,
            target: target,
            fee: fee,
            qual: qual,
            body: body,
            status: "모집중",
            date: "2026.10.31"
        };

        requestList.unshift(newReq);
        localStorage.setItem('blink_requests_v13', JSON.stringify(requestList));
        writeRequestModal?.classList.add('hidden');
        document.getElementById('createRequestForm').reset();
        showStatusModal('등록 완료', '전문가 섭외/강연 요청 공고가 성공적으로 등록되었습니다.', true);
        reqCurrentPage = 1;
        renderRequestBoard();
    });

    // Community Category Filter Event Handlers
    const commCatBtns = document.querySelectorAll('.comm-cat-btn');
    commCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            commCatBtns.forEach(b => {
                b.className = "comm-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-100";
            });
            btn.className = "comm-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-brand-600 text-white shadow-xs";
            commCategoryFilter = btn.getAttribute('data-cat') || 'ALL';
            commCurrentPage = 1;
            renderCommunityBoard();
        });
    });

    const commSearchInput = document.getElementById('commSearchInput');
    if (commSearchInput) {
        commSearchInput.addEventListener('input', (e) => {
            commSearchQuery = e.target.value.trim();
            commCurrentPage = 1;
            renderCommunityBoard();
        });
    }

    // Render Community Board
    function renderCommunityBoard() {
        const container = document.getElementById('communityPostList');
        if (!container) return;

        const filtered = communityPosts.filter(post => {
            const matchCat = (commCategoryFilter === 'ALL') || (post.category === commCategoryFilter);
            const matchSearch = !commSearchQuery ||
                post.title.toLowerCase().includes(commSearchQuery.toLowerCase()) ||
                post.body.toLowerCase().includes(commSearchQuery.toLowerCase());
            return matchCat && matchSearch;
        });

        const total = filtered.length;
        const totalPages = Math.ceil(total / commPageSize) || 1;
        if (commCurrentPage > totalPages) commCurrentPage = totalPages;
        if (commCurrentPage < 1) commCurrentPage = 1;

        const start = (commCurrentPage - 1) * commPageSize;
        const pagePosts = filtered.slice(start, start + commPageSize);

        document.getElementById('totalPostsCount').innerText = total.toLocaleString();
        document.getElementById('currentPageRange').innerText = total === 0 ? '0' : `${start + 1} - ${Math.min(start + commPageSize, total)}`;

        if (pagePosts.length === 0) {
            container.innerHTML = `<div class="p-12 text-center text-slate-400 text-sm">등록된 게시글이 없습니다.</div>`;
        } else {
            container.innerHTML = pagePosts.map(post => `
                <div class="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center cursor-pointer group post-row" data-post-id="${post.id}">
                    <div class="md:col-span-2 text-center">
                        <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">${post.category}</span>
                    </div>
                    <div class="md:col-span-6">
                        <h4 class="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">${post.title}</h4>
                        <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${post.body}</p>
                    </div>
                    <div class="md:col-span-2 text-xs text-slate-500 text-center">
                        <div>${post.author}</div>
                        <div class="text-[10px] text-slate-400 font-en mt-0.5">${post.date}</div>
                    </div>
                    <div class="md:col-span-2 text-center">
                        <span class="text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-full border border-brand-200 transition-colors cursor-pointer trigger-chat-btn">1:1 대화</span>
                    </div>
                </div>
            `).join('');
        }

        renderPaginationControls('commPaginationButtons', totalPages, commCurrentPage, (p) => {
            commCurrentPage = p;
            renderCommunityBoard();
        });

        document.querySelectorAll('.post-row').forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.closest('.trigger-chat-btn')) {
                    e.stopPropagation();
                    handleChatRequest();
                    return;
                }

                const pid = row.getAttribute('data-post-id');
                const p = communityPosts.find(item => item.id === pid);
                if (p) {
                    document.getElementById('detailPostCategory').innerText = p.category;
                    document.getElementById('detailPostCategory').className = "px-2.5 py-0.5 rounded-full font-bold text-xs bg-brand-100 text-brand-800";
                    document.getElementById('detailPostDate').innerText = p.date || '';
                    document.getElementById('detailPostTitle').innerText = p.title;
                    document.getElementById('detailPostAuthor').innerText = `${p.author} 선생님`;
                    document.getElementById('detailPostBody').innerText = p.body;
                    document.getElementById('postDetailModal').classList.remove('hidden');
                }
            });
        });
    }

    function handleChatRequest() {
        if (!currentUser) {
            document.getElementById('postDetailModal')?.classList.add('hidden');
            showStatusModal('로그인 필요', '동료 상담사와의 1:1 비공개 대화 요청은 로그인 후 이용 가능합니다.', false);
            document.getElementById('loginModal')?.classList.remove('hidden');
            return;
        }
        document.getElementById('postDetailModal')?.classList.add('hidden');
        showStatusModal('1:1 대화 요청 완료', '선생님께 1:1 비공개 대화 요청 알림이 전송되었습니다.', true);
    }

    document.getElementById('triggerChatRequestBtn')?.addEventListener('click', handleChatRequest);
    document.getElementById('closePostDetailModal')?.addEventListener('click', () => document.getElementById('postDetailModal').classList.add('hidden'));
    document.getElementById('closePostDetailBtn')?.addEventListener('click', () => document.getElementById('postDetailModal').classList.add('hidden'));

    // Render Experts Directory
    function renderExpertGrid() {
        const container = document.getElementById('expertGridContainer');
        if (!container) return;

        const topicVal = document.getElementById('expertTopicFilter')?.value || 'ALL';
        const regionVal = document.getElementById('expertRegionFilter')?.value || 'ALL';
        const searchVal = (document.getElementById('expertSearchInput')?.value || '').trim().toLowerCase();

        const filtered = initialExperts.filter(exp => {
            const matchTopic = (topicVal === 'ALL') || exp.topicCategory === topicVal;
            const matchRegion = (regionVal === 'ALL') || exp.regionCategory === regionVal;
            const matchSearch = !searchVal || exp.name.toLowerCase().includes(searchVal) || exp.topicText.toLowerCase().includes(searchVal);
            return matchTopic && matchRegion && matchSearch;
        });

        const total = filtered.length;
        const totalPages = Math.ceil(total / expPageSize) || 1;
        if (expCurrentPage > totalPages) expCurrentPage = totalPages;
        if (expCurrentPage < 1) expCurrentPage = 1;

        const start = (expCurrentPage - 1) * expPageSize;
        const pageExperts = filtered.slice(start, start + expPageSize);

        document.getElementById('totalExpertsCount').innerText = total.toLocaleString();
        document.getElementById('currentExpRange').innerText = total === 0 ? '0' : `${start + 1} - ${Math.min(start + expPageSize, total)}`;

        if (pageExperts.length === 0) {
            container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400 text-sm bg-warm-50 rounded-2xl border border-dashed border-slate-200">검색 조건에 일치하는 전문가 프로필이 없습니다.</div>`;
            renderPaginationControls('expPaginationButtons', 1, 1, () => {});
            return;
        }

        container.innerHTML = pageExperts.map(exp => `
            <div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                            ${exp.name.charAt(0)}
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 text-base">${exp.name} 선생님</h3>
                            <p class="text-xs text-brand-600 font-semibold mt-0.5">${exp.job}</p>
                        </div>
                    </div>
                    <div class="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                        <div><strong class="text-slate-800">전문 분야:</strong> ${exp.topicText}</div>
                        <div><strong class="text-slate-800">활동 지역:</strong> ${exp.regionText}</div>
                    </div>
                    <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">${exp.bio}</p>
                </div>
                <button data-exp-id="${exp.id}" class="open-exp-detail-btn w-full py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200 transition-colors flex items-center justify-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    <span>선생님께 1:1 섭외 대화 신청</span>
                </button>
            </div>
        `).join('');

        renderPaginationControls('expPaginationButtons', totalPages, expCurrentPage, (p) => {
            expCurrentPage = p;
            renderExpertGrid();
        });

        document.querySelectorAll('.open-exp-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const eid = btn.getAttribute('data-exp-id');
                const exp = initialExperts.find(e => e.id === eid);
                if (!exp) return;
                activeExpertDetail = exp;
                document.getElementById('expModalAvatar').innerText = exp.name.charAt(0);
                document.getElementById('expModalName').innerText = `${exp.name} 선생님`;
                document.getElementById('expModalJob').innerText = exp.job;
                document.getElementById('expModalTopic').innerText = exp.topicText;
                document.getElementById('expModalRegion').innerText = exp.regionText;
                document.getElementById('expModalBio').innerText = exp.bio;
                document.getElementById('expertDetailModal').classList.remove('hidden');
            });
        });
    }

    document.getElementById('closeExpertDetailModal')?.addEventListener('click', () => document.getElementById('expertDetailModal').classList.add('hidden'));
    document.getElementById('expContactTriggerBtn')?.addEventListener('click', () => {
        if (!currentUser) {
            document.getElementById('expertDetailModal').classList.add('hidden');
            showStatusModal('로그인 필요', '1:1 섭외 대화 신청은 로그인 후 이용 가능합니다.', false);
            loginModal?.classList.remove('hidden');
            return;
        }
        document.getElementById('expertDetailModal').classList.add('hidden');
        showStatusModal('1:1 섭외 대화 신청 완료', `${activeExpertDetail?.name} 선생님께 비공개 섭외 문의가 전송되었습니다.`, true);
    });

    // Render Request Board
    function renderRequestBoard() {
        const container = document.getElementById('requestPostContainer');
        if (!container) return;

        const total = requestList.length;
        const totalPages = Math.ceil(total / reqPageSize) || 1;
        if (reqCurrentPage > totalPages) reqCurrentPage = totalPages;
        if (reqCurrentPage < 1) reqCurrentPage = 1;

        const start = (reqCurrentPage - 1) * reqPageSize;
        const pageItems = requestList.slice(start, start + reqPageSize);

        document.getElementById('totalRequestsCount').innerText = total.toLocaleString();
        document.getElementById('currentReqRange').innerText = total === 0 ? '0' : `${start + 1} - ${Math.min(start + reqPageSize, total)}`;

        container.innerHTML = pageItems.map(item => {
            if (item.isFeatured) {
                const ddayInfo = calculateDDay();
                return `
                <div class="bg-gradient-to-br from-lime-50 via-emerald-50/60 to-lime-100/40 rounded-2xl p-5 border-2 border-lime-400 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer req-item-card relative" data-req-id="${item.id}">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-lime-600 text-white">[추천/공지]</span>
                            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">${ddayInfo.text}</span>
                        </div>
                        <h3 class="font-extrabold text-slate-900 group-hover:text-lime-700 transition-colors text-base mb-2">${item.title}</h3>
                        <p class="text-xs font-bold text-lime-800 mb-3">${item.org}</p>
                    </div>
                    <div class="pt-3 border-t border-lime-200 flex items-center justify-between text-xs">
                        <span class="text-slate-500 font-en">${item.date}</span>
                        <span class="text-lime-700 font-extrabold group-hover:underline">공고 상세 보기 &rarr;</span>
                    </div>
                </div>
                `;
            }
            return `
            <div class="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer req-item-card" data-req-id="${item.id}">
                <div>
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">[${item.category}]</span>
                    <h3 class="font-bold text-slate-900 group-hover:text-brand-600 transition-colors text-base my-2 line-clamp-2">${item.title}</h3>
                    <p class="text-xs font-semibold text-brand-700 mb-3">${item.org}</p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="text-slate-400 font-en">${item.date}</span>
                    <span class="text-brand-600 font-bold group-hover:underline">상세 조건 확인 &rarr;</span>
                </div>
            </div>
            `;
        }).join('');

        renderPaginationControls('reqPaginationButtons', totalPages, reqCurrentPage, (p) => {
            reqCurrentPage = p;
            renderRequestBoard();
        });

        document.querySelectorAll('.req-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const rid = card.getAttribute('data-req-id');
                const item = requestList.find(r => r.id === rid);
                if (!item) return;
                activeReqDetail = item;
                document.getElementById('reqDetailBadge').innerText = `[${item.category}]`;
                document.getElementById('reqDetailBadge').className = "inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 bg-brand-100 text-brand-800";
                document.getElementById('reqDetailTitle').innerText = item.title;
                document.getElementById('reqDetailOrg').innerText = `요청 기관: ${item.org}`;
                document.getElementById('reqDetailDateTime').innerText = item.dateTime;
                document.getElementById('reqDetailTarget').innerText = item.target || "상세 협의";
                document.getElementById('reqDetailFee').innerText = "상의 후 결정";
                document.getElementById('reqDetailQual').innerText = item.qual || "자격 조건 문의";
                document.getElementById('reqDetailBody').innerText = item.body;
                document.getElementById('requestDetailModal').classList.remove('hidden');
            });
        });
    }

    document.getElementById('closeReqDetailModal')?.addEventListener('click', () => document.getElementById('requestDetailModal').classList.add('hidden'));
    document.getElementById('closeReqDetailBtn')?.addEventListener('click', () => document.getElementById('requestDetailModal').classList.add('hidden'));
    document.getElementById('applyForReqBtn')?.addEventListener('click', () => {
        document.getElementById('requestDetailModal').classList.add('hidden');
        if (!currentUser) {
            showStatusModal('로그인 필요', '강연 및 섭외 요청 문의하기는 로그인 후 이용하실 수 있습니다.', false);
            loginModal?.classList.remove('hidden');
            return;
        }
        showStatusModal('섭외 문의 접수', `'${activeReqDetail?.title}' 공고에 대한 담당자 문의 메시지가 전송되었습니다.`, true);
    });

    function renderPaginationControls(containerId, totalPages, currentPage, onPageClick) {
        const btnContainer = document.getElementById(containerId);
        if (!btnContainer) return;

        const chunkSize = 10;
        const currentChunk = Math.floor((currentPage - 1) / chunkSize);
        const startPage = currentChunk * chunkSize + 1;
        const endPage = Math.min(startPage + chunkSize - 1, totalPages);

        let html = '';
        if (currentChunk > 0) {
            html += `<button data-p="1" class="page-goto-btn px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold">&laquo; 처음</button>`;
        }

        html += `<button data-p="${Math.max(1, currentPage - 1)}" class="page-goto-btn px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''} text-xs font-bold">이전</button>`;

        for (let p = startPage; p <= endPage; p++) {
            if (p === currentPage) {
                html += `<button class="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-xs">${p}</button>`;
            } else {
                html += `<button data-p="${p}" class="page-goto-btn w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs">${p}</button>`;
            }
        }

        html += `<button data-p="${Math.min(totalPages, currentPage + 1)}" class="page-goto-btn px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''} text-xs font-bold">다음</button>`;

        if (endPage < totalPages) {
            html += `<button data-p="${totalPages}" class="page-goto-btn px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold">끝 &raquo;</button>`;
        }

        btnContainer.innerHTML = html;

        btnContainer.querySelectorAll('.page-goto-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetP = parseInt(btn.getAttribute('data-p'));
                if (targetP && targetP !== currentPage) {
                    onPageClick(targetP);
                }
            });
        });
    }

    function showStatusModal(title, message, isSuccess = true) {
        document.getElementById('statusTitle').innerText = title;
        document.getElementById('statusBody').innerText = message;
        const statusIcon = document.getElementById('statusIcon');

        if (isSuccess) {
            statusIcon.className = "w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600";
            statusIcon.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
        } else {
            statusIcon.className = "w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-rose-100 text-rose-600";
            statusIcon.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0"/></svg>`;
        }

        document.getElementById('statusModal').classList.remove('hidden');
    }

    document.getElementById('closeStatusModal')?.addEventListener('click', () => {
        document.getElementById('statusModal').classList.add('hidden');
    });

    renderCommunityBoard();
    renderRequestBoard();

    // 새로고침 / 직접 접속 시 해시에 맞는 페이지 복원
    const initialPage = location.hash.replace('#', '');
    if (initialPage && initialPage !== 'home' && pageViews[initialPage]) {
        navigateToPage(initialPage, { scroll: false, updateHash: false });
    }

    // 뒤로가기 / 앞으로가기 대응
    window.addEventListener('hashchange', () => {
        const page = location.hash.replace('#', '');
        navigateToPage(pageViews[page] ? page : 'home', { updateHash: false });
    });
});
