console.log("loading...");

/*chrome.runtime.onConnect.addListener(function (port) {
    console.log("hmmm");
    port.onMessage.addListener(function (msg) {
        if (msg.greeting == "hello")
            port.postMessage({ greeting: "Who's there?" });
        else if (msg.greeting == "test")
            port.postMessage({ greeting: "test" });
    });
    port.postMessage({ greeting: "hello" });
});*/