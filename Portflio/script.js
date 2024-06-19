gsap.registerPlugin(ScrollTrigger);

// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // Creating Two spans
    let parent = document.createElement("span");
    let child = document.createElement("span");

    // Set classes to parent and child
    parent.classList.add("parent");
    child.classList.add("child");

    // span parent get child and child gets elem detail

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // elem replace its value with parent span

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function valueSetters() {
  // By default it on down
  gsap.set("#nav a", {
    y: "100%",
    opacity: 0,
  });
}

// adding loader animation 
function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader .child span", {
    x: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    // delay: 2,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      delay: 1,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#white", {
      height: "100%",
      top: 0,
      duration: 0.5,
      delay: -1.3,
      ease: Circ.easeInOut,
    })
    .to("#white", {
      height: "0%",
      duration: 0.6,
      delay: -0.4,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 0.5,
      delay: -1.3,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      duration: 0.1,
      delay: -0.3,
      ease: Circ.easeInOut,
      //! when the loaderanimation is complete then the Home page animation is going to start
      onComplete: function () {
        animateHomePage();
        scrollTriggerAnimation();
      },
    });
}

function animateHomePage() {
  var tl = gsap.timeline();

  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  });
  // .to("#home .parent .child", {
  //   y: 0,
  //   stagger: 0.1,
  //   duration: 1.5,
  //   ease: Expo.easeInOut,

  // })
}

function scrollTriggerAnimation() {
  var tl = gsap.timeline();

  tl.from("#home #imagery .img-lef", {
    y: 40,
    opacity: 1,
    duration: 3,
  });
  gsap.from("#page2 #about", {
    y: 50,
    opacity: 0,
    duration: 3,
    stagger: 0.4,
    scrollTrigger: {
      trigger: "#about",
      scroller: "#main",
      // markers: true,
      start: "top 70%",
      end: "top 65%",
      scrub: 2,
    },
  });
  gsap.from("#page2 #skills .icon-skill img", {
    y: 50,
    opacity: 0,
    duration: 3,
    stagger: 0.4,
    scrollTrigger: {
      trigger: "#about",
      scroller: "#main",
      // markers: true,
      start: "top 28%",
      end: "top 25%",
      scrub: 2,
    },
  });
}

//!  Setup and start animation!
function typedAnimation() {
  var typed = new Typed("#element", {
    strings: ["Front-End Developer", "Web Designer", "Software Developer"],
    typeSpeed: 50,
    loop: true,
    loopDelay: 2000,
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const humburger = document.querySelector(".humburger");
  const navBar = document.querySelector(".nav-bar");

  const close = document.querySelector(".close");

  humburger.addEventListener("click", () => {
    navBar.style.width = "220px";
  });
  close.addEventListener("click", () => {
    navBar.style.width = "0";
  });
});

revealToSpan();
valueSetters();
loaderAnimation();
typedAnimation();
