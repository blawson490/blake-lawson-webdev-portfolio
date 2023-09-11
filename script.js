function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const typeStrings = [
  "Web Developer",
  "Mobile Developer",
  "Application Developer",
  "Student",
  "Tutor",
  "Teacher",
];
let stringIndex = 0; 
let charIndex = 0; 

function type() {
  if (charIndex < typeStrings[stringIndex].length) {
    document.getElementById("typed-output").innerText +=
      typeStrings[stringIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1600); 
  }
}

function erase() {
  if (charIndex > 0) {
    let text = document.getElementById("typed-output").innerText;
    document.getElementById("typed-output").innerText = text.substr(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, 100);
  } else {
    stringIndex++;
    if (stringIndex >= typeStrings.length) {
      stringIndex = 0; 
    }
    setTimeout(type, 1600); 
  }
}

window.onload = type;


function generateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 100; 
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 100, 100);

    const radius = 15;
    ctx.clearRect(0, 0, radius, radius);
    ctx.clearRect(100 - radius, 0, radius, radius);
    ctx.clearRect(0, 100 - radius, radius, radius);
    ctx.clearRect(100 - radius, 100 - radius, radius, radius);

    ctx.fillStyle = 'black';
    ctx.font = '300 60px Poppins'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BL', canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL(); 
}

const faviconDataURL = generateFavicon();


function setFavicon(dataURL) {
    let link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = dataURL;
    document.getElementsByTagName('head')[0].appendChild(link);
}

setFavicon(faviconDataURL);
