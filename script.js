// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const mobileThemeToggle = document.getElementById("mobileThemeToggle")
const body = document.body

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark"
if (currentTheme === "light") {
  body.classList.add("light")
}

function toggleTheme() {
  body.classList.toggle("light")
  const theme = body.classList.contains("light") ? "light" : "dark"
  localStorage.setItem("theme", theme)
}

themeToggle.addEventListener("click", toggleTheme)
mobileThemeToggle.addEventListener("click", toggleTheme)

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a")
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
})

//document.addEventListener("click", (e) => {
 // if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
  //  menu.classList.remove("active");
 // }
//});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form submission handler
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your message! We will get back to you soon.")
    contactForm.reset()
  })
}

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

// Next
document.querySelector(".next").onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

// Prev
document.querySelector(".prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

// Auto slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 3000);


let menu = document.getElementById("mobileMenu");
let overlay = document.getElementById("overlay");

// Open menu
document.getElementById("menuBtn").onclick = () => {
  menu.classList.add("active");
  overlay.classList.add("active");
};

// Close when clicking outside
overlay.onclick = () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
};