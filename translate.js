require(["googletranslator"], function(translator) {
    var contextMenus = chrome.contextMenus;

    contextMenus.create({
        "title": "Translate",
        "contexts": ["selection"],
        "onclick": function(info, tab) {
            var text = info.selectionText;
            if (text.length === 0) {
                throw ("The text you intend to translate must not be empty.");
            }
            var response = translator.make({ to: 'en' }).translate(text);

            response.then(function(translation) {
                alert(translation);
            }, function(reason) {
                alert("Oops! Something went wrong.");
            });
        }
    });

});
