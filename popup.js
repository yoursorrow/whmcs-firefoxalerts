document.addEventListener('DOMContentLoaded', () => {
    const toggleCustomerReply = document.getElementById('toggleCustomerReply');
    const toggleOpen = document.getElementById('toggleOpen');

    browser.storage.local.get(['soundCustomerReply', 'soundOpen']).then((data) => {
        toggleCustomerReply.checked = data.soundCustomerReply !== false;
        toggleOpen.checked = data.soundOpen !== false;
    });

    toggleCustomerReply.addEventListener('change', () => {
        browser.storage.local.set({ soundCustomerReply: toggleCustomerReply.checked });
    });

    toggleOpen.addEventListener('change', () => {
        browser.storage.local.set({ soundOpen: toggleOpen.checked });
    });
});
