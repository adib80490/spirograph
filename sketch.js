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
  
  g1 = new Gear(100, 100, g1Teeth, 100, 1);
  g2 = new Gear(700, 700, g2Teeth, 200,-1);


  let containerDiv1 = createDiv();
  containerDiv1.addClass("wrapper");

  g1TeethSlider = createSlider(1,100,g1Teeth,1).parent(containerDiv1);
  g1TeethSlider.id('g1TeethSlider')

  let g1ValueText = createDiv().parent(containerDiv1);
  g1ValueText.addClass("value");
  g1ValueText.html(g1Teeth);

  let lb1 = createElement('label').parent(containerDiv1);
  lb1.addClass('container');
  
  let cb1 = createCheckbox().parent(lb1);
  let sp1 = createElement('span').parent(lb1);
  sp1.addClass('checkmark');


  g1DirectionSlider = createSlider(-1,1,g1Dir,2).parent(containerDiv1);;


  g1DirectionSlider.id('g1DirectionSlider');
  g1DirectionSlider.addClass("directionSlider");
  let containerDiv2 = createDiv();
  containerDiv2.addClass("wrapper");
  g2TeethSlider = createSlider(1,100,g2Teeth,1).parent(containerDiv2);
  g2TeethSlider.id('g2TeethSlider');
  let g2ValueText = createDiv().parent(containerDiv2);
  g2ValueText.addClass("value");
  g2ValueText.html(g2Teeth);
  g2DirectionSlider = createSlider(-1,1,g2Dir,2).parent(containerDiv2);
  g2DirectionSlider.id('g2DirectionSlider');
  g2DirectionSlider.addClass("directionSlider");

  g1TeethSlider.input(()=>{
    g1ValueText.html(g1TeethSlider.value());
  });

  g2TeethSlider.input(()=>{
    g2ValueText.html(g2TeethSlider.value());
  });

  
  button = createButton("Draw");

  button.mousePressed(() => {
    
    background(0);

    done = false;

    g1Teeth = g1TeethSlider.value();
    g2Teeth = g2TeethSlider.value();
    g1Dir = g1DirectionSlider.value();
    g2Dir = g2DirectionSlider.value();

    g1 = new Gear(100, 100, g1Teeth, 100, g1Dir);
    g2 = new Gear(700, 700, g2Teeth, 200,g2Dir);
  
    drawSpirograph();

  });

  background(0);

  drawSpirograph();
  
}

function draw() {


  
}


function drawSpirograph(){

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