document.addEventListener("DOMContentLoaded", () => {

    // ===== Header Shadow =====
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // ===== Category accordion =====
    document.querySelectorAll('.category-header').forEach(headerBtn => {
        const panel = document.getElementById(headerBtn.getAttribute('aria-controls'));
        if (!panel) return;

        // Reflect the initial aria-expanded state (first category open by default)
        const startsOpen = headerBtn.getAttribute('aria-expanded') === 'true';
        panel.classList.toggle('open', startsOpen);

        headerBtn.addEventListener('click', () => {
            const isOpen = headerBtn.getAttribute('aria-expanded') === 'true';
            headerBtn.setAttribute('aria-expanded', String(!isOpen));
            panel.classList.toggle('open', !isOpen);
        });
    });

    // ===== Modal =====
    const modal = document.getElementById('imageModal');
    const mainImg = document.getElementById('modalMainImage');
    const detailsPanel = document.getElementById('modalDetailsPanel');

    let savedScrollY = 0;

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    document.querySelectorAll('.image-overlay, .combo-image-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const card = overlay.closest('.class-wrapper');

            const img1 = card.querySelector('.image-wrapper img, .combo-image-wrapper img');
            const details = card.querySelector('.image-details .modal-details');

            mainImg.src = img1.src;

            if (details) {
                detailsPanel.innerHTML = details.innerHTML;
                detailsPanel.style.display = "block";
            } else {
                detailsPanel.innerHTML = "";
                detailsPanel.style.display = "none";
            }

            savedScrollY = window.scrollY;
            const scrollbarWidth = getScrollbarWidth();

            modal.style.display = "flex";
            document.body.classList.add("modal-open");

            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${savedScrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        });
    });

    // Also allow clicking the course/combo image itself to open the modal
    // (since the promotion cards no longer have a separate overlay button)
    document.querySelectorAll('.popup-image').forEach(img => {
        img.addEventListener('click', () => {
            const card = img.closest('.class-wrapper');
            if (!card) return;

            const overlay = card.querySelector('.image-overlay, .combo-image-overlay');
            if (overlay) {
                overlay.dispatchEvent(new Event('click'));
                return;
            }

            // Combo cards with no overlay element: open modal directly
            const details = card.querySelector('.image-details .modal-details');
            mainImg.src = img.src;

            if (details) {
                detailsPanel.innerHTML = details.innerHTML;
                detailsPanel.style.display = "block";
            } else {
                detailsPanel.innerHTML = "";
                detailsPanel.style.display = "none";
            }

            savedScrollY = window.scrollY;
            const scrollbarWidth = getScrollbarWidth();

            modal.style.display = "flex";
            document.body.classList.add("modal-open");

            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${savedScrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        });
    });

    // close on click
    modal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");

        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.paddingRight = "";

        window.scrollTo({ top: savedScrollY, behavior: "instant" }); // no animation, no visible jump
    });

    // ===== Scroll reveal =====
    const sections = document.querySelectorAll("#ctn-2, #ctn-3, #ctn-4, #ctn-5");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.001
    });

    sections.forEach(section => observer.observe(section));

});