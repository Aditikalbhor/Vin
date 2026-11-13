const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17]
];
export function drawLandmarks(canvas, landmarks) {
    console.log("First landmark:", landmarks[0]);
    const ctx = canvas.getContext('2d');
    // Draw connections
    ctx.strokeStyle = '#AE8BFF';
    ctx.lineWidth = 3;
    HAND_CONNECTIONS.forEach(([start, end]) => {
        const point1 = landmarks[start];
        const point2 = landmarks[end];
        ctx.beginPath();
        ctx.moveTo(
            point1.x * canvas.width,
            point1.y * canvas.height
        );
        ctx.lineTo(
            point2.x * canvas.width,
            point2.y * canvas.height
        );
        ctx.stroke();
    });
    // Draw landmark points
    landmarks.forEach(point => {
        ctx.beginPath();
        ctx.arc(
            point.x * canvas.width,
            point.y * canvas.height,
            5,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    });
}
