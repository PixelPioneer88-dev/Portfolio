document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const statusMsg = document.getElementById("status-message");
    const submitBtn = form.querySelector("button[type='submit']");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = new FormData(form);
      const jsonData = {};
  
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
  