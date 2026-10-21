const API_URL = "http://localhost:3000/api/v1/services"; 
const statusDiv = document.getElementById("api-status");
const servicesList = document.getElementById("services-list");
const singleResultDiv = document.getElementById("single-service-result");
const searchBtn = document.getElementById("fetch-service-btn");
const searchInput = document.getElementById("service-id-input");

const formatMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

async function fetchServices() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errors.join(", "));
    }
    
    const services = await response.json();
    statusDiv.textContent = ""; 
    
    services.forEach(service => {
      const li = document.createElement("li");
      li.textContent = `${service.name} - ${formatMoney.format(service.price)}`;
      servicesList.appendChild(li);
    });

  } catch (error) {
    statusDiv.textContent = `Error: ${error.message || "Cannot connect to the Wheelhouse API."}`;
  }
}

searchBtn.addEventListener("click", async () => {
  const id = searchInput.value;
  if (!id) return;

  singleResultDiv.textContent = "Searching...";

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
      singleResultDiv.textContent = `Error: ${data.errors.join(", ")}`;
      return;
    }

    singleResultDiv.textContent = `Service: ${data.name} | Price: ${formatMoney.format(data.price)} | Charged ${data.charged_count} times.`;

  } catch (error) {
    singleResultDiv.textContent = "Error connecting to the API.";
  }
});

fetchServices();