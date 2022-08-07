// nav toggle

const mobileNav = document.querySelector('.mobile-nav');
const nav = document.querySelector('.links');
const closeNav = document.querySelector('.links .mobile-close');
mobileNav.addEventListener('click', () => {
    nav.classList.add('active');
})
closeNav.addEventListener('click', () => {
    nav.classList.remove('active');
})


// cart card & click anywhere to close cart card

const cartBtn = document.querySelector('.cart-icon');
const cart = document.querySelector('.cart');

cartBtn.addEventListener('click', () => {
    cart.classList.toggle('active');
    if (cart.classList.contains('active')) {
        document.addEventListener('click', (e) => {
            if (e.target !== cartBtn && !e.target.classList.contains('delete')) {
                cart.classList.remove('active');
            }

        })
    }
})



const products = [
    { images: "images/image-product-1.jpg" },
    { images: "images/image-product-2.jpg" },
    { images: "images/image-product-3.jpg" },
    { images: "images/image-product-4.jpg" },
]

const thumbnail = document.querySelector('.thumbnail');
const product = document.querySelector('.product');
const thumbImgs = thumbnail.querySelectorAll('img');


thumbnail.addEventListener('click', e => {
    thumbImgs.forEach(thumbImg => {
        thumbImg.classList.remove('active');
    })

    const current = e.target.dataset.id;
    product.src = products[current].images;
    e.target.classList.add('active')
})

product.addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    const close = document.querySelector('.close')
    popup.classList.add('active');
    close.addEventListener('click', () => {
        popup.classList.remove('active');
    })
})






const prevBtns = document.querySelectorAll('.prev');
const nextBtns = document.querySelectorAll('.next');
const thumbSmall = document.querySelectorAll('.popup .thumbnail img');

const thumbAll = document.querySelector('.popup .thumbnail');

const productSmall = document.querySelector('.popup .product');

let contentIndex = 0;
displayContent(contentIndex);

function currentContent(n) {
    displayContent(contentIndex = n);
}

function nextContent(n) {
    displayContent(contentIndex += n);
}

prevBtns.forEach(prevBtn => {
    prevBtn.addEventListener('click', () => {
        nextContent(-1);

    });
})

nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click', () => {
        nextContent(1);
    })
})


function displayContent(n) {
    for (let i = 0; i < thumbSmall.length; i++) {
        thumbSmall[i].classList.remove('active');
        thumbImgs[i].classList.remove('active');
    }

    if (n < 0) { contentIndex = thumbSmall.length - 1; }
    if (n > thumbSmall.length - 1) { contentIndex = 0 };

    product.src = products[contentIndex].images;
    productSmall.src = products[contentIndex].images;
    thumbImgs[contentIndex].classList.add('active');
    thumbSmall[contentIndex].classList.add('active');

}

thumbAll.addEventListener('click', e => {
    for (let i = 0; i < thumbSmall.length; i++) {
        thumbSmall[i].classList.remove('active');
    }
    current = e.target.dataset.id;
    productSmall.src = products[current].images;
    product.src = products[current].images;
    e.target.classList.add('active')
})




// atc update

const quan = document.querySelector('.atc input');
const atc = document.querySelector('.atc');
const cartQuan = document.querySelector('.info .quan');
const cartPrice = document.querySelector('.info .price');
const cartInfo = document.querySelector('.cart');
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartInfo.innerHTML = `<span class="title">Cart</span>
        <div class="cart-info flex">
          <span class="placeholder">Your cart is empty.</span>
        </div>`
        cartBtn.classList.remove('active');
        cartBtn.dataset.content = '';
    } else {
        cartBtn.classList.add('active');
        cartBtn.dataset.content = cart.quantity;
        cartInfo.innerHTML = `
    <span class="title">Cart</span>
    <div class="cart-info flex">
      <img src="images/image-product-1-thumbnail.jpg" alt="">
      <div class="info">
        <span>Fall Limited Edition Sneakers</span> <br>
        <span class="flex">$125.00 x <span class="quan">${cart.quantity}</span> <span class="price">$${cart.quantity * 125}</span></span>
      </div>
      <img class="delete" src="images/icon-delete.svg" alt="">
      </div>
    <button>Checkout</button>`;
    }



    atc.addEventListener('click', (e) => {
        JSON.parse(localStorage.getItem('cart')) || [];

        if (e.target.classList.contains('plus') || e.target.classList.contains('atc-btn')) {
            quan.value++;

            cartBtn.classList.add('active');
            cartBtn.dataset.content = quan.value;


        } else if (e.target.classList.contains('minus') && quan.value > 0) {
            quan.value--;
            cartBtn.dataset.content = quan.value;
            if (quan.value === '0') {
                cartBtn.classList.remove('active');
                cartBtn.dataset.content = '';
            }
        }
        quan.addEventListener('input', () => {
            if (quan.value > 0) {
                cartBtn.classList.add('active');
                cartBtn.dataset.content = quan.value;
            } else {
                quan.value = '';
            }

        })

        cartInfo.innerHTML = `
    <span class="title">Cart</span>
    <div class="cart-info flex">
      <img src="images/image-product-1-thumbnail.jpg" alt="">
      <div class="info">
        <span>Fall Limited Edition Sneakers</span> <br>
        <span class="flex">$125.00 x <span class="quan">${quan.value}</span> <span class="price">$${125 * quan.value}</span></span>
      </div>
      <img class="delete" src="images/icon-delete.svg" alt="">
      </div>
    <button>Checkout</button>`;


        const cart = {
            quantity: quan.value,
            unitPrice: '$125',
            totalPrice: '$' + quan.value * '125',
        }
        localStorage.setItem('cart', JSON.stringify(cart));



    })

    // add dlt btn functionality
    cartInfo.addEventListener('click', () => {
        JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.quantity > 1) {
            cart.quantity--;
            cartBtn.dataset.content = cart.quantity;
            cartInfo.innerHTML = `
    <span class="title">Cart</span>
    <div class="cart-info flex">
      <img src="images/image-product-1-thumbnail.jpg" alt="">
      <div class="info">
        <span>Fall Limited Edition Sneakers</span> <br>
        <span class="flex">$125.00 x <span class="quan">${cart.quantity}</span> <span class="price">$${125 * cart.quantity}</span></span>
      </div>
      <img class="delete" src="images/icon-delete.svg" alt="">
      </div>
    <button>Checkout</button>`;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            cart.quantity = 0;
            cartInfo.innerHTML = `<span class="title">Cart</span>
        <div class="cart-info flex">
          <span class="placeholder">Your cart is empty.</span>
        </div>`;
            cartBtn.classList.remove('active');
            cartBtn.dataset.content = '';
            localStorage.removeItem('cart');
        }
    })

})
