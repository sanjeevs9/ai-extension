// Create context menu for selected text only
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkFact",
    title: "Check this fact",
    contexts: ["selection"]  // Only show when text is selected
  });
});

// Handle click on context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "checkFact") {
    // Store the selected text in chrome storage
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      // Open the popup
      chrome.action.openPopup();
    });
  }
}); 