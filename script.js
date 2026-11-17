// ===========================================================
//  Aurum Noir Salon (demo) - shared by all 5 pages
//  CHANGE THIS: salon WhatsApp number (country code + number, no + or spaces)
// ===========================================================
var WHATSAPP_NUMBER = "919876543210";

// ---------- WhatsApp float button ----------
var waFloat = document.getElementById("waFloat");
if (waFloat) {
  waFloat.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" +
    encodeURIComponent("Hello Aurum Noir Salon! I would like to know more.");
}

// ---------- Mobile menu ----------
var burger = document.getElementById("burger");
var menu = document.getElementById("menu");
if (burger && menu) {
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- Scroll reveal ----------
var revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add("show"); });
}

// ---------- 3D tilt on cards (desktop only) ----------
document.querySelectorAll(".tilt").forEach(function (el) {
  el.addEventListener("mousemove", function (e) {
    var r = el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = "perspective(900px) rotateX(" + (-y * 8).toFixed(2) +
      "deg) rotateY(" + (x * 8).toFixed(2) + "deg) translateY(-6px)";
  });
  el.addEventListener("mouseleave", function () {
    el.style.transform = "";
  });
});

// ---------- Footer year ----------
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Booking form -> WhatsApp (contact page only) ----------
var form = document.getElementById("bookForm");
if (form) {
  var msg = document.getElementById("formMsg");
  var serviceSel = document.getElementById("service");
  var dateInput = document.getElementById("date");

  // pre-select the plan chosen on the Packages page
  var plan = new URLSearchParams(window.location.search).get("plan");
  if (plan && serviceSel) {
    for (var i = 0; i < serviceSel.options.length; i++) {
      if (serviceSel.options[i].value === plan) {
        serviceSel.value = plan;
      }
    }
  }

  // no past dates
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ids = ["name", "phone", "service", "date", "time"];
    var values = {};
    var ok = true;

    ids.forEach(function (id) {
      var field = document.getElementById(id);
      var v = field.value.trim();
      values[id] = v;
      var bad = v === "";
      field.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });

    if (!ok) {
      msg.textContent = "Please fill in all the fields.";
      return;
    }

    var digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      document.getElementById("phone").classList.add("invalid");
      msg.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }
    msg.textContent = "";

    var text =
      "Hello Aurum Noir Salon! I would like to book an appointment.\n\n" +
      "Name: " + values.name + "\n" +
      "Phone: " + digits + "\n" +
      "Service: " + values.service + "\n" +
      "Date: " + values.date + "\n" +
      "Time: " + values.time;

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
    form.reset();
  });
        }
