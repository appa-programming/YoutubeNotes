var youtubeNotes = {
    page: {
        startObserverChangeURL: function () {
            var oldURL = "";
            function checkURLchange(currentURL){
                if (currentURL.indexOf("youtube.com/watch") > -1 &&
                    currentURL != oldURL) {
                    youtubeNotes.dom.requestChangeDOM();
                    oldURL = currentURL;
                }
            }

            oldURL = window.location.href;
            setInterval(function() {
                checkURLchange(window.location.href);
            }, 1000);
        },
        isInsideVideoPage: function () {
            return window.location.href.indexOf("youtube.com/watch") > -1;
        }
    },
    dom: {
        numLines: 0,
        requestChangeDOM: function () {
            var $div = $("<div id='youtubenotes-div'>");
            $div.css("width", "100%");

            var $top = $("<div id='youtubenotes-top' display='inline-block'>");
            var $pickfolder = $("<input type='button' id='youtubenotes-pickfolder' value='Pick Folder...'>");
            $pickfolder.css("width", "20%");
            var $lblfolder = $("<label id='youtubenotes-lblfolder'>").text("No Folder Selected");
            $lblfolder.css("width", "60%");
            $lblfolder.css("display", "inline-block");
            var $togglenotes = $("<input type='button' id='youtubenotes-togglenotes' value='Empty'>");
            $togglenotes.css("width", "10%");
            $togglenotes.css("align", "right");
            var $savenotes = $("<input type='button' id='youtubenotes-savenotes' value='Save' disabled>");
            $savenotes.css("width", "10%");
            $savenotes.css("align", "right");
            $savenotes.click(function () {
                this.disabled = true;
            });

            $top.prepend($savenotes);
            $top.prepend($togglenotes);
            $top.prepend($lblfolder);
            $top.prepend($pickfolder);

            var $mid = $("<div id='youtubenotes-mid' display='inline-block'>");
            $mid.css("display", "none");

            var $bot = $("<div id='youtubenotes-bot' display='inline-block'>");
            $bot.css("display", "none");
            var $notes = $("<textarea id='youtubenotes-notes'>");
            $notes.css("width", "100%");
            $notes.css("resize", "none");
            $notes.css("box-sizing", "border-box");
            $notes.css("-webkit-box-sizing", "border-box");
            $notes.keyup(function () {
                youtubeNotes.dom.auto_grow(this);
            });
            $bot.prepend($notes);

            $togglenotes.click(function () {
                if ($bot.is(":visible")) {
                    $bot.slideUp("fast");
                }
                else {
                    $bot.slideDown("fast");
                }
            });

            $div.prepend($bot);
            $div.prepend($top);

            youtubeNotes.dom.insertAtIndex(1, "watch-header", $div);
        },
        insertAtIndex: function (i, id, $elem) {
            if (i === 0) {
                $("#" + id).prepend($elem);
                return;
            }

            $("#" + id + " > div:nth-child(" + (i) + ")").after($elem);
        },
        auto_grow: function (element) {
            $("#youtubenotes-savenotes").prop('disabled', false);
            var text = $(element).val();
            var currentNumLines = 0;
            if (text !== "")
                currentNumLines = text.split("\n").length;
            if (currentNumLines !== youtubeNotes.dom.numLines) {
                if (currentNumLines > youtubeNotes.dom.numLines) {
                    while ($(element).outerHeight() < element.scrollHeight + parseFloat($(element).css("borderTopWidth")) + parseFloat($(element).css("borderBottomWidth"))) {
                        $(element).height($(element).height() + 1);
                    };
                }
                else {
                    //TODO resize to original form
                }
                youtubeNotes.dom.numLines = currentNumLines;
                console.log(currentNumLines);
            }
            if (element.text !== "")
                $("#youtubenotes-togglenotes").val("Something");
            else
                $("#youtubenotes-togglenotes").val("Empty");
        }
    }
};

console.log('you\'r in the world of content.js');
youtubeNotes.page.startObserverChangeURL();
if (youtubeNotes.page.isInsideVideoPage())
    youtubeNotes.dom.requestChangeDOM();

//This line opens up a long-lived connection to your background page.
/*var port = chrome.runtime.connect({ name: "youtubenotes" });
port.onMessage.addListener(function (message, sender) {
    if (message.greeting === "hello") {
        alert(message.greeting);
        port.postMessage({ greeting: "test" });
    }
    else if (message.greeting === "test") {
        alert("test: " + message.greeting);
    }
});*/