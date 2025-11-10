class Modal {

    constructor(modalContainer) {
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        this.backdropElement = document.querySelector(modalContainer + " .modal-backdrop");
        this.openButtonElement = document.querySelector(modalContainer + " .modal-open");
        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok");
        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel");
        this.closeButtonElement = document.querySelector(modalContainer + " .modal-close");
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        const closeButtons = [this.cancelButtonElement, this.closeButtonElement];
        closeButtons.forEach((item) => {
            item.addEventListener("click", (event) => {
                this.closeModal(item, event);
            });
        });
    }

    closeModal() {
        this.containerElement.dataset.open = "false";
    }

}