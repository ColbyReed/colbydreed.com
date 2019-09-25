document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    if (charCode === 32) {
        e.preventDefault();
        return false;
    }
}

window.addEventListener('load', function () {
    window.focus();
    document.body.addEventListener('click',function(e) {
        window.focus();
    },false);
});

class Sprite
{
    constructor(type, x, y, w, h, model)
    {
        this.type = type;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.model = model;
        this.prev_x = x;
        this.prev_y = y;
        this.currentImage = new Image;
        this.dead = false;
        //this.hit_bottom = 0;
        this.coins_remaining = 5;
    }

    update()
    {
        console.log("Sprite update")
    }

    previous_location()
    {
        this.prev_x = this.x;
        this.prev_y = this.y;
    }

    doesCollide(s1, s2)
    {
        if(s1.x + s1.w <= s2.x)
        {
            return false;
        }
        else if(s1.x >= s2.x + s2.w)
        {
            return false;
        }
        else if(s1.y + s1.h <= s2.y)
        {
            return false;
        }
        else if(s1.y >= s2.y + s2.h)
        {
            return false;
        }
        else {
            return true;
        }
    }

    isThereASprite(x, y)
    {
        if(x < this.x)
        {
            return false;
        }
        else if(x > this.x + this.w)
        {
            return false;
        }
        else if(y < this.y)
        {
            return false;
        }
        else if(y > this.y + this.h)
        {
            return false;
        }
        return true;
    }

    pop_coin(x, y)
    {
        new Coin("c", x, y, 75, 75, self)
    }
}

class Mario extends Sprite
{
    constructor(type, x, y, w, h, model)
    {
        super(type, x, y, w, h, model);
        this.MarioFrame = 0;
        this.marioImages = [];
        for (let i = 0; i < 5; i++)
        {
            this.tmpImg = new Image;
            this.tmpImg.src = "mario" + i +".png";
            this.marioImages.push(this.tmpImg);
        }
        this.currentImage = this.marioImages[this.MarioFrame];
        this.y_vel = 0;
        this.air_time = 0;
        this.onBrick = false;
        this.CanHitCB = false;
        this.hit_bottom = false;
    }

    update() {
        let self = this;

        //Gravity
        this.y_vel += 2.8675309;
        this.y += this.y_vel;


        //Stop gravity when Mario is on ground
        if (this.y > 405) {
            this.y = 405;
            this.y_vel = 0;
            this.air_time = 0;
        }

        if(this.y_vel >= 0)
        {
            this.CanHitCB = true;
            this.hit_bottom = true;
        }

        //If hits brick or coinblock
        for (var i = 0; i < this.model.sprites.length; i++)
        {
            if(this.model.sprites[i].type != this.type)
            {

                    //If hits coin block. NEEDS TWEAKING
                    if (this.doesCollide(self, this.model.sprites[i]) && (this.model.sprites[i].type == "cb") && (this.hit_bottom == true)) {
                        this.hit_bottom = false;
                        this.get_out(this.model.sprites[i]);

                        //this.coins_remaining--;
                    }

                if (this.doesCollide(self, this.model.sprites[i]) && ((this.model.sprites[i].type == "b") || (this.model.sprites[i].type == "cb"))) {
                    this.get_out(this.model.sprites[i]);
                    this.hit_bottom = false;
                }
            }
        }

        //Update Mario Frame
        this.frame = (Math.abs(this.model.mario.x)/10) * 20 % 5;
        this.currentImage = this.marioImages[this.frame];
    }

    jumping(){
        if(this.air_time < 5)
        {
            this.y_vel = -30;
            this.air_time++;
            //this.hit_bottom = true;
        }
        if(this.onBrick == true)
        {
            this.y_vel = -30;
            this.onBrick = false;
            this.air_time = 0;
            //this.hit_bottom = true;
        }
    }

