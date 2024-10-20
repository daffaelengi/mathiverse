document.addEventListener("DOMContentLoaded", () => {
    const pointsSlider1 = document.getElementById("b-a");
    const pointsValue1 = document.getElementById("change-2-1");
    const result1 = document.getElementById("result-2-1");
    const pointsSlider2 = document.getElementById("a-b");
    const pointsValue2 = document.getElementById("change-2-2");
    const result2 = document.getElementById("result-2-2");

    function update1() {
        const n = parseInt(pointsSlider1.value)/1000;
        pointsValue1.textContent = n;
        result1.textContent = speed(5,n).toFixed(3);
    }
    function update2() {
        const n = parseInt(pointsSlider2.value)/1000;
        pointsValue2.textContent = n;
        result2.textContent = speed(5,n).toFixed(3);
    }

    function speed(a, b) {
        // s(t) = t^2, so calculate the change in s over the interval
        let s_a = a * a;
        let s_b = b * b;

        // Average speed formula: (s(b) - s(a)) / (b - a)
        let averageSpeed = (s_b - s_a) / (b - a);
        return averageSpeed;
    }

    // Initialize
    update1();
    update2();

    // Update when slider changes
    pointsSlider1.addEventListener("input", update1);
    pointsSlider2.addEventListener("input", update2);
});