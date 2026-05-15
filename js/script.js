
// ===== AOS Animation Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 300
    });
});

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollY = 0;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 모바일 가로화면(landscape)에서만 navbar 숨김/표시
    const isLandscapeMobile = window.innerHeight < 500 && window.innerWidth > window.innerHeight;
    if (isLandscapeMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;

    // Active section highlighting
    updateActiveNavLink();
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Update Active Nav Link on Scroll =====
const sectionToNavHref = {
    'home': '#about',
    'about': '#about',
    'services': '#services',
    'equipment': '#services',
    'portfolio': '#portfolio',
    'contact': '#contact'
};

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const targetHref = sectionToNavHref[sectionId];
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (targetHref && link.getAttribute('href') === targetHref) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    if (!name || !email || !service || !message) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const btnWidth = submitBtn.offsetWidth;
    const btnHeight = submitBtn.offsetHeight;
    submitBtn.style.width = btnWidth + 'px';
    submitBtn.style.height = btnHeight + 'px';
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/mgodnpwe', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            this.reset();
        } else {
            alert('전송에 실패했습니다. info@tuesdaythursdaystudio.com 으로 직접 연락 부탁드립니다.');
        }
    } catch (error) {
        alert('전송에 실패했습니다. info@tuesdaythursdaystudio.com 으로 직접 연락 부탁드립니다.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.width = '';
        submitBtn.style.height = '';
    }
});

// ===== Parallax Effect Removed for Better Readability =====
// Removed to prevent text overlap when scrolling

