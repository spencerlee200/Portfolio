window.addEventListener("load", (e)=> {
  console.log("Application Started!");
  var myApp = Game.getInstance();
});

class Game {
  constructor() {
    console.log("Game Initialized...");
    //Game Properties
    this.images = [];
    this.enemies = [];
    this.foods = [];

    //Page Elements
    this.scoreField = document.querySelector('#score');
    this.healthfield = document.querySelector(".health");
    this.screen = document.querySelector("#canvas");

    //Local Storage for difficulty
    if(localStorage.getItem("diff") == null)
    {
      document.querySelector("#diff").value = "easy";
    }
    else
    {
      document.querySelector("#diff").value = localStorage.getItem("diff");
    }
    document.querySelector("#btn").addEventListener("click", (e)=> {
      var tempDiff = document.querySelector("#diff").value;
      localStorage.setItem("diff", tempDiff);
      window.location.reload();
    });
    this.difficulty = localStorage.getItem("diff");

    //Grabbing high score from local storage for display
    document.querySelector("#highS").innerHTML = localStorage.getItem("highS");
    document.querySelector("#highH").innerHTML = localStorage.getItem("highH");

    //Static Game variables
    Game.score = 0;
    Game.ctx = this.screen.getContext("2d");
    Game.sndShoot=new Audio("sounds/asteroids_shoot.wav");
    //.logged tool for debugging
    Game.logged = true;

    //Method Calls
    this.init();
  }

  init()
  {
    console.log("Init'ing game engine...");
    this.screen.style.background = "url('imgs/bg.jpg')";

    //initializing player and controls
    this.player = GameFactory.createObject("player")
    this.key = new Key();
    this.key.init();

    //Setting number of enemies and food based on user difficulty
    if(this.difficulty == "easy")
    {
      this.createEnemies(25);
      this.createFoods(10);
    }
    else if(this.difficulty == "medium")
    {
      this.createEnemies(30);
      this.createFoods(20);
    }
    else if(this.difficulty == "hard")
    {
      this.createEnemies(35);
      this.createFoods(30);
    }
    else if(this.difficulty == "extreme")
    {
      this.createEnemies(40);
      this.createFoods(40);
    }
    else if(this.difficulty == "nightmare")
    {
      this.createEnemies(45);
      this.createFoods(50);
    }
    else
    {
      console.log("WHY ARE YOU TRYING TO BREAK THIS");
      this.createEnemies(100);
      this.createFoods(10);
    }

    //executing game loop with settings
    this.updateAll();
  }

  createEnemies(num) {
      for (var i = 0; i < num; i++) {
          var o = new Enemy();
          o.x = (Math.random() * 700) + 50;
          o.y = (Math.random() * 500) + 50;
          o.setScale(Math.random() *.2 + 1);
          this.enemies.push(o);
      }
  }

  createFoods(num) {
      for (var i = 0; i < num; i++) {
          var o = new Food();
          o.x = (Math.random() * 700) + 50;
          o.y = (Math.random() * 500) + 50;
          o.setScale(Math.random() * .2 + 1);
          this.foods.push(o);
      }
  }

  getDistance(obj){
      var dx = this.player.x - obj.x;
      var dy = this.player.y - obj.y;

      var d = Math.sqrt(dx*dx + dy*dy); //Pythagorean Theorem
      return d;
  }

  //Game Loop
  updateAll()
  {
    var that = this;
    (function drawFrame() {
      window.requestAnimationFrame(drawFrame);
      if(that.player.alive)
      {
        Game.ctx.clearRect(0,0,that.screen.width, that.screen.height);
        that.enemies.forEach((el) => {
            if(el.alive) {
                if(that.getDistance(el) < el.width + 20) {
                  that.player.hurt(that.player);
                  that.healthfield.innerHTML = that.player.health;
                  document.getElementById('health').setAttribute("style","width: " + that.player.health + "px;");
                }
                el.update();
            }
        });

        that.foods.forEach((el) => {
            if(el.alive) {
                if(that.getDistance(el) < el.width + 20) {
                  Game.score++;
                  Game.sndShoot.cloneNode().play();
                  el.hit(that.player);
                  that.scoreField.innerHTML = "Score: " + Game.score;
                }
                el.update();
            }
        });

        //Checking for end game condition
        if(Game.score < that.foods.length)
        {
          that.player.update();
        }
        else
        {
          that.player.alive = false;
        }
      }
      else
      {
        //Deciding if player won or loss by looking at health
        if(that.player.health > 0)
        {
          if(Game.score >= localStorage.getItem("highS"))
          {
            localStorage.setItem("highS", Game.score);
            localStorage.setItem("highH", that.player.health);
          }
          that.player.winMsg();
        }
        else
        {
        that.player.endMsg();
        }
      }
    }());
  }

