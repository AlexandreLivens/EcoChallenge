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
});