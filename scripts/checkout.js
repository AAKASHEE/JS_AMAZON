import { cart, RemovefromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/delivery_options.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the matching product
    const matchingProduct = products.find(product => product.id === productId);

    // Find the selected delivery option or default to free shipping
    const deliveryOptionId = cartItem.deliveryOptionId;
    const selectedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions.find(option => option.priceCents === 0);

    // Calculate the delivery date for the selected option
    const today = dayjs();
    const deliveryDate = selectedDeliveryOption
        ? today.add(selectedDeliveryOption.delivery_days, 'days')
        : today;
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Build cart item HTML
    cartSummaryHTML += `
        <div class="cart-item-container js_cart_item_container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: <span class="js_delivery_date">${dateString}</span>
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">Update</span>
                        <span class="delete-quantity-link link-primary js_delete_link" data-product-id="${matchingProduct.id}">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `;

    // Function to generate delivery options HTML
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((option) => {
            const deliveryDate = today.add(option.delivery_days, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = option.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(option.priceCents)} -`;
            const isChecked = option.id === cartItem.deliveryOptionId;

            // If no option is selected, default to free shipping
            const defaultChecked = !cartItem.deliveryOptionId && option.priceCents === 0;

            html += `
                <div class="delivery-option">
                    <input type="radio"
                        ${isChecked || defaultChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                        data-delivery-date="${dateString}"
                        data-product-id="${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                </div>
            `;
        });

        return html;
    }
});

// Update the order summary in the DOM
document.querySelector('.js_order_summary').innerHTML = cartSummaryHTML;

// Add event listeners to handle delivery option changes
document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', (event) => {
        const selectedDate = event.target.dataset.deliveryDate;
        const productId = event.target.dataset.productId;

        // Find the corresponding delivery date container and update it
        const deliveryDateContainer = document.querySelector(
            `.js_cart_item_container-${productId} .js_delivery_date`
        );
        deliveryDateContainer.textContent = selectedDate;
    });
});

// Add click listeners for delete links
document.querySelectorAll('.js_delete_link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        RemovefromCart(productId);

        const container = document.querySelector(`.js_cart_item_container-${productId}`);
        container.remove();
    });
});
