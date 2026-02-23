/* ===================================================== */
/* =============== SCROLL SUAVE ======================== */
/* ===================================================== */

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* ===================================================== */
/* =============== HEADER DINÁMICO ===================== */
/* ===================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = "#0f172a";
    } else {
        header.style.backgroundColor = "var(--color-secundario)";
    }
});


/* ===================================================== */
/* =============== ANIMACIÓN FADE IN =================== */
/* ===================================================== */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


/* ===================================================== */
/* =============== ENVÍO FORMULARIO PRO ================= */
/* ===================================================== */

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", async function(e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validación campos vacíos
        if (nombre === "" || email === "" || mensaje === "") {
            alert("Por favor completá todos los campos.");
            return;
        }

        // Validación email
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(email)) {
            alert("Ingresá un email válido.");
            return;
        }

        // 🔐 Verificar reCAPTCHA
        const captcha = grecaptcha.getResponse();
        if (!captcha) {
            alert("Por favor verificá que no sos un robot.");
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/mzdavpbl", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: new FormData(form)
            });

            if (response.ok) {
                form.reset();
                grecaptcha.reset();
                window.location.href = "gracias.html";
            } else {
                alert("Hubo un error al enviar el formulario.");
            }

        } catch (error) {
            alert("Error de conexión. Intentá nuevamente.");
        }

    });
}

/* ===================================================== */
/* =============== LIMPIAR FORM AL VOLVER ============== */
/* ===================================================== */

window.addEventListener("pageshow", function () {
    if (form) {
        form.reset();
    }
});

/* =============== CONTADOR DE CARACTERES ============== */

const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

mensaje.addEventListener("input", function() {
    contador.textContent = `${mensaje.value.length} / 300`;
});



