 // Mobile Menu Toggle
 // Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            // Change icon between bars and times
            const icon = menuToggle.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.replace("fa-bars", "fa-times");
            } else {
                icon.classList.replace("fa-times", "fa-bars");
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.replace("fa-times", "fa-bars");
        });
    });
});
      // Convert FormData to JSON
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
  
      // Disable the button and show status
      submitBtn.disabled = true;
      statusMsg.innerText = "Sending...";
      statusMsg.style.color = "#666";
  
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
        .catch(() => {
          statusMsg.innerText = "Oops! Something went wrong.";
          statusMsg.style.color = "#ff4444";
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  });
  
