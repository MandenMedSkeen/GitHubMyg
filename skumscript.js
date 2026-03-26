// ------------------------------------------------------------------------ PRODUCT ARRAYS ----------------------------------------------------------------------- //

const products = [
  {
    id: 1,
    name: "JordbærSky",
    flavor: "Jordbær",
    color: "Lyserød",
    price: 25,
    weight: 100,
    inStock: true,
    image: "img/jordbaersky.png",
  },
  {
    id: 2,
    name: "VaniljeSky",
    flavor: "Vanilje",
    color: "Hvid",
    price: 22,
    weight: 100,
    inStock: true,
    image: "img/vaniljesky.png",
  },
  {
    id: 3,
    name: "BlåbærSky",
    flavor: "Blåbær",
    color: "Blå",
    price: 28,
    weight: 100,
    inStock: false,
    image: "img/blaabaersky.png",
  },
  {
    id: 4,
    name: "CitronSky",
    flavor: "Citron",
    color: "Gul",
    price: 24,
    weight: 100,
    inStock: true,
    image: "img/citronsky.png",
  },
  {
    id: 5,
    name: "MangoSky",
    flavor: "Mango",
    color: "Orange",
    price: 100,
    weight: 500,
    inStock: true,
    image: "img/mangosky.png",
  },
  {
    id: 6,
    name: "MelonSky",
    flavor: "Vandmelon",
    color: "Lyserød",
    price: 30,
    weight: 100,
    inStock: true,
    image: "img/melonsky.png",
  },
];

// ------------------------------------------------------------------------- CONST LISTE ------------------------------------------------------------------------- //

const cart = [];
const selectedAmounts = {};

products.forEach(function (product) {
  selectedAmounts[product.id] = 1;
});

const productGrid = document.querySelector("#productGrid");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const shopStatus = document.querySelector("#shopStatus");
const clearCartBtn = document.querySelector("#clearCartBtn");
const orderBtn = document.querySelector("#orderBtn");
const receiptBox = document.querySelector("#receiptBox");
const toggleContactBtn = document.querySelector("#toggleContactBtn");
const contactForm = document.querySelector("#contact-form");
const contactFormBox = document.querySelector("#contactFormBox");
const formStatus = document.querySelector("#formStatus");
const contactTime = document.querySelector("#contact-time");
const themeToggleBtn = document.querySelector("#themeToggleBtn");

// ------------------------------------------------------------------- showProducts() FUNKTION ------------------------------------------------------------------- //

