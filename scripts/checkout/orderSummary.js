import { cart,removeFromCart,UpdateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatCurrency from '../../scripts/utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import{deliveryOptions} from '../../data/delivery_options.js';
hello();

const today = dayjs();
const deliverydate=today.add(7, 'days').format('dddd, MMMM D');
console.log(deliverydate);





export function renderOrderSummary() {
    


    let cartSummaryHTML = '';




    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
        


        const deliveryOptionsId = cartItem.deliveryOptionId;
        
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionsId) {
                deliveryOption = option;
            }
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM D');
        
        


        cartSummaryHTML += `

    <div class="cart-item-container


    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity} </span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>
                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryoptionsHTMl(matchingProduct,cartItem)}
                </div>
            </div>
            </div>
        `;
    });

    function deliveryoptionsHTMl(matchingProduct,cartItem) {


        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents
                === 0
                ? 'FREE Shipping'
                : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString}
                    </div>
                    </div>
                </div>
                `
        });
        return html;
    }


    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    document.querySelectorAll('.js-delete-link').forEach((Link) => {
        Link.addEventListener('click', () => {
            const productId = Link.dataset.productId;
            removeFromCart(productId);  
            
            
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                UpdateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });
        });
}










