document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const answer = item.querySelector(".faq-answer");

            document.querySelectorAll(".faq-item").forEach((other) => {
                if (other !== item) other.classList.remove("open");
            });

            item.classList.toggle("open");
        });
    });
});
