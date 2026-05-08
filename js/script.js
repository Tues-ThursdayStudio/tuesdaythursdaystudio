// ===== YouTube Background Video =====
let player;
const YOUTUBE_VIDEO_ID = '8m6a_U-xzxQ'; // 화목스튜디오 배경 영상

// YouTube IFrame API Ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 1,
            mute: 1,
            playlist: YOUTUBE_VIDEO_ID // 루프를 위해 필요
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
    
    // 비디오 크기 조정
    resizeVideo();
}

function onPlayerStateChange(event) {
    // 비디오가 끝나면 다시 재생
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function resizeVideo() {
    const videoContainer = document.querySelector('.video-background');
    const videoPlayer = document.getElementById('youtube-player');
    
    if (!videoContainer || !videoPlayer) return;
    
    const containerWidth = videoContainer.offsetWidth;
    const containerHeight = videoContainer.offsetHeight;
    const aspectRatio = 16 / 9;
    
    let playerWidth = containerWidth;
    let playerHeight = containerWidth / aspectRatio;
    
    if (playerHeight < containerHeight) {
        playerHeight = containerHeight;
        playerWidth = containerHeight * aspectRatio;
    }
    
    videoPlayer.style.width = playerWidth + 'px';
    videoPlayer.style.height = playerHeight + 'px';
}

// 윈도우 리사이즈 시 비디오 크기 재조정
window.addEventListener('resize', resizeVideo);

// ===== AOS Animation Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
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
    'home': '#home',
    'about': '#home',
    'services': '#home',
    'equipment': '#home',
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

contactForm.addEventListener('submit', function(e) {
    // 기본 mailto 동작을 허용하되, 사용자에게 피드백 제공
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // 간단한 유효성 검사
    if (!name || !email || !service || !message) {
        e.preventDefault();
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }
    
    // mailto는 브라우저마다 지원이 다를 수 있음을 알림
    alert('문의가 접수되었습니다. 이메일 클라이언트가 열리지 않는 경우, seong8389@naver.com 으로 직접 연락 부탁드립니다.');
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
    variety: [
        // 아이엠뱅크
        { id: 'zdv19CZ1ILI', title: '복지가 별거냐? 원이 & 리브 얼굴이 곧 복지;; 대한민국 알고리즘 점령한 역주행 아이돌의 대명사 리센느(with. 숏박스 김원훈 & 개그콘서트 나현영) ㅣ iM파인다이닝 EP.3', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: '62CBTVe3SkM', title: '※귀여움 한도 초과※ "어떻게 사람이 다람쥐..?" 개콘 듀오 무장해제 시키는 무공해 인간 가요이 키우기 (with. 숏박스 김원훈&개그콘서트 나현영) ㅣ iM파인다이닝 EP.2', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'EzHpp37qEzc', title: '"우울한 말상이세요" 고민 상담왔다가 얼평 당하는 박성준 역술가 (with. 숏박스 김원훈& 개그콘서트 나현영)ㅣ iM파인다이닝 EP.1', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'IoGNILv8Ci8', title: '이거 기획한 사람 당장 나와;; 미3누, 30년 인생 최초 헬스장 3대 측정 공개합니다! (일일 PT쌤. 정대진 선수 & 최재상 선수)ㅣ부자 될 MZ들 EP.6', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'Jdlx0e7nXhU', title: '은행장 개인 카드 털러 대구까지 다녀왔습니다 ㅣ 부자 될 MZ들 EP.5', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'f-Lg6iT0Qew', title: '올리기만 하면 무조건 터진다?! 유튜버X희극인X배우 조회수 치트키와 함께하는 스케치 코미디 도전기 (feat. 김두현, 최하슬) ㅣ 부자 될 MZ들 EP.4', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'GPsrh6DH7WI', title: 'EP.3 부자 될 MZ들 ㅣ 저기 내 남친 지나간다. 100만 패션 유튜버 깡스타일리스트와 미미미누의 따라만 해도 여친 생기는 여심저격 남친룩북 공개!', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: '3jg_lEe1qMo', title: '미미미누, 래퍼 데뷔 깜짝 발표?! 길거리 피처링남 \'타임피버 - 동창회\' 막차 탑승 ㅣ 부자 될 MZ들 EP.2', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'BV5fTm-RhZw', title: '서울 중구에서, 청담동 그녀를 만나다 (with. 미미미누) ㅣ 부자 될 MZ들 EP.1', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'X67EhbIp-BM', title: '※과몰입주의※ 인생 첫 소개팅에 폭주하는 우정잉 ㅣ신개념 연애 프로그램ㅣ소비내역 시그널 우정잉 편', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'HANxkAAarzk', title: '나만큼 결혼에 진심인 사람 있음 나와보라 그래! 결혼무새 박세미, 드디어 시집 갑니다 ㅣ 소비내역 시그널 EP.2', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        { id: 'ftSn2BOrLs4', title: '얼굴을 안보고 어떻게 고르냐니까는!! (★쿠키있음★) ㅣ 소비내역 시그널 EP.1 폭스클럽 김지유 소개팅', client: '아이엠뱅크', role: '촬영감독으로 참여' },
        // 교보생명
        { id: 'HL_IzHvPAtE', title: '닥터트윈스 2화', client: '교보생명', role: '촬영감독으로 참여' },
        { id: 'EIOV_1RHRyE', title: '닥터트윈스 1화', client: '교보생명', role: '촬영감독으로 참여' },
        { id: '76WrBF0YIpk', title: '건강보장구역 EP.5 교보문고 편', client: '교보생명', role: '촬영감독으로 참여' },
        { id: '2-HHZ69gQJ4', title: '건강보장구역 EP.4 성동FP지원단 편', client: '교보생명', role: '촬영감독으로 참여' },
        { id: 'k0nwZjly31g', title: '건강보장구역 EP.3 노들섬 편', client: '교보생명', role: '촬영감독으로 참여' },
        { id: 'A52B05L0j0E', title: '건강보장구역 EP.2 교보생명 편', client: '교보생명', role: '촬영감독으로 참여' },
        { id: 'v7e38QsNkeE', title: '건강보장구역 EP.1 수안보 온천제 편', client: '교보생명', role: '촬영감독으로 참여' }
    ],
    event: [
        { id: '4WHqwGOEsSI', title: '2025 심장병 예방을 위한 한걸음 더 걷기대회', client: '한국심장재단', role: '촬영감독으로 참여' },
        { id: 'BPopwEEJfVw', title: '[갤럭시 워치8 시리즈] 갤럭시 워치런 @사파리', client: '삼성전자', role: '촬영감독으로 참여' },
        { id: 'K943B3I1xdI', title: '[THE SHARP X PLEATSMAMA] 지속가능한 미래를 위한 더샵과 플리츠마마의 특별한 만남✨', client: '더샵', role: '촬영감독으로 참여' },
        { id: 'p11_BU6K7So', title: '2024 포스코이앤씨 더샵 신평면 디자인 발표회 현장스케치 | The Home Curator', client: '더샵', role: '촬영감독으로 참여' },
        { id: 'E6NiNHLP6Yc', title: '[현장스케치] KT&G 상상플래닛 | 𝐏𝐋𝐀𝐍𝐄𝐓 𝐒𝐔𝐌𝐌𝐈𝐓의 현장 속으로 🪐', client: 'KT&G 상상플래닛', role: '1인 제작' },
        { id: 'JjfoD9Kp_9I', title: 'IMPACT CIRCLE 결과공유회 스케치', client: '임팩트서클', role: '원스톱 프로덕션' },
        { id: 'iLFYVQDN3_g', title: '임팩트서클이 SOVAC 2023에 참여했습니다', client: '임팩트서클', role: '원스톱 프로덕션' },
        { id: '8cSnCOWji-I', title: '2025 모모콘', client: '우리금융그룹', role: '촬영감독으로 참여' },
        { id: '0Fy_veK8GZc', title: '2024 모모콘', client: '우리금융그룹', role: '촬영감독으로 참여' }
    ],
    promotion: [
        { id: 'iY4AZs0_rqQ', title: '임팩트스퀘어 소개영상', client: '임팩트스퀘어', role: '원스톱 프로덕션' },
        { id: 'wBOBW8NNn-4', title: '[경기도교육청 광고 영상] \'하이러닝\'', client: '경기도교육청', role: '원스톱 프로덕션' },
        { id: 'MbDToX3MwQ8', title: '디지털 시민교육 경기도교육청이 함께 하겠습니다', client: '경기도교육청', role: '원스톱 프로덕션' },
        { id: 'ndF6rZwg0c8', title: '경기도교육청 광교 신청사에서 새롭게 출발', client: '경기도교육청', role: '원스톱 프로덕션' },
        { id: 'OmpWk9AE4YQ', title: '따뜻한💖 가르침, 진심으로 감사합니다.', client: '경기도교육청', role: '원스톱 프로덕션' },
        { id: '18mFpNcxNew', title: 'CREZL (크레즐) Digital Single \'늦편지\' Official Lyric Video teaser', client: '크레즐', role: '원스톱 프로덕션' }
    ],
    lecture: [
        { id: 'C21GmrufI6w', title: '국내 거주 외국인의 커리어를 확장하다 | 엑스프리베', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: 'Jmb2QxfU42U', title: '소유가 아닌 경험으로, 캠핑의 진입장벽을 낮추다 | 캠터 정성식', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: 'V10nvw9mad0', title: '홍삼 부산물로 스킨케어 제품을 만드는 이유 | 그리닝 김기현 김수빈 오수진', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: '10SC73vbmKA', title: '전 세대 음악심리치료, [피어나]는 다르게 제공합니다 | 피어나 박혜인', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: 'EDB_7NpY4a0', title: '수어콘텐츠, [뉴챕터]는 다르게 만듭니다 | 뉴챕터 유동영', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: 'JqelOiRBJEg', title: '온가족 안심 숟가락, [세모녀]는 일상과 함께합니다 | 세모녀 이한결', client: 'KT&G 상상플래닛', role: '원스톱 프로덕션' },
        { id: 'xo5hQ6dNncM', title: '[2024 현장사례 아카데미] 환경, 순환 경제, 재활용, 옷을 다시 입다?! #다시입다연구소', client: '성동구사회적경제지원센터', role: '원스톱 프로덕션' },
        { id: 'W--t4Yw4JDM', title: '[2024 현장사례 아카데미] 사회적 가치로 만들어가는 커뮤니티, #VAKE #베이크 가 추구하는 소셜 임팩트 이야기', client: '성동구사회적경제지원센터', role: '원스톱 프로덕션' }
    ],
    behind: [
        { id: 'msLsqqGQsP4', title: '[Behind] BACKSTAGE : Logline CONCERT with CREZL(크레즐) #2', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'C6i4mv7HsHc', title: '[Behind] BACKSTAGE : Logline CONCERT with CREZL(크레즐) #1', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'nUsRXfySsqw', title: '[Behind] KBS 불후의명곡 with CREZL(크레즐)', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'nFOu_TSxFEY', title: '[Behind] KBS 열린음악회 with CREZL(크레즐)', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'XDNCNl0KOxo', title: '[Behind] \'HAKUNAMATA:舵\' | Music Video with CREZL(크레즐)', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'byZTtzc7pp4', title: '[Behind] \'HAKUNAMATA:舵\' | ALBUM COVER with CREZL(크레즐)', client: '크레즐', role: '원스톱 프로덕션' },
        { id: 'hC0NODJaPug', title: '[Behind] DIVE INTO CREZL(FAN-CONCERT) #2', client: '크레즐', role: '원스톱 프로덕션' },
        { id: '51utwEUL064', title: '[Behind] DIVE INTO CREZL(FAN-CONCERT) #1', client: '크레즐', role: '원스톱 프로덕션' },
        { id: '0y7Lg9dYNt8', title: '[Behind] 청주 단독 콘서트 With CREZL (크레즐)', client: '크레즐', role: '원스톱 프로덕션' }
    ]
};

// ===== Portfolio Loading and Filtering =====
let currentCategory = 'variety'; // Default to variety (첫 번째 카테고리)

function loadPortfolioVideos() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!portfolioGrid) return;
    
    // Clear existing content
    portfolioGrid.innerHTML = '';
    
    // Get videos to display (specific category only, no 'all')
    let videosToShow = portfolioData[currentCategory].map(video => ({ ...video, category: currentCategory }));
    
    // Create portfolio items
    videosToShow.forEach((video, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item show';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', `${(index % 12) * 50}`);
        portfolioItem.setAttribute('data-category', video.category);
        
        const categoryNames = {
            variety: '유튜브 예능',
            event: '행사 스케치',
            promotion: '홍보영상',
            lecture: '강의 및 인터뷰',
            behind: '비하인드 영상'
        };
        
        portfolioItem.innerHTML = `
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
                <span class="portfolio-badge">${categoryNames[video.category]}</span>
                <h4>${video.title}</h4>
                <p class="portfolio-client">${video.client}</p>
                <p class="portfolio-role">${video.role}</p>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Reinitialize AOS
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
}, { threshold: 0.1 });

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