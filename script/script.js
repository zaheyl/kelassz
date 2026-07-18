document.addEventListener("DOMContentLoaded", () => {

    // ===== Slideshow ===== 
    /*let index = 0;
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide1, .slide2");
    const totalSlides = slideItems.length;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    window.changeSlide = function(step) {
        index += step;

        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        updateSlide();
    };

    setInterval(() => {
        changeSlide(1);
    }, 15000);
    */

    // ===== Header Shadow =====
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // ===== Modal =====
    const modal = document.getElementById('imageModal');
    const mainImg = document.getElementById('modalMainImage');
    const extraImg = document.getElementById('modalExtraImage');

    let savedScrollY = 0;

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    document.querySelectorAll('.image-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const card = overlay.closest('.class-wrapper');

            const img1 = card.querySelector('.image-wrapper img');
            const img2 = card.querySelector('.image-details img');

            mainImg.src = img1.src;

            if (img2) {
                extraImg.src = img2.src;
                extraImg.style.display = "block";
            } else {
                extraImg.style.display = "none";
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
            document.body.style.paddingRight = `${scrollbarWidth}px`; // compensate for scrollbar removal
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

    document.querySelectorAll('.popup-image').forEach(img => {
        img.addEventListener('click', () => {
            console.log('Image clicked');
        });
    });

    const sections = document.querySelectorAll("#ctn-2, #ctn-3, #ctn-4");

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