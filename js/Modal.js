class Modal {

    constructor(modalContainer, openButton, options = {}) {

        this.options = { okButton: true, cancelButton: true, closeButton: true, escKey: true, enterKey: true, ...options };

        this.openButtonElements = document.querySelectorAll(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");

        this.okButtonElement = this.options.okButton ? document.querySelector(modalContainer + " .modal-ok") : undefined;
        this.cancelButtonElement = this.options.cancelButton ? document.querySelector(modalContainer + " .modal-cancel") : undefined;
        this.closeButtonElement = this.options.closeButton ? document.querySelector(modalContainer + " .modal-close") : undefined;

        this.#init();

    }

    #init() {
        this.#addEventListeners();
    }

    #addEventListeners() {

        this.openButtonElements.forEach((item) => {
            if (!item) return;
            item.addEventListener("click", (event) => {
                this.openModal();
            });
        });

        const closeButtons = [this.cancelButtonElement, this.closeButtonElement];
        closeButtons.forEach((item) => {
            if (!item) return;
            item.addEventListener("click", (event) => {
                this.closeModal();
            });
        });

        document.addEventListener("keyup", (event) => {
            if (this.options.escKey && event.key === "Escape")
                this.closeModal();
            if (this.options.enterKey && event.key === "Enter")
                this.closeModal();
        });

    }

    openModal() {
        this.containerElement.dataset.open = "true";
        setTimeout(() => {
            this.containerElement.classList.add("open");
            this.containerElement.classList.remove("closed")
        }, 50);
        ModalStack.openModalsLIFOStack.push(this.containerElement);
    }

    closeModal() {
        const currentModal = ModalStack.openModalsLIFOStack[ModalStack.openModalsLIFOStack.length - 1];
        if (currentModal === this.containerElement) {
            this.containerElement.classList.add("closed");
            this.containerElement.classList.remove("open");
            setTimeout(() => this.containerElement.dataset.open = "false", 300);
            ModalStack.openModalsLIFOStack.pop(this.containerElement);
        }
    }

    reconfigKeysEvents(newOptions) {
        this.options = { ...this.options, ...newOptions };
        document.removeEventListener("keyup", this.keyHandler);
        document.addEventListener("keyup", this.keyHandler);
    }

}