    get_out(s)
    {
        if((this.x + this.w) >= s.x && (this.prev_x + this.w < s.x)) // Collision from left
        {
                this.x = s.x - this.w - 1;
        }
        else if(this.x <= (s.x + s.w) && this.prev_x > (s.x + s.w)) // Collision from right
        {
            this.x = s.x + s.w + 1;
        }
        else if(this.y + this.h >= s.y && this.prev_y + this.h < s.y) //Collision from top
        {
            this.y = s.y - this.h - 1;
            this.y_vel = 0;
            this.onBrick = true;
        }
        else if(this.y <= s.y + s.h && this.prev_y > s.y + s.h) //Collision from bottom
        {
            //this.hit_bottom = 0;
            this.y_vel = 0;
            this.y = s.y + s.h + 1;
            this.y_vel = 0;

            if(this.CanHitCB == true && (this.coins_remaining >= 1)){
            this.model.pop_coin(this.x, this.y);
            this.coins_remaining--;
            this.CanHitCB = false;
            this.hit_bottom = false;
            }

            this.CanHitCB = false;
            this.hit_bottom = false;
        }
    }

    canCollide()
    {
        return false;
    }

    SpriteToJson()
    {
    }

}

class Brick extends Sprite
{
    constructor(type, x, y, w, h, model)
    {
        super(type, x, y, w, h, model);
        // this.currentImage = new Image();
        this.currentImage.src = "Brick_Block.png";
    }

    update()
    {
    }

    canCollide()
    {
        return true;
    }
}

class CoinBlock extends Sprite
{
    constructor(type, x, y, w, h, model)
    {
        super(type, x, y, w, h, model);
        // this.currentImage = new Image();
        //this.currentImage.src = "Brick_Block.png";
        this.CBFrame = 0;
        this.CB_images = [];
        for (let i = 0; i < 2; i++) {
            this.tmpImg = new Image;
            this.tmpImg.src = "block" + i + ".png";
            this.CB_images.push(this.tmpImg);
        }
        this.currentImage = this.CB_images[this.CBFrame];
    }


    update()
    {

        if(this.coins_remaining <= 1){
            this.CBFrame++;
        }
        this.currentImage = this.CB_images[this.CBFrame]
    }

    canCollide()
    {
        return true;
    }

}

class Coin extends Sprite
{
    constructor(type, x, y, w, h, model)
    {
        super(type, x, y, w, h, model);
        this.currentImage.src = "coin.png";
        this.y_vel = -25;

        //Randomizes direction of coin pop
        let num = Math.floor(Math.random()*10) + 1;
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        this.x_vel = num;
    }

    update()
    {
        if(this.y > 405)
        {
            this.dead = true;
        }

        this.y_vel += 2.8675309;
        this.y += this.y_vel;

        this.x_vel += 0;
        this.x += this.x_vel;
    }


    canCollide()
    {
        return false;
    }
}


class Model
{
    constructor(x, y)
    {
        self = this;

        this.sprites = [];
        this.mario = new Mario("m", 150,405,60,95, self);
        this.sprites.push(this.mario);
        this.sprites.push(new Brick("b", 300,400,90,90, self));
        this.sprites.push(new Brick("b", 400,300,90,90, self));
        this.sprites.push(new Brick("b", 490,300,90,90, self));



        //this.coinblock = new CoinBlock("cb", x, y, 90, 90, self)
        this.sprites.push(new CoinBlock("cb", 500,50,90,90, self))
        this.fixY = -29;
        this.fixX = -9;
        //this.coins_remaining = 5;
    }

