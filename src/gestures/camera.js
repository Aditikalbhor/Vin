export async function initializeCamera(videoElement) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                height: 720
            },
            audio: false
        });

        videoElement.srcObject = stream;

        await videoElement.play();

        return stream;

    } catch (error) {
        console.error("Camera initialization failed:", error);
        throw error;
    }
}
