async function explainDrug() {
    const drug = document.getElementById("drugInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!drug) {
        resultDiv.innerHTML = "<p>Please enter a drug name.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Fetching FDA data...</p>";

    try {
        const response = await fetch(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drug}&limit=1`
        );

        const data = await response.json();

        // Add defensive check
        if (!data.results || data.results.length === 0) {
            resultDiv.innerHTML = "<p>No FDA label data found for this drug.</p>";
            return;
        }

        const label = data.results[0];
        const indications = label.indications_and_usage?.[0] || "Not available";

        resultDiv.innerHTML = `
            <h3>${drug}</h3>
            <p><strong>FDA Indications (Official):</strong></p>
            <p>${indications}</p>
            <p><strong>AI-Generated Plain-English Summary:</strong></p>
            <p>Generating summary...</p>
        `;

        // Call backend for AI summary
        const aiResponse = await fetch("/api/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ labelText: indications })
        });

        const aiData = await aiResponse.json();

        resultDiv.innerHTML += `
            <p>${aiData.summary}</p>
            <p><em>This summary is AI-generated from FDA labeling for educational purposes only.</em></p>
        `;
    } catch (error) {
        console.error("Error in explainDrug:", error); // <-- log full error
        resultDiv.innerHTML = "<p>Error retrieving drug information.</p>";
    }
}

