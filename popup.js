
const updateDisplay = async () => {

  const commands = await chrome.commands.getAll();
  for (const { name, shortcut } of commands) {
    const el = document.getElementById(name);
    if (el) {
      el.innerText = shortcut;  
    }
  }
};

updateDisplay();