var turtleAnimation;

function gameInit() {

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
        images: [assets.sprite.people["turtle"]],
        frames: {width:50, height:75, regX:25, regY:37},
        animations: {
            run:[0,3,"run",3]
        }
    });
    createjs.SpriteSheetUtils.addFlippedFrames(turtleSprite,true,false,false);

    //turtle animation
    turtleAnimation = new createjs.BitmapAnimation(turtleSprite);
    turtleAnimation.gotoAndPlay("run");

    turtleAnimation.name="turtle1";
    turtleAnimation.direction=90;
    turtleAnimation.vX = 9;
    turtleAnimation.x = 25;
    turtleAnimation.y = 40;


    turtleAnimation.currentFrame = 0;

    stage.addChild(turtleAnimation);

    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(20);

}

function tick() {
    if (turtleAnimation.x >= canvas.width - 25) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        turtleAnimation.direction = -90;
        turtleAnimation.gotoAndPlay("run_h");
    }

    if (turtleAnimation.x < 25) {
        // We've reached the left side of our screen
        // We need to walk right now
        turtleAnimation.direction = 90;
        turtleAnimation.gotoAndPlay("run");
    }

    // Moving the sprite based on the direction & the speed
    if (turtleAnimation.direction == 90) {
        turtleAnimation.x += turtleAnimation.vX;
    }
    else {
        turtleAnimation.x -= turtleAnimation.vX;
    }

    // update the stage:
    stage.update();
}

