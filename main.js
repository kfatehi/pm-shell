'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const Menu = electron.Menu;
const shell = electron.shell;
const name = electron.app.getName();
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('before-quit', function() {
  BrowserWindow.getAllWindows().forEach((win) => {
    win.destroy();
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  // Create the Application's main menu
  let template = [{
    label: "File",
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          app.quit();
        }
      },
    ]
  },{
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  },{
    label: 'View',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.reload();
      }
    },{
      label: 'Toggle Full Screen',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Ctrl+Command+F';
        else
          return 'F11';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    },{
      label: 'Toggle Developer Tools',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Alt+Command+I';
        else
          return 'Ctrl+Shift+I';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools();
          focusedWindow.send('toggle-webview-inspector');
        }
      }
    }]
  },{
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },{
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }]
  },{
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'Github Repository',
      click: function() { shell.openExternal('https://github.com/Calit2-UCI/pm-shell') }
    },{
      label: 'Report Issues',
      click: function() { shell.openExternal('https://github.com/Calit2-UCI/pm-shell/issues') }
    }]
  }];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
