// slider


// 
const cartBtn = document.getElementById("cartBtn")
const cart = document.getElementById("cart")
cartBtn.addEventListener("click", () => {
    cart.style.display = "block"
    cart.style.width = "34vw"
})
document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards');
    const loadMoreButton = document.getElementById('loadMore');
    let loadedCards = 0;
    const cardsPerPage = 6;

    function loadCards() {
        fetch("http://localhost:3377/products")
            .then(res => res.json())
            .then(data => {
                data.slice(loadedCards, loadedCards + cardsPerPage).forEach(item => {
                    const card = document.createElement('div');
                    card.innerHTML = `
                        <div class="cardImage">
                            <img src="${item.image}">
                            <button class="modalBtn">Quick View</button>
                        </div>
                        <div class="cardBody">
                            <a>${item.info}</a>
                            <div class="hearts">
                                <i class="heartBos fa-regular fa-heart"></i>
                                <i class="heartDolu fa-solid fa-heart"></i>
                            </div>
                        </div>
                        <p>$${item.price}</p>
                        <button id="addBtn">addBtn</button>

                    `;
                    card.classList.add('card');
                    cardsContainer.appendChild(card);

                    // Add event listener to the modal button inside the card
                    const modalBtn = card.querySelector('.modalBtn');
                    modalBtn.addEventListener('click', function () {
                        // Populate modal with card data
                        populateModal(item);
                    });
                    const addBtn = card.querySelector('#addBtn');
                    addBtn.addEventListener('click', function () {
                        // Populate modal with card data
                        populateCart(item);
                    });
                    const xBtn = card.querySelector('.modalBtn');
                    xBtn.addEventListener('click', function () {
                        // Populate modal with card data
                        populateCart(item);
                    });
                });
                loadedCards += cardsPerPage;
                if (loadedCards >= data.length) {
                    loadMoreButton.style.display = 'none';
                }
            })
            .then(() => {
                const rightBtn = document.querySelector(".rightBtn")
                const cart = document.getElementById("cart")
                rightBtn.addEventListener("click", () => {
                    console.log("salam");
                    cart.style.display = "block"
                });
            })
            .catch(error => {
                console.error("İstek sırasında bir hata oluştu:", error);
            });

    }

    function populateModal(item) {
        const modal = document.getElementById('modal');
        console.log(modal);
        modal.innerHTML = `
        <div>
        <button class="add-to-cart" onclick=addToCard(${item.id})>Add to cart</button>
        <button id="xBtn">X</button>
        <img src=${item.image}>
        <a>${item.info}</a>
        <p>$${item.price}</p>
        </div>
        `;
        const xBtn = document.getElementById("xBtn")
        xBtn.addEventListener("click", () => {
            modal.style.display = "none"
        })
        modal.style.display = "block"


    }

    loadMoreButton.addEventListener('click', loadCards);

    // Sayfa yüklendiğinde kartları 
    loadCards();
});
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
let products = []
function addToCard(id) {
    const product = products.find(p => p.id === id);

    const cartContents = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cartContents.find(p => p.product.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartContents.push({
            product: product,
            quantity: 1,
        });
    }


    setData('cart', cartContents);
}
addToCard()
const cartContents = getData('cart');
const cartTotal = cartContents.reduce((a, item) => a + item.product.price * item.quantity, 0);

document.getElementById('cartTotal').textContent = cartTotal;

function DisplayCart() {

    let cart = JSON.parse(localStorage.getItem("sebet")) || []

    const cartItems = document.getElementById("cart-items")
    cartItems.innerHTML = ''

    cart.forEach((product) => {

        const pro = document.createElement("div")
        pro.innerHTML = `<div class="cartProduct" data-id=${product.id}><img class="cartImage" src=${product.image} alt="Mercedes"> ${product.title}-${product.quantity} eded -Price: ${(product.quantity * product.price).toFixed(2)} <i class="fa-solid fa-trash delete-product" ></i></div>`
        cartItems.appendChild(pro)
    })

    const totalPrice = cart.reduce((toplam, item) => toplam + (item.price * item.quantity), 0)
    document.getElementById("total-price").textContent = totalPrice.toFixed(2)


    const deleteProduct = document.querySelectorAll(".delete-product")

    deleteProduct.forEach(delPro => {

        delPro.addEventListener("click", (e) => {
            const card = e.target.closest(".cartProduct")
            console.log(card);
            const productId = card.dataset.id
            RemoveProduct(productId)

        })
    })
}
function RemoveProduct(productID) {
    const cart = JSON.parse(localStorage.getItem("sebet")) || []
    const updateCart = cart.filter(item => item.id !== productID)

    localStorage.setItem("sebet", JSON.stringify(updateCart))
    UpdateCartCount()
    DisplayCart()


}
function UpdateCartCount() {

    const cart = JSON.parse(localStorage.getItem("sebet")) || []

    const totalCount = cart.reduce((toplam, item) => toplam + item.quantity, 0)

    document.getElementById("cart-count").innerText = totalCount
}
function populateCart(item) {
    const cart = document.getElementById('cart');

    cart.innerHTML = `
        <div>
            <img src="${item.image}">
        <a>${item.info}</a>
        <p>$${item.price}</p>
        <span>${item.quantity}</span>
        <button id="checkout"><a href="checkout.html">checkout</a></button>
        </div>
        `;
    const addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click", () => {
        fetch()
    })



}

















const sliderContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const nextIcon = document.querySelector(".next");
const prevIcon = document.querySelector(".prev");
const dotContainer = document.querySelector(".dot-container");

let currentIndex = 0;

sliderContainer.addEventListener("mouseover", stopPlay)
sliderContainer.addEventListener("mouseout", startPlay);


slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === currentIndex) {
        dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
        updateDot();
    });

    dotContainer.appendChild(dot);
});

function updateDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    updateDot();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    updateDot();
}

function updateSlider() {
    const newTransform = -currentIndex * 100 + "%";
    sliderContainer.style.transform = `translateX(${newTransform})`;
}

nextIcon.addEventListener("click", nextSlide);
prevIcon.addEventListener("click", prevSlide);

let interval;

function startPlay() {
    interval = setInterval(nextSlide, 5000);
}

function stopPlay() {
    clearInterval(interval);
}

startPlay();