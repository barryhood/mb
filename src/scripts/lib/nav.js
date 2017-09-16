// nav class to handle header/navigation related events (open/close menu, changing colour on scroll)
class Nav { 
  constructor() {
    this.scrollDown();
    this.headerBelowTop();
    this.burger();
  }


  scrollDown() {
    window.addEventListener('scroll', (e) => this.headerBelowTop());
  }


  headerBelowTop() {
    window.pageYOffset > 20 ? document.querySelector('.header').classList.add('header--dark') : document.querySelector('.header').classList.remove('header--dark');
  }


  burger() {
    const elems = ['[data-menu]', '[data-menu-close]'];
    elems.forEach((el) => {
      document.querySelector(el).addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('html').classList.toggle('nav--open');
      });
    });
  }

}

const nav = new Nav();
