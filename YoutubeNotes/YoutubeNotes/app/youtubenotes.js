var youtubeNotes = {
    requestChangeDOM: function () {
        var $label = $("<label>").text('Hello World!');
        youtubeNotes.insertAtIndex(1, "watch-header", $label);
    },
    insertAtIndex: function (i, id, $elem) {
        if (i === 0) {
            $("#" + id).prepend($elem);
            return;
        }


        $("#" + id + " > div:nth-child(" + (i) + ")").after($elem);
    }
};

console.log('you\'r in the world of content.js');
youtubeNotes.requestChangeDOM();

//This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({ name: "youtubenotes" });
port.onMessage.addListener(function (message, sender) {
    if (message.greeting === "hello") {
        alert(message.greeting);
    }
});

chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
    console.log(response.farewell);
});