// ===== Service Cards Hover Effect =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===== Portfolio Data =====
const portfolioData = {
    '아이엠뱅크': [
        { id: 'zdv19CZ1ILI', title: '복지가 별거냐? 원이 & 리브 얼굴이 곧 복지;; 대한민국 알고리즘 점령한 역주행 아이돌의 대명사 리센느(with. 숏박스 김원훈 & 개그콘서트 나현영) ㅣ iM파인다이닝 EP.3', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: '62CBTVe3SkM', title: '※귀여움 한도 초과※ "어떻게 사람이 다람쥐..?" 개콘 듀오 무장해제 시키는 무공해 인간 가요이 키우기 (with. 숏박스 김원훈&개그콘서트 나현영) ㅣ iM파인다이닝 EP.2', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'EzHpp37qEzc', title: '"우울한 말상이세요" 고민 상담왔다가 얼평 당하는 박성준 역술가 (with. 숏박스 김원훈& 개그콘서트 나현영)ㅣ iM파인다이닝 EP.1', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'IoGNILv8Ci8', title: '이거 기획한 사람 당장 나와;; 미3누, 30년 인생 최초 헬스장 3대 측정 공개합니다! (일일 PT쌤. 정대진 선수 & 최재상 선수)ㅣ부자 될 MZ들 EP.6', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'Jdlx0e7nXhU', title: '은행장 개인 카드 털러 대구까지 다녀왔습니다 ㅣ 부자 될 MZ들 EP.5', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'f-Lg6iT0Qew', title: '올리기만 하면 무조건 터진다?! 유튜버X희극인X배우 조회수 치트키와 함께하는 스케치 코미디 도전기 (feat. 김두현, 최하슬) ㅣ 부자 될 MZ들 EP.4', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'GPsrh6DH7WI', title: 'EP.3 부자 될 MZ들 ㅣ 저기 내 남친 지나간다. 100만 패션 유튜버 깡스타일리스트와 미미미누의 따라만 해도 여친 생기는 여심저격 남친룩북 공개!', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: '3jg_lEe1qMo', title: '미미미누, 래퍼 데뷔 깜짝 발표?! 길거리 피처링남 \'타임피버 - 동창회\' 막차 탑승 ㅣ 부자 될 MZ들 EP.2', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'BV5fTm-RhZw', title: '서울 중구에서, 청담동 그녀를 만나다 (with. 미미미누) ㅣ 부자 될 MZ들 EP.1', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'X67EhbIp-BM', title: '※과몰입주의※ 인생 첫 소개팅에 폭주하는 우정잉 ㅣ신개념 연애 프로그램ㅣ소비내역 시그널 우정잉 편', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'HANxkAAarzk', title: '나만큼 결혼에 진심인 사람 있음 나와보라 그래! 결혼무새 박세미, 드디어 시집 갑니다 ㅣ 소비내역 시그널 EP.2', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'ftSn2BOrLs4', title: '얼굴을 안보고 어떻게 고르냐니까는!! (★쿠키있음★) ㅣ 소비내역 시그널 EP.1 폭스클럽 김지유 소개팅', role: '촬영감독으로 참여', type: '유튜브 예능' }
    ],
    '교보생명': [
        { id: 'HL_IzHvPAtE', title: '닥터트윈스 2화', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'EIOV_1RHRyE', title: '닥터트윈스 1화', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: '76WrBF0YIpk', title: '건강보장구역 EP.5 교보문고 편', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: '2-HHZ69gQJ4', title: '건강보장구역 EP.4 성동FP지원단 편', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'k0nwZjly31g', title: '건강보장구역 EP.3 노들섬 편', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'A52B05L0j0E', title: '건강보장구역 EP.2 교보생명 편', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'v7e38QsNkeE', title: '건강보장구역 EP.1 수안보 온천제 편', role: '촬영감독으로 참여', type: '유튜브 예능' }
    ],
    'KT&G 상상플래닛': [
        { id: 'E6NiNHLP6Yc', title: '[현장스케치] KT&G 상상플래닛 | 𝐏𝐋𝐀𝐍𝐄𝐓 𝐒𝐔𝐌𝐌𝐈𝐓의 현장 속으로 🪐', role: '1인 제작', type: '행사 스케치' },
        { id: 'C21GmrufI6w', title: '국내 거주 외국인의 커리어를 확장하다 | 엑스프리베', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: 'Jmb2QxfU42U', title: '소유가 아닌 경험으로, 캠핑의 진입장벽을 낮추다 | 캠터 정성식', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: 'V10nvw9mad0', title: '홍삼 부산물로 스킨케어 제품을 만드는 이유 | 그리닝 김기현 김수빈 오수진', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: '10SC73vbmKA', title: '전 세대 음악심리치료, [피어나]는 다르게 제공합니다 | 피어나 박혜인', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: 'EDB_7NpY4a0', title: '수어콘텐츠, [뉴챕터]는 다르게 만듭니다 | 뉴챕터 유동영', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: 'JqelOiRBJEg', title: '온가족 안심 숟가락, [세모녀]는 일상과 함께합니다 | 세모녀 이한결', role: '1인 제작', type: '강의 및 인터뷰' }
    ],
    '에버글로우': [
        { id: 'yR__nuXqVwg', title: '2026 EVERGLOW (에버글로우) WORLD TOUR [RE:CODE] HIGHLIGHT SPOT', role: '1인 제작', type: '홍보영상' },
        { id: 'lK7wOPqhqek', title: "EVERGLOW (에버글로우) 'CODE' Jacket Photo Behind The Scene", role: '1인 제작', type: '비하인드 영상' },
        { id: '_uBgMMeeVdY', title: "EVERGLOW (에버글로우) 'CODE' MV Behind The Scene", role: '1인 제작', type: '비하인드 영상' },
        { id: 'YXMhLzlvf-4', title: 'EVERGLOW (에버글로우) Profile Behind The Scene', role: '1인 제작', type: '비하인드 영상' },
        { id: 'oRQWdH77LbI', title: '2026 EVERGLOW (에버글로우) WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #2', role: '1인 제작', type: '숏폼', shorts: true },
        { id: 'Zqti4I3fwjA', title: '2026 EVERGLOW (에버글로우) WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #3', role: '1인 제작', type: '숏폼', shorts: true },
        { id: 'iX485v6AN8U', title: '2026 EVERGLOW WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #AISHA', role: '1인 제작', type: '숏폼', shorts: true },
        { id: 'Yyep1-txVjI', title: '2026 EVERGLOW WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #SIHYEON', role: '1인 제작', type: '숏폼', shorts: true },
        { id: 'RGGy1VBvjqA', title: '2026 EVERGLOW WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #ONDA', role: '1인 제작', type: '숏폼', shorts: true },
        { id: 'PU1_brnxWbo', title: '2026 EVERGLOW WORLD TOUR [RE:CODE] HIGHLIGHT SPOT #EU', role: '1인 제작', type: '숏폼', shorts: true }
    ],
    '크레즐': [
        { id: '18mFpNcxNew', title: 'CREZL (크레즐) Digital Single \'늦편지\' Official Lyric Video teaser', role: '1인 제작', type: '홍보영상' },
        { id: 'msLsqqGQsP4', title: '[Behind] BACKSTAGE : Logline CONCERT with CREZL(크레즐) #2', role: '1인 제작', type: '비하인드 영상' },
        { id: 'C6i4mv7HsHc', title: '[Behind] BACKSTAGE : Logline CONCERT with CREZL(크레즐) #1', role: '1인 제작', type: '비하인드 영상' },
        { id: 'nUsRXfySsqw', title: '[Behind] KBS 불후의명곡 with CREZL(크레즐)', role: '1인 제작', type: '비하인드 영상' },
        { id: 'nFOu_TSxFEY', title: '[Behind] KBS 열린음악회 with CREZL(크레즐)', role: '1인 제작', type: '비하인드 영상' },
        { id: 'XDNCNl0KOxo', title: '[Behind] \'HAKUNAMATA:舵\' | Music Video with CREZL(크레즐)', role: '1인 제작', type: '비하인드 영상' },
        { id: 'byZTtzc7pp4', title: '[Behind] \'HAKUNAMATA:舵\' | ALBUM COVER with CREZL(크레즐)', role: '1인 제작', type: '비하인드 영상' },
        { id: 'hC0NODJaPug', title: '[Behind] DIVE INTO CREZL(FAN-CONCERT) #2', role: '1인 제작', type: '비하인드 영상' },
        { id: '51utwEUL064', title: '[Behind] DIVE INTO CREZL(FAN-CONCERT) #1', role: '1인 제작', type: '비하인드 영상' },
        { id: '0y7Lg9dYNt8', title: '[Behind] 청주 단독 콘서트 With CREZL (크레즐)', role: '1인 제작', type: '비하인드 영상' }
    ],
    '더샵': [
        { id: 'K943B3I1xdI', title: '[THE SHARP X PLEATSMAMA] 지속가능한 미래를 위한 더샵과 플리츠마마의 특별한 만남✨', role: '촬영감독으로 참여', type: '행사 스케치' },
        { id: 'p11_BU6K7So', title: '2024 포스코이앤씨 더샵 신평면 디자인 발표회 현장스케치 | The Home Curator', role: '촬영감독으로 참여', type: '행사 스케치' }
    ],
    '임팩트서클': [
        { id: 'JjfoD9Kp_9I', title: 'IMPACT CIRCLE 결과공유회 스케치', role: '1인 제작', type: '행사 스케치' },
        { id: 'iLFYVQDN3_g', title: '임팩트서클이 SOVAC 2023에 참여했습니다', role: '1인 제작', type: '행사 스케치' }
    ],
    '우리금융그룹': [
        { id: '8cSnCOWji-I', title: '2025 모모콘', role: '촬영감독으로 참여', type: '행사 스케치' },
        { id: '0Fy_veK8GZc', title: '2024 모모콘', role: '촬영감독으로 참여', type: '행사 스케치' }
    ],
    '성동구사회적경제지원센터': [
        { id: 'xo5hQ6dNncM', title: '[2024 현장사례 아카데미] 환경, 순환 경제, 재활용, 옷을 다시 입다?! #다시입다연구소', role: '1인 제작', type: '강의 및 인터뷰' },
        { id: 'W--t4Yw4JDM', title: '[2024 현장사례 아카데미] 사회적 가치로 만들어가는 커뮤니티, #VAKE #베이크 가 추구하는 소셜 임팩트 이야기', role: '1인 제작', type: '강의 및 인터뷰' }
    ],
    '한국심장재단': [
        { id: '4WHqwGOEsSI', title: '2025 심장병 예방을 위한 한걸음 더 걷기대회', role: '촬영감독으로 참여', type: '행사 스케치' }
    ],
    '임팩트스퀘어': [
        { id: 'iY4AZs0_rqQ', title: '임팩트스퀘어 소개영상', role: '1인 제작', type: '홍보영상' }
    ],
    'AITRICS': [
        { id: 'iGol0xYlnbs', title: 'AITRICS | 2026 KIMES', role: '1인 제작', type: '행사 스케치' },
        { id: 'F2yKzZ59CcI', title: 'AITRICS | 2025 RRS Symposium', role: '1인 제작', type: '홍보영상' }
    ],
    '계룡건설': [
        { id: 'M2b77Dxp-8M', title: '건설 현장에서 펼쳐진 RC 중장비 미션 레이싱🏁 | 2025 KYERYONG GRAND PRIX', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'JlUQDz_K3vA', title: "숲'새'권 휴식처 선물 받은 썰 푼다 (feat. 천안 오룡지구) l Making a Resting Place for Birds", role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'RHUEEb_S_lo', title: "서로 다른 두 공간에서 같은 곡을 연주한다면? | 건설 현장 X 본사의 슈베르트 '마왕'♬", role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: '8YrZfQJ0nho', title: '[계룡 가디언] EP.1 음주 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'lx35DQkOBPQ', title: '[계룡 가디언] EP.2 흡연 & 휴대전화 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: '7P8VXRYiqzw', title: '[계룡 가디언] EP.3 보호구 & 안전 시설물 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'BurDZ57S7Co', title: '[계룡 가디언] EP.4 운전원 안전수칙 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'YhG6pUMNcKQ', title: '[계룡 가디언] EP.5 신호수 & 굴착기 안전장치 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'pnFJ3pk1M_w', title: '[계룡 가디언] EP.6 붕괴 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'VLPG4v2c1Ls', title: '[계룡 가디언] EP.7 화재 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'J-t_fPozjms', title: '[계룡 가디언] EP.8 사다리 & 고소작업 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'OzASnZ525CU', title: '[계룡 가디언] EP.9 비계 승하강 #안전캠페인', role: '촬영감독으로 참여', type: '숏폼', shorts: true },
        { id: 'tl_ZAY7cxK0', title: "🏗️ 드릴과 키보드 소리가 만나 '마왕'이 된다고? 🎹", role: '촬영감독으로 참여', type: '숏폼', shorts: true }
    ],
    '현대해상': [
        { id: 'nCMKJtOt36E', title: '[전국힙할Z도 양양편] 양양 가서 여기 안 가면 손해, 여름보다 핫한 양양 ⛱️', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'DCvNSbDtEK8', title: '[굿앤굿 행복육아 공감육아일기 1화] 28개월 아기와 함께하는 초보 엄마의 육아 성장 스토리🧡', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'dHHmwihRXGM', title: '[전국힙할Z도 군산편] 치..치지직..응답하라 여기는 군산ㅣMZ가 레트로의 성지 군산을 즐기는 방법📸', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'KPmiYgNAoIQ', title: '[전국힙할Z도 춘천편] 나 가을 타나 봐..🍂 춘천에서 힐링 100% 충전하는 법ㅣ 당일치기 춘천 여행코스 6곳', role: '촬영감독으로 참여', type: '유튜브 예능' },
        { id: 'zO-r6Z7A_iA', title: '[전국힙할Z도 부산편] 어서오이소~ 부산 토박이가 알려주는 겨울 부산 여행코스🌊ㅣ부산 가볼 만한 곳 BEST 6', role: '촬영감독으로 참여', type: '유튜브 예능' }
    ],
    'FLIB_FILMS': [
        { id: 'lBXYJVSTMVU', title: 'PEOPLEOFTHEWORLD - SFW25FW - PRESENTATION - RUNWAY', role: '촬영감독으로 참여', type: '패션필름' },
        { id: '_hn_3TYG4mM', title: 'HALUCCINATION - About Human & AI, 패션필름', role: '촬영감독으로 참여', type: '패션필름' },
        { id: 'bc8dlfzHyq8', title: 'MODEL REBEKA', role: '촬영감독으로 참여', type: '패션필름', shorts: true },
        { id: 'o1rz-MuXFoQ', title: 'MODEL MIRAI', role: '촬영감독으로 참여', type: '패션필름', shorts: true },
        { id: 'ywG7g6ud4iM', title: 'DAILY MIRROR - SFW25FW', role: '촬영감독으로 참여', type: '패션필름', shorts: true },
        { id: 'vO3BxB_S_1o', title: 'SFW 2025 FALL WINTER - DOUCAN BTS TEASER #서울패션위크 #fashionweek #SFW25FW#패션쇼', role: '촬영감독으로 참여', type: '패션필름', shorts: true },
        { id: '8qzJ2G2KHtw', title: 'SFW25FW - PEOPLEOFTHEWORLD BTS TEASER #서울패션위크#sfw25fw#fashionweek #패션쇼#fashionreels', role: '촬영감독으로 참여', type: '패션필름', shorts: true },
        { id: 'TFaLwKCPcz4', title: 'PEOPLEOFTHEWORLD - SFW25FW', role: '촬영감독으로 참여', type: '패션필름', shorts: true }
    ]
};

