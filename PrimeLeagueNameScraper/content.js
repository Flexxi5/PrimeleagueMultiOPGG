// content.js

function getSummonerNames() {
    const summonerSpans = document.querySelectorAll('span[title="League of Legends » LoL Summoner Name (EU West)"]');
    const summonerNames = [];

    summonerSpans.forEach(span => {
        summonerNames.push(span.textContent.trim());
    });
    console.log(summonerNames);
    return summonerNames;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSummonerNames") {
        const names = getSummonerNames();
        sendResponse({names});
    }
});
