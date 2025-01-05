Features:
Product Listing: Displays a grid of products with images, names, ratings, and prices.
Cart Management: Allows users to add products to the cart, update quantities, and remove items.
Order Summary: Shows a summary of the items in the cart, including delivery options and prices.
Checkout Process: Provides a detailed view of the order and allows users to place an order.
Getting Started





Prerequisites
A web browser (e.g., Chrome, Firefox)
Internet connection




Running the Project
Clone the repository:
git clone https://github.com/AAKASHEE/JS_AMAZON.git
Open the amazon.html file in your web browser to view the product listing page.





File Descriptions:
amazon.html: The main page displaying the product grid.
checkout.html: The checkout page showing the order summary and payment options.
tracking.html: The tracking page for viewing order status.
data/: Contains JavaScript files for managing cart, products, orders, and delivery options.
scripts/: Contains JavaScript files for rendering the product grid, order summary, and payment summary.
styles/: Contains CSS files for styling the pages.
tests/: Contains test files for unit testing the application.
Key JavaScript Files
scripts/amazon.js: Renders the product grid and handles cart interactions.
scripts/checkout/orderSummary.js: Renders the order summary on the checkout page.
scripts/checkout/paymentSummary.js: Renders the payment summary and handles order placement.
data/cart.js: Manages cart operations such as adding, removing, and updating items.
data/products.js: Manages product data and loading products from the backend.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.


License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Day.js for date manipulation
Jasmine for testing framework
Feel free to customize this README file as per your project's requirements.


Here is the project Structure:

javascript-amazon-project/
├── .DS_Store
├── .js
├── amazon.html
├── backend/
│   ├── products.json
├── checkout.html
├── data/
│   ├── backend-practise.js
│   ├── cart-class.js
│   ├── cart.js
│   ├── cart.OOP.js
│   ├── delivery_options.js
│   ├── orders.js
│   ├── products.js
├── images/
│   ├── icons/
│   ├── products/
│   │   ├── variations/
│   ├── ratings/
├── orders.html
├── scripts/
│   ├── amazon.js
│   ├── checkout/
│   ├── checkout.js
│   ├── utils/
│   │   ├── money.js
├── styles/
│   ├── pages/
│   ├── shared/
├── tests/
│   ├── checkout/
│   ├── data/
│   ├── lib/
│   ├── MIT.LICENSE
│   ├── tests-simple/
│   ├── tests.html
│   ├── utils/
├── tracking.html