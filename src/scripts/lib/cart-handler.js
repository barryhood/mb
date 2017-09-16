// example cart handler to save/load our shopping cart - since we're not using a db it will
// just write to local storage to enable cart to be retained
export default class {
  constructor() {
    this.product = [];
    this.display = document.querySelector('[data-cart]');
    this.initCart();
  }

  initCart() {
    // either loads existing cart from local storage or creates new cart and 
    this.loadCart();
    this.saveCart();
    this.updateCartDisplay();
  }

  saveCart() {
    // write our cart to somewhere - since we have no db we'll use local storage
    localStorage.setItem('cart', JSON.stringify(this.product));
  }

  loadCart() {
    // populate our product from storage or create new product array if none exists
    const p = localStorage.getItem('cart');
    this.product = p !== null ? Array.from(JSON.parse(p)) : [];
  }

  updateCartDisplay() {
    this.display.textContent = this.product.length;
  }

  addProduct(product) {
    this.loadCart();
    this.product.push(product);
    this.saveCart();
    this.updateCartDisplay();
  }

}
