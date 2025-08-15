// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.replace("fa-bars", "fa-times");
      } else {
        icon.classList.replace("fa-times", "fa-bars");
      }
    });
  }

  // Close mobile menu when clicking a nav link
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.replace("fa-times", "fa-bars");
      }
    });
  });

  // Form Submission Feedback
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Optional: Add success message or loader
      console.log("Form submitted!");
    });
  }
});
