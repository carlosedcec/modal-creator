class Modal {

    constructor(modalContainer, openButton) {
        this.openButtonElement = document.querySelector(openButton);
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok");
        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel");
        this.closeButtonElement = document.querySelector(modalContainer + " .modal-close");
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {

        const openButtons = [this.openButtonElement];
        openButtons.forEach((item) => {
            item.addEventListener("click", (event) => {
                this.openModal(item, event);
            });
        });

        const closeButtons = [this.cancelButtonElement, this.closeButtonElement];
        closeButtons.forEach((item) => {
            item.addEventListener("click", (event) => {
                this.closeModal(item, event);
            });
        });

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

}