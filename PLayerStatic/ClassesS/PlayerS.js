class Player{
    constructor(color, gameContainer){
        this.gameContainer = gameContainer;
        this.size = 20;
        this.color = color;
        this.x = 40;
        this.y= 40;
        
        this.direction = "right";
        this.life = 2;
        this.div = this.show();
        this.lifeCounter = this.displayLife();
        this.move();
    }
    show=()=>{
        const gameContainer = this.gameContainer;
        
        const div = createDomElement(this.size, this.color, this.x, this.y)
        div.style.position = "absolute";
        
        gameContainer.appendChild(div);
        return div;
    }
    getCoordinates(){
        const {style} = this.div;
        this.oldTop = parseInt(style.top);
        this.oldLeft = parseInt(style.left);
    }
    move() {
       //adding listener on player for getting nextTop/nextLeft, based on oldTop/oldLeft and keyCode
        document.addEventListener('keyup',(event)=>{
            this.getCoordinates();
            switch(event.keyCode){
                case 40:
                    this.nextTop = this.oldTop + 20;
                    break;
                case 37:    //arrow left
                    this.nextLeft = this.oldLeft - 20;
                    break; 
                case 38:    //arrow up
                    this.nextTop = this.oldTop - 20;
                    break;
                case 39:    //arrow right
                    this.nextLeft = this.oldLeft + 20;
                    break; 
            }
        })
    }
    displayLife(){
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
    changeLife(){
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
}   


