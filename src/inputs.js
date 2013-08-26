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
