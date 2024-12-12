document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#rota-table tbody");

    // URL to fetch the rota.json file from your public GitHub repository
    const rotaUrl = "https://raw.githubusercontent.com/elo613/PublicRadRota/main/rota.json";

    // Fetch the rota data from the GitHub repository
    async function loadRotaData() {
        try {
            const response = await fetch(rotaUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const rotaData = await response.json();

            // Insert rows into the table body
            rotaData.forEach(record => {
                const row = document.createElement("tr");

                // Create the table cells
                const dateCell = document.createElement("td");
                dateCell.textContent = record.Date;
                const sessionCell = document.createElement("td");
                sessionCell.textContent = record.Session;
                const nameCell = document.createElement("td");
                nameCell.textContent = record.Name;

                // Append cells to the row
                row.appendChild(dateCell);
                row.appendChild(sessionCell);
                row.appendChild(nameCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading rota data:", error);
        }
    }

    loadRotaData(); // Call the function to load the rota data when the page loads
});
