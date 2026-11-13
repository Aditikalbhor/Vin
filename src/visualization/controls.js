export function rotateObject(object, deltaX, deltaY) {
    const sensitivity = 5;

    object.rotation.y += deltaX * sensitivity;
    object.rotation.x += deltaY * sensitivity;
git add .
git commit -m "feat: implement hand-controlled 3D object rotation"
git push}