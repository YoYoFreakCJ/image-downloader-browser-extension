import { MessageTypes } from "@root/src/MessageTypes";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === MessageTypes.GetImagesAllTabs) {
        const images = Array.from(document.images).map(img => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const i = {
                url: img.src,
                widthInPx: width,
                heightInPx: height
            };

            return i;
        });
        sendResponse({ images });
    }
    // Rückgabe von true erlaubt asynchrone sendResponse-Verwendung (hier zwar nicht nötig, aber sicherer)
    return true;
});