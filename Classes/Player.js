class Player{
    constructor(color, gameContainer){
        this.gameContainer = gameContainer;
        this.size = 20;
        this.color = color;
        this.x = 50;
        this.y= 50;
        
        this.direction = "right";
        this.life = 2;
        this.div = this.show();
        this.lifeCounter = this.displayLife();
    }
    move = ()=>{ 
        //getting player coordinates 
        const {style} = this.div;
        const oldTop = parseInt(style.top);
        const oldLeft = parseInt(style.left);
        
        //the logic for moving in each direction
        switch(this.direction){
                case "up":
                    style.top = `${oldTop - 10}px`;
                    break;
                case "right":
                    style.left =`${oldLeft+ 10}px`;
                    //console.log(style.left, this.direction)
                    break; 
                case "down":
                    style.top = `${oldTop + 10}px`;
                    //console.log(this.y, this.direction)
                    break;
                case "left":
                    style.left =`${oldLeft - 10}px`;
                    break;
                case "stop":
                    style.left = `${oldLeft}px`;
                    style.top = `${oldTop}px`;
                    break;
            }
        }
     
    show=()=>{
        const gameContainer = this.gameContainer;
        
        const div = createDomElement(this.size, this.color, this.x, this.y)
        div.style.position = "absolute";
        
        gameContainer.appendChild(div);
        return div;
    }
    displayLife = ()=>{
        //creating the DOM life displayer
        const lifeCounterDiv = document.createElement('span');
        lifeCounterDiv.innerHTML = this.life;
        
        const {style} = lifeCounterDiv;
        style.position ="absolute";
        style.color = "teal";
        style.top = `${this.x-70}px`;
        //saving the div on context
        this.lifeCounterDiv = lifeCounterDiv;
        //adding it to the player
        this.div.appendChild(lifeCounterDiv);
    }
    changeLife = () =>{
        //changing life color to red
        this.lifeCounterDiv.style.color="coral";
        //setting timeOut to give it 1 min red display before switching old life with new life
        const changeLife = setTimeout(()=>{
            this.lifeCounterDiv.remove();
            this.life -=1; 
            this.displayLife();
        },600)
        return changeLife;
    }
    bindKey = () =>{
        document.addEventListener('keyup', (event)=>{
            //console.log(event.keyCode);
            switch(event.keyCode){
                case 40:
                    this.direction = "down";
                    break;
                case 37:
                    this.direction ="left";
                    break; 
                case 38:
                    this.direction = "up";
                    break;
                case 39:
                    this.direction = "right"; 
                    break;
                }
                //console.log(this.direction)
                this.move();    
        })
    
    }
}