const modalPreview = new Modal("#modalPreview", "#modalPreviewDesktop .modal-open-button");
const modalCode = new Modal("#modalCode", "#generateCode");

const modalCreator = new ModalCreator("#modalPreview", "#modalForm");
modalCreator.init();

const generateCodeButton = document.querySelector("#generateCode");
generateCodeButton.addEventListener("click", function (event) {

    const HTMLCode = ModalCodeGenerator.generateModalHTML(modalCreator.modalProperties);
    const HTMLElement = modalCode.containerElement.querySelector(".code-html pre");
    HTMLElement.innerHTML = HTMLCode;

    const CSSCode = ModalCodeGenerator.generateModalCSS(modalCreator.modalProperties);
    const CSSElement = modalCode.containerElement.querySelector(".code-css pre");
    CSSElement.innerHTML = CSSCode;

});