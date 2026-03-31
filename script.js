// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const mobileThemeToggle = document.getElementById("mobileThemeToggle")
const body = document.body

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark"
if (currentTheme === "light") {
  body.classList.add("light")
}

/*
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  if (savedTheme === "light") body.classList.add("light");
} else {
  if (!systemPrefersDark.matches) body.classList.add("light");
}*/

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

/*let slides = document.querySelectorAll(".slide");
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
}, 3000); */



document.querySelectorAll(".slider").forEach(slider => {
  let slides = slider.querySelectorAll(".slide");
  let nextBtn = slider.querySelector(".next");
  let prevBtn = slider.querySelector(".prev");

  let index = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === i);
    });
  }

  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };

  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };

  // Auto slide
  let auto = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 3000);

  // Swipe
  let startX = 0, endX = 0;

  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    endX = startX;
    clearInterval(auto);
  });

  slider.addEventListener("touchmove", e => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        index = (index + 1) % slides.length;
      } else {
        index = (index - 1 + slides.length) % slides.length;
      }
      showSlide(index);
    }
  });

  showSlide(index);
});


/* Image Viewer Functionality */
const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImg");
const closeViewer = document.getElementById("closeViewer");

let scale = 1;
let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;

// OPEN viewer when ANY slider image is clicked
document.querySelectorAll(".slider img").forEach(img => {
  img.addEventListener("click", () => {
    viewer.classList.remove("hidden");
    viewerImg.src = img.src;

    // reset zoom each time
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  });
});

// CLOSE viewer
function close() {
  viewer.classList.add("hidden");
  viewerImg.src = "";
}

closeViewer.addEventListener("click", close);
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) close();
});

// ZOOM (mouse wheel)
viewer.addEventListener("wheel", (e) => {
  e.preventDefault();

  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 4); // clamp zoom 1x–4x

  updateTransform();
});

// DRAG to pan
viewerImg.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  viewerImg.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  viewerImg.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;

  updateTransform();
});

// apply zoom + pan
function updateTransform() {
  viewerImg.style.transform =
    `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}