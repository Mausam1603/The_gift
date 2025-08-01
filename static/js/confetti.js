// Confetti and Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initial confetti burst on page load
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 1000);

    // Confetti on button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.7 }
            });
        }
    });

    // Confetti on navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            setTimeout(() => {
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.5 }
                });
            }, 300);
        }
    });

    // Floating hearts animation
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 0.5}s`;
    });

    // Memory bubbles animation
    const bubbles = document.querySelectorAll('.memory-bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 1}s`;
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .memory-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            confetti({
                particleCount: 10,
                spread: 20,
                origin: { y: 0.8 }
            });
        });
    });

    // Special confetti for love message
    const loveMessage = document.querySelector('.love-message');
    if (loveMessage) {
        loveMessage.addEventListener('mouseenter', function() {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#E6E6FA', '#9370DB', '#FF69B4', '#F8F4FF']
            });
        });
    }

    // Progress celebration
    function celebrateProgress(progress) {
        if (progress >= 25 && progress < 50) {
            confetti({
                particleCount: 40,
                spread: 45,
                origin: { y: 0.7 },
                colors: ['#E6E6FA', '#9370DB']
            });
        } else if (progress >= 50 && progress < 75) {
            confetti({
                particleCount: 60,
                spread: 55,
                origin: { y: 0.7 },
                colors: ['#E6E6FA', '#9370DB', '#FF69B4']
            });
        } else if (progress >= 75 && progress < 100) {
            confetti({
                particleCount: 80,
                spread: 65,
                origin: { y: 0.7 },
                colors: ['#E6E6FA', '#9370DB', '#FF69B4', '#F8F4FF']
            });
        } else if (progress >= 100) {
            // Big celebration for completion
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#E6E6FA', '#9370DB', '#FF69B4', '#F8F4FF', '#7B68EE']
            });
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.4 },
                    colors: ['#E6E6FA', '#9370DB', '#FF69B4']
                });
            }, 500);
        }
    }

    // Expose celebrateProgress function globally
    window.celebrateProgress = celebrateProgress;

    // Add smooth scrolling for navigation
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

    // Add typing effect to titles
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 2000);
    }

    // Add parallax effect to floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hearts = document.querySelectorAll('.heart, .memory-bubble');
        
        hearts.forEach((heart, index) => {
            const speed = 0.5 + (index * 0.1);
            heart.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add music note animation for special moments
    function addMusicNotes() {
        const notes = ['♪', '♫', '♬', '♩'];
        const note = document.createElement('div');
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.position = 'fixed';
        note.style.left = Math.random() * window.innerWidth + 'px';
        note.style.top = window.innerHeight + 'px';
        note.style.fontSize = '2rem';
        note.style.color = '#9370DB';
        note.style.pointerEvents = 'none';
        note.style.zIndex = '9999';
        note.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(note);
        
        setTimeout(() => {
            document.body.removeChild(note);
        }, 3000);
    }

    // Add CSS for music note animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Trigger music notes on special interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') || 
            e.target.closest('.btn-primary')) {
            addMusicNotes();
        }
    });

    // Add heartbeat effect to love elements
    function addHeartbeat(element) {
        element.style.animation = 'heartbeat 1s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }

    // Add CSS for heartbeat animation
    const heartbeatStyle = document.createElement('style');
    heartbeatStyle.textContent = `
        @keyframes heartbeat {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(heartbeatStyle);

    // Apply heartbeat to love-related elements
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('💕') || 
            e.target.textContent.includes('💖') ||
            e.target.textContent.includes('💗') ||
            e.target.textContent.includes('💓') ||
            e.target.textContent.includes('💝')) {
            addHeartbeat(e.target);
        }
    });

    // Add sparkle effect
    function addSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, 1000);
    }

    // Add CSS for sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add sparkles on mouse movement over special areas
    let sparkleTimeout;
    document.addEventListener('mousemove', function(e) {
        clearTimeout(sparkleTimeout);
        sparkleTimeout = setTimeout(() => {
            if (Math.random() < 0.1) { // 10% chance
                addSparkle(e.clientX, e.clientY);
            }
        }, 100);
    });

    // Initialize all animations
    console.log('💕 Love Gift initialized with all magical effects! 💕');
}); 