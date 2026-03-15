document.addEventListener("DOMContentLoaded", () => {
    initializeContactPanel();
    initializeOrderForm();
});

function initializeContactPanel() {
    const contactButton = document.getElementById("contactBtn");
    const contactPanel = document.getElementById("contactPanel");
    const closeButton = document.getElementById("contactClose");

    if (!contactButton || !contactPanel || !closeButton) return;

    const openPanel = () => {
        contactPanel.style.display = "block";
    };

    const closePanel = () => {
        contactPanel.style.display = "none";
    };

    contactButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openPanel();
    });

    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        closePanel();
    });

    document.addEventListener("click", (event) => {
        const clickedOutsidePanel =
            !contactPanel.contains(event.target) &&
            event.target !== contactButton;

        if (contactPanel.style.display === "block" && clickedOutsidePanel) {
            closePanel();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePanel();
        }
    });
}

function initializeOrderForm() {
    const sexSelect = document.getElementById("sexSelect");
    const editionSelect = document.getElementById("editionSelect");
    const paymentSelect = document.getElementById("paiementSelect");
    const subtotalElement = document.getElementById("sousTotal");
    const totalElement = document.getElementById("total");
    const paymentButton = document.getElementById("btnPaiement");

    if (
        !editionSelect ||
        !paymentSelect ||
        !subtotalElement ||
        !totalElement ||
        !paymentButton
    ) {
        return;
    }

    const pricesByEdition = {
        complete: 29.99,
        classique: 24.99,
        imprimable: 9.99
    };

    const formatPrice = (price) => {
        return `${price.toFixed(2).replace(".", ",")}€`;
    };

    const updatePriceDisplay = () => {
        const selectedEdition = editionSelect.value;
        const price = pricesByEdition[selectedEdition] || 0;
        const formattedPrice = formatPrice(price);

        subtotalElement.textContent = formattedPrice;
        totalElement.textContent = formattedPrice;
    };

    document.getElementById('commandeForm').onsubmit = function(e) {
        e.preventDefault();

        const data = {
            sex: sexSelect.selectedOptions[0].text,
            surname: document.querySelector('input[name="surname"]').value,
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            address: document.querySelector('input[name="address"]').value,
            edition: editionSelect.selectedOptions[0].text,
            paiement: paymentSelect.selectedOptions[0].text,
        };

        console.log(data)

        fetch('https://script.google.com/macros/s/AKfycbzW8VpMuc2V4wvBlZi37tDdam3R0HNf7k4M4qFF-mVSN1JOg4ZPBchhidsC8RonzQi9/exec', {
            method: 'POST',
            mode: 'no-cors',  // Добавить эту строку
            body: JSON.stringify(data)
        });

        alert('Заявка отправлена!');
        this.reset();
    };

    const updatePaymentDisplay = () => {
        const selectedPaymentMethod = paymentSelect.value;

        paymentButton.style.display = "none";
        paymentButton.className = "btn-black";
        paymentButton.style.display = "inline-block";

        if (selectedPaymentMethod === "paypal") {
            paymentButton.classList.add("btn-paypal");
            paymentButton.textContent = "Payez en PayPal";
        }
        else if (selectedPaymentMethod === "crypto") {
            paymentButton.classList.add("btn-crypto");
            paymentButton.textContent = "Payez en cryptomonnaie";
        }
        else if (selectedPaymentMethod === "carte") {
            paymentButton.classList.add("btn-carte");
            paymentButton.textContent = "Paiement par carte";
        }
    };

    editionSelect.addEventListener("change", updatePriceDisplay);
    paymentSelect.addEventListener("change", updatePaymentDisplay);

    updatePriceDisplay();
    updatePaymentDisplay();
}