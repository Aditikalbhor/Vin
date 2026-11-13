export function detectPinch(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    const dx = thumbTip.x - indexTip.x;
    const dy = thumbTip.y - indexTip.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < 0.05;
}
export function detectOpenPalm(landmarks) {
    const fingers = [
        [8, 6],   // Index
        [12, 10], // Middle
        [16, 14], // Ring
        [20, 18]  // Pinky
    ];

    return fingers.every(([tip, pip]) =>
        landmarks[tip].y < landmarks[pip].y
    );
}

export function detectFist(landmarks) {
    const fingers = [
        [8, 6],
        [12, 10],
        [16, 14],
        [20, 18]
    ];

    return fingers.every(([tip, pip]) =>
        landmarks[tip].y > landmarks[pip].y
    );
}