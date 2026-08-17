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

let techResources = [
    { id: 1, name: "Python", category: "Language" },
    { id: 2, name: "C++", category: "Language" },
    { id: 3, name: "Visual Studio Code", category: "Tool" },
    { id: 4, name: "GitHub", category: "Tool" },
    { id: 5, name: "Arduino Uno", category: "Hardware" },
    { id: 6, name: "Raspberry Pi", category: "Hardware" }
];

const resourceList = document.querySelector("#resource-list");
const filterInput = document.querySelector("#filter-text");
const clearFilterBtn = document.querySelector("#clear-filter");
const emptyMessage = document.querySelector("#empty-message");
const addResourceForm = document.querySelector("#add-resource-form");

function renderResources(itemsToRender) {
    resourceList.innerHTML = "";

    if (itemsToRender.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
   
        itemsToRender.forEach(function(item) {
            const li = document.createElement("li");
            li.classList.add("resource-item");
            li.dataset.id = item.id; 

            const textSpan = document.createElement("span");
            textSpan.textContent = item.name + " (" + item.category + ")";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove";
            deleteBtn.classList.add("delete-btn");

            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            
            resourceList.appendChild(li);
        });
    }
}

renderResources(techResources);

filterInput.addEventListener("input", function() {
    const searchTerm = filterInput.value.toLowerCase();
    
    const filtered = techResources.filter(function(item) {
        return item.name.toLowerCase().includes(searchTerm);
    });
    
    renderResources(filtered);
});

clearFilterBtn.addEventListener("click", function() {
    filterInput.value = "";
    renderResources(techResources);
});

addResourceForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const newName = document.querySelector("#new-name").value.trim();
    const newCategory = document.querySelector("#new-category").value;
    
    if (newName !== "") {
        const newItem = {
            id: Date.now(), 
            name: newName,
            category: newCategory
        };
       
        techResources.push(newItem);
        
        const searchTerm = filterInput.value.toLowerCase();
        const filtered = techResources.filter(function(item) {
            return item.name.toLowerCase().includes(searchTerm);
        });
        
        renderResources(filtered);
        addResourceForm.reset(); 
    }
});

resourceList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        
        const itemId = parseInt(event.target.parentElement.dataset.id);
        
        techResources = techResources.filter(function(item) {
            return item.id !== itemId;
        });
        
        const searchTerm = filterInput.value.toLowerCase();
        const filtered = techResources.filter(function(item) {
            return item.name.toLowerCase().includes(searchTerm);
        });
        
        renderResources(filtered);
    }
});