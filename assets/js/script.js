let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");
var video = document.getElementById("myVideo");
let index = 0,
  interval = 1000;
var loader = document.getElementById("preloader");
var logo = document.getElementById("logo");
setTimeout(function () {
  loader.style.opacity = 0;
  loader.style.visibility = "hidden";
  logo.style.transform = "translate(-50%, -70%) scale(2.5)";
  logo.style.transformOrigin = "center center";
  document.getElementById("content").style.opacity = 1;
}, 3600);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};
for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3));
}
video.addEventListener(
  "ended",
  function () {
    video.currentTime = 0;
  },
  false
);

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50);
});

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};
window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navlist.classList.remove("open");
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(form)) return;
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxo_nH03IZ7xzim-Rw3XpD6sw-WF1J1-db-DOmhclpC8HaqgJ3VWrvzbtnHtsDMfbRFYQ/exec";
  const gform = document.forms["submit-to-google-sheet"];
  alert("Message sent successfuly");
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxo_nH03IZ7xzim-Rw3XpD6sw-WF1J1-db-DOmhclpC8HaqgJ3VWrvzbtnHtsDMfbRFYQ/exec";
const gform = document.forms["submit-to-google-sheet"];
gform.addEventListener("submit", (ex) => {
  ex.preventDefault();
  if (!validateForm(form)) return;
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(gform),
  })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});

const validateForm = (form) => {
  let valid = true;
  let name = form.querySelector(".name");
  let message = form.querySelector(".message");
  let email = form.querySelector(".email");
  if (name.value === "") {
    giveError(name, "Please enter your name");
    valid = false;
  }
  if (message.value === "") {
    giveError(message, "Please enter a message");
    valid = false;
  }
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValue = email.value;
  if (!emailRegex.test(emailValue)) {
    giveError(email, "Please enter a valid email");
    valid = false;
  }
  if (valid) {
    return true;
  }
};
const giveError = (field, message) => {
  let parentElement = field.parentElement;
  parentElement.classList.add("error");
  let existingError = parentElement.querySelector(".err-msg");
  if (existingError) {
    existingError.remove();
  }
  let error = document.createElement("span");
  error.textContent = message;
  error.classList.add("err-msg");
  parentElement.appendChild(error);
};
const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");
let allFields = [...inputs, ...textareas];
allFields.forEach((field) => {
  field.addEventListener("input", () => {
    removeError(field);
  });
});
const removeError = (field) => {
  let parentElement = field.parentElement;
  parentElement.classList.remove("error");
  let error = parentElement.querySelector(".err-msg");
  if (error) {
    error.remove();
  }
};

const items = document.querySelectorAll("#timeline li");
const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWhith || document.documentElement.clientWidth)
  );
};
const run = () =>
  items.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add("show");
    }
  });

window.addEventListener("load", run);
window.addEventListener("resize", run);
window.addEventListener("scroll", run);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    }
  });
});
const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((e1) => observer.observe(e1));
const scrollTop1 = document.querySelectorAll(".scroll-top-1");
scrollTop1.forEach((e1) => observer.observe(e1));
/////////////////////////////////////////////////////////////////////////////////////////////////
let currentDate = new Date();
let end = new Date("12/23/2023 09:00:00");
let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;
let timer;

let y = new Date();
let x = end - y;

function update() {
  let now = new Date();
  let distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("welcome").style.display = "flex";
    return;
  }

  let days = Math.floor(distance / _day);
  let hours = Math.floor((distance % _day) / _hour);
  let minutes = Math.floor((distance % _hour) / _minute);
  let seconds = Math.floor((distance % _minute) / _second);

  document.getElementById("day").innerHTML = addZero(days);
  document.getElementById("hour").innerHTML = addZero(hours);
  document.getElementById("minute").innerHTML = addZero(minutes);
  document.getElementsByClassName("second")[0].innerHTML = addZero(seconds);
  document.getElementsByClassName("second")[1].innerHTML = addZero(seconds);
}

const addZero = (number) => String(number).padStart(2, "0");

if (x > 0) {
  timer = setInterval(function () {
    update();
  }, 1000);
} else {
  document.getElementById("timer-container").style.display = "none";
}

document.querySelector(".welcome-X").addEventListener("click", function () {
  document.getElementById("welcome").style.display = "none";
});
///////////////////////////////////////////////////////////////////////////////////////////

(function () {
  var COLORS,
    Confetti,
    NUM_CONFETTI,
    PI_2,
    canvas,
    confetti,
    context,
    drawRectangle,
    i,
    range,
    resizeWindow,
    xpos;

  NUM_CONFETTI = 200;

  COLORS = [
    [255, 0, 0],
    [255, 192, 203],
    [255, 255, 0],
    [0, 255, 0],
    [255, 165, 0],
  ];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("confetti");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function () {
    window.w = canvas.width = window.innerWidth;
    return (window.h = canvas.height = window.innerHeight);
  };

  window.addEventListener("resize", resizeWindow, false);

  window.onload = function () {
    return setTimeout(resizeWindow, 0);
  };

  range = function (a, b) {
    return (b - a) * Math.random() + a;
  };

  drawRectangle = function (x, y, width, height, style) {
    context.fillStyle = style;
    return context.fillRect(x, y, width, height);
  };

  xpos = 0.5;

  document.onmousemove = function (e) {
    return (xpos = e.pageX / w);
  };

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  Confetti = (function () {
    function Confetti() {
      this.style = COLORS[~~range(0, COLORS.length)];
      this.rgb =
        "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.width = ~~range(10, 13); // Change the width of the rectangle
      this.height = this.width * 0.9; // Change the height of the rectangle (adjust the aspect ratio as you like)
      this.replace();
    }

    Confetti.prototype.replace = function () {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.width, w - this.width);
      this.y = range(-20, h - this.height);
      this.xmax = w - this.width;
      this.ymax = h - this.height;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return (this.vy = 0.7 * this.width + range(-1, 1));
    };

    Confetti.prototype.draw = function () {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!(0 < (ref = this.x) && ref < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawRectangle(
        ~~this.x,
        ~~this.y,
        this.width,
        this.height,
        this.rgb + "," + this.opacity + ")"
      );
    };

    return Confetti;
  })();

  confetti = (function () {
    var j, ref, results;
    results = [];
    for (
      i = j = 1, ref = NUM_CONFETTI;
      1 <= ref ? j <= ref : j >= ref;
      i = 1 <= ref ? ++j : --j
    ) {
      results.push(new Confetti());
    }
    return results;
  })();

  window.step = function () {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();
})();
//////////////////////////////////////////////////////////////////////////////////////////////
function lazyLoadBackgroundImage(entries, xxx) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const modContainer = entry.target;
      modContainer.style.backgroundImage =
        "url(https://i.postimg.cc/RF8hMGpr/Capture-1.webp)";
      xxx.unobserve(modContainer);
    }
  });
}

// Using Intersection Observer to trigger the lazy loading function
const modContainer = document.getElementById("mod-container");
const xxx = new IntersectionObserver(lazyLoadBackgroundImage, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});
xxx.observe(modContainer);
