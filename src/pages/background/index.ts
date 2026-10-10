import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.commands.onCommand.addListener(cmd => {
    switch (cmd) {
        case 'download-images-all-tabs-current-window':
            chrome.tabs.create({ active: true, url: 'src/pages/download/index.html' })
            break;

        default:
            throw new Error(`Unrecognized command: ${cmd}`);
    }
});