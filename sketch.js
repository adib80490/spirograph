const penDistance = 300;
const offsetDistance = 100;
let done = false;
let g1;
let g2;
let g1Teeth = 35;
let g2Teeth = 80;
let g1TeethSlider;
let g2TeethSlider;
let g1DirectionSlider;
let g2DirectionSlider;
let g1Dir = 1;
let g2Dir = -1;
let button;


function setup() {
  createCanvas(800, 800);
  
  g1 = new Gear(100, 100, g1Teeth, 100, g1Dir);
  g2 = new Gear(700, 700, g2Teeth, 200, g2Dir);


  g1TeethSlider = select('#g1TeethSlider');
  g1TeethSlider.value(g1Teeth);
  let g1ValueText = select('#v1');
  g1ValueText.html(g1Teeth);
  let cb1 = select('#cb1');
  if(g1Dir==1){
    cb1.checked(true);
  }else{
    cb1.checked(false);
  }


  g2TeethSlider = select('#g2TeethSlider');
  g2TeethSlider.value(g2Teeth);
  let g2ValueText = select('#v2');
  g2ValueText.html(g2Teeth);
  let cb2 = select('#cb2')
  if(g2Dir==1){
    cb2.checked(true);
  }else{
    cb2.checked(false);
  }


  g1TeethSlider.input(()=>{
    g1ValueText.html(g1TeethSlider.value());

    drawSpirograph();

  });

  g2TeethSlider.input(()=>{
    g2ValueText.html(g2TeethSlider.value());

    drawSpirograph();

  });

  cb1.input(()=>{
    
    if(cb1.checked()){
      g1Dir=1;
    }else{
      g1Dir=-1;
    }

    drawSpirograph();

  });

  cb2.input(()=>{
    
    if(cb2.checked()){
      g2Dir=1;
    }else{
      g2Dir=-1;
    }

    drawSpirograph();

  });



  background(0);

  drawSpirograph();
  
}

function draw() {

}


function drawSpirograph(){

  background(0);

  done = false;

  g1Teeth = g1TeethSlider.value();
  g2Teeth = g2TeethSlider.value();
  //g1Dir = g1DirectionSlider.value();
  //g2Dir = g2DirectionSlider.value();

  g1 = new Gear(100, 100, g1Teeth, 100, g1Dir);
  g2 = new Gear(700, 700, g2Teeth, 200,g2Dir);

  let theta = 0;
  
  beginShape();
  noFill();
  strokeWeight(2);
  
  if(!done){
    for(let i=0; i<8000; i++){
      
      const p1 = g1.rotationStep();
      const p2 = g2.rotationStep();

      const temp = new p5.Vector(p1.x, p1.y);
      
      let vect = temp.sub(p2);
      
      vect = vect.setMag(penDistance);
      
      let offset = new p5.Vector(vect.x, vect.y);
      
      offset = offset.rotate(PI/2);

      offset = offset.setMag(offsetDistance);
      
      let shapePoint = new p5.Vector(p2.x + offset.x + vect.x, p2.y + offset.y + vect.y);

      let centerOfRotation = new p5.Vector(width/2, height/2);

      stroke(255);
      
      shapePoint.sub(centerOfRotation);

      shapePoint.rotate(radians(theta));

      vertex(shapePoint.x + width/2, shapePoint.y + height/2);

      theta +=1;

      
    }
    
    endShape();
    
    done = true;
    
    
    
  }
}



class Gear{
  
  constructor(x, y, teeth, radius, cw){
    
    this.x = x;
    this.y = y;
    this.teeth = teeth;
    this.radius = radius;
    this.cw = cw;
    this.rotation = 0;
    
  }
  
  rotationStep(){
    
    this.rotation += ((this.cw*(2*PI))/this.teeth);
    
    this.rotation = this.rotation % (2*PI);
    let px = this.radius * cos(this.rotation) + this.x;
    let py = this.radius * sin(this.rotation) + this.y;
    
    const p = new p5.Vector(px, py);
    
    return p;

  }
  
  show(){
    noFill();
    stroke(0,255,0,100);
    strokeWeight(4);
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
  
}