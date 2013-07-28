if(!localStorage['onoff']){
    localStorage['onoff'] = 'OFF';
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    if(localStorage['onoff'] == 'OFF'){
        switcher(activeInfo.tabId,'OFF');
    }else{
        switcher(activeInfo.tabId,'ON');
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    if(localStorage['onoff'] == 'OFF'){
        switcher(tab.id,'ON');
    }else{
        switcher(tab.id,'OFF');
    }
});

function switcher(tabId,onOrOff){
    if(onOrOff == 'OFF'){
        var status = 'disable';
    }else if(onOrOff == 'ON'){
        var status = 'enable';
    }
    chrome.browserAction.setBadgeText({text:onOrOff, tabId:tabId});
    localStorage['onoff'] = onOrOff;
    chrome.tabs.sendMessage(tabId, {status:status});
}