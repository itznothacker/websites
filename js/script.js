// Create particle effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', createParticles);

// Add smoother parallax effect to profile card with reduced rotation
let currentX = 0;
let currentY = 0;
let aimX = 0;
let aimY = 0;

document.addEventListener('mousemove', (e) => {
    // Reduce the rotation amount by dividing by a larger number (50 instead of 25)
    aimX = (window.innerWidth / 2 - e.pageX) / 50;
    aimY = (window.innerHeight / 2 - e.pageY) / 50;
});

// Smooth animation function
function animate() {
    // Add smooth interpolation
    currentX += (aimX - currentX) * 0.1;
    currentY += (aimY - currentY) * 0.1;
    
    // Limit rotation to a maximum of 10 degrees
    const limitedX = Math.max(-10, Math.min(10, currentX));
    const limitedY = Math.max(-10, Math.min(10, currentY));
    
    const card = document.querySelector('.profile-card');
    card.style.transform = `rotateY(${limitedX}deg) rotateX(${limitedY}deg)`;
    
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// Reset card position when mouse leaves
document.addEventListener('mouseleave', () => {
    aimX = 0;
    aimY = 0;
});