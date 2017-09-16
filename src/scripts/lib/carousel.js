import { carouselNav } from '../templates/carousel-nav';
import { scroller } from './scroller';

class Carousel { 
  constructor(e) {
    // first we'll set up all the properties/elements we'll need
    this.carousel = e;
    this.carousel.classList.add('carousel--js');
    this.slides = this.carousel.querySelectorAll('[data-carousel-slide]');
    this.btns;
    this.btnsArr;
    this.slidesNum = this.slides.length;
    this.timer = null; // container for our interval
    this.delay = 5000; // time between transitions
    this.isAnimating = false;
    this.currentSlide = this.slides[0];
    this.nextSlide = this.slides[1];
    this.inc = 0;
    this.className = {
      current: 'carousel__slide--current',
      slideout: 'carousel__slide--slide-out',
      slidein: 'carousel__slide--slide-in',
      btnactive: 'carousel__nav-item--active'
    };
    this.init();
  }


  init() {
    if (this.slidesNum === 0) {
      // Currently assuming we will always have some slides, but given more time it would be sensible to have some error handling here
    }
    this.createButtons();
    this.carouselEvents();
    this.setCurrentSlide(this.slides[0]);
    this.startTimer();
  }


  createButtons() {
    if(this.carousel.querySelectorAll('.carousel__nav-wrapper').length !== 0) return;
    // create an array from our nodeList so that we can use map to iterate through it in our template literal to avoid doing NodeList.prototype.forEach
    const arr = Array.from(this.slides); 
    const btnHtml = carouselNav(arr);

    this.carousel.insertAdjacentHTML('beforeend', btnHtml);
    this.btns = this.carousel.querySelectorAll('.carousel__nav-item');
    this.btnsArr = Array.from(this.btns);

    this.btnsArr.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if(this.isAnimating === true) return;
        this.pauseTimer();
        this.setNextSlide(this.slides[btn.getAttribute('data-slide')]);
        this.transitionSlides();
      });
    });
    this.btns[0].classList.add(this.className.btnactive);
    this.carousel.querySelector('[data-carousel-scroll]').addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollPast();
    });
  }


  scrollPast() {
    scroller(this.carousel);
  }


  carouselEvents() {
    this.carousel.addEventListener('mouseenter', (e) => {
      this.pauseTimer();
    });
    this.carousel.addEventListener('mouseleave', (e) => {
      this.startTimer();
    });
  }


  startTimer() {
    const _this = this;
    this.pauseTimer();
    this.timer = setInterval(function() {
      _this.pauseTimer();
      _this.transitionSlides();
    }, this.delay);
  }


  // method to pause timer, used on e.g. mouseenter event
  pauseTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }


  // bind animation end listener, once animation ends, unbind and do some cleanup
  transitionSlides() {
    const _this = this;
    if(this.isAnimating === true) return;
    this.btnsArr.forEach((btn, i) => {
      if(this.nextSlide === this.slides[i]) {
        btn.classList.add(this.className.btnactive);
      } else {
        btn.classList.remove(this.className.btnactive);
      }
    });
    this.setAsAnimating();
    this.currentSlide.classList.add('carousel__slide--slide-out');
    this.nextSlide.classList.add('carousel__slide--slide-in');
    const transHandler = function() {
      _this.nextSlide.removeEventListener('animationend', transHandler, true );
      _this.setCurrentSlide(_this.nextSlide);
      _this.setNextSlide();
      _this.slideCleanup();
      _this.startTimer();
      _this.unSetAsAnimating();
    };
    this.nextSlide.addEventListener('animationend', transHandler, true );
  }


  setNextSlide(el = null) {
    if(el !== null) {
      this.nextSlide  = el;
    } else {
      // ideally if the user clicks the button control for a previous slide it would be nice to have a left to right animation
      // rather than right to left - with a little more time here is where we'd handle the logic for that and perhaps set a property
      // on Carousel to determine direction of animation
      this.nextSlide = this.currentSlide.nextElementSibling !== null ? this.currentSlide.nextElementSibling : this.slides[0];
    }
  }


  setCurrentSlide(el) {
    const prev = this.carousel.querySelector('.' + this.className.current);
    if(prev !== null) {
      prev.classList.remove(this.className.current);
    }
    this.currentSlide = el;
    this.currentSlide.classList.add(this.className.current);
  }


  setAsAnimating() {
    this.isAnimating = true;
  }


  unSetAsAnimating() {
    this.isAnimating = false;
  }


  slideCleanup() {
    const r = [this.className.slideout, this.className.slidein];
    const slides = Array.from(this.slides);
    slides.forEach((slide) => {
      r.forEach((c) => slide.classList.remove(c));
    });
  }

  static create(e) {
    return new Carousel(e);
  }

}

// loop through all of our carousels and call the create static method on our Carousel class
// Using a data-attribute selector to de-couple styling rules from functionality as we may want 
// this functionality on other elements in the future
const carousels = Array.from(document.querySelectorAll('[data-carousel]'));
carousels.forEach((e) => Carousel.create(e));
