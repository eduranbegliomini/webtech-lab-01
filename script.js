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
        contactForm.reset();
    } else {
        formSuccess.style.display = "none";
    }
});

let myCourses = [
    { id: 1, name: "Algebra and Introduction to Calculus", category: "Common Core", grade: 4.4 },
    { id: 2, name: "Chemistry", category: "Common Core", grade: 4.2 },
    { id: 3, name: "Theology I", category: "Common Core", grade: 7.0 },
    { id: 4, name: "Anthropology", category: "Common Core", grade: 6.9 },
    { id: 5, name: "Engineering Projects Workshop", category: "Common Core", grade: 5.7 },
    { id: 6, name: "Foundations of Engineering", category: "Common Core", grade: 6.4 },
    { id: 7, name: "Programming", category: "Common Core", grade: 5.0 },
    
    { id: 8, name: "Linear Algebra", category: "Common Core", grade: 5.1 },
    { id: 9, name: "Introduction to Mechanics", category: "Common Core", grade: 5.1 },
    { id: 10, name: "Biology of Microorganisms", category: "Common Core", grade: 5.6 },
    { id: 11, name: "Calculus I", category: "Common Core", grade: 4.8 },
    { id: 12, name: "Elective - The Beauty of Art", category: "Common Core", grade: 6.7 },
    { id: 13, name: "Theology II", category: "Common Core", grade: 6.7 },
    
    { id: 14, name: "Differential Equations", category: "Common Core", grade: 4.7 },
    { id: 15, name: "Mechanics and Waves", category: "Common Core", grade: 5.8 },
    { id: 16, name: "Economics", category: "Common Core", grade: 5.1 },
    { id: 17, name: "Calculus II", category: "Common Core", grade: 4.5 },
    { id: 18, name: "Minor - Advertising", category: "Common Core", grade: 5.3 },
    { id: 19, name: "Theology III", category: "Common Core", grade: 5.3 },

    { id: 20, name: "Electricity and Magnetism", category: "Common Core", grade: 5.3 },
    { id: 21, name: "Probability and Statistics", category: "Common Core", grade: 4.5 },
    { id: 22, name: "Thermodynamics", category: "Common Core", grade: 5.8 },
    { id: 23, name: "Statics", category: "Common Core", grade: 5.8 },
    { id: 24, name: "Ethics", category: "Common Core", grade: 6.7 },
    { id: 25, name: "Minor - Creativity", category: "Common Core", grade: 6.5 },
    
    { id: 26, name: "Databases", category: "Specialization", grade: 6.3 },
    { id: 27, name: "Programming Paradigms", category: "Specialization", grade: 5.0 },
    { id: 28, name: "Low-Level Programming", category: "Specialization", grade: 5.8 },
    { id: 29, name: "Statistical Methods", category: "Specialization", grade: 4.2 },
    { id: 30, name: "Minor - Marketing", category: "Specialization", grade: 6.1 },
    { id: 31, name: "Philosophy of Science", category: "Specialization", grade: 7.0 }
];

const resourceList = document.querySelector("#resource-list");
const filterCategory = document.querySelector("#filter-category");
const filterGrade = document.querySelector("#filter-grade");
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
            textSpan.textContent = item.name + " (" + item.category + ") - Grade: " + item.grade.toFixed(1);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove"; 
            deleteBtn.classList.add("delete-btn");

            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            
            resourceList.appendChild(li);
        });
    }
}

renderResources(myCourses);

function applyFilters() {
    const selectedCategory = filterCategory.value;
    const minGrade = parseFloat(filterGrade.value) || 1.0; 

    const filtered = myCourses.filter(function(item) {
        const matchCategory = (selectedCategory === "All") || (item.category === selectedCategory);
        const matchGrade = item.grade >= minGrade;
        
        return matchCategory && matchGrade;
    });

    renderResources(filtered);
}

filterCategory.addEventListener("change", applyFilters);
filterGrade.addEventListener("input", applyFilters);

clearFilterBtn.addEventListener("click", function() {
    filterCategory.value = "All";
    filterGrade.value = "";
    renderResources(myCourses);
});

addResourceForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const newName = document.querySelector("#new-name").value.trim();
    const newCategory = document.querySelector("#new-category").value;
    const newGrade = parseFloat(document.querySelector("#new-grade").value);
    
    if (newName !== "" && !isNaN(newGrade)) {
        const newItem = {
            id: Date.now(),
            name: newName,
            category: newCategory,
            grade: newGrade
        };
        
        myCourses.push(newItem);
        applyFilters(); 
        addResourceForm.reset(); 
    }
});

resourceList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const itemId = parseInt(event.target.parentElement.dataset.id);
        
        myCourses = myCourses.filter(function(item) {
            return item.id !== itemId;
        });
        
        applyFilters(); 
    }
});