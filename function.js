const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* PLAYER */
let player = {
    x: 400,
    y: 300,
    size: 20,
    speed: 3,
    sprint: 6,
    health: 100,
    ammo: 30,
    gun: "AK",
    medkit: 2,
    kills: 0
};

let bullets = [];
let enemies = [];
let keys = {};
let mouse = { x: 0, y: 0 };

/* TIMER */
let time = 0;
let maxTime = Math.floor(Math.random() * 120) + 360;

/* MENU */
function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    spawnEnemies();
    startTimer();
    gameLoop();
}

function exitGame() { location.reload(); }

function openProfile() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("profile").classList.remove("hidden");
}

function backMenu() {
    document.getElementById("profile").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

function saveName() {
    alert("Saved!");
}

/* INPUT */
document.addEventListener("keydown", e => {
    keys[e.key] = true;

    /* RELOAD */
    if (e.key === "r") player.ammo = 30;

    /* HEAL */
    if (e.key === "h" && player.medkit > 0) {
        player.health += 30;
        player.medkit--;
    }

    /* GUN SWITCH */
    if (e.key === "1") { player.gun = "AK"; }
    if (e.key === "2") { player.gun = "SNIPER"; }
});

document.addEventListener("keyup", e => keys[e.key] = false);

canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

/* SHOOT */
canvas.addEventListener("click", () => {
    if (player.ammo > 0) {
        let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

        let speed = player.gun === "SNIPER" ? 10 : 7;

        bullets.push({
            x: player.x,
            y: player.y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed
        });

        player.ammo--;
    }
});

/* ENEMIES */
function spawnEnemies() {
    for (let i = 0; i < 10; i++) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            health: 50
        });
    }
}

/* TIMER */
function startTimer() {
    setInterval(() => {
        time++;
        document.getElementById("timer").innerText = time;

        if (time >= maxTime) {
            endGame("⏱ Time Up!");
        }
    }, 1000);
}

/* GAME LOOP */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* PLAYER */
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    /* MOVEMENT */
    let speed = keys["Shift"] ? player.sprint : player.speed;

    if (keys["w"]) player.y -= speed;
    if (keys["s"]) player.y += speed;
    if (keys["a"]) player.x -= speed;
    if (keys["d"]) player.x += speed;

    /* BULLETS */
    ctx.fillStyle = "yellow";
    bullets.forEach((b, i) => {
        b.x += b.dx;
        b.y += b.dy;

        ctx.fillRect(b.x, b.y, 5, 5);

        /* HIT */
        enemies.forEach((e, j) => {
            if (b.x < e.x + 20 && b.x > e.x && b.y < e.y + 20 && b.y > e.y) {
                e.health -= 25;
                bullets.splice(i, 1);

                if (e.health <= 0) {
                    enemies.splice(j, 1);
                    player.kills++;
                }
            }
        });
    });

    /* ENEMIES */
    ctx.fillStyle = "red";
    enemies.forEach(e => {
        let dx = player.x - e.x;
        let dy = player.y - e.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        e.x += dx / dist * 1.2;
        e.y += dy / dist * 1.2;

        ctx.fillRect(e.x, e.y, 20, 20);

        /* DAMAGE */
        if (dist < 20) {
            player.health -= 0.3;
        }
    });

    /* UI */
    document.getElementById("health").innerText = Math.floor(player.health);
    document.getElementById("ammo").innerText = player.ammo;
    document.getElementById("medkit").innerText = player.medkit;
    document.getElementById("kills").innerText = player.kills;
    document.getElementById("gun").innerText = player.gun;

    /* DEATH */
    if (player.health <= 0) {
        endGame("💀 You Died!");
    }

    requestAnimationFrame(gameLoop);
}

/* END GAME */
function endGame(msg) {
    alert(msg);

    if (player.kills > 5) {
        alert("🔥 Victory!");
    } else {
        alert("💀 Defeat!");
    }

    location.reload();
}