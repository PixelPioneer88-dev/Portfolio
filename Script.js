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
  
  // Check if form exists before trying to attach event listener
  if (!form) {
    console.warn("Contact form not found. Make sure the form has id='contactForm'");
    return;
  }

  // Create status message element
  const statusMsg = document.createElement("div");
  statusMsg.id = "status-message";
  statusMsg.style.marginTop = "15px";
  statusMsg.style.fontWeight = "500";
  statusMsg.style.textAlign = "center";
  form.appendChild(statusMsg);

  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form before submission
    if (!form.checkValidity()) {
      statusMsg.innerText = "Please fill in all required fields.";
      statusMsg.style.color = "#ff4444";
      form.reportValidity();
      return;
    }

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

    // Send to Formspree - URL fixed (removed extra spaces)
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
          // Reset form fields
          Array.from(formData.keys()).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) field.value = '';
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        statusMsg.innerText = "Oops! Something went wrong. Please try again or contact me directly.";
        statusMsg.style.color = "#ff4444";
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
});
