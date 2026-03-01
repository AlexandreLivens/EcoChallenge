document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contactBtn");
    const contactPanel = document.getElementById("contactPanel");
    const contactClose = document.getElementById("contactClose");

    if (!contactBtn || !contactPanel || !contactClose) return;

    const openContact = () => {
        contactPanel.style.display = "block";
    };

    const closeContact = () => {
        contactPanel.style.display = "none";
    };

    contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openContact();
    });

    contactClose.addEventListener("click", (e) => {
        e.preventDefault();
        closeContact();
    });

    document.addEventListener("click", (e) => {
        if (
            contactPanel.style.display === "block" &&
            !contactPanel.contains(e.target) &&
            e.target !== contactBtn
        ) {
            closeContact();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeContact();
    });

    const editionSelect = document.getElementById("editionSelect");
    const paiementSelect = document.getElementById("paiementSelect");
    const sousTotalEl = document.getElementById("sousTotal");
    const totalEl = document.getElementById("total");

    const btnPaiement = document.getElementById("btnPaiement");
    const btnPaypal = document.getElementById("btnPaypal");

    const prixParEdition = {
        complete: 29.99,
        classique: 24.99,
        imprimable: 9.99
    };

    // Mettre à jour les prix à droite
    function updatePrix() {
        const type = editionSelect.value;
        const prix = prixParEdition[type] || 0;
        const prixFormatted = prix.toFixed(2).replace('.', ',') + '€';

        sousTotalEl.textContent = prixFormatted;
        totalEl.textContent = prixFormatted;
    }

    // Gérer l'affichage du bon bouton selon le moyen de paiement
    function updatePaiementUI() {
        const mode = paiementSelect.value;

        // Réinitialiser les classes et cacher les deux boutons
        btnPaiement.style.display = "none";
        btnPaypal.style.display = "none";
        btnPaiement.className = "btn-black";
        btnPaypal.className = "btn-paypal";

        if (mode === "paypal") {
            btnPaypal.style.display = "inline-block";
            btnPaypal.classList.add("btn-paypal");
            btnPaypal.innerHTML = "Payer avec <strong>PayPal</strong>";
        } else {
            btnPaiement.style.display = "inline-block";

            if (mode === "crypto") {
                btnPaiement.classList.add("btn-crypto");
                btnPaiement.textContent = "Payer en Crypto";
            } else {
                btnPaiement.classList.add("btn-carte");
                btnPaiement.textContent = "Payer par Carte Bancaire";
            }
        }
    }

    // Déclencheur initial
    editionSelect.addEventListener("change", updatePrix);
    paiementSelect.addEventListener("change", updatePaiementUI);

    // Initialiser à l'ouverture
    updatePrix();
    updatePaiementUI();

});



