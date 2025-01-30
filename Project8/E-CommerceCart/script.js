document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 45.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 99.99 },
    { id: 4, name: "Product 4", price: 20.99 },
    { id: 5, name: "Product 5", price: 63.99 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  //Create a div and display all products from "products" objects
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - ${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  //Add event listener to all the buttons inside each product
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //console.log(typeof e.target.getAttribute("data-id")); //string
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      //console.log(product);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";

    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}`;
        cartItems.append(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCart.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
  });
});
