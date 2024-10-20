document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("polygonCanvas");
    const ctx = canvas.getContext("2d");
    const sidesSlider = document.getElementById("sidesSlider");
    const nValue = document.getElementById("nValue");

    const width = canvas.width;
    const height = canvas.height;
    const radius = 200; // Radius of the circle
    const centerX = width / 2;
    const centerY = height / 2;

    function drawCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    }

    function drawPolygon(n) {
    const angleStep = (Math.PI * 2) / n;

    ctx.beginPath();
    for (let i = 0; i < n; i++) {
        const angle = i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
        ctx.moveTo(x, y);
        } else {
        ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fill();
    }

    // Convert linear slider value to non-linear scaling for n, starting from 3 sides
    function getPolygonSides(sliderValue) {
    return 3 + Math.floor(2 ** ((sliderValue + 1) / 20) - 1); // Exponential growth starting from exactly 3
    }

    function update() {
    const sliderValue = parseFloat(sidesSlider.value);
    const n = getPolygonSides(sliderValue);
    nValue.textContent = n;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw circle and polygon
    drawCircle();
    drawPolygon(n);
    }

    // Initialize
    update();

    // Update when slider changes
    sidesSlider.addEventListener("input", update);
});