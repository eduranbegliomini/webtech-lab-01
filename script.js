const themeToggleBtn = document.querySelector("#theme-toggle");

themeToggleBtn.addEventListener("click", function() {
    
    document.body.classList.toggle("dark-mode");
    
    const isDarkMode = document.body.classList.contains("dark-mode");
    
    themeToggleBtn.setAttribute("aria-pressed", isDarkMode.toString());
    
    if (isDarkMode) {
        themeToggleBtn.textContent = "Switch to Light Mode";
    } else {
        themeToggleBtn.textContent = "Toggle Dark Mode";
    }
});

const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let isFormValid = true;

    function checkField(inputId, errorId, errorMessage) {
        const field = document.querySelector(inputId);
        const errorSpan = document.querySelector(errorId);

        if (field.value.trim() === "") {
            field.setAttribute("aria-invalid", "true"); 
            errorSpan.textContent = errorMessage;
            isFormValid = false;
        } else {
            field.removeAttribute("aria-invalid");
            errorSpan.textContent = ""; 
        }
    }

    checkField("#name", "#name-error", "Please enter your name.");
    checkField("#email", "#email-error", "Email is required.");
    checkField("#message", "#message-error", "Please write a message.");

    const emailField = document.querySelector("#email");
    const emailError = document.querySelector("#email-error");
    if (emailField.value.trim() !== "" && !emailField.value.includes("@")) {
        emailField.setAttribute("aria-invalid", "true");
        emailError.textContent = "Please include an '@' in the email address.";
        isFormValid = false;
    }

    if (isFormValid) {
        formSuccess.style.display = "block";
        formSuccess.textContent = "Message sent successfully!";
        contactForm.reset(); // Limpiamos el formulario
    } else {
        formSuccess.style.display = "none";
    }
});