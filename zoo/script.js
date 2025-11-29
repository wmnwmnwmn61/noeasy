// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// 图表卡片动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有图表卡片
document.querySelectorAll('.chart-card').forEach(card => {
    observer.observe(card);
});

// 页面加载完成后的效果
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 高亮当前导航
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '#555';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#667eea';
        }
    });
});

// 图片加载优化
document.querySelectorAll('.chart-card img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        }, 50);
    });
});

// 添加鼠标跟随效果
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;
let speed = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    
    ballX += distX * speed;
    ballY += distY * speed;
    
    requestAnimationFrame(animate);
}

animate();

// 打印欢迎信息
console.log('%c🦊 欢迎来到《疯狂动物城2》数据可视化分析！', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c📊 探索数据，洞察人心', 'color: #764ba2; font-size: 14px;');
