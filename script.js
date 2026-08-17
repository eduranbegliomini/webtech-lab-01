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