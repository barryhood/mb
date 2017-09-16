# McCann Birmingham Technical Test
##### Barry Hood - 16/09/2017
---

This project requires NPM and uses Webpack with hot reloading.

### Installation

From the source directory, do an npm install to set up the project dependencies:

```
npm install
```

### Running the Project on the Dev Server 

Once everything is installed, you should be able to run the project locally with:

```
npm run dev
```

### Building the Production Version

To build the static files, run the following and the files should be created at /dist/

```
npm run build
```

---

## Some notes on the implementation

#### General approach:

* Although the design specified mobile/tablet views not required, it’s often better to build mobile-first so I have attempted to follow that ideology. Since I only had access to desktop creative, I have used some interpretation of how things could look on mobile.
* Since the PSD was a flat image and I had none of the image assets, for expediency’s sake I’ve had to take a few liberties, for instance sourcing some images for the carousel, or using PNGs for some of the icons when normally I would prefer to use SVGs.
* Everything is vanilla JavaScript - using Babel to transpile to allow for ES6 syntax, although I do include a polyfill for scroll behaviour as this is not yet fully supported in all modern browsers.
* Markup uses semantic HTML5 elements (header, footer, main, nav, section, etc) which is good for search and accessibility, while the CSS uses BEM syntax for modularity/scalability, however I’ve been pragmatic about this for speed purposes (e.g. assuming that the social media icons container will contain SVG elements and styling those directly rather than adding classes individually).
* Please excuse text weights/sizes - I’ve included the Roboto/Roboto Slab fonts as per the designs but can’t extract the exact sizes/weights from the PSD as I would usually.
* I haven’t used any kind of grid/layout framework as these components are all very bespoke, this would be something to consider when looking at the site as a whole.

#### Header component and navigation:

* The header is position fixed at the top of the page and as the user scrolls, the background darkens to prevent the links becoming unreadable. 
* The menu icon toggles a slide-in side navigation.
* The search icon, when clicked, expands into a text input field. Functionality is currently pure CSS, while the text field is active (has CSS :focus) the search icon functions as a submit (using a hidden submit and keyframe animation to ensure it’s clickable as the text field loses focus).

#### Main slider/carousel:

* The carousel is created from vanilla JavaScript and uses CSS keyframe animation to handle the sliding transitions (since the JS is essentially just adding an in and out transition class, keyframe animation makes this easy to swap out the slide transition for, say, a fade transition).
* The carousel runs on an infinite right to left scroll unless the user clicks to view a lower numbered slide, in which case direction reverses, and except on mouseenter, when the animation will pause (resuming on mouseleave).
* The JavaScript consists of an ES6 class with a static method which fires for every instance of a carousel on the page (allowing for multiple carousels to exist on the same page, and for the Carousel class to be extended to allow for them to look/behave differently). 
* Elements of the carousel which make sense to be split out into their own components (such as ES6 Templates, to avoid littering the code with HTML syntax, or the scroll functionality, which could potentially be utilised by other components on the page) have been included as imports.
* The images are inline <img> elements using some CSS trickery to emulate background images. My reasoning here is that I’ve built a lot of these and at some point the client almost always wants to add text to the image (for special offers, etc), so semantically img works better (purely decorational images can always have empty alt attributes).
* The images make use of figure/figcaption, again better for semantics.
* I’ve added a keyframe animation to the text to make it stand out a little (obviously a designer could make this look much better but the brief included adding some animation).
* I’m not sure what the exact functionality of the arrow is meant to be, but my assumption is to scroll past the carousel to the next block of content, so this is how I’ve implemented it. It uses scroll behaviour, as this should ensure the best browser-based scroll experience in browsers which support it, while falling back on a JavaScript polyfill implementation for those that don’t.

#### Featured Product & shopping cart:

* Responsive section with add to cart button. The AddToCart Class extends a shopping cart handler class to allow it to call the addProduct method on the super class.
* The shopping cart handler looks for a cart object in localStorage (it could of course do this remotely from a server). It either populates a product array or creates a new array if no existing cart is found.
* Clicking the Add button passes the product details to the super class, which loads the latest cart, pushes the new product, saves the cart and updates the header display with the appropriate number of products in the cart.
* The product details are stored as data- attributes on the add button, but of course they could be stored server side and fetched.
* Since adding products to local storage is instant, I have added some keyframe animation on the Add button to alert the user that some action has taken place on click.

#### Footer:

* The subscription form uses standard HTML5 form validation markup to ensure the email field is marked as required and type=email. This provides styling hooks for error styles if required.
* The form doesn’t actually submit anywhere at the moment, but I’ve added some code to show how we could use the Fetch API to perform a POST request to the server and listen for a success/error, and then update the DOM appropriately, e.g. by hiding the form and showing a thank you message.
* The “More” button to show footer navigation is pure CSS. Obviously it would be trivial to handle this in JavaScript with a classList.toggle, this is an alternative CSS based method using checkbox:checked + sibling element to determine if the links are visible or not (has the benefit of working without JavaScript, although at the cost of being less flexible, so realistically we’d probably just use JS in a real world example, just including it to show a different approach).
* For expediency, the tagline PNG and social media SVG icons in the footer have been rendered inline, but there might be some caching benefit to rolling them into the CSS, since these will be common elements to every page.
