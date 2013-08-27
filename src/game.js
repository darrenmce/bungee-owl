var animations = {};

function gameInit() {

    //init keys
    init_keys();

    //background
    var bg = new createjs.Bitmap(assets.image.background["green-bg"]);
    setObjectProps(bg, {scaleX: 0.5, scaleY: 0.5});

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
            speedX: 0.3, speedY: 0.2, padX: turtleSprite._frameWidth/2, padY: turtleSprite._frameHeight, x: turtleSprite._frameWidth/2, y: assets.config.resolution.height
        }
    );
    console.log(turtleAnimation);

    //add animation to global
    animations.turtleAnimation = turtleAnimation;

    stage.addChild(turtleAnimation);

    //add listener functions
    createjs.Ticker.addEventListener("tick", turtle);

    //set up Tickers
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(assets.config.gameplay.fps);

}

function rescale(scalex, scaley) {
    stage.scaleX = scalex;
    stage.scaleY = scaley;
}

function turtle(e) {
    var anim = animations.turtleAnimation;

    //bit-XOR
    if (keys["right"] ^ keys["left"]) {
        if (keys["right"]) {
            if (anim.currentAnimation !== "run") {
                anim.gotoAndPlay("run");
            }
            if (anim.x < assets.config.resolution.width - anim.padX) {
                anim.x = Math.min(anim.x + anim.speedX * e.delta, assets.config.resolution.width - anim.padX);
            }
        } else if (keys["left"]) {
            if (anim.currentAnimation !== "run_h") {
                anim.gotoAndPlay("run_h");
            }
            if (anim.x > anim.padX) {
                anim.x = Math.max(anim.x-anim.speedX * e.delta, anim.padX);
            }
        }
    }

    if (keys["up"] ^ keys["down"]) {
        if (keys["up"]) {
            if (anim.y > anim.padY) {
                anim.y = Math.max(anim.y - anim.speedY * e.delta, anim.padY);
            }
        } else if (keys["down"]) {
            if (anim.y < assets.config.resolution.height) {
                anim.y = Math.min(anim.y + anim.speedY * e.delta, assets.config.resolution.height);
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