function showProducts() {
  productGrid.innerHTML = "";

  products.forEach(function (product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <h3>${product.name}</h3>
      <p>Smag: ${product.flavor}</p>
      <p>Farve: ${product.color}</p>
      <p>Pris: ${product.price} kr. (${product.weight} g)</p>
      <p>${product.inStock ? "På lager" : "Udsolgt"}</p>

      ${
        product.inStock
          ? `
          <div class="product-quantity">
            <button class="quantity-btn minus-btn" data-id="${product.id}">-</button>
            <span id="quantity-${product.id}">${selectedAmounts[product.id]}</span>
            <button class="quantity-btn plus-btn" data-id="${product.id}">+</button>
          </div>
          `
          : ""
      }

      <button class="add-btn" data-id="${product.id}" ${
        product.inStock ? "" : "disabled"
      }>
        ${product.inStock ? "Læg i kurv" : "Ikke på lager"}
      </button>
    `;

    productGrid.appendChild(productCard);
  });

  // ------------------------------------------------------------------- KNAPPER I PRODUCT GRID ------------------------------------------------------------------ //

  const plusButtons = document.querySelectorAll(".plus-btn");
  const minusButtons = document.querySelectorAll(".minus-btn");
  const addButtons = document.querySelectorAll(".add-btn");

  plusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productId = Number(button.dataset.id);
      updateProductAmount(productId, 1);
    });
  });

  minusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productId = Number(button.dataset.id);
      updateProductAmount(productId, -1);
    });
  });

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productId = Number(button.dataset.id);
      addToCart(productId);
    });
  });
}

// ----------------------------------------------------------------- updateProductAmount() FUNKTION --------------------------------------------------------------- //

function updateProductAmount(productId, change) {
  selectedAmounts[productId] = selectedAmounts[productId] + change;

  if (selectedAmounts[productId] < 1) {
    selectedAmounts[productId] = 1;
  }

  const quantitySpan = document.querySelector("#quantity-" + productId);
  quantitySpan.textContent = selectedAmounts[productId];
}

// --------------------------------------------------------------------- addToCart() FUNKTION --------------------------------------------------------------------- //

function addToCart(productId) {
  const foundProduct = products.find(function (product) {
    return product.id === productId;
  });

  if (!foundProduct) {
    return;
  }

  if (foundProduct.inStock === false) {
    alert("Denne vare er udsolgt.");
    return;
  }

  const amountToAdd = selectedAmounts[productId];

  const cartProduct = cart.find(function (item) {
    return item.id === productId;
  });

  if (cartProduct) {
    cartProduct.quantity = cartProduct.quantity + amountToAdd;
  } else {
    cart.push({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      weight: foundProduct.weight,
      quantity: amountToAdd,
    });
  }

  selectedAmounts[productId] = 1;
  const quantitySpan = document.querySelector("#quantity-" + productId);
  quantitySpan.textContent = 1;

  showCart();
}
// ---------------------------------------------------------------------- showCart() FUNKTION --------------------------------------------------------------------- //

function showCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Din kurv er tom.</p>";
    cartTotal.textContent = "0 kr. / 0 g";
    return;
  }

  let total = 0;
  let totalWeight = 0;

  cart.forEach(function (item) {
    total = total + item.price * item.quantity;
    totalWeight = totalWeight + item.weight * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Antal: ${item.quantity}</p>
      <p>Pris pr. stk: ${item.price} kr.</p>
      <p>Vægt pr. stk: ${item.weight} g</p>
      <p>Subtotal: ${item.price * item.quantity} kr.</p>
      <p>Samlet vægt: ${item.weight * item.quantity} g</p>
    `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total + " kr. / " + totalWeight + " g";
}

// --------------------------------------------------------------------- clearCart() FUNKTION --------------------------------------------------------------------- //

function clearCart() {
  cart.length = 0;
  showCart();
  receiptBox.innerHTML = "";
}

// ---------------------------------------------------------------------- orderNow() FUNKTION --------------------------------------------------------------------- //

function orderNow() {
  if (cart.length === 0) {
    alert("Du skal lægge noget i kurven først.");
    return;
  }

  const now = new Date();

  const weekdays = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];

  const dayName = weekdays[now.getDay()];
  const date = now.toLocaleDateString("da-DK");
  const time = now.toLocaleTimeString("da-DK");

  let total = 0;
  let totalWeight = 0;

  const orderList = cart
    .map(function (item) {
      total = total + item.price * item.quantity;
      totalWeight = totalWeight + item.weight * item.quantity;
      return item.name + " x" + item.quantity;
    })
    .join(", ");

  receiptBox.innerHTML = `
    <h3>Tak for din bestilling!</h3>
    <p>Du har bestilt: ${orderList}</p>
    <p>Bestilt: ${dayName}, ${date} kl. ${time}</p>
    <p>Total pris: ${total} kr.</p>
    <p>Samlet vægt: ${totalWeight} g</p>
  `;

  cart.length = 0;
  showCart();
}

// ----------------------------------------------------------------- checkOpeningHours() FUNKTION ------------------------------------------------------------------ //

function checkOpeningHours() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 4) {
    if (hour >= 14 && hour < 22) {
      shopStatus.textContent = "Vi har åbent lige nu!";
    } else {
      shopStatus.textContent = "Vi har lukket lige nu.";
    }
  } else {
    if (hour >= 12 && hour < 23) {
      shopStatus.textContent = "Vi har åbent lige nu!";
    } else {
      shopStatus.textContent = "Vi har lukket lige nu.";
    }
  }
}

// --------------------------------------------------------------- setupToggleContactForm() FUNKTION --------------------------------------------------------------- //

function setupToggleContactForm() {
  if (!toggleContactBtn || !contactFormBox) {
    return;
  }

  toggleContactBtn.addEventListener("click", function () {
    contactFormBox.classList.toggle("hide-form");

    if (contactFormBox.classList.contains("hide-form")) {
      toggleContactBtn.textContent = "Vis kontaktformular";
    } else {
      toggleContactBtn.textContent = "Skjul kontaktformular";
    }
  });
}

// ------------------------------------------------------------------- setupContactForm() FUNKTION ------------------------------------------------------------------ //

function setupContactForm() {
  if (!contactForm || !window.emailjs) {
    return;
  }

  emailjs.init({
    publicKey: "hbdx-iwsRchFd200g",
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    contactTime.value = new Date().toLocaleString("da-DK");
    formStatus.textContent = "Sender besked...";

    emailjs.sendForm("service_fu4u04n", "template_3s605xh", this).then(
      function () {
        formStatus.textContent = "Besked sendt!";
        contactForm.reset();
      },
      function (error) {
        formStatus.textContent = "Noget gik galt. Prøv igen.";
        console.log("FAILED...", error);
      },
    );
  });
}

// ------------------------------------------------------------------- setupThemeToggle() FUNKTION ------------------------------------------------------------------ //

function setupThemeToggle() {
  if (!themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "☀️";
    } else {
      themeToggleBtn.textContent = "🌙";
    }
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

if (orderBtn) {
  orderBtn.addEventListener("click", orderNow);
}

// ------------------------------------------------------------------------- KØR FUNKTIONER ------------------------------------------------------------------------ //

showProducts();
showCart();
checkOpeningHours();
setupToggleContactForm();
setupContactForm();
setupThemeToggle();
