import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practise.js';

Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((value1,value2) => {
    console.log(value1);
    renderOrderSummary();
    renderPaymentSummary(); 
    
});



// new Promise((resolve) => {
    
//     loadProducts(() => {
       
//         resolve();
//     });
// }).then((value1) => {
//     console.log(value1);
    
    
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve('value1');
//         });
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary(); 
    
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary(); 
//     });
// });
   
