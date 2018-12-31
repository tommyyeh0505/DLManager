// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "<all_urls>"
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }

        tabStorage[tabId].requests[requestId] = {
            requestId: requestId,
            url: details.url,
            startTime: details.timeStamp,
            status: 'pending'
        };
		
		var url = details.url;
		console.log(url);
        console.log(tabStorage[tabId].requests[requestId]);
		var urlRegex = /(?:[^/][\d\w\.]+)$(?<=\.\w{3,4})/;
		var fileTypeRegex = /\.[0-9a-z]+$/;
		var fileName = url.match(urlRegex)[0];
		console.log(fileName);

		var typeName = (fileName.match(fileTypeRegex)[0]).substring(1,);;
		console.log(typeName);

		chrome.downloads.download({
  url: url,
  filename: typeName + "/" + fileName // Optional
});
		//return {redirectUrl:"javascript:"}
		
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
	
}());