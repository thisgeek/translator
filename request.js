define(function() {
    var getVars = function(obj) {
        var props = Object.getOwnPropertyNames(obj);
        return '?' + props.map(function(name) {
            return name + '=' + obj[name];
        }).join('&');
    };

    var request = function(settings) {
        if (settings.url.length === 0) {
            throw ("URL not set.");
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", settings.url + getVars(settings.content), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    settings.success(xhr.responseText);
                } else {
                    settings.error ? settings.error(xhr.status) : console.error(xhr.status);
                }
            }
        };
        xhr.send();
    };

    return request;

});
