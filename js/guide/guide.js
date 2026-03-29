const accordionButtons = document.querySelectorAll('.accordion-toggle');

accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const block = button.parentElement;
        const panel = button.nextElementSibling;
        const isOpen = block.classList.contains('active');

        document.querySelectorAll('.accordion-block').forEach((item) => {
            item.classList.remove('active');
            item.querySelector('.accordion-panel').style.maxHeight = null;
        });

        if (!isOpen) {
            block.classList.add('active');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }


    });
});