    update()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].update();
            if(this.sprites[i].dead == true)
            {
                this.sprites.splice(i, 1);
            }
        }
    }

    previous_location()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].previous_location();
        }
    }

    pop_coin(x, y)
    {
        // if(this.sprites.coins_remaining >= 1)
        // {
        //     //var self = this;
        //     this.sprites.push(new Coin("c", x, y - 83 ,75,75, self))
        //
        //     this.sprites.coins_remaining--;
        // }

        this.sprites.push(new Coin("c", x, y - 90, 75, 75, self))
    }

    addBrickSprite(x, y)
    {
        let self = this;
        this.sprites.push(new Brick("b", x + this.mario.x - 150 + this.fixX, y + this.fixY, 90, 90, self));
    }

    editBrick(x, y)
    {
        let clickedOnSprite = false;
        for(let i = 0; i < this.sprites.length; i++)
        {
            if(this.sprites[i].isThereASprite(x + this.fixX + this.mario.x - 150, y + this.fixY))
            {
                this.sprites.splice(i, 1);
                clickedOnSprite = true
            }
        }

        if(clickedOnSprite == false)
        {
            this.addBrickSprite(x, y)
        }
    }

    addCoinBlockSprite(x, y)
    {
        let self = this;
        this.sprites.push(new CoinBlock("cb", x - 150 + this.mario.x + this.fixX, y + this.fixY, 89, 83, self));
    }

    editCoinBlock(x, y)
    {
        let clickedOnCoinBlock = false;
        for(let i = 0; i < this.sprites.length; i++)
        {
            if(this.sprites[i].isThereASprite(x + this.fixX + this.mario.x - 150, y + this.fixY) && this.sprites[i].type == "cb")
            {
                this.sprites.splice(i, 1);
                clickedOnCoinBlock = true;
            }
        }

        if(clickedOnCoinBlock == false)
        {
            this.addCoinBlockSprite(x, y);
        }
    }

    loadGame()
    {
        console.log("Game has loaded.");
    }
}


class View
{
    constructor(model)
    {
        this.model = model;
        this.canvas = document.getElementById("canvas");

        this.background = new Image();
        this.background.src = "backdrop.jpg";
    }

    update()
    {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,1000,600);

        ctx.fillStyle=('#3cbcfd');
        ctx.fillRect(0,0,1000,600);

        ctx.fillStyle=('black');
        ctx.fillRect(0,500,1000,1);

        ctx.drawImage(this.background, -(this.model.mario.x/2 + 150), 0, this.background.width*2, this.background.height*3/2);

        for(let i = 0; i < this.model.sprites.length; i++)
        {
            let sprite = this.model.sprites[i];
            ctx.drawImage(sprite.currentImage, sprite.x - this.model.mario.x + 150, sprite.y);
        }
    }
}







class Controller
{
    constructor(model, view)
    {
        this.model = model;
        this.view = view;
        this.key_right = false;
        this.key_left = false;
        this.key_up = false;
        this.key_down = false;
        this.jumpQueue = 0;
        this.gameLoaded = false;

        let self = this;

        //view.canvas.addEventListener("click", function(event) { self.onClick(event); });

        view.canvas.addEventListener("click", function(event) {self.onClick(event); }, true);
        view.canvas.addEventListener("contextmenu",function(event) {
            event.preventDefault();
            self.onRightClick(event);
            return false;
        },false);

        document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
        document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
    }

    onClick(event)
    {
        this.model.editBrick(event.pageX, event.pageY);
        return true;
    }

    onRightClick(event)
    {
        this.model.editCoinBlock(event.pageX, event.pageY);
        return false;
    }

    keyDown(event)
    {
        if(event.keyCode == 39) this.key_right = true;
        else if(event.keyCode == 37) this.key_left = true;
        else if(event.keyCode == 32)
        {
            this.key_space = true;
            this.jumpQueue++;
        }
        else if(event.keyCode == 40) this.key_down = true;
    }

    keyUp(event)
    {
        if(event.keyCode == 39) this.key_right = false;
        else if(event.keyCode == 37) this.key_left = false;
        else if(event.keyCode == 32) this.key_space = false;
        else if(event.keyCode == 40) this.key_down = false;
    }

    update()
    {
        this.model.previous_location();

        if(!this.gameLoaded)
        {
            this.model.loadGame();
            this.gameLoaded = !this.gameLoaded;
        }
        if(this.key_right)
        {
            this.model.mario.x += 12;
        }

        if(this.key_left)
        {
            this.model.mario.x -= 12;
        }

        if(this.key_space || this.jumpQueue > 0)
        {
            this.model.mario.jumping();
            this.jumpQueue = 0;
        }
    }
}





class Game
{
    constructor()
    {
        this.model = new Model();
        this.view = new View(this.model);
        this.controller = new Controller(this.model, this.view);
    }

    onTimer()
    {
        this.controller.update();
        this.model.update();
        this.view.update();
    }
}


let game = new Game();
let timer = setInterval(function() { game.onTimer(); }, 40);