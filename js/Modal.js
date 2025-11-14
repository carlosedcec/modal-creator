class Modal {

    constructor(modalContainer, openButton, options = {}) {

        this.options = { okButton: true, cancelButton: true, closeButton: true, escKey: true, enterKey: true, ...options };

        this.openButtonElement = document.querySelector(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");

        this.okButtonElement = this.options.okButton ? document.querySelector(modalContainer + " .modal-ok") : undefined;
        this.cancelButtonElement = this.options.cancelButton ? document.querySelector(modalContainer + " .modal-cancel") : undefined;
        this.closeButtonElement = this.options.closeButton ? document.querySelector(modalContainer + " .modal-close") : undefined;

        this.keyHandler = this.keyHandler.bind(this);

        this.init();

    }

    init() {
        this.addEventListeners();
    }

    keyHandler(event) {
        if (this.options.escKey && event.key === "Escape")
            this.closeModal();
        if (this.options.enterKey && event.key === "Enter")
            this.closeModal();
    }

    addEventListeners() {

        const openButtons = [this.openButtonElement];
        openButtons.forEach((item) => {
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

        document.addEventListener("keyup", this.keyHandler);

    }

    openModal() {
        this.containerElement.dataset.open = "true";
        setTimeout(() => {
            this.containerElement.classList.add("open");
            this.containerElement.classList.remove("closed")
        }, 50);
    }

    closeModal() {
        this.containerElement.classList.add("closed");
        this.containerElement.classList.remove("open");
        setTimeout(() => this.containerElement.dataset.open = "false", 300);
    }

    reconfigKeysEvents(newOptions) {
        this.options = { ...this.options, ...newOptions };
        document.removeEventListener("keyup", this.keyHandler);
        document.addEventListener("keyup", this.keyHandler);
    }

}