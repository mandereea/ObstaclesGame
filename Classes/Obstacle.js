class Obstacle{
    constructor(size, color, gameContainer){
        this.gameContainer = gameContainer;
        this.size = size;
        this.color = color;
        //this.div= this.show();
    }
    createObstacleDom=(n)=>{
        //getting gameContainer surface
        const mapWidth = this.gameContainer.getBoundingClientRect().width;
        const mapHeight = this.gameContainer.getBoundingClientRect().height;
        //creating an array to contain the obstacles (dom objects)
        const obstacles =[]
        //populating the array with n random dom objects (n will be used to render a random number of obstacles each round)
        for(let i= 0; i<n; i++){
            this.x = Math.floor(Math.random()*(mapWidth - this.size));
            this.y = Math.floor(Math.random()*(mapHeight - this.size));
            
            obstacles[i] = createDomElement(this.size, this.color, this.x, this.y);
            obstacles[i].style.textAlign ="center";
            //obstacles[i].setAttribute("id",i+1);
            //console.log(obstacles[i].id)
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
            //console.log(obstacle.style.top, obstacle.style.left)
            this.gameContainer.appendChild(obstacle)
        })
    }
    removeObstacles = ()=>{
        this.domObstacles.forEach(obstacle => obstacle.remove());
    }
    
}