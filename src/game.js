var animations = {};
var bitmaps = {};

function gameInit() {

    //init keys
    init_keys();

    //background
    var bg = new createjs.Bitmap(assets.image.background["green-bg"]);
    setObjectProps(bg, {scale: 1, scaleX: 0.5, scaleY: 0.5});
    bitmaps["bg"] = bg;

    stage.addChild(bg);

    //add a couple gravel tiles
    for (i = 0; i < 5; i++) {
        var gravel = new createjs.Bitmap(assets.image.background["gravel50x50"]);
        setObjectProps(gravel, {scale: 1});
        gravel.setTransform(50 * i, 0);
        bitmaps["gravel" + i] = gravel;
        stage.addChild(gravel);
    }

    //turtle sprite
    var turtleSprite = new createjs.SpriteSheet({
        images: [assets.sprite.people["turtle"], assets.image.people["turtle_stand"]],
        frames: {width: 50, height: 75, regX: 25, regY: 75},
        animations: {
            run: [0, 3, "run", assets.config.gameplay.fps / 15],
            stand: [4, 4, "stand", assets.config.gameplay.fps / 15]
        }
    });
    //create flipped sprite animations as <animation>_h
    createjs.SpriteSheetUtils.addFlippedFrames(turtleSprite, true, false, false);

    //turtle animation
    var turtleAnimation = new createjs.BitmapAnimation(turtleSprite);

    //initialize
    turtleAnimation.gotoAndPlay("stand");
    setObjectProps(turtleAnimation, {
            scale: 1, speedX: 0.3, speedY: 0.2, padX: 25, padY: 75, x: 25, y: canvas.height}
    );
    //set rescale function
    turtleAnimation.rescale = function (scaleFactor) {
        scaleObjectProps(scaleFactor, this, ['scaleX', 'scaleY', 'x', 'y', 'padX', 'padY', 'speedX', 'speedY']);
    }

    //add animation to global
    animations.turtleAnimation = turtleAnimation;

    stage.addChild(turtleAnimation);

    //add listener functions
    createjs.Ticker.addEventListener("tick", turtle);

    //set up Tickers
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(assets.config.gameplay.fps);

}

function rescale(scale) {
    //rescale all animations if applicable
    $.each([animations, bitmaps], function () {

        $.each(this, function () {
            //determine new scale factor
            var scaleFactor = scale / this.scale;
            //set new scale
            this.scale = scale;

            if (typeof this.rescale == 'function') {
                //call specialized rescale if necessary
                this.rescale(scaleFactor);
            } else {
                //default rescale
                scaleObjectProps(scaleFactor, this, ['scaleX', 'scaleY', 'x', 'y']);
            }
        });

    });

}

function turtle(e) {
    var anim = animations.turtleAnimation;

    //bit-XOR
    if (keys["right"] ^ keys["left"]) {
        if (keys["right"]) {
            if (anim.currentAnimation !== "run") {
                anim.gotoAndPlay("run");
            }
            if (anim.x < canvas.width - anim.padX) {
                anim.x += anim.speedX * e.delta;
            }
        } else if (keys["left"]) {
            if (anim.currentAnimation !== "run_h") {
                anim.gotoAndPlay("run_h");
            }
            if (anim.x > anim.padX) {
                anim.x -= anim.speedX * e.delta;
            }
        }
    }

    if (keys["up"] ^ keys["down"]) {
        if (keys["up"]) {
            if (anim.y > anim.padY) {
                anim.y -= anim.speedY * e.delta;
            }
        } else if (keys["down"]) {
            if (anim.y < canvas.height) {
                anim.y += anim.speedY * e.delta;
            }
        }
    }

    if (!(keys["up"] || keys["down"] || keys["left"] || keys["right"])) {
        if (anim.currentAnimation === "run") {
            anim.gotoAndPlay("stand");
        } else if (anim.currentAnimation === "run_h") {
            anim.gotoAndPlay("stand_h");

        }

    }
    // update the stage:
    stage.update();
}


var InputHandler = {
    walkUp: function () {

    },
    walkDown: function () {

    },
    walkLeft: function () {

    },
    walkRight: function () {

    }
}

