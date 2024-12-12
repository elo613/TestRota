// URL to the rota.json file on GitHub (raw format)
const rotaUrl = "https://raw.githubusercontent.com/elo613/TestRota/main/rota.json";

// Fetch the rota data from the JSON file
fetch(rotaUrl)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector("#rota-table tbody");
        
        // Loop through the data and create table rows
        data.forEach(item => {
            const row = document.createElement("tr");
            
            const dateCell = document.createElement("td");
            dateCell.textContent = item.Date;
            
            const sessionCell = document.createElement("td");
            sessionCell.textContent = item.Session;
            
            const nameCell = document.createElement("td");
            nameCell.textContent = item.Name;
            
            row.appendChild(dateCell);
            row.appendChild(sessionCell);
            row.appendChild(nameCell);
            
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading the rota data:", error);
    });