  //Creating a singleton
  static getInstance()
  {
    if(!Game._instance)
    {
      Game._instance = new Game();
      return Game._instance;
    }
    else
    {
      throw "Game Singleton already created!";
    }
  }
}

class Sprite
{
  constructor(img)
  {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.alive = true;
    this.scale = 1;
    this.width = 20;
    this.height = 20;
    this.ctx = Game.ctx;
  }

  setScale(num)
  {
    this.scale = num;
    this.width = this.width * this.scale;
    this.height = this.height * this.scale;
    return this.scale;
  }

  stageWrap(){
      if (this.x>800+this.width*.5){
          this.x = -this.width*.5
      }
      else if (this.x<-this.width*.5){
          this.x = 800+this.width*.5
      }
      else if (this.y>600+this.height*.5){
          this.y = -this.height*.5
      }
      else if (this.y<-this.height*.5){
          this.y = 600+this.height*.5
      }
  }

  stageClose(){
    if (this.x>800+this.width*.5){
      this.health = 0;
      this.alive = false;
    }
    else if (this.x<-this.width*.5){
      this.health = 0;
      this.alive = false;
    }
    else if (this.y>600+this.height*.5){
      this.health = 0;
      this.alive = false;
    }
    else if (this.y<-this.height*.5){
      this.health = 0;
      this.alive = false;
    }
  }

  draw()
  {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.width,0,2*Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  endMsg()
  {
    this.ctx.save();
    this.ctx.clearRect(0,0,800, 600);
    this.ctx.font = "150px VT323";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("YOU DIED!",140,280);
    this.ctx.font = "60px VT323";
    this.ctx.fillText("Final Score: " + Game.score,220,380);
    this.ctx.font = "30px VT323";
    this.ctx.fillText("Press enter to play again",250, 550);
    this.ctx.restore();
    if(Key.keys[13] == 1)
    {
      var tempDiff = document.querySelector("#diff").value;
      localStorage.setItem("diff", tempDiff);
      window.location.reload();
    }
  }

  winMsg()
  {
    this.ctx.save();
    this.ctx.clearRect(0,0,800, 600);
    this.ctx.font = "150px VT323";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("YOU WON!",140,280);
    this.ctx.font = "60px VT323";
    this.ctx.fillText("Final Score: " + Game.score,210,380);
    this.ctx.font = "30px VT323";
    this.ctx.fillText("Press enter to play again",250, 550);
    this.ctx.restore();
    if(Key.keys[13] == 1)
    {
      var tempDiff = document.querySelector("#diff").value;
      localStorage.setItem("diff", tempDiff);
      window.location.reload();
    }
  }
}

class Player extends Sprite
{
  constructor(x,y)
  {
    super();
    this.color = "white";
    this.health = 100;
    this.speed = 5;
    this.x = x;
    this.y = y;
  }

  update()
  {
    this.x += (Key.keys[39] - Key.keys[37]) * this.speed;
    this.y += (Key.keys[40] - Key.keys[38]) * this.speed;
    this.stageClose();
    this.draw();
  }

  hurt()
  {
    if(this.health > 0)
    {
       this.health--;
    }else
    {
      this.speed = 0;
      this.alive = false;
    }
  }
}

class Enemy extends Sprite {
    constructor(){
      super();
      this.color = "red";
      this.speed = 4;
    }

    update() {
      this.x+= this.speed;
      this.stageWrap();
      this.draw();
    }

    hit() {
      this.speed = 0;
      this.alive = false;
    }
}

class Food extends Sprite {
    constructor(){
      super();
      this.color = "blue";
      this.speed = 6;
    }

    update() {
      this.x+= this.speed;
      this.stageWrap();
      this.draw();
    }

    hit() {
      this.speed = 0;
      this.alive = false;
    }
}

class Key
{
  init()
  {
    Key.keys = [];
    for(var i = 0; i < 100; i++)
    {
      Key.keys[i] = 0;
    }
    window.addEventListener("keydown", function(e){
      e.preventDefault();
      Key.keys[e.keyCode] = 1;
    });

    window.addEventListener("keyup", function(e){
      Key.keys[e.keyCode] = 0;
    });
  }
}

class GameFactory
{
  constructor()
  {
    //SHOULD NEVER BE CALLED
  }

  static createObject(str)
  {
    if(str == "player")
    {
      return new Player(400,300);
    } else
    {
      throw "What have you done.";
    }
  }
}
