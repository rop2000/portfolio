/* global $, localStorage, Shell */
/* ABout 30% of the functions in this file are stolen from a hackernoon tutorial or stackoverflow */

const errors = {
  invalidDirectory: 'Error: not a valid directory',
  noWriteAccess: 'Error: you do not have write access to this directory',
  fileNotFound: 'Error: file not found in current directory',
  fileNotSpecified: 'Error: you did not specify a file name'
}

const struct = {
  rohanparikh: ['about', 'skills', 'title', 'location', 'education']
}

const commands = {}
let systemData = {}
const rootPath = 'users/rohanparikh'

const getDirectory = () => localStorage.directory
const setDirectory = (dir) => { localStorage.directory = dir }

// turn on fullscreen
const registerFullscreenToggle = () => {
  $('.button.green').click(() => {
    $('.terminal-window').toggleClass('fullscreen')
  })
}

// create new directory in current directory
commands.mkdir = commands.Mkdir = () => errors.noWriteAccess

// create new directory in current directory
commands.touch = commands.Touch = () => errors.noWriteAccess

// remove file from current directory
commands.rm = commands.Rm = () => errors.noWriteAccess

// view contents of specified directory
commands.ls = commands.Ls = (directory) => {
  if (directory === '..' || directory === '~') {
    return systemData['rohanparikh']
  }
  return systemData[getDirectory()]
}

// view list of possible commands
commands.help = commands.Help = () => systemData.help

// display current path
commands.path = commands.Path = () => {
  const dir = getDirectory()
  return dir === 'rohanparikh' ? rootPath : `${rootPath}/${dir}`
}

// see command history
commands.history = commands.History = () => {
  let history = localStorage.history
  history = history ? Object.values(JSON.parse(history)) : []
  return `<p>${history.join('<br>')}</p>`
}

// move into specified directory
commands.cd = commands.Cd = (newDirectory) => {
  const currDir = getDirectory()
  const dirs = Object.keys(struct)
  const newDir = newDirectory ? newDirectory.trim() : ''

  if (dirs.includes(newDir) && currDir !== newDir) {  //stolen from hackernoon tutorial ofc
    setDirectory(newDir)
  } else if (newDir === '' || newDir === '~' || (newDir === '..' && dirs.includes(currDir))) {
    setDirectory('rohanparikh')
  } else if (newDir !== '.') {
    return errors.invalidDirectory
  }
  return null
}

// display contents of specified file
commands.cat = commands.Cat = (filename) => {
  if (!filename) return errors.fileNotSpecified

  const dir = getDirectory()
  const fileKey = filename.split('.')[0]

  if (fileKey in systemData && struct[dir].includes(fileKey)) {
    return systemData[fileKey]
  }

  return errors.fileNotFound
}

commands.secs = commands.Secs = () => {
 // window.location.replace("https://www.mypokecard.com/en/Gallery/my/galery/YNNTD7no50AO.jpg");
  //return 'Yes'
  return `<img src="https://www.mypokecard.com/en/Gallery/my/galery/YNNTD7no50AO.jpg" />`
}

commands.colorme = commands.ColorMe = () => {
  var i;
  var bg;
  for(i = 0; i < 100; i++){
    bg = randbg();
    document.getElementById("body").style.background = bg;
    document.getElementById("terminal").style.background = bg;
  }
 /* Times out */
  var tick = function(i) {
    return function() {
        console.log(i);
    }
  };
  setTimeout(tick(i), 1 * i);

}

// initialize cli
$(() => {
  registerFullscreenToggle()
  const cmd = document.getElementById('terminal')
  const terminal = new Shell(cmd, commands)

  $.ajaxSetup({ cache: false })
  $.get('data/system_data.json', (data) => {
    systemData = data
  })
})

// random rgb value 
function randbg(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + r + "," + g + "," + b + ")";
  console.log(bgColor + " is the new background color.");
  return bgColor;
}