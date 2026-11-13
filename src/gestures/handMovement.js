export function getHandPosition(landmarks) {
    const wrist = landmarks[0];

    return {
        x: wrist.x,
        y: wrist.y
    };
}
const previousPositions = new Map();

export function getHandMovement(landmarks, handId) {
    const currentPosition = getHandPosition(landmarks);

    const previousPosition = previousPositions.get(handId);

    previousPositions.set(handId, currentPosition);

    if (!previousPosition) {
        return {
            deltaX: 0,
            deltaY: 0
        };
    }

    return {
        deltaX: currentPosition.x - previousPosition.x,
        deltaY: currentPosition.y - previousPosition.y
    };
}