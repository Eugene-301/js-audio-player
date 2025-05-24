

import { contextBridge, ipcRenderer } from ('electron')

console.log("preload script loaded");


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})