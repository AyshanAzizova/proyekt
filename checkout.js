// document.addEventListener('DOMContentLoaded', function () {
//     const cardsContainer = document.querySelector('.cards');
//     const loadMoreButton = document.getElementById('loadMore');
//     let loadedCards = 0;
//     const cardsPerPage = 6;

//     function loadCards() {
//         fetch("http://localhost:3377/products")
//             .then(res => res.json())
//             .then(data => {
//                 data.slice(loadedCards, loadedCards + cardsPerPage).forEach(item => {
//                     const card = document.createElement('div');
//                     card.innerHTML = `
//                         <div class="cardImage">
//                             <img src="${item.image}">
//                             <button class="modalBtn">Quick View</button>
//                         </div>
//                         <div class="cardBody">
//                             <a>${item.info}</a>
//                             <div class="hearts">
//                                 <i class="heartBos fa-regular fa-heart"></i>
//                                 <i class="heartDolu fa-solid fa-heart"></i>
//                             </div>
//                         </div>
//                         <p>$${item.price}</p>
//                         <button id="addBtn">addBtn</button>

//                     `;
//                     card.classList.add('card');
//                     cardsContainer.appendChild(card);

//                     // Add event listener to the modal button inside the card
//                     const modalBtn = card.querySelector('.modalBtn');
//                     modalBtn.addEventListener('click', function () {
//                         // Populate modal with card data
//                         populateModal(item);
//                     });
//                     const addBtn = card.querySelector('#addBtn');
//                     addBtn.addEventListener('click', function () {
//                         // Populate modal with card data
//                         populateCart(item);
//                     });
//                     const xBtn = card.querySelector('.modalBtn');
//                     xBtn.addEventListener('click', function () {
//                         // Populate modal with card data
//                         populateCart(item);
//                     });
//                 });
//                 loadedCards += cardsPerPage;
//                 if (loadedCards >= data.length) {
//                     loadMoreButton.style.display = 'none';
//                 }
//             })
//             .then(() => {
//                 const rightBtn = document.querySelector(".rightBtn")
//                 const cart = document.getElementById("cart")
//                 rightBtn.addEventListener("click", () => {
//                     console.log("salam");
//                     cart.style.display = "block"
//                 });
//             })
//             .catch(error => {
//                 console.error("İstek sırasında bir hata oluştu:", error);
//             });

//     }

//     function populateModal(item) {
//         const modal = document.getElementById('modal');
//         console.log(modal);
//         modal.innerHTML = `
//         <div>
//         <button id="xBtn">X</button>
//         <img src="${item.image}">
//         <a>${item.info}</a>
//         <p>$${item.price}</p>
//         </div>
//         `;
//         const xBtn = document.getElementById("xBtn")
//         xBtn.addEventListener("click",()=>{
//             modal.style.display="none"
//         })
//         modal.style.display = "block"


//     }
    
//     loadMoreButton.addEventListener('click', loadCards);
    
//     // Sayfa yüklendiğinde kartları yükle
//     loadCards();
// });