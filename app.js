const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ============================================
// ⚠️ НАСТРОЙКИ
// ============================================

// Твой ник в Telegram БЕЗ @
const MANAGER_USERNAME = 'sashalppro';

// Курс: сколько MDL в 1 EUR (поменяй на актуальный!)
const EUR_RATE = 19.5;

// ============================================
// ТОВАРЫ
// ============================================
const products = [
    { id: 1, name: 'Футболка Oversize Black', price: 890, category: 'Футболки',
      img: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'] },
    { id: 2, name: 'Худи Nike', price: 799, category: 'Худи',
      img: ['IMG_20260913_124224_923.jpg'] },
    { id: 3, name: 'Джинсы Slim Blue', price: 1890, category: 'Джинсы',
      img: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'] },
    { id: 4, name: 'Куртка Bomber', price: 2790, category: 'Куртки',
      img: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'] },
    { id: 5, name: 'Кепка Classic', price: 490, category: 'Аксессуары',
      img: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500'] },
    { id: 6, name: 'Кроссовки Runner', price: 3290, category: 'Обувь',
      img: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'] },
];

let cart = {};
let currentCategory = 'Все';
const INITIAL_LIMIT = 4;
let showAll = false;

// ============================================
// ПОМОЩНИКИ
// ============================================
function getImages(p) {
    return Array.isArray(p.img) ? p.img : [p.img];
}

function toEur(mdl) {
    return (mdl / EUR_RATE).toFixed(0);
}

// ============================================
// ШАБЛОН КАРТОЧКИ
// ============================================
function cardTemplate(p) {
    const firstImg = getImages(p)[0];
    return `
        <div class="card-img-wrap">
            <img src="${firstImg}" alt="${p.name}" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/400x400/f2f2f2/999?text=no+image'">
            <button class="card-add" data-id="${p.id}">+</button>
        </div>
        <div class="card-info">
            <h3>${p.name}</h3>
            <div class="price">${toEur(p.price)} €</div>
            <div class="price-eur">${p.price} MDL</div>
        </div>
    `;
}

// ============================================
// НОВИНКИ
// ============================================
const newEl = document.getElementById('newProducts');
products.slice(0, 6).forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = cardTemplate(p);
    newEl.appendChild(card);
});

// ============================================
// КАТЕГОРИИ
// ============================================
const categories = ['Все', ...new Set(products.map(p => p.category))];
const categoriesEl = document.getElementById('categories');

categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === currentCategory ? ' active' : '');
    btn.innerText = cat;
    btn.dataset.cat = cat;
    categoriesEl.appendChild(btn);
});

categoriesEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-btn')) {
        currentCategory = e.target.dataset.cat;
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        showAll = false;
        renderProducts();
    }
});

// ============================================
// ВСЕ ТОВАРЫ
// ============================================
const productsEl = document.getElementById('products');
const viewAllWrap = document.getElementById('viewAllWrap');

function renderProducts() {
    productsEl.innerHTML = '';
    const filtered = currentCategory === 'Все'
        ? products
        : products.filter(p => p.category === currentCategory);

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    visible.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = cardTemplate(p);
        productsEl.appendChild(card);
    });

    viewAllWrap.style.display = (!showAll && filtered.length > INITIAL_LIMIT) ? 'block' : 'none';
}

document.getElementById('viewAllBtn').addEventListener('click', () => {
    showAll = true;
    renderProducts();
});

renderProducts();

// ============================================
// ДОБАВЛЕНИЕ В КОРЗИНУ
// ============================================
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-add');
    if (btn) {
        e.stopPropagation();
        const id = Number(btn.dataset.id);
        cart[id] = (cart[id] || 0) + 1;
        updateCart();
        tg.HapticFeedback?.impactOccurred('light');
    }
});

// ============================================
// КОРЗИНА
// ============================================
function updateCart() {
    let count = 0, total = 0;
    for (const id in cart) {
        const p = products.find(prod => prod.id === Number(id));
        count += cart[id];
        total += p.price * cart[id];
    }
    const eurTotal = toEur(total);

    document.getElementById('cartBadge').innerText = count;
    document.getElementById('barCount').innerText = count;
    document.getElementById('barTotal').innerText = `${eurTotal} € (${total} MDL)`;
    document.getElementById('modalTotal').innerHTML =
        `${eurTotal} €<br><span style="font-size:13px;opacity:0.6;font-weight:500;">${total} MDL</span>`;
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    if (Object.keys(cart).length === 0) {
        container.innerHTML = '<p style="opacity:0.5;padding:24px 0;text-align:center;">Корзина пуста</p>';
        return;
    }
    for (const id in cart) {
        const p = products.find(prod => prod.id === Number(id));
        const firstImg = getImages(p)[0];
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${firstImg}" alt="${p.name}">
            <div class="cart-item-info">
                <h4>${p.name}</h4>
                <span>${toEur(p.price)} € · ${p.price} MDL</span>
            </div>
            <div class="qty-controls">
                <button data-action="minus" data-id="${p.id}">−</button>
                <span>${cart[id]}</span>
                <button data-action="plus" data-id="${p.id}">+</button>
            </div>
        `;
        container.appendChild(item);
    }
}

document.getElementById('cartItems').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'plus') cart[id]++;
    else if (btn.dataset.action === 'minus') {
        cart[id]--;
        if (cart[id] <= 0) delete cart[id];
    }
    updateCart();
});

// ============================================
// МОДАЛКИ
// ============================================
const cartModal = document.getElementById('cartModal');
const managerModal = document.getElementById('managerModal');

document.getElementById('openCartBtn').addEventListener('click', () => {
    renderCartItems();
    cartModal.classList.add('open');
});
document.getElementById('cartIconBtn').addEventListener('click', () => {
    renderCartItems();
    cartModal.classList.add('open');
});
document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.remove('open'));
cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cartModal.classList.remove('open'); });

document.getElementById('closeManagerBtn').addEventListener('click', () => managerModal.classList.remove('open'));
managerModal.addEventListener('click', (e) => { if (e.target === managerModal) managerModal.classList.remove('open'); });

// ============================================
// ОФОРМЛЕНИЕ ЗАКАЗА
// ============================================
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        tg.showAlert('Корзина пуста!');
        return;
    }

    const order = [];
    let total = 0;
    for (const id in cart) {
        const p = products.find(prod => prod.id === Number(id));
        order.push({ name: p.name, price: p.price, qty: cart[id], sum: p.price * cart[id] });
        total += p.price * cart[id];
    }

    const eurTotal = toEur(total);
    const orderText = order.map(i =>
        `• ${i.name} × ${i.qty} — ${toEur(i.sum)} € (${i.sum} MDL)`
    ).join('\n');

    const message = `Здравствуйте! Хочу оформить заказ в marca.storre:\n\n${orderText}\n\nИтого: ${eurTotal} € (${total} MDL)`;

    cartModal.classList.remove('open');
    managerModal.classList.add('open');

    document.getElementById('writeManagerBtn').onclick = () => {
        const url = `https://t.me/${MANAGER_USERNAME}?text=${encodeURIComponent(message)}`;
        tg.openTelegramLink(url);
        managerModal.classList.remove('open');
        tg.close();
    };
});
