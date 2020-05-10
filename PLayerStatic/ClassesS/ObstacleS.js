class Obstacle{
    constructor(size, color, gameContainer){
        this.gameContainer = gameContainer;
        this.size = size;
        this.color = color;
        this.indexesArray = []
        //this.div= this.show();
    }
    createObstacleDom=(n)=>{
        //getting gameContainer surface
        const mapWidth = this.gameContainer.getBoundingClientRect().width;
        //creating an array to contain the obstacles (dom objects)
        for (let i = 0; i < mapWidth; i++){   //for rendering obstacles at multiple of 20(a player step/player size) coordinates
            if(i%20 === 0){
            this.indexesArray.push(i)
            }
        }
        const obstacles =[]
        //populating the array with n random dom objects (n will be used to render a random number of obstacles each round)
        for(let i= 0; i<n; i++){
            this.x = this.indexesArray[Math.floor((Math.random()*this.indexesArray.length))];  //Math.floor(Math.random()*(mapWidth - this.size));
            this.y = this.indexesArray[Math.floor((Math.random()*this.indexesArray.length))]; //Math.floor(Math.random()*(mapHeight - this.size));
            
            obstacles[i] = createDomElement(this.size, this.color, this.x, this.y);
            obstacles[i].style.textAlign ="center";
            obstacles[i].innerHTML = `<span>${i+1}</span>`;
        
        }
        return obstacles;
    }
    show = (n)=>{
        const domObstacles = this.createObstacleDom(n);
        //console.log(domObstacles);
        this.domObstacles = domObstacles;
        
        domObstacles.forEach(obstacle => {
            obstacle.style.position ="absolute";
            this.gameContainer.appendChild(obstacle)
        })
    }
    changeColor=()=>{
        this.domObstacles.forEach(obstacle=>obstacle.style.backgroundColor="coral");
    }
    removeObstacles = ()=>{
        this.domObstacles.forEach(obstacle => obstacle.remove());
    }
    
}