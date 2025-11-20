class Modal {

    static activeModalsLIFOStack = [];

    constructor(modalContainer, openButton, submitCallback, configs = {}) {

        this.openButtonElements = document.querySelectorAll(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");

        this.submitCallback = submitCallback;

        this.configs = {
            okButton: true,
            cancelButton: true,
            closeButton: true,
            escKey: true,
            enterKey: true,
            ...configs
        };

        this.okButtonElement = this.configs.okButton ? document.querySelector(modalContainer + " .modal-ok") : undefined;
        this.cancelButtonElement = this.configs.cancelButton ? document.querySelector(modalContainer + " .modal-cancel") : undefined;
        this.closeButtonElement = this.configs.closeButton ? document.querySelector(modalContainer + " .modal-close") : undefined;

        this.#init();

    }

    #init() {
        this.#addEventListeners();
    }

    #addEventListeners() {

        this.lastOpenTime = 0;

        this.openButtonElements.forEach((item) => {
            item?.addEventListener("click", (event) => this.openModal(this.openCallback));
            item?.addEventListener("keydown", (event) => {
                setTimeout(() => {
                    event.target.blur();
                    this.okButtonRefocus = event.target;
                }, 100)
            });
        });

        const closeButtons = [this.cancelButtonElement, this.closeButtonElement];
        closeButtons.forEach((item) => {
            item?.addEventListener("click", (event) => this.closeModal());
        });

        this.okButtonElement?.addEventListener("click", (event) => this.submitModal());

        document.addEventListener("keydown", (event) => {
            if (this.configs.escKey && event.key === "Escape") this.closeModal();
            const isKeyPressedOnOpenButton = Array.from(this.openButtonElements).some(btn => 
                btn && (btn === event.target || btn.contains(event.target)));
            if (this.configs.enterKey && event.key === "Enter" && !isKeyPressedOnOpenButton) this.submitModal();
        });

    }

    isThisCurrentActiveModal() {
        return (Modal.activeModalsLIFOStack[Modal.activeModalsLIFOStack.length - 1] === this.containerElement);
    }

    openModal(openCallback) {

        this.containerElement.classList.add("open");
        this.containerElement.classList.remove("closed");

        this.openCallback = openCallback;
        if (this.openCallback && typeof this.openCallback === "function") {
            this.openCallback(this.containerElement);
        }

        Modal.activeModalsLIFOStack.push(this.containerElement);

        setTimeout(() => { this.containerElement.dataset.open = "true"; }, 50);

    }

    closeModal() {

        if (!this.isThisCurrentActiveModal())
            return

        this.containerElement.dataset.open = "false"

        Modal.activeModalsLIFOStack.pop(this.containerElement);

        console.log(this.okButtonRefocus);

        if (this.okButtonRefocus)
            setTimeout(() => this.okButtonRefocus.focus(), 100);

        setTimeout(() => {
            this.containerElement.classList.add("closed");
            this.containerElement.classList.remove("open");
        }, 300);

    }

    submitModal() {

        if (!this.isThisCurrentActiveModal())
            return

        if (this.submitCallback && typeof this.submitCallback === "function")    
            this.submitCallback(this.containerElement);

        this.closeModal();

    }

    reconfigKeysEvents(newConfigs) {
        this.configs = { ...this.configs, ...newConfigs };
        document.removeEventListener("keyup", this.keyHandler);
        document.addEventListener("keyup", this.keyHandler);
    }

}