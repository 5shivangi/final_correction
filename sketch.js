
    var soldier_running;
    var soldier_standing;
    var soldier_sitting;
    var player1;
    var player2;
    var bullet;
    var bulletImg;
    var gunSound;
    var gunReload;
    var bg;
    var missile;
    var missileImg;
    var health1 = 50;
    var health2 = 50;
    var score1 = 0;
    var score2 = 0;
    var blast;
    var healthImg;

    //var START = 0;
    //var PLAY = 1;
    var start=0;
    var gameState = start;
    var start;

    var playbutton;
    var playbuttonImg;
    var helpbutton;
    var helpbuttonImg;
    var helpImg;



    var bulletGroup;

function preload(){
  //loading the images
        gunSound = loadSound("..//machine gun firing sound.mp3")
        soldier_running = loadAnimation("soldier1.png","soldier2.png","soldier3.png","soldier4.png");
        soldier_runningRevert = loadAnimation("..//revert/soldier1.png","..//revert/soldier2.png","..//revert/soldier3.png","..//revert/soldier4.png")
        soldier_standing = loadImage("standing soldier.png")
        soldier_standingRevert = loadImage("..//revert/standing soldier.png");
        gunReload = loadSound("..//Gun reload sound.mp3");
        bulletImg = loadImage("bullet1.png")
        bulletImgRevert = loadImage("bullet2.png");
        bg = loadImage("bg1.jpg")
        soldier_sitting = loadAnimation("soldier4.png","soldier5.png");
        soldier_sittingRevert = loadAnimation("..//revert/soldier4.png","..//revert/soldier5.png");
        missileImg = loadImage("..//missile.png");
        blast = loadImage("..//blast.png");
        healthImg = loadImage("..//health.png");
        playbuttonImg = loadImage("playbutton.png")
        helpbuttonImg = loadImage("..//helpbutton.png")
        instruction = loadImage("..//instruction.jpg");
        backgroundmusic = loadSound("..//backgroundmusic.mp3");
  }

function setup() {
        createCanvas(windowWidth,windowHeight);

        
        player1 = createSprite(width/2-500,200);
        player1.addImage('soldier1',soldier_standing);
        player1.addAnimation("soldier1",soldier_running);
        player1.addAnimation("soldier1",soldier_sitting);
        player1.scale = 0.3;
        player1.visible=false;

        player2 = createSprite(width/1-500,200);
        player2.addImage('soldier2',soldier_standingRevert);
        player2.addAnimation("soldier2",soldier_runningRevert);
        player2.scale = 0.3;
        player2.visible=false
        // player4.addAnimation("soldiersitting",soldier_sitting);

        playbutton = createSprite(width/2,height/2);
        playbutton.addImage("button",playbuttonImg);
        playbutton.visible=false;
        playbutton.scale=0.3;

        helpbutton = createSprite(width/4,height/2);
        helpbutton.addImage("helpbutton",helpbuttonImg);
        helpbutton.visible = false;
        helpbutton.scale = 0.2;



        player1.velocityX = 0;


          
        bulletGroup1 = new Group(); 
        bulletGroup2 = new Group();
        missileGroup = new Group(); 
        healthGroup = new Group();

} 

