class Food{
    constructor(foodStock,lastFed){
    this.image=loadImage("fishfood.png"); 
    this.foodStock=foodStock;
    this.lastFed=lastFed;
    console.log(this.foodStock);   
    }
display(){
    imageMode(CENTER);
    image(this.image,150,250,200,200);
    var x=510;
      var y=260;
      for(var i=0; i<this.foodStock; i++){
          if(i===0){
          x=30;
          y=y+40;
    
          }
          image(this.image,x,y,200,200);
          x=x+35;
           }

}
}

