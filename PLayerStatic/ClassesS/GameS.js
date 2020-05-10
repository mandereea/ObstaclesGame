class Game{
    constructor(gameContainer){
        this.gameContainer = gameContainer;
        this.gameScore = 3;
        }
    start(){
        //making the player, DOM obstacles and rendering them
        this.player = new Player("teal", this.gameContainer);
        this.obstacles = new Obstacle(20, "orange", this.gameContainer);
        this.obstacles.show(12);
        //making game functional
        this.run();
        
    }
    isPlayerOutOfMap(nextTop, nextLeft){
        //getting map top,left
        const minY = parseInt(this.gameContainer.style.top);
        const minX = parseInt(this.gameContainer.style.left);
        //getting map bottom, right (minus player size)
        const maxY = minY + parseInt(this.gameContainer.getBoundingClientRect().height) - this.player.size;
        const maxX = minX + parseInt(this.gameContainer.getBoundingClientRect().width) - this.player.size;

         //checking intersection with the 4 edges of map, based on next position(pressed key)
         const isOutOfMapTop = nextTop < minY;
         const isOutOfMapBottom = nextTop > maxY;
         const isOutOfMapLeft = nextLeft < minX;
         const isOutOfMapRight = nextLeft > maxX;
         console.log(minY, minX, maxX, maxY)
         //the array of possible map intersections, for sending to the keys
         const isOutOfMap = [isOutOfMapBottom, isOutOfMapLeft, isOutOfMapTop, isOutOfMapRight];
         //returning the array, to 'block' the key next moving event  in case of intersection
         return isOutOfMap;
    }
    isPlayerHittingObstacle(nextTop, nextLeft){
        this.obstacles.domObstacles.forEach((obstacle)=>{
            
            //getting the difference between player and each obstacle coordinates 
            const difY = Math.abs(obstacle.offsetTop-nextTop)
            const difX = Math.abs(obstacle.offsetLeft-nextLeft)
            
            //checking the intersection and saving it as boolean constant
            const isPlayerIntersectObstacle = difX < this.player.size && difY < this.player.size;
            
            //in case of intersection:
            if(isPlayerIntersectObstacle){
                //change the color of hit obstacle for 1 sec
                obstacle.style.backgroundColor="coral"
               
                //the logic to move the player in previous position before hitting obstacle, changing bac obstacle color, changing player's life
                const backInPosition = setTimeout(()=>{
                this.player.div.style.top = `${this.player.oldTop}px`;
                this.player.div.style.left = `${this.player.oldLeft}px`;
                obstacle.style.backgroundColor="orange";
                this.player.changeLife();
                },100)
                //backInPosition();
            }
        })
    
    }
    run=()=>{
        //adding listener on keys 
        document.addEventListener('keyup', (event) => { 
            this.player.getCoordinates();
            const {style} = this.player.div;
            const isPlayerOutOfMap = this.isPlayerOutOfMap(this.player.nextTop, this.player.nextLeft)
            switch (event.keyCode){
               //for each key event, check the map intersection 
               //if next move doesn't go out of map, go. if yes, stop
                case 40:    //arrow down
                    !isPlayerOutOfMap[0] ? style.top = `${this.player.oldTop + 20}px`: style.top = `${this.player.oldTop}`;
                    break;
                case 37:    //arrow left
                    !isPlayerOutOfMap[1] ? style.left = `${this.player.oldLeft - 20}px`: style.top = `${this.player.oldLeft }`;
                    break; 
                    case 38:    //arrow up
                        !isPlayerOutOfMap[2] ? style.top = `${this.player.oldTop - 20}px`: style.top = `${this.player.oldTop}`;
                        break;
                    case 39:    //arrow right
                        !isPlayerOutOfMap[3] ? style.left = `${this.player.oldLeft + 20}px`: style.left = `${this.player.oldLeft}`;
                        break;  
            }
            //checking obstacle intersection
            this.isPlayerHittingObstacle(this.player.nextTop, this.player.nextLeft);
            //gameRound over if all lives are lost
            if(this.player.life <= 0){
                this.gameRoundOver();
            }
        });
    }
    gameRoundOver(){
        this.gameScore -= 1;
        //changing score display
        this.changeScoreDisplay();
        
        //hidding the player
        this.player.div.style.display = "none";
        
        //changing obstacles color to red
        this.obstacles.changeColor();
        
        //creating the Game-Over display 
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

        
        resetGame.addEventListener('click',(event)=>{
           //removing the Game-Over div
            document.querySelector(".game-over").remove();
            //removing player and obstacles
            this.player.div.remove();
            this.obstacles.removeObstacles();
            //restarting the game
            this.start();
            
        });   
    }
    showScore(){
        const scoreWrapper = document.createElement('div');
        //array of as many rounds(hearts) as the game's score
        const scoreDisplay = [];
        for(let i=0; i < this.gameScore; i++){
            const heart = "N";
            scoreDisplay.push(heart);
        }
        //display each heart in dom
        scoreDisplay.forEach(element => {
            const elementDom = document.createElement('span');
            elementDom.innerText= element;
            elementDom.classList.add("heart-alive");
            scoreWrapper.appendChild(elementDom)

        })
        document.body.appendChild(scoreWrapper);
    }
    changeScoreDisplay(){
        //changing last element of the hearts (dom elements) array in red 
        const allLives = document.querySelectorAll(".heart-alive");
        const lostLife = allLives[allLives.length-1];
        lostLife.setAttribute("class","heart-dead");
       }
}