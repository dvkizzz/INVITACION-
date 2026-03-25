const CONFIG = {
    nombreFestejada: "Yarumy y Yaxumy",
   
    fechaEvento: new Date("2026-06-20T19:00:00"),
    whatsappLink: "https://wa.me/51994511310",
};


document.addEventListener("DOMContentLoaded", () => {
    sincronizarConfigEnUI();
    crearParticulas();
    iniciarCuentaRegresiva();
    iniciarSobre();
    iniciarBotones();
    animarTarjeta();
    iniciarHoverDetalles(); 
});

function sincronizarConfigEnUI() {
    const waLink = document.getElementById("waLink");
    if (waLink) waLink.href = CONFIG.whatsappLink;
}


function crearParticulas() {
    const contenedor = document.getElementById("particles");
    if (!contenedor) return;

    
    contenedor.innerHTML = "";

    const emojis = ["🌸", "✨", "💫", "🌹", "💕", "⭐", "🦋", "🌺"];
    const colores = ["#e91e8c", "#f8a5c2", "#d4af37", "#9c27b0", "#ff80ab", "#ce93d8"];

    const frag = document.createDocumentFragment();

    
    for (let i = 0; i < 30; i++) {
        const particula = document.createElement("div");
        particula.classList.add("particle");

        const size = Math.random() * 8 + 3;
        const posX = Math.random() * 100;
        const duration = Math.random() * 15 + 8;
        const delay = Math.random() * 10;
        const color = colores[Math.floor(Math.random() * colores.length)];

        particula.style.width = `${size}px`;
        particula.style.height = `${size}px`;
        particula.style.left = `${posX}%`;
        particula.style.background = color;
        particula.style.animationDuration = `${duration}s`;
        particula.style.animationDelay = `${delay}s`;
        particula.style.opacity = "0.7";

        frag.appendChild(particula);
    }

    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement("div");
        emoji.classList.add("particle");
        emoji.style.background = "transparent";
        emoji.style.borderRadius = "0";
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 15;
        const size = Math.random() * 15 + 10;

        emoji.style.left = `${posX}%`;
        emoji.style.fontSize = `${size}px`;
        emoji.style.animationDuration = `${duration}s`;
        emoji.style.animationDelay = `${delay}s`;

        frag.appendChild(emoji);
    }

    contenedor.appendChild(frag);
}


function iniciarSobre() {
    const envelope = document.getElementById("envelope");
    const envelopeFlap = document.getElementById("envelopeFlap");
    const envelopeContainer = document.getElementById("envelopeContainer");
    const invitationWrapper = document.getElementById("invitationWrapper");

    if (!envelope || !envelopeFlap || !envelopeContainer || !invitationWrapper) return;

    const abrir = () => {
        envelopeFlap.classList.add("open");

        setTimeout(() => {
            envelopeContainer.classList.add("hidden");

            setTimeout(() => {
                invitationWrapper.style.display = "flex";
                invitationWrapper.classList.add("visible");
                lanzarConfetti();
            }, 400);
        }, 900);
    };

    envelope.addEventListener("click", abrir);

    
    envelope.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrir();
        }
    });
}


let countdownTimer = null;

function iniciarCuentaRegresiva() {
    actualizarCuentaRegresiva();
    countdownTimer = setInterval(actualizarCuentaRegresiva, 1000);
}

function actualizarCuentaRegresiva() {
    const ahora = Date.now();
    const evento = CONFIG.fechaEvento.getTime();
    const diff = evento - ahora;

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");

    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    if (diff <= 0) {
        elDays.textContent = "00";
        elHours.textContent = "00";
        elMinutes.textContent = "00";
        elSeconds.textContent = "00";

        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }

        const countdownSection = document.querySelector(".countdown-section");
        if (countdownSection) {
            countdownSection.innerHTML = `
        <p class="countdown-title">🎉 ¡HOY ES EL GRAN DÍA! 🎉</p>
        <p style="color: var(--dorado); font-size: 18px; text-align: center;">
          ¡Felices 15 años, ${CONFIG.nombreFestejada}! 👑
        </p>
      `;
        }
        return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    animarNumero("days", formatear(dias));
    animarNumero("hours", formatear(horas));
    animarNumero("minutes", formatear(minutos));
    animarNumero("seconds", formatear(segundos));
}

function formatear(n) {
    return n.toString().padStart(2, "0");
}

function animarNumero(id, nuevoValor) {
    const el = document.getElementById(id);
    if (!el) return;

    if (el.textContent !== nuevoValor) {
        el.style.transform = "scale(1.25)";
        el.style.color = "#f5e6a3";
        el.textContent = nuevoValor;

        setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.color = "";
        }, 180);
    }
}


