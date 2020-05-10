class Game{
    constructor(gameContainer){
        this.gameContainer = gameContainer;
        }
    start(){
        //making the player, DOM obstacles and rendering them
        this.player = new Player("teal", this.gameContainer);
        this.obstacles = new Obstacle(25, "orange", this.gameContainer);
        this.obstacles.show(5);

        //setting the player in motion
        this.run();

        //making keys functional on player
        this.player.bindKey();
    }
    run=()=>{
        //adding speed to the player to make it .move()
        const gameInterval = setInterval(()=>{
            this.player.move();
            
            //getting the player coordinates
            const {style} = this.player.div;
            const playerY = parseInt(style.top)
            const playerX = parseInt(style.left)
            
        //the logic for turning back if reaching gameContainer limits
            if(playerX <= 10){
                this.player.direction = "right";
                //this.player.direction ="stop";
            }else if(playerX >=480){
                this.player.direction = "left";
            }else if(playerY <=10){
                this.player.direction = "down";
            }else if(playerY >=490){
                this.player.direction = "up";
            }

        //the logic for losing lives when hitting obstacles
            this.obstacles.domObstacles.forEach((obstacle)=>{
            
                const obstacleSize = parseInt(obstacle.style.width);
                //getting the difference between player and each obstacle coordinates 
                const difX = Math.abs(obstacle.offsetTop-playerY)
                const difY = Math.abs(obstacle.offsetLeft-playerX)
                
                //checking the intersection and saving it as boolean constant
                const isPlayerIntersectObstacle = difX < obstacleSize && difY < obstacleSize;
                
                //the logic to change life, reset the objects on map and restart the game after hitting an obstacle
                if(isPlayerIntersectObstacle){
                   //chnaging life color, removing it and replacing with the new one
                    this.player.changeLife();
                    
                    //removing and re-rendering obstacles
                    this.obstacles.removeObstacles();
                    this.obstacles = new Obstacle(25, "orange", this.gameContainer);
                    const numOfObstacles = Math.floor(Math.random()*8 + 5)   //random between 5 and 12
                    this.obstacles.show(numOfObstacles);
                    
                    //stop the game for this round
                    clearInterval(gameInterval);
                    
                    //re-starting with the current data (player.life)
                    this.player.life > 1 ? this.run() : this.stop("GAME OVER")
                }
            })
        },200)
    }
    stop(){
        //changing obstacles color
        this.obstacles.changeColor();
        //removing player
        this.player.div.remove();
        //creating the game-over display
        const gameOverWrapper = createDomElement(250, "coral", 125, 125);
        gameOverWrapper.classList.add("game-over")
        gameOverWrapper.innerHTML = `<h1 style = "color: blanchedalmond; text-size:large">GAME OVER</h1>`
        
        //creating the Reset Game button
        const resetGame = document.createElement('button');
        resetGame.innerHTML = "Press to reset Game";
        resetGame.classList.add("reset-btn");
        //appending the button to wrapper and wrapper to gameContainer
        gameOverWrapper.appendChild(resetGame);
        this.gameContainer.appendChild(gameOverWrapper);

        //adding listener on button for resetting the Game
        resetGame.addEventListener('click', (event)=>{
            gameContainer.innerHTML="";
            this.start(); 
        //    
        });   
    }
}