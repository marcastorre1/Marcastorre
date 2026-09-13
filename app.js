const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ============================================
// ⚠️ НАСТРОЙКИ
// ============================================

// Твой ник в Telegram БЕЗ @
const MANAGER_USERNAME = 'markulik52';

// Курс: сколько MDL в 1 EUR (поменяй на актуальный!)
const EUR_RATE = 19.9;

// ============================================
// ТОВАРЫ
// price: 0  →  товар "Под заказ"
// ============================================
const products = [
    { id: 1, name: 'майка Flair', price: 499, category: 'Футболки',
      img: ['file_0000000055b8820a9d7fe1163755e8a1.png'] },
    { id: 2, name: 'Худи Nike', price: 799, category: 'Худи,свитера',
      img: ['IMG_20260913_124224_923.jpg'] },
    { id: 3, name: 'Штаны Polo Ralph Lauren', price: 0, category: 'Джинсы,Штаны',
      img: ['file_00000000f28c82438ec9dfc883bc7e97.png'] },
    { id: 4, name: 'Жилетка Under Armour', price: 1798, category: 'Куртки,желетки',
      img: ['file_00000000a8488243bab915e35a4ae0a4.png'] },
    { id: 5, name: 'Ветровка Stone Island', price: 0, category: 'Куртки,желетки',
      img: ['file_00000000140481f48edcdf9df60fb0f1.png'] },
    { id: 6, name: 'Кроссовки Flair', price: 1299, category: 'Обувь',
      img: ['file_000000004e0481f49f446dcad0ccbace.png'] },
    { id: 7, name: 'Штаны Essentials', price: 0, category: 'Джинсы,Штаны', 
      img: ['file_00000000a57881f49ae0e2d55384c949.png'] },
    { id: 8, name: 'Свитер Stone Island', price: 0, category: 'Худи,свитера', 
      img: ['file_00000000181481f5a015453727117b7b.png'] },
    { id: 9, name: 'Худи Stone Island', price: 0, category: 'Худи,свитера', 
      img: ['file_0000000031a88243bff9fe3c32dbbf1f.png'] },
    { id: 10, name: 'Пуховик C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['file_00000000557c82439a29b03a3ae5086c.png'] },
    { id: 11, name: 'Пуховик C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['file_00000000f6dc81f491aaf49b2247c40a.png'] },
    { id: 12, name: 'Пуховик C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['file_0000000000688243831dc393b80515b9.png'] },
    { id: 13, name: 'Худи Gucci', price: 0, category: 'Худи,свитера', 
     img: ['file_00000000b08081f4918bbef138d73465.png'] },
    { id: 14, name: 'Свитер Stone Island', price: 0, category: 'Худи,свитера', 
     img: ['file_00000000de5081f487d71cf9561c667f.png'] },
    { id: 15, name: 'Кофта Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['file_00000000b20c820c8de4423512fb12a3.png'] },
    { id: 16, name: 'Полузамок Stone Island', price: 0, category: 'Худи,свитера', 
     img: ['file_00000000a770820abd9c574b67670992.png'] },
    { id: 17, name: 'Ветровка Arc’teryx', price: 0, category: 'Куртки,желетки', 
     img: ['file_0000000074f481f484d96ef0806d5f7c.png'] },
    { id: 18, name: 'Кардиган Moncler', price: 0, category: 'Куртки,желетки', 
     img: ['file_0000000073e881fb8dc40c335d2bafef.png'] },
    { id: 19, name: 'Пуховик Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['file_000000003158821094ac409bc6e817e5.png'] },
    { id: 20, name: 'Худи Stone Island x Supreme', price: 0, category: 'Худи,свитера', 
     img: ['file_00000000505881f4864dcc02909499d3.png'] },
    { id: 21, name: 'Жилетка Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['file_00000000ffa481f4bf05449d5b0985e4.png'] },
    { id: 22, name: 'Пуховик Moncler', price: 0, category: 'Куртки,желетки', 
     img: ['file_000000001ec88211b827c65aa00fa1f5.png'] },
    { id: 23, name: 'Ветровка Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['IMG_20260913_192745_287.jpg'] },
    { id: 24, name: 'Ветровка Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['IMG_20260913_193038_041.jpg'] },
    { id: 25, name: 'Зип-Худи Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['file_000000004b248210b518da16ac1e22fd.png'] },
    { id: 26, name: 'Куртка/ветровка C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['IMG_20260913_193500_540.jpg'] },
    { id: 27, name: 'Кофта C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['file_0000000058c08210b88e03df2d138e53.png'] },
    { id: 28, name: 'Ветровка C.P. Company', price: 0, category: 'Куртки,желетки', 
     img: ['file_0000000042988246aa63c9477afdc9cc.png'] },
    { id: 29, name: 'Ветровка Stone Island', price: 0, category: 'Куртки,желетки', 
     img: ['file_000000009a9c81f683d109a3a2fd1d5d.png'] },
    { id: 30, name: 'Свитер Stone Island', price: 0, category: 'Худи,свитера', 
     img: ['IMG_20260913_195052_392.jpg'] },
    { id: 31, name: 'Костюм Corteiz', price: 0, category: 'Костюмы', 
     img: ['file_0000000017f882108e63343618f6b44f.png'] },
    { id: 32, name: 'Свитер Stone Island', price: 0, category: 'Худи,свитера', 
     img: ['file_00000000d7408210bcbdeb6696863c5b.png'] },
    { id: 33, name: 'Майка Hellstar', price: 0, category: 'Футболки', 
     img: ['file_000000000e2481f481a4444da8f36e5a.png'] },
    { id: 34, name: 'Майка Diesel', price: 0, category: 'Футболки', 
     img: ['IMG_20260913_201621_335.jpg'] },
    { id: 35, name: 'Свитер Mertra', price: 0, category: 'Худи,свитера', 
     img: ['IMG_20260913_201738_694.jpg'] },
    { id: 36, name: 'Штаны Mertra', price: 0, category: 'Джинсы,Штаны', 
     img: ['IMG_20260913_201910_614.jpg'] },
    { id: 37, name: 'Ветровка Jordan', price: 0, category: 'Куртки,желетки', 
     img: ['IMG_20260913_202034_493.jpg'] },
    { id: 38, name: 'Костюм Corteiz', price: 0, category: 'Костюмы', 
     img: ['file_00000000ef3881f48f5b9e230dbc6530.png'] },
    // 👇 ТОВАРЫ ПОД ЗАКАЗ (price: 0)
    // { id: 7, name: 'Название', price: 0, category: 'Категория', img: ['foto.jpg'] },
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
    const priceHtml = p.price > 0
        ? `<div class="price">${toEur(p.price)} €</div>
           <div class="price-eur">${p.price} MDL</div>`
        : `<div class="price">Под заказ</div>
           <div class="price-eur">Цена по запросу</div>`;
    return `
        <div class="card-img-wrap">
            <img src="${firstImg}" alt="${p.name}" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/400x400/f2f2f2/999?text=no+image'">
            <button class="card-add" data-id="${p.id}">+</button>
        </div>
        <div class="card-info">
            <h3>${p.name}</h3>
            ${priceHtml}
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
    let hasOnOrder = false;

    for (const id in cart) {
        const p = products.find(prod => prod.id === Number(id));
        count += cart[id];
        if (p.price > 0) {
            total += p.price * cart[id];
        } else {
            hasOnOrder = true;
        }
    }
    const eurTotal = toEur(total);

    document.getElementById('cartBadge').innerText = count;
    document.getElementById('barCount').innerText = count;

    let barTotalText;
    if (total > 0 && hasOnOrder) {
        barTotalText = `${eurTotal} € + под заказ`;
    } else if (total > 0) {
        barTotalText = `${eurTotal} € (${total} MDL)`;
    } else {
        barTotalText = 'Под заказ';
    }
    document.getElementById('barTotal').innerText = barTotalText;

    if (total > 0 && hasOnOrder) {
        document.getElementById('modalTotal').innerHTML =
            `${eurTotal} €<br><span style="font-size:12px;opacity:0.6;font-weight:500;">+ товары под заказ</span>`;
    } else if (total > 0) {
        document.getElementById('modalTotal').innerHTML =
            `${eurTotal} €<br><span style="font-size:13px;opacity:0.6;font-weight:500;">${total} MDL</span>`;
    } else {
        document.getElementById('modalTotal').innerHTML = 'Под заказ';
    }

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
        const priceText = p.price > 0
            ? `${toEur(p.price)} € · ${p.price} MDL`
            : 'Под заказ';
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${firstImg}" alt="${p.name}">
            <div class="cart-item-info">
                <h4>${p.name}</h4>
                <span>${priceText}</span>
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
    let hasOnOrder = false;

    for (const id in cart) {
        const p = products.find(prod => prod.id === Number(id));
        order.push({ name: p.name, price: p.price, qty: cart[id], sum: p.price * cart[id] });
        if (p.price > 0) {
            total += p.price * cart[id];
        } else {
            hasOnOrder = true;
        }
    }

    const eurTotal = toEur(total);
    const orderText = order.map(i =>
        i.price > 0
            ? `• ${i.name} × ${i.qty} — ${toEur(i.sum)} € (${i.sum} MDL)`
            : `• ${i.name} × ${i.qty} — Под заказ`
    ).join('\n');

    let totalText;
    if (total > 0 && hasOnOrder) {
        totalText = `${eurTotal} € (${total} MDL) + товары под заказ`;
    } else if (total > 0) {
        totalText = `${eurTotal} € (${total} MDL)`;
    } else {
        totalText = 'Всё под заказ';
    }

    const message = `Здравствуйте! Хочу оформить заказ в marca.storre:\n\n${orderText}\n\nИтого: ${totalText}`;

    cartModal.classList.remove('open');
    managerModal.classList.add('open');

    document.getElementById('writeManagerBtn').onclick = () => {
        const url = `https://t.me/${MANAGER_USERNAME}?text=${encodeURIComponent(message)}`;
        tg.openTelegramLink(url);
        managerModal.classList.remove('open');
        tg.close();
    };
});
