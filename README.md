# R6 Marketplace Purchase Tracker

This project provides an automated solution to track and manage your Rainbow Six Siege Marketplace purchases. By integrating a Tampermonkey userscript with a Google Apps Script, it fetches purchase data from your Gmail and displays it directly on the Ubisoft Marketplace page.

## Features

- **Automated Data Extraction**: Scans your Gmail for Ubisoft purchase confirmation emails and extracts relevant details.
- **Google Sheets Integration**: Stores purchase data in a structured Google Sheet for easy access and management.
- **Visual Overlay**: Displays your purchase history directly on the Ubisoft Marketplace page using a Tampermonkey userscript.
- **Archiving**: Automatically archives items after a specified period (e.g., 15 days) and removes corresponding emails.

## Components

### 1. Tampermonkey Userscript

- **File**: `tampermonkey.js`
- **Functionality**: Fetches data from the Google Sheet and overlays it on the Ubisoft Marketplace page.

### 2. Google Apps Script

- **File**: `googleappscript.js`
- **Functionality**: Connects to your Gmail account, extracts purchase information, and populates the Google Sheet. Also handles archiving of old entries.

## Setup Instructions

### Prerequisites

- A Google account with access to Gmail and Google Sheets
- Tampermonkey browser extension installed

### Google Apps Script Setup

1. Create a new Google Sheet.
2. Open the Script Editor (`Extensions` > `Apps Script`).
3. Replace the default code with the contents of `googleappscript.js`.
4. Update the `sheetId` and `archiveSheetId` variables with your own Google Sheet IDs.
5. Save and run the `trackAllR6MarketplacePurchasesFresh` function to initialize.

### Tampermonkey Userscript Setup

1. Open Tampermonkey in your browser.
2. Create a new script and paste in the contents of `tampermonkey.js`.
3. Update the `sheetId` and `apiKey` variables with your Google Sheet ID and API key.
4. Save the script.
5. Visit the Ubisoft Marketplace page – your purchase history will be shown in an overlay box.

## Notes

- Make sure your Google Sheet is publicly accessible via API so the Tampermonkey script can retrieve the data.
- The Google Apps Script will require authorization to access your Gmail and Google Sheets.
- You can modify the archive period (default: 15 days) by editing the appropriate line in `googleappscript.js`.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with improvements or bug fixes.
