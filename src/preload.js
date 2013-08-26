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