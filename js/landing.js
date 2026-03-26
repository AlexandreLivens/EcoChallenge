document.addEventListener("DOMContentLoaded", () => {
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

    function updatePrix() {
        const type = editionSelect.value;
        const prix = prixParEdition[type] || 0;
        const prixFormatted = prix.toFixed(2).replace('.', ',') + '€';

        sousTotalEl.textContent = prixFormatted;
        totalEl.textContent = prixFormatted;
    }

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

    editionSelect.addEventListener("change", updatePrix);
    paiementSelect.addEventListener("change", updatePaiementUI);

    updatePrix();
    updatePaiementUI();

});



