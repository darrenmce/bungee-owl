var animations = {};

function gameInit() {

    //init keys
    init_keys();

    //background
    var bg = new createjs.Bitmap(assets.image.background["green-bg"]);
    stage.addChild(bg);

    //add a couple gravel tiles
    for (i = 0; i < 5; i++) {
        var gravel = new createjs.Bitmap(assets.image.background["gravel50x50"]);
        gravel.setTransform(50 * i, 0);
        stage.addChild(gravel);
    }

    //turtle sprite
    var turtleSprite = new createjs.SpriteSheet({
        images: [assets.sprite.people["turtle"], assets.image.people["turtle_stand"]],
        frames: {width: 50, height: 75, regX: 25, regY: 75},
        animations: {
            run: [0, 3, "run", assets.config.gameplay.fps/15],
            stand: [4, 4, "stand", assets.config.gameplay.fps/15]
        }
    });
    //create flipped sprite animations as <animation>_h
    createjs.SpriteSheetUtils.addFlippedFrames(turtleSprite, true, false, false);

    //turtle animation
    turtleAnimation = new createjs.BitmapAnimation(turtleSprite);

    //initialize
    turtleAnimation.gotoAndPlay("stand");
    turtleAnimation.speed = 0.3;
    turtleAnimation.x = 25;
    turtleAnimation.y = canvas.height;
    turtleAnimation.scale = $(canvas).data('size');
    turtleAnimation.rescale = function (scale) {
        this.x *= scale;
        this.y *= scale;
        this.scale = scale;
    }

    //add animation to global
    animations.turtleAnimation = turtleAnimation;

    stage.addChild(turtleAnimation);

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(assets.config.gameplay.fps);

}

function rescale(oldscale,scale) {
    //rescale all animations if applicable
    $.each(animations, function() {
        if (typeof this.rescale == 'function') {
            this.rescale(scale/oldscale);
        }
    });
}

function tick(e) {
    var anim = animations.turtleAnimation;

    //bit-XOR
    if (keys["right"] ^ keys["left"]) {
        if (keys["right"]) {
            if (anim.currentAnimation !== "run") {
                anim.gotoAndPlay("run");
            }
            if (anim.x < canvas.width - 25) {
                anim.x += anim.speed * e.delta;
            }
        } else if (keys["left"]) {
            if (anim.currentAnimation !== "run_h") {
                anim.gotoAndPlay("run_h");
            }
            if (anim.x > 25) {
                anim.x -= anim.speed * e.delta;
            }
        }
    } else {
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

