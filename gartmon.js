(function(){
    var counterElem;
    
    if (window._GARTMONT_INSTALLED) return;
    try {
        counterElem = document.getElementById('galaxyIframe').contentWindow.document.getElementById('ID-overviewCounterValue');
    } catch(ex) {
        alert("Sorry, could not install Google Analytics Real Time Monitor. Are you currently viewing \"Real Time -> General view\" in Google Analytics?");
        return;
    }
    
    var titleBlikingTimeout;
    var lastValue;
    
    function setWindowTitle(value, visible) {
        if (visible) {
            document.title = value + " visitors";
        } else {
            document.title = '';
        }
    }
    
    function notify(value) {
        var BLINKING_PERIOD = 500;
        var NOTIFY_DURATION = 10000;
        var toggle = false;
        var times = 2*NOTIFY_DURATION / BLINKING_PERIOD;
        
        var interval = setInterval(function(){
            if (times == 0) {
                lastValue = value;
                clearInterval(interval);
                setWindowTitle(value, true);
                startMonitor();                            
            } else {
                times--;
                setWindowTitle(value, toggle);
                toggle = !toggle;
            }            
        }, 500);
    }
    
    function startMonitor() {
        var interval = setInterval(function(){
            var value = parseInt(counterElem.innerText, 10);
            if (value != lastValue) {
                clearInterval(interval);
                notify(value);
            }
        }, 1000);
    }
    window._GARTMONT_INSTALLED = true;
    alert("Google Analytics Real Time Monitor successfully installed!");
    startMonitor();
})();
