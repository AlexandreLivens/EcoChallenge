console.log("offer + landing JS chargé");

window.addEventListener("DOMContentLoaded", function () {
    const editionSelect = document.getElementById("editionSelect");
    const paiementSelect = document.getElementById("paiementSelect");
    const quantityInput = document.getElementById("quantity");

    const sousTotalEl = document.getElementById("sousTotal");
    const totalEl = document.getElementById("total");
    const livraisonEl = document.getElementById("livraison");
    const btnPaiement = document.getElementById("btnPaiement");

    const authOverlay = document.getElementById("authOverlay");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const continueGuest = document.getElementById("continueGuest");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const registerFirstName = document.getElementById("registerFirstName");
    const registerLastName = document.getElementById("registerLastName");
    const registerSex = document.getElementById("registerSex");
    const registerBirthdate = document.getElementById("registerBirthdate");
    const registerEmail = document.getElementById("registerEmail");
    const registerPassword = document.getElementById("registerPassword");
    const registerPasswordConfirm = document.getElementById("registerPasswordConfirm");

    const ageConsent = document.getElementById("ageConsent");
    const privacyConsent = document.getElementById("privacyConsent");
    const termsConsent = document.getElementById("termsConsent");

    const prixParEdition = {
        complete: 29.99,
        classique: 24.99,
        imprimable: 9.99
    };

    const STORAGE_KEY = "ecoChallengeUsers";
    const CURRENT_USER_KEY = "ecoChallengeCurrentUser";

    function formatPrice(price) {
        return price.toFixed(2).replace(".", ",") + "€";
    }

    function getQuantity() {
        if (!quantityInput) return 1;

        let quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity < 1) quantity = 1;
        if (quantity > 99) quantity = 99;

        quantityInput.value = quantity;
        return quantity;
    }

    function updatePrice() {
        if (!editionSelect || !sousTotalEl || !totalEl) return;

        const edition = editionSelect.value;
        const unitPrice = prixParEdition[edition] || 0;
        const quantity = getQuantity();
        const subtotal = unitPrice * quantity;

        sousTotalEl.textContent = formatPrice(subtotal);
        totalEl.textContent = formatPrice(subtotal);

        if (livraisonEl) {
            livraisonEl.textContent = subtotal >= 28 ? "Offerte" : "Dépend de l'adresse";
        }
    }

    function updatePaymentButton() {
        if (!paiementSelect || !btnPaiement) return;

        const mode = paiementSelect.value;
        btnPaiement.className = "";

        if (mode === "paypal") {
            btnPaiement.classList.add("btn-paypal");
            btnPaiement.innerHTML = "Payer avec <strong>PayPal</strong>";
        } else if (mode === "crypto") {
            btnPaiement.classList.add("btn-crypto");
            btnPaiement.textContent = "Payer en Crypto";
        } else {
            btnPaiement.classList.add("btn-carte");
            btnPaiement.textContent = "Payer par Carte Bancaire";
        }
    }

    function showLogin() {
        if (!loginTab || !registerTab || !loginForm || !registerForm) return;

        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    }

    function showRegister() {
        if (!loginTab || !registerTab || !loginForm || !registerForm) return;

        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    }

    function closeAuthOverlay() {
        if (authOverlay) {
            authOverlay.style.display = "none";
        }
        document.body.classList.remove("auth-locked");
    }

    function openAuthOverlay() {
        if (authOverlay) {
            authOverlay.style.display = "flex";
        }
        document.body.classList.add("auth-locked");
    }

    function calculateAgeFromBirthdate(birthdateValue) {
        if (!birthdateValue) return 0;

        let birthDate;

        if (birthdateValue.includes("/")) {
            const parts = birthdateValue.split("/");
            if (parts.length !== 3) return 0;

            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);

            birthDate = new Date(year, month, day);
        } else {
            birthDate = new Date(birthdateValue);
        }

        if (Number.isNaN(birthDate.getTime())) return 0;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    function getUsers() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.error("Erreur lecture utilisateurs :", error);
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function findUserByEmail(email) {
        const users = getUsers();
        return users.find(function (user) {
            return user.email.toLowerCase() === email.toLowerCase();
        }) || null;
    }

    function saveCurrentUser(user) {
        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
        );
    }

    function clearCurrentUser() {
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    if (authOverlay) {
        openAuthOverlay();
    }

    if (editionSelect) {
        editionSelect.addEventListener("change", updatePrice);
    }

    if (paiementSelect) {
        paiementSelect.addEventListener("change", updatePaymentButton);
    }

    if (quantityInput) {
        quantityInput.addEventListener("input", updatePrice);
        quantityInput.addEventListener("change", updatePrice);
    }

    if (loginTab) {
        loginTab.addEventListener("click", showLogin);
    }

    if (registerTab) {
        registerTab.addEventListener("click", showRegister);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = loginEmail ? loginEmail.value.trim() : "";
            const password = loginPassword ? loginPassword.value : "";

            if (!email || !password) {
                alert("Merci de remplir l'email et le mot de passe.");
                return;
            }

            const user = findUserByEmail(email);

            if (!user) {
                alert("Aucun compte trouvé avec cet email. Crée d'abord un compte.");
                showRegister();
                return;
            }

            if (user.password !== password) {
                alert("Mot de passe incorrect.");
                return;
            }

            saveCurrentUser(user);
            alert("Connexion réussie 🌱");
            closeAuthOverlay();
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const firstName = registerFirstName ? registerFirstName.value.trim() : "";
            const lastName = registerLastName ? registerLastName.value.trim() : "";
            const sex = registerSex ? registerSex.value : "";
            const birthdateValue = registerBirthdate ? registerBirthdate.value.trim() : "";
            const email = registerEmail ? registerEmail.value.trim() : "";
            const password = registerPassword ? registerPassword.value.trim() : "";
            const confirmPassword = registerPasswordConfirm ? registerPasswordConfirm.value.trim() : "";

            const ageValid = ageConsent ? ageConsent.checked : false;
            const privacyValid = privacyConsent ? privacyConsent.checked : false;
            const termsValid = termsConsent ? termsConsent.checked : false;

            const age = calculateAgeFromBirthdate(birthdateValue);

            if (!firstName || !lastName || !sex || !birthdateValue || !email || !password || !confirmPassword) {
                alert("Merci de remplir tous les champs.");
                return;
            }

            if (age < 13) {
                alert("Tu dois avoir au moins 13 ans.");
                return;
            }

            if (!ageValid) {
                alert("Merci de confirmer l'âge minimum ou l'accord des représentants légaux.");
                return;
            }

            if (!privacyValid) {
                alert("Merci d'accepter la politique de confidentialité.");
                return;
            }

            if (!termsValid) {
                alert("Merci d'accepter les Conditions Générales de Vente et les mentions légales.");
                return;
            }

            if (password.length < 6) {
                alert("Le mot de passe doit contenir au moins 6 caractères.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            const existingUser = findUserByEmail(email);

            if (existingUser) {
                alert("Un compte avec cet email existe déjà.");
                return;
            }

            const users = getUsers();

            const newUser = {
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                birthdate: birthdateValue,
                email: email,
                password: password
            };

            users.push(newUser);
            saveUsers(users);

            alert("Compte créé avec succès 🌱");

            if (loginEmail) {
                loginEmail.value = email;
            }

            if (loginPassword) {
                loginPassword.value = password;
            }

            registerForm.reset();
            clearCurrentUser();
            showLogin();
        });
    }

    if (continueGuest) {
        continueGuest.addEventListener("click", function () {
            clearCurrentUser();
            closeAuthOverlay();
        });
    }

    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const targetId = toggle.getAttribute("data-target");
            const input = document.getElementById(targetId);

            if (!input) return;

            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            toggle.textContent = isHidden ? "👁️" : "🙈";

            toggle.style.transform = "translateY(-50%) scale(1.12)";
            setTimeout(function () {
                toggle.style.transform = "translateY(-50%) scale(1)";
            }, 150);
        });
    });

    updatePrice();
    updatePaymentButton();
    showLogin();

    if (typeof flatpickr !== "undefined" && registerBirthdate) {
        flatpickr("#registerBirthdate", {
            dateFormat: "d/m/Y",
            locale: "fr",
            maxDate: "today",
            allowInput: true
        });
    }
});