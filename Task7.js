const elements = document.querySelectorAll('i');
const container = document.getElementById('inner-container');
const containerRect = container.getBoundingClientRect();


const positions = Array.from(elements).map(element => {
    const rect = element.getBoundingClientRect();
    element.style.position = 'absolute';
    element.style.left = `${rect.left - containerRect.left}px`;
    element.style.top = `${rect.top - containerRect.top}px`;
    return {
        element,
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        xDir: 1, 
        yDir: 1  
    };
});

function getRandomOffset() {
    return Math.floor(Math.random() * 6); 
}

let lastUpdateTime = 0;
const updateInterval = 9;

function moveElements(timestamp) {
    if (timestamp - lastUpdateTime >= updateInterval) {
        positions.forEach(pos => {

            const xOffset = getRandomOffset() * pos.xDir;
            const yOffset = getRandomOffset() * pos.yDir;

            let newXPosition = pos.x + xOffset;
            let newYPosition = pos.y + yOffset;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const elementWidth = pos.element.clientWidth;
            const elementHeight = pos.element.clientHeight;
            

            if (newXPosition < 0 || newXPosition > containerRect.left + containerWidth - elementWidth) {
                pos.xDir *= -1;
                newXPosition = pos.x + pos.xDir * getRandomOffset();
            }
             else if (newXPosition < containerRect.left-elementWidth) {
                pos.xDir *= -1;
                 newXPosition = pos.x + pos.xDir * getRandomOffset();
             }
            if (newYPosition < 0 || newYPosition > containerRect.top + containerHeight - elementHeight) {
                pos.yDir *= -1;
                newYPosition = pos.y + pos.yDir * getRandomOffset();
            }
            else if (newYPosition < containerRect.top-elementHeight){
                pos.yDir *= -1;
                newYPosition = pos.y + pos.yDir * getRandomOffset();
            }
            

                pos.x = newXPosition;
            pos.y = newYPosition;

            pos.element.style.left = `${newXPosition}px`;
            pos.element.style.top = `${newYPosition}px`;
        });

        lastUpdateTime = timestamp;
    }

    requestAnimationFrame(moveElements);
}

requestAnimationFrame(moveElements);
