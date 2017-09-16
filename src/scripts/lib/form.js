class Form {
  constructor() {
    this.form = document.querySelector('.form');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      // example of sending our form data with fetch API using post request - we could look for a success/fail
      // response and use this to modify the page accordingly (showing a thank you or error message)
      fetch('/', {
        method: 'post',
        body: new FormData(this.form)
      }).then(function (data) {
        console.log('Request details:', data);  
      })
      .catch(function (error) {  
        console.log('Request error:', error);  
      });
    });
  }
}
const form = new Form();
