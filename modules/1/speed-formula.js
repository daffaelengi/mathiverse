document.addEventListener("DOMContentLoaded", () => {
// Try 1 Start
document.getElementById("try-1").addEventListener("submit", function(event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById("start").value);
    let b = parseFloat(document.getElementById("end").value);

    // s(t) = t^2, so calculate the change in s over the interval
    let s_a = a * a;
    let s_b = b * b;

    // Average speed formula: (s(b) - s(a)) / (b - a)
    let averageSpeed = (s_b - s_a) / (b - a);

    document.getElementById("result-1").textContent = `${averageSpeed.toFixed(2)}`;
});
// Try 1 End
});