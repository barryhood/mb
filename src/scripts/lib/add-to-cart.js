// extends cart handler to create an add to cart button event which calls our update add product method in the super class
import Cart from './cart-handler';
class AddToCart extends Cart {
  constructor(props) {
    super(props);
    this.btns = document.querySelectorAll('[data-product-add]');
    this.adding = false;
    this.createAddProductEvents();
  }

  createAddProductEvents() {
    const btns = Array.from(this.btns);
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // use attributes method to grab all element's attributes and run them through a method to return just the relevant ones
        // (just so we don't end up storing class names etc against our product)
        const attr = this.cleanAttributes(btn.attributes);
        if(this.adding === true) return;
        this.adding = true;
        this.animBtn(btn);
        this.addProduct(attr);
      });
    });
  }

  // adding some animation styling to the add button to make it obvious to the user that something happened on click
  animBtn(btn) {
    const _this = this;
    const btnCopy = btn.cloneNode(true);
    btnCopy.classList.add('add-to-cart-button-clone');
    btn.insertAdjacentElement('beforebegin', btnCopy);
    const transHandler = function() {
      btnCopy.removeEventListener('animationend', transHandler, true );
      btnCopy.parentNode.removeChild(btnCopy);
      _this.adding = false;
    };
    btnCopy.addEventListener('animationend', transHandler, true );
  }

  // accepts a NamedNodeMap of element attributes, extract the values we need and return
  cleanAttributes(attributes) {
    let arr = [];
    attributes = Array.from(attributes);
    attributes.forEach((attribute) => {
      arr[attribute.name] = attribute.value ? attribute.value : '';
    });
    const { "data-product-name": name, "data-product-id": id, "data-product-price": price } = arr;
    return { name, id, price }; // destructure values and cast as an array to be added into products
  }
}

const cart = new AddToCart();
