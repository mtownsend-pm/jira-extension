const ticketPattern = /^(https:\/\/policyme\.atlassian\.net\/browse)\/([A-Z]+)-(\d+)$/;

const getCurrentTab = async () => {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [ tab ] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Received command: ${command}`);
  const tab = await getCurrentTab();
  const match = tab.url.match(ticketPattern);
  if (!match) {
    return;
  }
  const ticketNum = Number(match[3]);
  switch (command) {
    case 'previous-ticket':
      chrome.tabs.update(tab.id, { url: `${match[1]}/${match[2]}-${ticketNum - 1}` });
      break;
    case 'next-ticket':
      chrome.tabs.update(tab.id, { url: `${match[1]}/${match[2]}-${ticketNum + 1}` });
      break;
  }
});
