define(["q"], function(Q) {
    var getVars = function(obj) {
        var props = Object.getOwnPropertyNames(obj);
        return '?' + props.map(function(name) {
            return name + '=' + obj[name];
        }).join('&');
    };

    var request = function(url, params) {
        if (url.length === 0) {
            throw ("URL not set.");
        }
        var deferred = Q.defer();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + getVars(params), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    deferred.resolve(xhr.responseText);
                } else {
                    deferred.reject(xhr.status);
                }
            }
        };
        xhr.send();
        return deferred.promise;
    };

    return request;

});
