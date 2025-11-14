// Modals

const modalPreview = new Modal("#modalPreview", "#openModalPreview");
const modalCode = new Modal("#modalCode", "#generateCode");

// Modal Creator

const modalCreator = new ModalCreator("#modalPreview", "#modalForm", modalPreview);
modalCreator.init();

// Generate Code

const codes = {};

function formatCodeToView(code) {
    return code.replace(/<(?!\/)/g, "&lt;").replace(/>/g, "&gt").replace(/<\//g, "&lt;/")
};

const generateCodeButton = document.querySelector("#generateCode");
generateCodeButton.addEventListener("click", function (event) {

    codes.html = ModalCodeGenerator.generateModalHTML(modalCreator.modalProperties);
    const HTMLElement = modalCode.containerElement.querySelector(".code-html pre");
    HTMLElement.innerHTML = formatCodeToView(codes.html);

    codes.css = ModalCodeGenerator.generateModalCSS(modalCreator.modalProperties);
    const CSSElement = modalCode.containerElement.querySelector(".code-css pre");
    CSSElement.innerHTML = codes.css;

    codes.js = ModalCodeGenerator.generateModalJS(modalCreator.modalProperties);
    const JSElement = modalCode.containerElement.querySelector(".code-js pre");
    JSElement.innerHTML = formatCodeToView(codes.js);

});

const copyButtons = document.querySelectorAll("#modalCode .button-copy");
copyButtons.forEach((item) => {
    item.addEventListener("click", function(event) {
        navigator.clipboard.writeText(codes[item.dataset.code]);
    });
});