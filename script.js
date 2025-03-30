// Cart functionality
const CART_KEY = 'autoparts_cart';

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function updateCartCount() {
  const cart = getCart();
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    countElement.textContent = itemCount;
  }
}

function addToCart(productId, productName, price, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: quantity
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  showToast(`${productName} added to cart`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Add event listeners for all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      const productName = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      addToCart(productId, productName, price);
    });
  });
});