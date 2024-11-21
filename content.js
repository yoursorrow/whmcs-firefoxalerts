function playSound() {
    const audio = new Audio(browser.runtime.getURL("sound/alert.mp3"));
    audio.play().catch(error => {
        console.error("Error playing sound:", error);
    });
}

function checkForStatus() {
    browser.storage.local.get(['soundCustomerReply', 'soundOpen']).then((data) => {
        const { soundCustomerReply = true, soundOpen = true } = data;

        const rows = document.querySelectorAll('tr');
        for (let row of rows) {
            const statusCell = row.querySelector('td:nth-child(6)');
            if (statusCell) {
                const statusText = statusCell.textContent.trim();
                if ((soundCustomerReply && statusText === "Customer-Reply") ||
                    (soundOpen && statusText === "Open")) {
                    playSound();
                    observer.disconnect();
                    break;
                }
            }
        }
    });
}

checkForStatus();

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            checkForStatus();
            break;
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
