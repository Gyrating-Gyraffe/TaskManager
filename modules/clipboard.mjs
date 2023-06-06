"use strict";

/** Retrieves Clipboard and Overlay DOM elements and sets up an event listener for scrolling.
 * 
 * End result is a clipboard that scrolls into view from below, on top of existing elements on page.
 * While scrolled upwards, the overlay element also blackens the background behind the clipboard. 
 * @param {number} maxOverlayOpacity The maximum opacity the overlay can reach. 0 = transparent, 1 = opaque.
 * @memberof (clipboard.js)
 */
export function setupClipboardScroll(maxOverlayOpacity) {
    // Validation
    if (isNaN(maxOverlayOpacity) || maxOverlayOpacity < 0 || maxOverlayOpacity > 1)
        maxOverlayOpacity = 0.5;
    // Function body - In case of an error the whole page glitches visually. Therefore we set up a try-catch block to provide feedback.
    try {
        if (isNaN(maxOverlayOpacity)) throw new Error('Input is not a valid number');
        if ((maxOverlayOpacity < 0 || maxOverlayOpacity > 1)) throw new Error('Input must be between 0 and 1');

        // Retrieve DOM elements and push Clipboard element out of view
        let clipboardElement = document.getElementById("clipboard");
        let overlay = document.getElementById("fullscreenOverlay");
        clipboardElement.style.position = "absolute";
        clipboardElement.style.transform = "translate(0, calc(100vh + 15px))";

        // Calculate max scroll and set up overlay
        let maxScrollY = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        let currentOpacity = 0;
        overlay.style.backgroundColor = `rgba(0,0,0,0)`;

        // Subscribe to scrolling action
        addEventListener("scroll", () => {
            clipboardElement.style.transform = `translateY(0, ${1000 - window.scrollY}px)`;
            currentOpacity = (window.scrollY / maxScrollY) * maxOverlayOpacity;
            currentOpacity = clamp(currentOpacity, 0, maxOverlayOpacity);
            overlay.style.backgroundColor = `rgba(0,0,0,${currentOpacity})`;
        });
    }
    catch (error) {
        console.error(`Error in setupClipboardScroll() of clipboard.js: \n-${error.message}-`);
    }
}

/** Clamp value to be between min and max (Inclusive)
 * @param {number} value Will be clamped
 * @param {number} min Min limit
 * @param {number} max Max limit
 * @returns Clamped number
 */
function clamp(value, min, max) {
    return value <= min ? min :
        value >= max ? max : value;
}
