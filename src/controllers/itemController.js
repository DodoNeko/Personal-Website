import { itemsData } from "../data/items-data.js";

export const getItems = (req, res) => {
    const { category, search } = req.query; 
    let filtered = {};

    Object.keys(itemsData).forEach(key => {
        const item = itemsData[key];
        const matchesCategory = (!category || category === 'all' || category === '--- Brak ---') ? true : item.category === category;
        const matchesSearch = (!search || search.trim() === '') ? true : item.title.toLowerCase().includes(search.toLowerCase()) || (item.shortDesc && item.shortDesc.toLowerCase().includes(search.toLowerCase()));

        if (matchesCategory && matchesSearch) {
            filtered[key] = item;
        }
    });

    res.json(filtered);
};

export const getItemById = (req, res) => {
    const id = req.params.id; 
    const item = itemsData[id];

    if (item) {
        res.json(item); 
    } else {
        res.status(404).json({ success: false, message: "Nie znaleziono elementu" });
    }
};