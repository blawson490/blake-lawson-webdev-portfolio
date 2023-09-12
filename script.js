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
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 100, 100);

  const radius = 15;
  ctx.clearRect(0, 0, radius, radius);
  ctx.clearRect(100 - radius, 0, radius, radius);
  ctx.clearRect(0, 100 - radius, radius, radius);
  ctx.clearRect(100 - radius, 100 - radius, radius, radius);

  ctx.fillStyle = "black";
  ctx.font = "300 60px Poppins";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BL", canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

const faviconDataURL = generateFavicon();

function setFavicon(dataURL) {
  let link =
    document.querySelector('link[rel*="icon"]') ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = dataURL;
  document.getElementsByTagName("head")[0].appendChild(link);
}

setFavicon(faviconDataURL);

function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}

function isValidPhone(phone) {
  const pattern = /^(\+1)?\(([2-9]\d{2})\)[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return pattern.test(phone);
}

function formatPhoneNumber(phoneInput) {
  let rawValue = phoneInput.value.replace(/\D/g, "");

  if (rawValue.length === 10) {
    phoneInput.value = `(${rawValue.substring(0, 3)})${rawValue.substring(
      3,
      6
    )}-${rawValue.substring(6)}`;
  } else if (rawValue.length === 11) {
    phoneInput.value = `+${rawValue.charAt(0)}(${rawValue.substring(
      1,
      4
    )})${rawValue.substring(4, 7)}-${rawValue.substring(7)}`;
  } else {
    phoneInput.value = rawValue;
  }
}

function setInvalidField(field, message = "Required") {
  field.style.borderColor = "red";
  field.placeholder = message;
}

function setValidField(field) {
  field.style.borderColor = "green";
}

function validateForm() {
  const submitButton = document.querySelector(".submit-btn");

  let isValid = true;

  const fields = {
    name: document.querySelector("input#name"),
    email: document.querySelector("input#email"),
    phone: document.querySelector("input#phone"),
    subject: document.querySelector("input#subject"),
    message: document.querySelector("textarea#message"),
  };

  if (!fields.name.value.trim()) {
    isValid = false;
  }

  if (!fields.subject.value.trim()) {
    isValid = false;
  }

  if (!fields.message.value.trim()) {
    isValid = false;
  }

  if (!(fields.email.value.trim() || fields.phone.value.trim())) {
    isValid = false;
  } else {
    if (fields.email.value && !isValidEmail(fields.email.value)) {
      isValid = false;
    }
    if (fields.phone.value && !isValidPhone(fields.phone.value)) {
      isValid = false;
    }
  }
  submitButton.disabled = !isValid;
}

function setupValidation() {
  const fields = {
    name: document.querySelector("input#name"),
    email: document.querySelector("input#email"),
    phone: document.querySelector("input#phone"),
    subject: document.querySelector("input#subject"),
    message: document.querySelector("textarea#message"),
  };

  fields.phone.addEventListener("input", function () {
    formatPhoneNumber(fields.phone);
  });

  fields.phone.addEventListener("keypress", function (e) {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });

  fields.name.addEventListener("focusout", function () {
    if (!fields.name.value.trim()) {
      setInvalidField(fields.name);
    } else {
      setValidField(fields.name);
    }
    validateForm();
  });

  fields.phone.addEventListener("focusout", function () {
    if (!fields.phone.value.trim() && !fields.email.value.trim()) {
      setInvalidField(fields.phone, "Email or Phone required");
    } else if (fields.phone.value && !isValidPhone(fields.phone.value)) {
      setInvalidField(fields.phone, "Invalid Phone");
    } else {
      setValidField(fields.phone);
      fields.email.placeholder = "Phone Valid";
    }
    validateForm();
  });

  fields.email.addEventListener("focusout", function () {
    if (!fields.email.value.trim() && !fields.phone.value.trim()) {
      setInvalidField(fields.email, "Phone or Email required");
    } else if (fields.email.value && !isValidEmail(fields.email.value)) {
      setInvalidField(fields.email, "Invalid Email");
    } else {
      setValidField(fields.email);
      fields.phone.placeholder = "Email Valid";
    }
    validateForm();
  });

  fields.subject.addEventListener("focusout", function () {
    if (!fields.subject.value.trim()) {
      setInvalidField(fields.subject);
    } else {
      setValidField(fields.subject);
    }
    validateForm();
  });

  fields.message.addEventListener("focusout", function () {
    if (!fields.message.value.trim()) {
      setInvalidField(fields.message);
    } else {
      setValidField(fields.message);
    }
    validateForm();
  });
}

setupValidation();
