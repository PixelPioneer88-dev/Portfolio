// Mobile Menu Toggle and Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  // --------------------------
  // Mobile Menu Toggle
  // --------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("active");
      menuToggle.classList.toggle("open"); // For optional CSS animation

      // Toggle icon between bars and times
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (icon.classList.contains("fa-bars")) {
          icon.classList.replace("fa-bars", "fa-times");
        } else {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          menuToggle.classList.remove("open");
          const icon = menuToggle.querySelector("i");
          if (icon) icon.classList.replace("fa-times", "fa-bars");
        }
      });
    });
  }

  // --------------------------
  // Contact Form Submission
  // --------------------------
  const form = document.getElementById("contactForm");

  if (form) {
    const statusMsg = document.createElement("div");
    statusMsg.id = "status-message";
    statusMsg.style.marginTop = "15px";
    statusMsg.style.fontWeight = "500";
    statusMsg.style.textAlign = "center";
    form.appendChild(statusMsg);

    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        statusMsg.innerText = "Please fill in all required fields.";
        statusMsg.style.color = "#ff4444";
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      submitBtn.disabled = true;
      statusMsg.innerText = "Sending...";
      statusMsg.style.color = "#666";

      fetch("https://formspree.io/f/mayvlzra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => {
          if (response.ok) {
            statusMsg.innerText = "Thank you! Your message has been sent.";
            statusMsg.style.color = "#00ff88";
            form.reset();
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        })
        .catch(error => {
          console.error("Form submission error:", error);
          statusMsg.innerText = "Oops! Something went wrong. Please try again.";
          statusMsg.style.color = "#ff4444";
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  } else {
    console.warn("Contact form not found. Make sure the form has id='contactForm'");
  }
});
