#R6 Marketplace Purchase Tracker
This project provides an automated solution to track and manage your Rainbow Six Siege Marketplace purchases. By integrating a Tampermonkey userscript with a Google Apps Script, it fetches purchase data from your Gmail and displays it directly on the Ubisoft Marketplace page.

Features
Automated Data Extraction: Scans your Gmail for Ubisoft purchase confirmation emails and extracts relevant details.

Google Sheets Integration: Stores purchase data in a structured Google Sheet for easy access and management.

Visual Overlay: Displays your purchase history directly on the Ubisoft Marketplace page using a Tampermonkey userscript.

Archiving: Automatically archives items after a specified period (e.g., 15 days) and removes corresponding emails.

Components
1. Tampermonkey Userscript
File: tampermonkey.js

Functionality: Fetches data from the Google Sheet and overlays it on the Ubisoft Marketplace page.

2. Google Apps Script
File: googleappscript.js

Functionality: Connects to your Gmail account, extracts purchase information, and populates the Google Sheet. Also handles archiving of old entries.

Setup Instructions
Prerequisites
A Google account with access to Gmail and Google Sheets.

Tampermonkey extension installed in your browser.

Google Apps Script Setup
Create a new Google Sheet.

Open the Script Editor (Extensions > Apps Script).

Replace the default code with the contents of googleappscript.js.

Update the sheetId and archiveSheetId variables with your Google Sheet IDs.

Save and run the trackAllR6MarketplacePurchasesFresh function to initialize.

Tampermonkey Userscript Setup
Open Tampermonkey in your browser.

Create a new script and paste the contents of tampermonkey.js.

Update the sheetId and apiKey variables with your Google Sheet ID and API key.

Save the script.

Navigate to the Ubisoft Marketplace page; your purchase history should now be displayed.

Notes
Ensure that your Google Sheet is set to public or accessible via API for the Tampermonkey script to fetch data.

The Google Apps Script requires permissions to access your Gmail and Google Sheets.

Adjust the archiving period in the script as needed.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
