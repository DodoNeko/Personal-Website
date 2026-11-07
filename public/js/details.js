document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (!itemId) {
        showError("Brak ID produktu w adresie.");
        return;
    }

    try {
        const response = await fetch(`/api/items/${itemId}`);
        
        if (!response.ok) {
            throw new Error("Element nie istnieje");
        }
        
        const item = await response.json();
        document.title = `${item.title} - DODO.NEKO`;
        document.getElementById('itemTitle').textContent = item.title;
        document.getElementById('itemCategory').textContent = item.category;
        document.getElementById('itemDesc').textContent = item.fullDesc;
        document.getElementById('itemImg').src = item.img;

        const linksContainer = document.getElementById('linksContainer');
        linksContainer.innerHTML = '';

        if (item.wattpadUrl) {
            linksContainer.innerHTML += `<a href="${item.wattpadUrl}" target="_blank" class="orangeBtn text-decoration-none">Czytaj na Wattpad</a>`;
        }
        if (item.plotlineUrl) {
            linksContainer.innerHTML += `<a href="${item.plotlineUrl}" target="_blank" class="whiteBtn border text-decoration-none">Czytaj na PlotLine</a>`;
        }
    } catch (error) {
        showError("Przepraszamy, wybrana pozycja nie istnieje.");
    }
});

function showError(message) {
    document.getElementById('itemTitle').textContent = "Błąd";
    document.getElementById('itemDesc').textContent = message;
    document.getElementById('itemImg').style.display = 'none';
}