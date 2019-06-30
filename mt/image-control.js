document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.getElementById('image').setAttribute('style', `max-height: ${document.documentElement.clientHeight - 180}px;`);
    }
};

window.addEventListener("resize", () => {
    document.getElementById('image').setAttribute('style', `max-height: ${document.documentElement.clientHeight - 180}px;`);
});