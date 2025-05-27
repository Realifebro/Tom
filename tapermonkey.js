// R6marketplaceskript
// @name         R6 Marketplace Purchases from Google Sheets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display R6 items from Google Sheets
// @author       You
// @match        https://www.ubisoft.com/de-de/game/rainbow-six/siege/marketplace*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Your Google Sheets ID and API key (if used)
    const sheetId = "182sBtcFMjWi0f0GQQsZLUsA11nmChLY9v1U74s72omc"; // Replace with your Google Sheet ID
    const apiKey = "AIzaSyA5n3u-KnH3moWzQT6auU8YSyTxLFAWgs0"; // Replace with your API key

    // Google Sheets API URL (tested for public sheets)
    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    // HTML layout for the display
    const displayContainer = document.createElement('div');
    displayContainer.style.position = 'fixed';
    displayContainer.style.top = '10px';
    displayContainer.style.right = '10px';
    displayContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    displayContainer.style.color = 'white';
    displayContainer.style.padding = '10px';
    displayContainer.style.maxHeight = '80vh';
    displayContainer.style.overflowY = 'auto';
    displayContainer.style.zIndex = 1000;
    displayContainer.style.fontFamily = 'Arial, sans-serif';
    displayContainer.style.fontSize = '12px';
    displayContainer.style.borderRadius = '5px';
    document.body.appendChild(displayContainer);

    // Function to fetch data from Google Sheets
    GM_xmlhttpRequest({
        method: "GET",
        url: sheetURL,
        onload: function(response) {
            const jsonData = JSON.parse(response.responseText);
            const rows = jsonData.values;
            displayItems(rows);
        },
        onerror: function() {
            displayContainer.innerHTML = 'Error loading data from Google Sheets!';
        }
    });

    // Display items
    function displayItems(rows) {
        let htmlContent = '<h3>R6 Marketplace Purchases</h3><ul>';

        // Skip the first row (header)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const itemName = row[0] || "Unknown item";
            const purchaseDate = row[1] || "Unknown";
            const sellDate = row[2] || "Unknown";
            const credits = row[3] || "Unknown";

            htmlContent += `
                <li>
                    <strong>Item:</strong> ${itemName}<br>
                    <strong>Purchase Date:</strong> ${purchaseDate}<br>
                    <strong>Sell Date:</strong> ${sellDate}<br>
                    <strong>Credits:</strong> ${credits}
                </li>
                <hr>
            `;
        }

        htmlContent += '</ul>';
        displayContainer.innerHTML = htmlContent;
    }

})();
