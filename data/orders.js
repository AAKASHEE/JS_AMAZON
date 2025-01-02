export const orders = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order) {
    orders.unshift(order);
    savetToStorage();

    
}

function savetToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}