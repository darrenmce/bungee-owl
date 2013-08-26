var turtleAnimation;

function gameInit() {

    //init keys
    init_keys();

    //background
    var bg = new createjs.Bitmap(assets.image.background["green-bg"]);
    // stage.addChild(bg);

    //add a couple gravel tiles
    for (i = 0; i < 5; i++) {
        var gravel = new createjs.Bitmap(assets.image.background["gravel50x50"]);
        gravel.setTransform(50 * i, 0);
        stage.addChild(gravel);
    }

    //turtle sprite
    var turtleSprite = new createjs.SpriteSheet({
        images: [assets.sprite.people["turtle"], assets.image.people["turtle_stand"]],
        frames: {width: 50, height: 75, regX: 25, regY: 37},
        animations: {
            run: [0, 3, "run", 3],
            stand: [4, 4, "stand", 3]
        }
    });
    //turtle bitmap (standing)

    createjs.SpriteSheetUtils.addFlippedFrames(turtleSprite, true, false, false);

    //turtle animation
    turtleAnimation = new createjs.BitmapAnimation(turtleSprite);
    turtleAnimation.gotoAndPlay("run");

    turtleAnimation.name = "turtle1";
    turtleAnimation.direction = 90;
    turtleAnimation.vX = 9;
    turtleAnimation.x = 25;
    turtleAnimation.y = 40;


    turtleAnimation.currentFrame = 0;

    stage.addChild(turtleAnimation);

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(20);

}

function tick(event) {

    //keys["right"] XOR keys["left"]
    if (keys["right"] ^ keys["left"]) {
        if (keys["right"]) {
            if (turtleAnimation.currentAnimation !== "run") {
                turtleAnimation.direction = 90;
                turtleAnimation.gotoAndPlay("run");
            }
            if (turtleAnimation.x < canvas.width - 25) {
                turtleAnimation.x += turtleAnimation.vX;
            }
        } else if (keys["left"]) {
            if (turtleAnimation.currentAnimation !== "run_h") {
                turtleAnimation.direction = -90;
                turtleAnimation.gotoAndPlay("run_h");
            }
            if (turtleAnimation.x > 25) {
                turtleAnimation.x -= turtleAnimation.vX;
            }
        }
    } else {
        if (turtleAnimation.direction == 90 && turtleAnimation.currentAnimation !== "stand") {
            turtleAnimation.gotoAndPlay("stand");
        } else if (turtleAnimation.direction == -90 && turtleAnimation.currentAnimation !== "stand_h") {
            turtleAnimation.gotoAndPlay("stand_h");

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

