let cart = [];
let cartDetails = [];

// Load cart details from local storage on page load
if (localStorage.getItem('cartDetails')) {
    cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
}

document.getElementById('card-section').addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('.product');
    if (target) {
        cart.push(target);
        console.log(target);

        const productTitle = target.querySelector('.card-title').textContent; // Get the product title
        const productPrice = target.querySelector('.price').textContent; // Get the product price
        const productImg = target.querySelector('.img-height').src; // Get the product image source

        const productDetails = {
            productTitle: productTitle,
            productPrice: productPrice,
            productImg: productImg // Include the product image in the details
        };

        console.log(`Product clicked: ${productTitle}, Price: ${productPrice}, Image: ${productImg}`);

        cartDetails.push(productDetails); // Add product details to cartDetails

        // Store cart details in local storage
        localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
    }
});

