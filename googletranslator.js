define(["request", "q"], function(request, Q) {
    var service = "http://ajax.googleapis.com/ajax/services/language/translate";
    var translator = {
        translate: function(text) {
            var deferred = Q.defer(),
                response = request(service, {
                    v: "1.0",
                    q: text,
                    langpair: [this.from, this.to].join("|")
                });
            response.then(function(val) {
                var json = JSON.parse(val),
                    status = json.responseStatus;
                if (status === 200) {
                    var translation = json.responseData.translatedText;
                    deferred.resolve(translation, json);
                } else {
                    deferred.reject("Translation service failed with status:" + status, json);
                }
            }, function(reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        }
    };

    return {
        make: function(props) {
            return Object.create(translator, {
                to: { value: props.to},
                from: { value: props.from }
            });
        }
    };

});
