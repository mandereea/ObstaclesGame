//creating the container and placing it in DOM
const gameContainer = createDomElement(500, "blanchedalmond", 10, 10);
document.body.appendChild(gameContainer);

//creating a game and starting it
const game = new Game(gameContainer);
game.start();
game.showScore();


//fct to create DOM objects based on size color and coordinates(for map, player and obstacles)
function createDomElement(size, color, x, y){
    const div = document.createElement('div');
    
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = color;
    
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.boxSizing = "border-box";
    return div;
}

       




