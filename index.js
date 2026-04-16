let currentIndex = 0

function slide(direction) {
    const slides = document.querySelectorAll('.slide-page')
    currentIndex += direction

    if (currentIndex < 0) currentIndex = 0
    if (currentIndex > slides.length - 1) currentIndex = slides.length - 1

    updateSlider()
}

function goTo(index) {
    currentIndex = index
    updateSlider()
}

function updateSlider() {
    const slider    = document.getElementById('slider')
    const dots      = document.querySelectorAll('.dot')
    const slideWidth = document.querySelector('.slide-page').offsetWidth  // ✅ วัดขนาดจริง

    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`  // ✅ ใช้ px แทน %

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex)
    })
}