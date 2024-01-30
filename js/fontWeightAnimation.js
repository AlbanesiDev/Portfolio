document.addEventListener("mousemove", (event) => {
    const headers = document.querySelectorAll("[appFontWeight]");

    headers.forEach((header) => {
        const rect = header.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const weight = calculateWeight(x, 200, 600, window.innerWidth);
        header.style.fontWeight = weight;
    });
});

function calculateWeight(x, min, max, windowWidth) {
    const slope = (max - min) / windowWidth;
    const calculatedWeight = min + slope * x;
    return Math.min(max, Math.max(min, calculatedWeight));
}