window.addEventListener("load", () => {
    const urlField = document.getElementById("url");
    document.getElementById("btn-copy").addEventListener("click", () => {
        navigator.clipboard.writeText(urlField.value);
    });
});