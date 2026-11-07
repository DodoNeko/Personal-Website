document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('offerContainer');
    const form = document.getElementById('offerFilterForm');
    const categorySelect = document.getElementById('categorySelect');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetBtn');

    if (!container) return;

    function renderItems(items) {
        container.innerHTML = '';
        const keys = Object.keys(items);

        if (keys.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5 w-100">
                    <p class="fs-5 text-muted">Brak wyników spełniających wybrane kryteria.</p>
                </div>`;
            return;
        }

        keys.forEach(key => {
            const item = items[key];
            const cardHtml = `
                <div class="offerPrevItem">
                    <img class="offerImg" src="${item.img}" alt="${item.title}">
                    <span class="offerTitle">${item.title}</span>
                    <span class="offerDesc">${item.shortDesc || ''}</span>
                    <a href="/offer-detail?id=${key}" class="checkBtn text-decoration-none text-center">
                        Zobacz szczegóły
                    </a>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    }

    async function fetchItems() {
        const category = categorySelect.value;
        const search = searchInput.value.trim();

        const url = new URL(window.location.origin + '/api/items');
        url.searchParams.append('category', category);
        url.searchParams.append('search', search);

        try {
            const response = await fetch(url);
            const data = await response.json();
            renderItems(data);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            container.innerHTML = '<p class="text-danger text-center">Błąd serwera. Nie można załadować oferty.</p>';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        fetchItems();
    });

    searchInput.addEventListener('input', fetchItems);
    categorySelect.addEventListener('change', fetchItems);

    resetBtn.addEventListener('click', () => {
        categorySelect.value = 'all';
        searchInput.value = '';
        fetchItems();
    });

    fetchItems();
});