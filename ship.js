class Ship{
    constructor(x,y,w,h,pos,animation){

this.body=Bodies.rectangle(x,y,w,h)
World.add(world,this.body)
this.w = w
this.h = h
this.pos=pos
this.image=loadImage("assets/boat.png")
this.animation = animation
this.speed=0.05 
    }
    animar (){
        this.speed+=0.05
    }
    show(){
        var angle = this.body.angle
        var pos = this.body.position
        var index = floor(this.speed%this.animation.length) 
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
         image(this.animation[index],0,this.pos,this.w,this.h)
        pop()
    }
    remove(index){
        this.animation = brokenanimation
        this.speed = 0.05
        this.w = 300
this.h = 300
        setTimeout(() => {
          World.remove(world,ships[index].body)  
    ships.splice(index,1)
        }, 2000);
    }

}