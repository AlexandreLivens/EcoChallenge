const reviewsButton = document.getElementById("toggleReviews");
const reviewsSection = document.getElementById("reviews");

if (reviewsButton && reviewsSection) {

    reviewsSection.style.display = "none";

    reviewsButton.addEventListener("click", function (event) {

        event.preventDefault();

        if (reviewsSection.style.display === "block") {

            reviewsSection.style.opacity = "0";
            reviewsSection.style.transform = "translateY(20px)";

            setTimeout(() => {
                reviewsSection.style.display = "none";
            }, 300);

        } else {

            reviewsSection.style.display = "block";

            setTimeout(() => {
                reviewsSection.style.opacity = "1";
                reviewsSection.style.transform = "translateY(0)";
            }, 10);

            reviewsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}