// ===== Portfolio Loading and Filtering =====
let currentCategory = '아이엠뱅크';

function loadPortfolioVideos() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    const allVideos = portfolioData[currentCategory];
    const regularVideos = allVideos.filter(v => !v.shorts);
    const shortsVideos = allVideos.filter(v => v.shorts);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0 });

    function createItem(video, index, isShorts) {
        const item = document.createElement('div');
        item.className = isShorts ? 'portfolio-item portfolio-item--shorts show' : 'portfolio-item show';
        item.style.animationDelay = `${(index % 3) * 30}ms`;
        item.innerHTML = `
            <iframe
                class="portfolio-video"
                src="https://www.youtube.com/embed/${video.id}"
                title="${video.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy">
            </iframe>
            <div class="portfolio-info">
                <span class="portfolio-badge">${video.type}</span>
                <h4>${video.title}</h4>
                <p class="portfolio-role">${video.role}</p>
            </div>
        `;
        observer.observe(item);
        return item;
    }

    if (regularVideos.length === 0 && shortsVideos.length > 0) {
        const grid = document.createElement('div');
        grid.className = 'portfolio-shorts-grid';
        grid.style.gridColumn = '1 / -1';
        shortsVideos.forEach((video, index) => {
            grid.appendChild(createItem(video, index, true));
        });
        portfolioGrid.appendChild(grid);
    } else {
        regularVideos.forEach((video, index) => {
            portfolioGrid.appendChild(createItem(video, index, false));
        });

        if (shortsVideos.length > 0) {
            const section = document.createElement('div');
            section.className = 'portfolio-shorts-section';

            const label = document.createElement('p');
            label.className = 'portfolio-shorts-label';
            label.textContent = 'Shorts';
            section.appendChild(label);

            const grid = document.createElement('div');
            grid.className = 'portfolio-shorts-grid';
            shortsVideos.forEach((video, index) => {
                grid.appendChild(createItem(video, index, true));
            });

            section.appendChild(grid);
            portfolioGrid.appendChild(section);
        }
    }

    AOS.refresh();
}

