//scales the properties of an object by a factor
scaleObjectProps = function(factor,object,props) {
    $.each(props, function() {
        object[this] *= factor;
    });;
}

setObjectProps = function(object,props) {
    $.each(props, function(key, value) {
        object[key] = value;
    });
}