// popup.js

document.getElementById('scrapeButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getSummonerNames"}, (response) => {
            const names = response.names;
            const url = constructOpggUrl(names);
            chrome.tabs.create({url});
        });
    });
});

function constructOpggUrl(names) {
    const baseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const encodedNames = names.map(name => encodeURIComponent(name).replace(/%20/g, '+').replace(/#/g, '%23'));
    return baseUrl + encodedNames.join('%2C');
}
