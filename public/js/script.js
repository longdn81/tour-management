// slide tour detail
var imagesThumb = new Swiper(".imagesThumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var imagesMain = new Swiper(".imagesMain", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: imagesThumb,
    },
});
//end slide tour detail

// alert
const alertAddCartSuccess = () => {
    const elementAlert = document.querySelector('[alert-add-cart-success]');
    if(elementAlert){
        elementAlert.classList.remove("alert-hidden")

        setTimeout(() => {
            elementAlert.classList.add("alert-hidden");
        }, 3000);

        const closeAlert = elementAlert.querySelector('[close-alert]');
        closeAlert.addEventListener("click" , () => {
            elementAlert.classList.add("alert-hidden");
        })
    }

}
// end alert
// mini-cart 
const showMiniCart = () => {
    const miniCart = document.querySelector('[mini-cart]');
    if(miniCart){
        const cart = JSON.parse(localStorage.getItem("cart"));
        if(cart){
            const totalQuantity = cart.reduce((sum,item) => sum + item.quantity , 0) ;
            miniCart.innerHTML=totalQuantity;
        }
        
    }
}
 
showMiniCart();
// end mini-cart

// cart
const cart = localStorage.getItem("cart");
if(!cart){
    localStorage.setItem("cart" , JSON.stringify([])); 
}
// Thêm tour vào cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
    formAddToCart.addEventListener("submit", (event) => {
        event.preventDefault();

        const quantity = parseInt(event.target.elements.quantity.value);
        const tourId = parseInt(event.target.getAttribute("tour-id"));

        if (quantity > 0 && tourId) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const indexExistTour = cart.findIndex(item => item.tourId === tourId);

            if (indexExistTour === -1) {
                cart.push({
                    tourId: tourId,
                    quantity: quantity
                });
            } else {
                cart[indexExistTour].quantity = cart[indexExistTour].quantity + quantity;
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alertAddCartSuccess();
            showMiniCart();
        }
    });
}

// End carts
