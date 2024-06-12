// background.js

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: getSummonerNamesFromPage
    }, (injectionResults) => {
        for (const frameResult of injectionResults) {
            const names = frameResult.result;
            const url = constructOpggUrl(names);
            chrome.tabs.create({url});
        }
    });
});

function getSummonerNamesFromPage() {
    const summonerSpans = document.querySelectorAll('span[title="League of Legends » LoL Summoner Name (EU West)"]');
    const summonerNames = [];

    summonerSpans.forEach(span => {
        summonerNames.push(span.textContent.trim());
    });

    return summonerNames;
}

function constructOpggUrl(names) {
    const baseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const encodedNames = names.map(name => encodeURIComponent(name).replace(/%20/g, '+').replace(/#/g, '%23'));
    return baseUrl + encodedNames.join('%2C');
}
