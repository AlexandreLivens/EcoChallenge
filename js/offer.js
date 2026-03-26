document.addEventListener("DOMContentLoaded", () => {
    initializeOrderForm();
});

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
            country: document.querySelector('input[name="country"]').value,
            city: document.querySelector('input[name="city"]').value,
            edition: editionSelect.selectedOptions[0].text,
            paiement: paymentSelect.selectedOptions[0].text,
        };

        console.log(data)

        fetch('https://script.google.com/macros/s/AKfycbwnz7xK8XQyb0YYs8o_b51B77wHIc1hkERTkbsDQ0CrYVuWlNo6jXYpDOyMo1i-u6_2/exec', {
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