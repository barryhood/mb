// extends cart handler to create an add to cart button event which calls our update add product method in the super class
import Cart from './cart-handler';
class AddToCart extends Cart {
  constructor(props) {
    super(props);
    this.btns = document.querySelectorAll('[data-product-add]');
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
        this.addProduct(attr);
      });
    });
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
