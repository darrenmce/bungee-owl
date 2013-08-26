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


var keys = {};

function init_keys() {
    $(window).keydown(function (e) {
        var mappedKey = mapKey(e.which);
        if (mappedKey !== null) {
            e.preventDefault();
            keys[mappedKey] = true;
        }
    });

    $(window).keyup(function (e) {
        var mappedKey = mapKey(e.which);
        if (mappedKey !== null) {
            e.preventDefault();
            delete keys[mappedKey];
        }
    });

    //returns the mapped version of the keyboard press, null if no control exists in config.controls
    function mapKey(key) {
        return assets.config.controls[key] || null;
    }
}

var stage, assets = {}, canvas;

function init() {
    //init canvas
    canvas = document.getElementById("gameCanvas");
    //setup stage
    stage = new createjs.Stage(canvas);
    //setup loading screen
    var bar = {barx: 50, bary: 100, barw: 400, barh: 15, padx: 10, pady: 5, colour: "black", progress: 5};


    //set the loading bar text
    var loadingText = new createjs.Text("Loading...", "20px Arial", bar.colour);
    loadingText.setTransform(bar.barx, bar.bary - bar.barh - bar.pady * 4);

    //set inner changing bar - start at 5 width;
    progressbar = new createjs.Shape();
    progressbar.graphics.f(bar.colour).rect(bar.barx, bar.bary, bar.progress, bar.barh);

    //create outline for bar
    var progressbarContainer = new createjs.Shape();
    progressbarContainer.graphics.s(bar.colour).rect(bar.barx - bar.padx, bar.bary - bar.pady, bar.barw + bar.padx * 2, bar.barh + bar.pady * 2).es();

    //add to stage
    stage.addChild(progressbar);
    stage.addChild(loadingText);
    stage.addChild(progressbarContainer);

    stage.update();


    //Preload Assets
    var preloadQueue = new createjs.LoadQueue();

    var preloadFiles = [
        {id: "config", src:"cfg/config.json"}
        ,
        {id: "image.background.green-bg", src: "assets/images/backgrounds/green-bg.jpg"}
        ,
        {id: "image.background.gravel50x50", src: "assets/images/backgrounds/gravel-50x50.png"}
        ,
        {id: "image.people.turtle_stand", src: "assets/images/people/turtle-stand.png"}
        ,
        {id: "sprite.people.turtle", src: "assets/sprites/people/turtle.png"}

    ];

    preloadQueue.addEventListener("complete", function (event) {
        preloadComplete(event);
    });
    preloadQueue.addEventListener("fileload", function (event) {
        var pathList = (event.item.id).split('.');
        var assetId = pathList.pop();

        //load assets into
        var assetPath = assets;
        pathList.forEach(function (i) {
            if (typeof assetPath[i] !== "undefined") {
                assetPath = assetPath[i];
            } else {
                assetPath[i] = {};
                assetPath = assetPath[i];
            }
        });
        assetPath[assetId] = event.result;

        progressbar.graphics.clear();
        progressbar.graphics.f(bar.colour).rect(bar.barx, bar.bary, bar.progress += bar.progressInterval, bar.barh);

        stage.update();
    });

    preloadQueue.loadManifest(preloadFiles);

    //set progress interval
    bar.progressInterval = parseInt((bar.barw - 5) * (1 / preloadFiles.length), 10);


}

function preloadComplete(event) {

    console.log('Assets Loaded.');
    console.log(assets);
    //remove loading from stage
    stage.removeAllChildren();

    //start game!
    gameInit();
}