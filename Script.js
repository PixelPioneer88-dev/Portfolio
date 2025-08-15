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

      // Toggle icon between bars and times
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.replace("fa-bars", "fa-times");
      } else {
        icon.classList.replace("fa-times", "fa-bars");
      }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.replace("fa-times", "fa-bars");
        }
      });
    });
  }

  // --------------------------
  // Contact Form Submission
  // --------------------------
  const form = document.getElementById("contactForm");
  const statusMsg = document.createElement("div");
  statusMsg.id = "status-message";
  statusMsg.style.marginTop = "15px";
  statusMsg.style.fontWeight = "500";
  form.appendChild(statusMsg);

  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};

    // Convert FormData to JSON
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Disable button and show sending status
    submitBtn.disabled = true;
    statusMsg.innerText = "Sending...";
    statusMsg.style.color = "#666";

    // Send to Formspree
    fetch("https://formspree.io/f/mayvlzra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          statusMsg.innerText = "Thank you! Your message has been sent.";
          statusMsg.style.color = "#00ff88";
          form.reset();
        } else {
          statusMsg.innerText = "Oops! Something went wrong.";
          statusMsg.style.color = "#ff4444";
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        statusMsg.innerText = "Network error. Please try again.";
        statusMsg.style.color = "#ff4444";
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
});
