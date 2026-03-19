// Typing Effect
const text = "Welcome to TG Killer’s World";
let i = 0;
function typing() { if (i < text.length) { document.getElementById("typing").innerHTML += text.charAt(i); i++; setTimeout(typing, 80); } }
typing();

// Smooth Scroll
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: "smooth" }); }

// Particle Background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for (let i = 0; i < 400; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5, dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5 }); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.x += p.dx; p.y += p.dy; if (p.x > canvas.width) p.x = 0; if (p.x < 0) p.x = canvas.width; if (p.y > canvas.height) p.y = 0; if (p.y < 0) p.y = canvas.height; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "#00faffaa"; ctx.fill(); }); requestAnimationFrame(animate); }
animate();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

// Animated Counters
const guildLevel = document.getElementById("guildLevel");
const tournamentsWon = document.getElementById("tournamentsWon");
const regionRank = document.getElementById("regionRank");
const yearsGaming = document.getElementById("yearsGaming");

function animateCounter(element, target) {
    let count = 0;
    let step = target / 100;
    let interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        element.innerText = Math.floor(count);
    }, 30);
}

// Set your stats
animateCounter(guildLevel, 7);          // Guild Level = 7
animateCounter(tournamentsWon, 12);    // Example: 12 tournaments won
animateCounter(regionRank, 1);         // Top rank in region
animateCounter(yearsGaming, 8);        // Years of gaming