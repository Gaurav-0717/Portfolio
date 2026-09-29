document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

  const navToggle = document.getElementById("navToggle");

  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!navMenu || !navToggle) {
      return;
    }

    navMenu.classList.remove("open");

    navToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (!navMenu || !navToggle) {
      return;
    }

    navMenu.classList.add("open");

    navToggle.setAttribute("aria-expanded", "true");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navMenu.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        event.target !== navToggle
      ) {
        closeMenu();
      }
    });
  }

  /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 140;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.toggle("active", href === `#${currentSection}`);
    });
  }

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true,
  });

  updateActiveNavigation();

  /* =========================================================
       PROJECT MODALS
    ========================================================= */

  window.openModal = function (modalKey) {
    const modal = document.getElementById(`modal-${modalKey}`);

    if (!modal) {
      return;
    }

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

    const closeButton = modal.querySelector(".modal-close-btn");

    if (closeButton) {
      setTimeout(() => {
        closeButton.focus();
      }, 100);
    }
  };

  window.closeModal = function (modalKey) {
    const modal = document.getElementById(`modal-${modalKey}`);

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    document.body.style.overflow = "";
  };

  /* =========================================================
       CLOSE MODAL BY CLICKING OUTSIDE
    ========================================================= */

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("open");

        document.body.style.overflow = "";
      }
    });
  });

  /* =========================================================
       KEYBOARD SUPPORT
    ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu();

    document.querySelectorAll(".modal-overlay.open").forEach((modal) => {
      modal.classList.remove("open");
    });

    document.body.style.overflow = "";
  });

  /* =========================================================
       PROJECT PREVIEW KEYBOARD ACCESS
    ========================================================= */

  document.querySelectorAll(".project-preview-wrap").forEach((preview) => {
    preview.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();

      preview.click();
    });
  });

  /* =========================================================
   CONTACT FORM — GMAIL COMPOSE
========================================================= */

  const contactForm = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  const submitButton = document.getElementById("formSubmitBtn");

  if (contactForm && feedback && submitButton) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("userName").value.trim();
      const email = document.getElementById("userEmail").value.trim();
      const subject = document.getElementById("userSubject").value.trim();
      const message = document.getElementById("userMessage").value.trim();

      /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

      if (!name) {
        showFeedback("Please enter your name.", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        return;
      }

      if (!subject) {
        showFeedback("Please enter a subject.", "error");
        return;
      }

      if (!message) {
        showFeedback("Please enter your message.", "error");
        return;
      }

      /* ---------------------------------------------
           BUILD EMAIL BODY
        --------------------------------------------- */

      const emailBody = `Hi Gaurav,

Name: ${name}

Email: ${email}

Message:

${message}

Sent from Gaurav's Portfolio`;

      /* ---------------------------------------------
           BUILD GMAIL COMPOSE URL
        --------------------------------------------- */

      const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" +
        encodeURIComponent("gauravshingare14@gmail.com") +
        "&su=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(emailBody);

      /* ---------------------------------------------
           OPEN GMAIL DIRECTLY
        --------------------------------------------- */

      submitButton.disabled = true;

      showFeedback("Opening Gmail Compose...", "success");

      /*
       * Use direct navigation instead of window.open().
       * This avoids browser popup blocking.
       */
      window.location.href = gmailUrl;
    });

    function showFeedback(message, type) {
      feedback.textContent = message;

      feedback.className = `form-feedback-msg ${type}`;
    }
  }
});
