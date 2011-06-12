require(["request"], function(request) {
    var contextMenus = chrome.contextMenus;

    contextMenus.create({
        "title": "Translate",
        "contexts": ["selection"],
        "onclick": function(info, tab) {
            var text = info.selectionText;
            if (text.length === 0) {
                throw ("The text you intend to translate must not be empty.");
            }
            request({
                url: "http://ajax.googleapis.com/ajax/services/language/translate",
                content: {
                    v: "1.0",
                    q: text,
                    langpair: "|en"
                },
                success: function(data) {
                    var json = JSON.parse(data),
                        translation = json.responseData.translatedText;
                    alert(translation);
                }
            });
        }
    });

});
