// Even though the design only has this scroll behaviour on the carousel, this looks like a function that 
// might be useful in multiple places, so splitting it out from the carousel to allow re-use makes sense
export function scroller(el) {
    // get page position of passed element and smooth scroll to it (uses scroll behaviour polyfill)
    // note since we want to scroll past the element, we need to factor in height and also deduct the header height
    const rect = el.getBoundingClientRect();
    const top = (rect.top + window.pageYOffset + rect.height) - document.querySelector('.header').getBoundingClientRect().height;
    window.scroll({
      top: top, 
      left: 0, 
      behavior: 'smooth'
    }); 
};

