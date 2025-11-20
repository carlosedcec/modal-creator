class ModalCodeGenerator {

    static generateModalHTML(config) {
        return `
<button class="open-modal-button ">Open Modal</button>

<div id="modalElement" class="modal-container closed" data-open="false">
    <div class="modal">
        <header class="modal-header">
            <h3>${config.title}</h3>${config.closingButton === "topbottom" || config.closingButton === "top" ? '\n            <button class="modal-close">X</button>' : ""}
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");    

/* Modal Container */
.modal-container {
    width: 100vw;
    height: 100vh;
    background-color: ${config.backdropColor};
    backdrop-filter: blur(8px);
    font-family: "Poppins", "Verdana", sans-serif;
    position: fixed;
    top: 0px;
    left: 0px;
    display: none;
    transition: all .3s ease-in-out;
    opacity: 0;
    z-index: 1;
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
    width: ${config.width + "px"};
    height: ${config.height + "px"};
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
.modal-header h3 {
    margin: 0px;
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

/* Modal Buttons */

.modal button {
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    transition: background-color .2s ease-in-out, transform 0s ease-in-out;
    cursor: pointer;
    border: none;
}

.modal button:focus-visible {
    outline: 2px solid var(--color1);
}

.modal button:active {
    transform: scale(0.97);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
}

/* Open Modal Button */

.open-modal-button {
    background: linear-gradient(to top, #ddd, #fff);
    color: #333;
    border: 1px solid #333;
    padding: 16px 28px;
    font-family: "Poppins", "Verdana", sans-serif;
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

            closeButtonsArray = "[" + closeButtonsArray.toString().replaceAll(",", ", ") + "]";

            closeButtons = `
        const closeButtons = ${closeButtonsArray};
        closeButtons.forEach((item) => {
            item?.addEventListener("click", (event) => this.closeModal());
        });`;

        }

        let okButton = "";

        if (config.okButton !== "none") {
            okButton = `
        this.okButtonElement?.addEventListener("click", (event) => this.submitModal());`;
        }

        let eventsKey = "";

        if (config.enterKey || config.escKey) {

            let events = "";
            if (config.escKey) {
                events += `
            if (event.key === "Escape") this.closeModal();`;
            }
            if (config.enterKey) {
                events += `
            const isKeyPressedOnOpenButton = Array.from(this.openButtonElements).some(btn => 
                btn && (btn === event.target || btn.contains(event.target)));
            if (event.key === "Enter" && !isKeyPressedOnOpenButton) this.submitModal();`;
            }

            eventsKey = `
        document.addEventListener("keyup", (event) => {${events}
        });
            `;

        }

        return `
class Modal {

    static activeModalsLIFOStack = [];

    constructor(modalContainer, openButton, submitCallback) {

        this.openButtonElements = document.querySelectorAll(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        ${buttons}

        this.submitCallback = submitCallback;

        this.#addEventListeners();

    }

    #addEventListeners() {

        this.openButtonElements.forEach((item) => {
            item?.addEventListener("click", (event) => this.openModal(this.openCallback));
            item?.addEventListener("keydown", (event) => {
                setTimeout(() => {
                    event.target.blur();
                    this.okButtonRefocus = event.target;
                }, 100)
            });
        });
        ${closeButtons}
        ${okButton}
        ${eventsKey}
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

}

const modal = new Modal("#modalElement", ".open-modal-button"); // You can pass a callback function as a third argument to be executed on "ok button" (receive container modal element as parameter).
modal.openModal(); // Remember to open modal via javascript so it can be properly pushed into the internal class stack.
        `.trim();
    }

}