const { app, BrowserWindow } = require('electron')

const createWindow = () =>{
    const win = new BrowserWindow()
    win.loadFile('public/index.html')
}
app.on('ready', ()=>{
    createWindow()

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length == 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin') {
        app.quit()
    }
})