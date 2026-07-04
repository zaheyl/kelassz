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

            modal.style.display = "flex";
        });
    });

    // close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

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
    threshold: 0.1
});

sections.forEach(section => observer.observe(section));