function draw() {
    background(bg);

    if(gameState === start){
        playbutton.visible=true;
        helpbutton.visible=true;

      
      
        if(mousePressedOver(playbutton)){
        gameState="play";
        }
        if(mousePressedOver(helpbutton)){
          gameState="help";
        }

       
     
     }
   
                                
     //if(gameState=== "help"){
        // var helpImg = createSprite(width/2,height/2,10,10);
        //  helpImg.addImage(instruction);
        //  helpImg.scale = 0.5
         
      
      // }
      

     if (gameState==="play"){

        console.log("play stage")
     
        playbutton.visible=false;
        helpbutton.visible=false;
        player1.visible=true;
        player2.visible=true;

        fill("white");
        textSize(15);
        textStyle(BOLD);
        text("HEALTH =  "+health1,200,75);
            
              
        fill("white");
        textSize(15);
        textStyle(BOLD);
        text("HEALTH =  "+health2,800,75);
            
              
        fill("white");
        textSize(15);
        textStyle(BOLD);
        text("SCORE =  "+score1,200,90);
            
            
        fill("white");
        textSize(15);
        textStyle(BOLD);
        text("SCORE =  "+score2,800,90);

        if(keyWentDown("space")){
              
           gunSound.play();
           shootBullet1();
           player1.changeAnimation("soldier1",soldier_running);
              
          }

       if(keyWentDown("p")){
            gunSound.play();
            shootBullet2();
            player2.changeAnimation("soldier2",soldier_running);
        
          }
     
   
       if(keyDown("w")){
            player1.y=player1.y-7;
            player1.addAnimation("soldier1",soldier_running);
         }
     
       if(keyDown("s")){
            player1.y=player1.y+7;
            player1.changeAnimation("soldier1",soldier_sitting);
         }

       if(keyDown("d")){
            player1.x=player1.x+7;
            //player1.addAnimation("soldier",soldier_running);
         }

       if(keyDown("a")){
            player1.x=player1.x-7;
            //player1.addAnimation("soldier",soldier_running);
         }

       if(keyDown("UP_ARROW")){
            player2.y=player2.y-7;
            player2.addAnimation("soldier2",soldier_runningRevert);
         }
     
       if(keyDown("DOWN_ARROW")){
            player2.y=player2.y+7;
            player2.changeAnimation("soldier2",soldier_sittingRevert);
         }

       if(keyDown("RIGHT_ARROW")){
            player2.x=player2.x+7;
            //player1.addAnimation("soldier",soldier_running);
         }

       if(keyDown("LEFT_ARROW")){
            player2.x=player2.x-7;
            //player1.addAnimation("soldier",soldier_running);
         }
     
     
       if(bulletGroup1.isTouching(player2)){
            health2 = health2-10;
            score1 = score1+10
         }

        if(bulletGroup2.isTouching(player1)){
              health1 = health1-10
              score2 = score2+10
          }
        
        if(missileGroup.isTouching(player1)){
              health1 = health1-20
              missileGroup.destroyEach();
            }

        if(missileGroup.isTouching(player2)){
              health2 = health2-20
              missileGroup.destroyEach();
            // missileGroup.addImage(blast);
        }
     
        if(healthGroup.isTouching(player1)){
              health1 = health1+20
              healthGroup.destroyEach();
          
        }

       if(healthGroup.isTouching(player2)){
              health2 = health2+20
              healthGroup.destroyEach();
       
         // missileGroup.addImage(blast);
       }
         
        spawnMissiles();
        spawnHealth();

       // console.log(gameState);
        console.log(health2)
        if(health2 <=0){
         gameState = "end";
          }
          
             
     }
  


     if(gameState==="end"){
          console.log("end state")
          player1.visible=false;
          player2.visible=false;
     } 
   
    drawSprites();

         
         

}      




function shootBullet1(){
      bullet= createSprite(height/2, width/2, 50,20);
      bullet.x = player1.x+70;
      bullet.y= player1.y-18;
      bullet.addImage("bullet",bulletImg);
      bullet.scale=0.12;
      bullet.velocityX= 15;
      bulletGroup1.add(bullet);

}

function shootBullet2(){
      bullet= createSprite(height/2, width/2, 50,20);
      bullet.x = player2.x-70;
      bullet.y= player2.y-18;
      bullet.addImage("bullet",bulletImgRevert);
      bullet.scale=0.12;
      bullet.velocityX= -15;
      bulletGroup2.add(bullet);
}
function spawnMissiles() {
      if(frameCount % 300 === 0) {

            var missile = createSprite(400,0);
            missile.setCollider("rectangle",0,0,200,200)
            missile.addImage(missileImg);
            missile.x = Math.round(random(10,800))
            missile.velocityY = 5;
            missile.scale =  0.5;      
            missileGroup.add(missile);
          // obstacle.lifetime = 400;
          // obstaclesGroup.add(obstacle);
        
  }
 
 
}

function spawnHealth() {
      if(frameCount % 300 === 0) {

            var health = createSprite(400,0);
            health.setCollider("rectangle",0,0,200,200)
            health.addImage(healthImg);
            health.x = Math.round(random(10,800))
            health.velocityY = 5;
            health.scale =  0.5;      
            healthGroup.add(health);
          // obstacle.lifetime = 400;
          // obstaclesGroup.add(obstacle);
        
     }
}