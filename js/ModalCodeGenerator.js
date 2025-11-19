class ModalCodeGenerator {

    static generateModalHTML(config) {
        return `
<button class="modal-open-button">Open Modal</button>

<div id="modalElement" class="modal-container closed" data-open="false">
    <div class="modal">
        <header class="modal-header">
            <h3>${config.title}</h3>${config.closingButton === "topbottom" || config.closingButton === "top" ? '\n            <button class="modal-close"></button>' : ""}
        </header>
        <section class="modal-body">
            Lorem Ipsum
        </section>
        <footer class="modal-footer">${config.closingButton === "topbottom" || config.closingButton === "bottom" ? '\n            <button class="modal-cancel">Cancel</button>' : ""}${config.okButton === "default" ? '\n            <button class="modal-ok">Ok</button>' : ""}
        </footer>
    </div>
</div>
        `.trim();
    }

    static generateModalCSS(config) {
        return `
/* Modal Container */
.modal-container {
    width: ${config.width + "px"};
    height: ${config.height + "px"};
    background-color: ${config.backdropColor};
    backdrop-filter: blur(8px);
    z-index: 1;
    transition: all .3s ease-in-out;
    position: fixed;
    top: 0px;
    left: 0px;
    display: none;
    opacity: 0;
}
.modal-container[data-open="true"] {
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-container.open {
    opacity: 1;
}

/* Modal */
.modal {
    min-width: 180px;
    min-height: 220px;
    color: ${config.textColor};
    background-color: ${config.backgroundColor};
    border-radius: 4px;
    z-index: 2;
    flex-direction: column;
    position: fixed;
    transition: all .3s ease-in-out;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0);
    display: none;
}
.modal-container[data-open="true"] .modal {
    display: flex;
}
.modal-container.open .modal {
    transform: scale(1);
}

/* Modal Header */
.modal-header {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    position: relative;
}
.modal-body .modal-close,
.modal-header .modal-close {
    width: 36px;
    height: 36px;
    color: ${config.closingButtonTextColor};
    background-color: ${config.closingButtonColor};
    font-family: cursive;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    padding: 6px 12px 12px 12px;
    border-radius: 50%;
    position: absolute;
    top: -16px;
    right: -16px;
}
.modal-header .modal-close:active {
    background-position: 10px 10px;
}
.modal-header .modal-close:hover {
    background-color: ${config.closingButtonHoverColor};
}

/* Modal Body */
.modal-body {
    padding: 20px;
    flex: 1;
}

/* Modal Footer */
.modal-footer {
    padding: 20px;
    border-top: 1px solid #ccc;
    display: flex;
    gap: 8px;
    justify-content: center;
}
.modal-footer button {
    padding: 12px 20px;
    border-radius: 4px;
}
.modal-footer .modal-cancel {
    color: ${config.closingButtonTextColor};
    background-color: ${config.closingButtonColor};
}
.modal-footer .modal-cancel:hover {
    background-color: ${config.closingButtonHoverColor};
}
.modal-footer .modal-ok {
    color: ${config.okButtonTextColor};
    background-color: ${config.okButtonColor};
}
.modal-footer .modal-ok:hover {
    background-color: ${config.okButtonHoverColor};
}

/* Open Modal Button */

.open-modal-button {
    background: linear-gradient(to top, #ddd, #fff);
    color: #333;
    border: 1px solid #333;
    padding: 16px 28px;
    border-radius: 6px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
}
        `.trim();
    }

    static generateModalJS(config) {

        let buttons = "";
        if (config.okButton === "default")
            buttons += '\n        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok")';
        if (config.closingButton === "topbottom" || config.closingButton === "top")
            buttons += '\n        this.closeButtonElement = document.querySelector(modalContainer + " .modal-close")';
        if (config.closingButton === "topbottom" || config.closingButton === "bottom")
            buttons += '\n        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel")';

        let closeButtons = "";

        if (config.closingButton !== "none") {

            let closeButtonsArray = [];
            if (config.closingButton === "topbottom" || config.closeButtons === "top");
                closeButtonsArray.push("this.closeButtonElement");
            if (config.closingButton === "topbottom" || config.closeButtons === "bottom");
                closeButtonsArray.push("this.cancelButtonElement");

            closeButtonsArray = "[" + closeButtonsArray.toString() + "]";

            closeButtons = `
        const closeButtons = ${closeButtonsArray};
        closeButtons.forEach((item) => {
            if (!item) return;
            item.addEventListener("click", (event) => {
                this.closeModal();
            });
        });
            `;

        }

        let eventsKey = "";

        if (config.enterKey || config.escKey) {

            let events = "";
            if (config.escKey) {
                events += `
            if (this.options.escKey && event.key === "Escape")
                this.closeModal();`;
            }
            if (config.enterKey) {
                events += `
            if (this.options.enterKey && event.key === "Enter")
                this.closeModal();`;
            }

            eventsKey = `
        document.addEventListener("keyup", (event) => {${events}
        });
            `;

        }

        return `
class Modal {

    static activeModalsLIFOStack = [];

    constructor(modalContainer, openButton, options = {}) {

        this.openButtonElements = document.querySelectorAll(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        ${buttons}

        this.#init();

    }

    #init() {
        this.addEventListeners();
    }

    #addEventListeners() {

        this.openButtonElements.forEach((item) => {
            if (!item) return;
            item.addEventListener("click", (event) => {
                this.openModal();
            });
        });
        ${closeButtons}
        ${eventsKey}
    }

    getCurrentActiveModal() {
        return Modal.activeModalsLIFOStack[Modal.activeModalsLIFOStack.length - 1];
    }

    openModal() {
        this.containerElement.dataset.open = "true";
        Modal.activeModalsLIFOStack.push(this.containerElement);
        setTimeout(() => {
            this.containerElement.classList.add("open");
            this.containerElement.classList.remove("closed")
        }, 50);
    }

    closeModal() {
        if (this.getCurrentActiveModal() === this.containerElement) {
            this.containerElement.classList.add("closed");
            this.containerElement.classList.remove("open");
            Modal.activeModalsLIFOStack.pop(this.containerElement);
            setTimeout(() => this.containerElement.dataset.open = "false", 300);
        }
    }

}

const modal = new Modal("#modalElement", ".modal-open-button");
        `.trim();
    }

}