function trackAllR6MarketplacePurchasesFresh() {
  const sheet = SpreadsheetApp.openById("Your_sheet_ID").getActiveSheet();

  // Clear the sheet and set the header row
  sheet.clearContents();
  sheet.appendRow(["Item", "Purchase Date", "Sell Date", "Credits"]);

  // Search for Ubisoft Marketplace purchase emails
  const threads = GmailApp.search('from:news@updates.ubisoft.com subject:"Purchase of "', 0, 100);
  Logger.log("Email threads found: " + threads.length);

  // Array for storing emails corresponding to deleted rows
  const deletedThreads = [];

  threads.forEach(thread => {
    const messages = thread.getMessages();
    const message = messages[0]; // Use the first message
    const subject = message.getSubject();
    const date = message.getDate();
    const body = message.getPlainBody();

    // Extract item name from the subject
    const itemMatch = subject.match(/Purchase of „(.+?)“ marketplace/);
    const itemName = itemMatch ? itemMatch[1] : "Unknown Item";

    // Extract credits from the message body
    const creditsMatch = body.match(/for (\d+) R6 Credits/);
    const credits = creditsMatch ? parseInt(creditsMatch[1]) : "Unknown";

    // Calculate purchase and sell date
    const sellDate = new Date(date.getTime() + 15 * 24 * 60 * 60 * 1000);
    const formattedDate = formatDate(date);
    const formattedSellDate = formatDate(sellDate);

    // Check if the item is already entered
    const rows = sheet.getDataRange().getValues();
    let itemFound = false;
    for (let i = 1; i < rows.length; i++) {
      const rowItemName = rows[i][0];
      const rowItemDate = rows[i][1];

      if (rowItemName === itemName && rowItemDate === formattedDate) {
        itemFound = true;
        break;
      }
    }

    // If the item doesn't exist yet, add it
    if (!itemFound) {
      sheet.appendRow([itemName, formattedDate, formattedSellDate, credits]);
    }
  });

  Logger.log("Entries completed.");

  // Delete expired items and their corresponding emails
  deleteExpiredItems(sheet, threads);
}

// Helper function for date formatting (dd.mm.yy)
function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  return `${day}.${month}.${year}`;
}

// Function to delete expired items and their emails
function deleteExpiredItems(sheet, threads) {
  const archiveSheetId = "Ur_sheet_ID"; // Sheet ID

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const rows = sheet.getDataRange().getValues();

  // Open archive sheet
  const archiveSheet = SpreadsheetApp.openById(archiveSheetId).getSheetByName("Deleted Items")
    || SpreadsheetApp.openById(archiveSheetId).insertSheet("Deleted Items");

  // Add header if archive sheet is empty
  if (archiveSheet.getLastRow() === 0) {
    archiveSheet.appendRow(["Item", "Purchase Date", "Sell Date", "Credits", "Deleted On"]);
  }

  for (let i = rows.length - 1; i >= 1; i--) {
    const row = rows[i];
    const sellableDate = row[2];

    const sellableDateObj = parseDate(sellableDate);

    if (sellableDateObj && sellableDateObj < yesterday) {
      const deletedAt = formatDate(new Date());

      // 🔁 Archive to another sheet
      archiveSheet.appendRow([...row, deletedAt]);

      // 🗑️ Delete the row in the main sheet
      sheet.deleteRow(i + 1);

      Logger.log(`Deleted & archived: ${row[0]} (${sellableDate})`);

      // Delete email thread
      const subject = row[0];
      const correspondingThread = findThreadBySubject(threads, subject);
      if (correspondingThread) {
        correspondingThread.moveToTrash();
        Logger.log(`Thread for "${subject}" moved to trash.`);
      }
    }
  }
}

// Function to find a thread by subject
function findThreadBySubject(threads, subject) {
  return threads.find(thread => {
    const messages = thread.getMessages();
    return messages.some(message => message.getSubject().includes(subject));
  });
}

// Parse a date string in format dd.mm.yy
function parseDate(dateStr) {
  if (dateStr instanceof Date) {
    return dateStr; // Already a valid Date object
  }

  if (typeof dateStr === 'string') {
    const ddmmyyMatch = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
    if (ddmmyyMatch) {
      const day = ddmmyyMatch[1];
      const month = ddmmyyMatch[2] - 1; // Month is zero-based
      const year = "20" + ddmmyyMatch[3]; // Add century
      return new Date(year, month, day);
    }
  }

  return null; // If no valid format was recognized
}
