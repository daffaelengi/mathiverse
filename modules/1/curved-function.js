document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("curveCanvas");
    const ctx = canvas.getContext("2d");
    const pointsSlider = document.getElementById("pointsSlider");
    const pointsValue = document.getElementById("pointsValue");
    const lengthValue = document.getElementById("lengthValue");

    const width = canvas.width;
    const height = canvas.height;
    const a = 0; // Start of the interval
    const b = 4; // End of the interval
    const f = x => (-1.5+x) ** 2; // Define the function

    function drawCurve() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw the axes
        ctx.beginPath();
        ctx.moveTo(50, height - 50);
        ctx.lineTo(width - 50, height - 50);
        ctx.moveTo(50, 0);
        ctx.lineTo(50, height - 50);
        ctx.strokeStyle = "black";
        ctx.stroke();
        
        // Draw the function curve
        ctx.beginPath();
        ctx.moveTo(50, height - f(a * (width - 100) / (b - a)) * (height - 100) / (f(b) - f(a)) - 50);
        for (let x = a; x <= b; x += 0.01) {
            const scaledX = 50 + (x - a) * (width - 100) / (b - a);
            const scaledY = height - f(x) * (height - 100) / (f(b) - f(a)) - 50;
            ctx.lineTo(scaledX, scaledY);
        }
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }

    function drawSegments(n) {
        const segmentLength = (b - a) / n;
        let totalLength = 0;

        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const x1 = a + i * segmentLength;
            const x2 = a + (i + 1) * segmentLength;

            const y1 = f(x1);
            const y2 = f(x2);

            const scaledX1 = 50 + (x1 - a) * (width - 100) / (b - a);
            const scaledY1 = height - y1 * (height - 100) / (f(b) - f(a)) - 50;
            const scaledX2 = 50 + (x2 - a) * (width - 100) / (b - a);
            const scaledY2 = height - y2 * (height - 100) / (f(b) - f(a)) - 50;

            ctx.moveTo(scaledX1, scaledY1);
            ctx.lineTo(scaledX2, scaledY2);

            // Calculate segment length
            // totalLength += Math.sqrt((scaledX2 - scaledX1) ** 2 + (scaledY2 - scaledY1) ** 2);
        }
        ctx.strokeStyle = "red";
        ctx.stroke();
        
        return totalLength;
    }

    function update() {
        const n = parseInt(pointsSlider.value);
        pointsValue.textContent = n;

        drawCurve();
        const totalLength = drawSegments(n);
        // lengthValue.textContent = totalLength.toFixed(2);
    }

    // Initialize
    update();

    // Update when slider changes
    pointsSlider.addEventListener("input", update);
});