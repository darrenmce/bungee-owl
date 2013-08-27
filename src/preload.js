var stage,
    canvas,
    assets = {};

function init() {
    //init canvas
    canvas = document.getElementById("gameCanvas");
    //setup stage
    stage = new createjs.Stage(canvas);
    //setup loading screen
    var bar = {barx: 50, bary: 100, barw: 400, barh: 15, padx: 10, pady: 5, colour: "white", progress: 5};


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

    //load manifest and preload
    $.getJSON('cfg/preload_manifest.json', function (manifest) {


        //Preload Assets
        var preloadQueue = new createjs.LoadQueue();

        preloadQueue.addEventListener("complete", preloadComplete);
        preloadQueue.addEventListener("fileload", function (event) {
            var pathList = (event.item.id).split('.');
            var assetId = pathList.pop();

            //load assets into {assets}
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

        preloadQueue.loadManifest(manifest);

        //set progress interval
        bar.progressInterval = parseInt((bar.barw - 5) * (1 / manifest.length), 10);

    });

}

function preloadComplete(event) {

    console.log('Assets Loaded.');
    console.log(assets);
    //remove loading from stage
    stage.removeAllChildren();

    //start game!
    gameInit();
}