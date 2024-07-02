 function loadRemoteScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };
    document.head.appendChild(script);
}

function executeRemoteFunction(functionName) {
    if (typeof window[functionName] === 'function') {
        window[functionName]();
    } else {
        console.log('Function ' + functionName + ' does not exist, executing default action.');
        // Default action if the function does not exist
    }
}

function loadScriptsFromJson(jsonUrl) {
    if(jsonUrl){
        fetch(jsonUrl).then(response => response.json()).then((data) => {
            if (Array.isArray(data.scripts)) {
                data.scripts.forEach(scriptInfo => {
                    if(scriptInfo.enable){
                        loadRemoteScript(scriptInfo.url, () => executeRemoteFunction(scriptInfo.functionName));
                    }
                });
            } else {
                console.error('Invalid JSON format: "scripts" should be an array.');
            }
        }).catch((error) => {
            console.error('Error loading JSON:', error)
        });
    }
}

var jsonUrl = null;

// Load the scripts from the JSON file
loadScriptsFromJson(jsonUrl);