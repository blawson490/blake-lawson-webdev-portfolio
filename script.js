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
let stringIndex = 0; // Index to track which string to type out
let charIndex = 0; // Index to track character position within the string

function type() {
  // If still typing out the string
  if (charIndex < typeStrings[stringIndex].length) {
    document.getElementById("typed-output").innerText +=
      typeStrings[stringIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  }
  // If current string is fully typed out
  else {
    setTimeout(erase, 1600); // Begin erasing after a pause
  }
}

function erase() {
  if (charIndex > 0) {
    // Remove the last character from the output
    let text = document.getElementById("typed-output").innerText;
    document.getElementById("typed-output").innerText = text.substr(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, 100);
  }
  // If string is fully erased
  else {
    // Move to next string
    stringIndex++;
    if (stringIndex >= typeStrings.length) {
      stringIndex = 0; // Loop back to the first string
    }
    setTimeout(type, 1600); // Start typing after a pause
  }
}

// Start the typing effect once the page is loaded
window.onload = type;


function generateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 100; // You can adjust the resolution. This is 100x100 for clarity.
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 100, 100);

    // Rounded corners
    const radius = 15; // Adjust the corner radius as needed
    ctx.clearRect(0, 0, radius, radius);
    ctx.clearRect(100 - radius, 0, radius, radius);
    ctx.clearRect(0, 100 - radius, radius, radius);
    ctx.clearRect(100 - radius, 100 - radius, radius, radius);

    // Text overlay
    ctx.fillStyle = 'black';
    ctx.font = '300 60px Poppins'; // Adjust font size and family as needed
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BL', canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL(); // Convert canvas to data URL
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
