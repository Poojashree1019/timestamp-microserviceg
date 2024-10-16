document.getElementById('submitButton').addEventListener('click', function () {
    const dateInput = document.getElementById('dateInput').value;
    const apiUrl = `/api/timestamp/${dateInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.error) {
                resultDiv.innerHTML = `<p>${data.error}</p>`;
            } else {
                resultDiv.innerHTML = `
                    <p>Unix Timestamp: ${data.unix}</p>
                    <p>UTC: ${data.utc}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
