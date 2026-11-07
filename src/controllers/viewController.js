export const renderHome = (req, res) => {
    const charactersData = [
        {
            name: "Candy Shelton",
            role: "Nowa stażystka w oddziale 20.",
            desc: "Zawsze pogodna i pełna motywacji do nauki na temat innych kultur oraz planet. Trafia do oddziału, gdy przypadkiem odkrywa w sobie ponadprzeciętne moce, które musi nauczyć się kontrolować.",
            img: "/img/candy.jpg"
        },
        {
            name: "Calvin Carpenter",
            role: "Szef oddziału 20.",
            desc: "Zawsze poważny i zdystansowany, dzięki niemu zawsze wszystko jest dopięte na ostatni guzik. Mimo to dba również o swoich podwładnych i w razie niebezpieczeństwa zrobi wszystko, żeby ich chronić.",
            img: "/img/calvin.jpg"
        },
        {
            name: "Jackson Taylor",
            role: "Zastępca szefa oddziału 20.",
            desc: "Zawsze ma jakąś ciekawostkę na temat wszechświata. Ze wszystkich planet jednak najbardziej fascynuje go Ziemia i uważa ludzkość za najbardziej interesującą cywilizację.",
            img: "/img/jackson.jpg"
        },
        {
            name: "Jenny Murray",
            role: "Agentka specjalna oddziału 20.",
            desc: "iedyś była szefowa oddziału 20, teraz bierze udział tylko w najpoważniejszych misjach. Mało kto może się z nią równać i ona też dobrze o tym wie.",
            img: "/img/jenny.jpg"
        }
    ];

    res.render('index', { characters: charactersData });
};
export const renderAbout = (req, res) => res.render('about');
export const renderOffer = (req, res) => res.render('offer');
export const renderContact = (req, res) => res.render('contact');
export const renderOfferDetail = (req, res) => res.render('offer-detail');