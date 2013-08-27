//scales the properties of an object by a factor
scaleObjectProps = function(factor,object,props) {
    $.each(props, function() {
        object[this] *= factor;
    });;
}
//sets properties based on json
setObjectProps = function(object,props) {
    $.each(props, function(key, value) {
        object[key] = value;
    });
}

//returns boolean
function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}