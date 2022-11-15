class Canhao {
  constructor(x, y, w, h, angle) {
    //propriedades
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.canhaoimg = loadImage("assets/canon.png")
    this.baseimg = loadImage("assets/cannonBase.png")
  }

  //funções
  show() {
    if(keyIsDown(UP_ARROW)){
      this.angle -= 1
    }
    if(keyIsDown(DOWN_ARROW)){
      this.angle += 1
    }
    //base do canhao
    image (this.baseimg,70,20,200,200)
    //topo do canhao
    push()
    translate(this.x,this.y)
    rotate(this.angle)
imageMode(CENTER)
image(this.canhaoimg,0,0,this.w,this.h)
    pop()
  
  }
}
