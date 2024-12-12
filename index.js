document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#rota-table tbody");

    // URL to fetch the rota.json file from your public GitHub repository
    const rotaUrl = "https://raw.githubusercontent.com/elo613/PublicRadRota/main/rota.json";

    // Variable to store all the rota data
    let rotaData = [];
    let currentPage = 0;
    const rowsPerPage = 14;

    // Fetch the rota data from GitHub
    async function loadRotaData() {
        try {
            const response = await fetch(rotaUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            rotaData = await response.json();
            // Filter out dates older than today
            const today = new Date();
            rotaData = rotaData.filter(record => {
                const recordDate = new Date(record.Date);
                return recordDate >= today; // Only future or today's dates
            });

            // Display the first set of rows
            displayTableData();
        } catch (error) {
            console.error("Error loading rota data:", error);
        }
    }

    // Display data for the current page
    function displayTableData() {
        // Clear the existing table rows
        tableBody.innerHTML = "";

        // Get the rows for the current page
        const startIndex = currentPage * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const currentPageData = rotaData.slice(startIndex, endIndex);

        // Populate the table rows
        currentPageData.forEach(record => {
            const row = document.createElement("tr");

            // Create table cells for date, session, and registrar
            const dateCell = document.createElement("td");
            dateCell.textContent = record.Date;

            const sessionCell = document.createElement("td");
            sessionCell.textContent = record.Session;

            const registrarCell = document.createElement("td");
            registrarCell.textContent = record.Name;

            // Append cells to the row
            row.appendChild(dateCell);
            row.appendChild(sessionCell);
            row.appendChild(registrarCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    }

    // Go to the next page of the table
    function nextPage() {
        if ((currentPage + 1) * rowsPerPage < rotaData.length) {
            currentPage++;
            displayTableData();
        }
    }

    // Go to the previous page of the table
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            displayTableData();
        }
    }

    // Event listeners for navigation buttons (optional)
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", nextPage);
    document.body.appendChild(nextButton);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", prevPage);
    document.body.appendChild(prevButton);

    loadRotaData(); // Load rota data when the page loads
});