// ===== Portfolio Category Filter =====
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio videos on page load
    loadPortfolioVideos();
    
    // Category button event listeners
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            
            // Reload portfolio videos
            loadPortfolioVideos();
        });
    });
});

// ===== Equipment Category Animation =====
const equipmentCategories = document.querySelectorAll('.equipment-category');

equipmentCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
});

// ===== Smooth Reveal on Scroll =====
const revealElements = document.querySelectorAll('.service-card, .equipment-category, .stat-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ===== Button Ripple Effect =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Form Input Focus Animation =====
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== Lazy Loading for Images (if any added in future) =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(function() {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===== Console Welcome Message =====
console.log('%c화목스튜디오', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cTuesday Thursday Studio', 'font-size: 16px; color: #f7931e;');
console.log('%c당신의 이야기를 영상으로 완성합니다', 'font-size: 14px; color: #b0b0b0;');
console.log('%cContact: seong8389@naver.com | 010-2076-8389', 'font-size: 12px; color: #808080;');

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 3s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        console.log('🎬 화목스튜디오 Easter Egg 발견! 🎉');
    }
});

// ===== Accessibility Enhancements =====
// Keyboard navigation for cards
const interactiveCards = document.querySelectorAll('.service-card, .equipment-category, .stat-card');

interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.click();
        }
    });
});

// Skip to main content
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        z-index: 9999;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-100px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ===== Print Styles Handler =====
window.addEventListener('beforeprint', function() {
    // Hide video background before printing
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
        videoBackground.style.display = 'none';
    }
});

window.addEventListener('afterprint', function() {
    // Restore video background after printing
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
        videoBackground.style.display = 'block';
    }
});

// ===== Service Worker Registration (Optional for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }, function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}