function iniciarBotones() {
    const btnConfirm = document.getElementById("btnConfirm");
    const btnDecline = document.getElementById("btnDecline");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalClose = document.getElementById("modalClose");

    if (!btnConfirm || !btnDecline || !modalOverlay || !modalClose) return;

    btnConfirm.addEventListener("click", () => {
        mostrarModal(
            "🎉",
            "¡Qué alegría!",
            "¡Nos emociona mucho que puedas acompañarnos en este día tan especial! Te esperamos con los brazos abiertos. 💕",
            true
        );
        lanzarConfetti();
    });

    btnDecline.addEventListener("click", () => {
        mostrarModal(
            "😢",
            "¡Te extrañaremos!",
            "Lamentamos que no puedas asistir. Estarás en nuestros corazones ese día especial. 💕",
            false
        );
    });

    modalClose.addEventListener("click", cerrarModal);

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) cerrarModal();
    });
}

function mostrarModal(icono, titulo, mensaje, esConfirmacion) {
    const modalOverlay = document.getElementById("modalOverlay");
    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modal = document.getElementById("modal");

    if (!modalOverlay || !modalIcon || !modalTitle || !modalMessage || !modal) return;

    modalIcon.textContent = icono;
    modalTitle.textContent = titulo;
    modalMessage.textContent = mensaje;

    modal.style.borderTop = esConfirmacion
        ? "5px solid var(--rosa-principal)"
        : "5px solid #9e9e9e";

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");

   
    setTimeout(() => {
        modal.style.transform = "scale(1)";
        modal.style.opacity = "1";
    }, 10);
}

function cerrarModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    const modal = document.getElementById("modal");

    if (!modalOverlay || !modal) return;

    modal.style.transform = "scale(0.9)";
    modal.style.opacity = "0";

    setTimeout(() => {
        modalOverlay.classList.remove("active");
        modalOverlay.setAttribute("aria-hidden", "true");
    }, 250);
}


function animarTarjeta() {
    const elementos = [
        { id: "mainName", delay: 250 },
        { id: "ageNumber", delay: 450 },
        { id: "messageText", delay: 650 },
        { id: "detail1", delay: 850 },
        { id: "detail2", delay: 1050 },
        { id: "detail3", delay: 1250 },
        { id: "detail4", delay: 1450 },
    ];

    elementos.forEach(({ id, delay }) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, delay);
    });
}


let confettiRAF = null;

function lanzarConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
    if (confettiRAF) {
        cancelAnimationFrame(confettiRAF);
        confettiRAF = null;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    const colores = ["#e91e8c", "#f8a5c2", "#d4af37", "#9c27b0", "#ff80ab", "#ffffff", "#ce93d8", "#f48fb1"];
    const particulas = [];
    const total = 150;

    for (let i = 0; i < total; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 15 + 5,
            h: Math.random() * 8 + 3,
            color: colores[Math.floor(Math.random() * colores.length)],
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 5 + 2,
            rot: Math.random() * 360,
            vrot: Math.random() * 10 - 5,
            alpha: 1,
        });
    }

    let frame = 0;
    const maxFrames = 200;

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        for (const p of particulas) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vrot;

            if (frame > maxFrames * 0.7) p.alpha -= 0.02;

            ctx.save();
            ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        }

        if (frame < maxFrames) {
            confettiRAF = requestAnimationFrame(tick);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiRAF = null;
        }
    };

    tick();
}


window.addEventListener(
    "resize",
    () => {
        const canvas = document.getElementById("confettiCanvas");
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    { passive: true }
);


document.addEventListener(
    "mousemove",
    (e) => {
        const decs = document.querySelectorAll(".floating-decoration");
        if (!decs.length) return;

        const mx = e.clientX / window.innerWidth - 0.5;
        const my = e.clientY / window.innerHeight - 0.5;

        decs.forEach((dec, idx) => {
            const speed = (idx + 1) * 8;
            dec.style.transform = `translate(${mx * speed}px, ${my * speed}px)`;
        });
    },
    { passive: true }
);


function iniciarHoverDetalles() {
    document.querySelectorAll(".detail-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateX(8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateX(0) scale(1)";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  sincronizarConfigEnUI();
  crearParticulas();
  iniciarCuentaRegresiva();
  iniciarSobre();
  iniciarBotones();
  animarTarjeta();
  iniciarHoverDetalles();

  iniciarMusicaAutoplay(); 
});

function iniciarMusicaAutoplay() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  const txt = document.getElementById("musicToggleText");
  if (!audio || !btn || !txt) return;

  audio.volume = 0.35;

  const setUI = (isOn) => {
    btn.classList.toggle("is-on", isOn);
    txt.textContent = isOn ? "Música: ON" : "Música: OFF";
  };


  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        audio.muted = false;
        await audio.play();
        setUI(true);
      } else {
        audio.pause();
        setUI(false);
      }
    } catch (e) {
      console.warn("Audio bloqueado:", e);
      setUI(false);
    }
  });

  
  audio.play()
    .then(() => setUI(!audio.paused && !audio.muted))
    .catch(() => setUI(false));

  
  const activarSonidoEnPrimerGesto = async () => {
    try {
      audio.muted = false;
      await audio.play();
      setUI(true);
    } catch (e) {
      console.warn("No se pudo activar sonido:", e);
    }
  };

  window.addEventListener("pointerdown", activarSonidoEnPrimerGesto, { once: true });
  window.addEventListener("keydown", activarSonidoEnPrimerGesto, { once: true });
}