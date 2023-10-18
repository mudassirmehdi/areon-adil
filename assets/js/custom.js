
// ScrollTrigger.create({
//     trigger: ".hero__body",
//     pin: ".pin",
//     start: 'top top',
//     end: 'bottom bottom',
//     markers: false,
//     onToggle: self => {
//         const scalePinBg = self.isActive ? 1 : 1.2;
//         gsap.to(".pin__bg", { scale: scalePinBg, duration: 1 });
//     }
//   });
  
//   let heroSlides = gsap.utils.toArray(".hero__body--content .single");
//   document.documentElement.style.setProperty('--hero_body_height', `${(heroSlides.length + 1) * 100}vh`);
//   gsap.set(heroSlides, { yPercent: 100, opacity: 0})
  
//   heroSlides.forEach((heroSlide, i) => {
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".hero__body",
//         start: () => `top+=${i * window.innerHeight} top`,
//         end: () => `top+=${(i + 1) * window.innerHeight} top`,
//         markers: false,
//         scrub: true,
//       }
//     });

//     heroSlide.style.top = `calc(50% - ${heroSlide.clientHeight / 2}px)`
    
//     tl.to(heroSlide, { yPercent: 0, opacity: 1, ease: "none"})
//     .to(heroSlide, { yPercent: -100, opacity: 0, ease: "none"}, "+=1")
//   });
  
function initSlider() {
  let heroSlides = gsap.utils.toArray(".hero__body--content .single");
  let totalSlides = heroSlides.length;
  let slideWidth = heroSlides[0].offsetWidth;

  if (window.innerWidth <= 767) {
      // Horizontal Slider for screens below 767px
      let currentSlide = 0;

      // Function to update the current slide and animate to it
      function updateCurrentSlide(newIndex) {
          currentSlide = newIndex;
          gsap.to(".hero__body--content", { x: -currentSlide * slideWidth, duration: 0.5 });
      }

      // Initialize the horizontal slider
      let sliderInitialized = false;

      // Event listener for swipe left (next slide)
      document.addEventListener('swipeleft', function () {
          if (currentSlide < totalSlides - 1) {
              updateCurrentSlide(currentSlide + 1);
          }
      });

      // Event listener for swipe right (previous slide)
      document.addEventListener('swiperight', function () {
          if (currentSlide > 0) {
              updateCurrentSlide(currentSlide - 1);
          }
      });

      // Reinitialize the slider when the window is resized
      window.addEventListener('resize', function () {
          if (window.innerWidth <= 767 && !sliderInitialized) {
              updateCurrentSlide(0);
              sliderInitialized = true;
          } else if (window.innerWidth > 767) {
              sliderInitialized = false;
          }
      });
  } else {
      // Vertical Slider for screens above 767px
      ScrollTrigger.create({
          trigger: ".hero__body",
          pin: ".pin",
          start: 'top top',
          end: 'bottom bottom',
          markers: false,
          onToggle: self => {
              const scalePinBg = self.isActive ? 1 : 1.2;
              gsap.to(".pin__bg", { scale: scalePinBg, duration: 1 });
          }
      });

      document.documentElement.style.setProperty('--hero_body_height', `${(totalSlides + 1) * 100}vh`);
      gsap.set(heroSlides, { yPercent: 100, opacity: 0 });

      heroSlides.forEach((heroSlide, i) => {
          let tl = gsap.timeline({
              scrollTrigger: {
                  trigger: ".hero__body",
                  start: () => `top+=${i * window.innerHeight} top`,
                  end: () => `top+=${(i + 1) * window.innerHeight} top`,
                  markers: false,
                  scrub: true,
              }
          });

          heroSlide.style.top = `calc(50% - ${heroSlide.clientHeight / 2}px)`;

          tl.to(heroSlide, { yPercent: 0, opacity: 1, ease: "none" })
              .to(heroSlide, { yPercent: -100, opacity: 0, ease: "none" }, "+=1");
      });
  }
}

// Initialize the slider when the page loads
window.addEventListener('load', initSlider);