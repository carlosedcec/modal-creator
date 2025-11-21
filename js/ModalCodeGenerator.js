class ModalCodeGenerator {

    static generateModalHTML(config) {

        function getHeaderHTML(config) {

            let headerHTML = "";

            if (ModalCreator.hasCloseButton(config.closingButton))
                headerHTML = `
        <button class="modal-close">X</button>`;

            if (config.showHeader) {
                headerHTML = `
        <header class="modal-header">
            <h3>${config.title}</h3>${ModalCreator.hasCloseButton(config.closingButton) ? '\n            <button class="modal-close">X</button>' : ""}
        </header>`;
            }

            return headerHTML;
        }

        function getFooterHTML(config) {

            let footerHTML = "";

            if (config.showFooter) {
                footerHTML = `
        <footer class="modal-footer">${ModalCreator.hasCancelButton(config.closingButton) ? '\n            <button class="modal-cancel">Cancel</button>' : ""}${ModalCreator.hasOkButton(config.okButton) ? '\n            <button class="modal-ok">Ok</button>' : ""}
        </footer>`;
            }

            return footerHTML;

        }

        function getModalHTML() {
            return `
<button class="open-modal-button ">Open Modal</button>

<div id="modalElement" class="modal-container closed" data-open="false">
    <div class="modal">${getHeaderHTML(config)}
        <section class="modal-body">
            Lorem Ipsum
        </section>${getFooterHTML(config)}
    </div>
</div>`;
        }

        return getModalHTML().trim();
    }

    static generateModalCSS(config) {

        function getHeaderCSS(config) {

            if (!config.showHeader && (config.closingButton === "none" || config.closeButton === "bottom"))
                return "";

            let closeButtonCSS = "";

            if (config.closingButton !== "none") {
                const closingButtonSelector = (!config.showHeader && ModalCreator.hasCloseButton(config.closingButton)) ? ".modal > .modal-close" : ".modal-header .modal-close";
                closeButtonCSS = `
${closingButtonSelector} {
    width: 36px;
    height: 36px;
    color: ${config.closingButtonTextColor};
    background-color: ${config.closingButtonColor};
    font-weight: bold;
    text-align: center;
    padding-top: 2px;
    padding-right: 7px;
    border-radius: 50%;
    position: absolute;
    top: -16px;
    right: -16px;
}
${closingButtonSelector}:hover {
    background-color: ${config.closingButtonHoverColor};
}`;
            }
            
            if (!config.showHeader && ModalCreator.hasCloseButton(config.closingButton)) {
                return `
/* Modal Close Button */` + closeButtonCSS;
            }

            const headerCSS = `
/* Modal Header */
.modal-header {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    position: relative;
}${closeButtonCSS}
.modal-header h3 {
    margin: 0px;
}`;

            return headerCSS;

        };

        function getFooterCSS(config) {
            
            if (!config.showFooter)
                return "";

            let modalFooterCSS = `
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
}`;

            if (ModalCreator.hasCancelButton(config.closingButton)) {
                modalFooterCSS += `
.modal-footer .modal-cancel {
    color: ${config.closingButtonTextColor};
    background-color: ${config.closingButtonColor};
}
.modal-footer .modal-cancel:hover {
    background-color: ${config.closingButtonHoverColor};
}`;
            }

            if (ModalCreator.hasOkButton(config.okButton)) {
                modalFooterCSS += `
.modal-footer .modal-ok {
    color: ${config.okButtonTextColor};
    background-color: ${config.okButtonColor};
}
.modal-footer .modal-ok:hover {
    background-color: ${config.okButtonHoverColor};
}
`;
            }

            return modalFooterCSS;
        }

        function getButtonsCSS(config) {

            if (ModalCreator.hasCloseButton(config.closingButton) || ModalCreator.hasCancelButton(config.closingButton) || ModalCreator.hasOkButton(config.okButton)) {
                return `
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
}`;
            }

            return "";

        }

        function getModalCSS(config) {
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
${getHeaderCSS(config)}

/* Modal Body */
.modal-body {
    padding: 20px;
    flex: 1;
}
${getFooterCSS(config)}${getButtonsCSS(config)}

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
}`;
        }

        return getModalCSS(config).trim();
    }

    static generateModalJS(config) {

        function getConstructorButtonsJS() {

            let buttons = "";
            if (ModalCreator.hasOkButton(config.okButton) && config.showFooter)
                buttons += '\n        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok")';
            if (ModalCreator.hasCloseButton(config.closingButton))
                buttons += '\n        this.closeButtonElement = document.querySelector(modalContainer + " .modal-close")';
            if (ModalCreator.hasCancelButton(config.closingButton) && config.showFooter)
                buttons += '\n        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel")';

            return buttons;

        }

        function getCloseButtonJS(config) {
            if (ModalCreator.hasCloseButton(config.closingButton)) {
                return `
        this.closeButtonElement.addEventListener("click", (event) => this.closeModal(true));`;
            }
            return "";
        }

        function getCancelButtonJS(config) {
            if (ModalCreator.hasCancelButton(config.closingButton) && config.showFooter) {
                return `
        this.cancelButtonElement.addEventListener("click", (event) => this.closeModal(true));`;
            }
            return "";
        }

        function getOkButtonEventJS(config) {
            if (ModalCreator.hasOkButton(config.okButton) && config.showFooter) {
                return `
        this.okButtonElement.addEventListener("click", (event) => this.submitModal(true));`;
            }
            return "";
        }

        function getKeyEvents(config) {

            let keyEvents = "";

            if (config.enterKey || config.escKey) {

                let events = "";
                if (config.escKey) {
                    events += `
            if (event.key === "Escape") this.closeModal(true);`;
            }
                if (config.enterKey) {
                    events += `
            const isKeyPressedOnOpenButton = Array.from(this.openButtonElements).some(btn => 
                btn && (btn === event.target || btn.contains(event.target)));
            if (event.key === "Enter" && !isKeyPressedOnOpenButton) this.submitModal(true);`;
                }

                keyEvents = `
        document.addEventListener("keyup", (event) => {${events}
        });`;

            }

            return keyEvents;

        }

        function getModalJS() {

            return `
class Modal {

    static activeModalsLIFOStack = [];

    constructor(modalContainer, openButton, submitCallback) {

        this.openButtonElements = document.querySelectorAll(openButton);        
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        ${getConstructorButtonsJS(config)}

        this.submitCallback = submitCallback;

        this.#addEventListeners();

    }

    #addEventListeners() {

        this.openButtonElements.forEach((item) => {
            item?.addEventListener("click", (event) => this.openModal(this.openCallback));
            item?.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    setTimeout(() => {
                        event.target.blur();
                        this.okButtonRefocus = event.target;
                    }, 100);
                }
            });
        });
        ${getCloseButtonJS(config)}
        ${getCancelButtonJS(config)}
        ${getOkButtonEventJS(config)}
        ${getKeyEvents(config)}

    }

    #modalStackIndex(containerElement) {
        return Modal.activeModalsLIFOStack.findIndex(element => element === containerElement);
    }

    #isThisCurrentActiveModal() {
        return (Modal.activeModalsLIFOStack[Modal.activeModalsLIFOStack.length - 1] === this.containerElement);
    }

    openModal(openCallback) {

        this.containerElement.classList.add("open");
        this.containerElement.classList.remove("closed");

        this.openCallback = openCallback;
        if (this.openCallback && typeof this.openCallback === "function") {
            this.openCallback(this.containerElement);
        }

        if (this.#modalStackIndex(this.containerElement) < 0)
            Modal.activeModalsLIFOStack.push(this.containerElement);

        setTimeout(() => { this.containerElement.dataset.open = "true"; }, 50);

    }

    closeModal(activedViaEvent) {

        if (activedViaEvent && !this.#isThisCurrentActiveModal())
            return

        this.containerElement.dataset.open = "false"

        Modal.activeModalsLIFOStack.splice(this.#modalStackIndex(this.containerElement), 1);

        if (this.okButtonRefocus)
            setTimeout(() => this.okButtonRefocus.focus(), 100);

        setTimeout(() => {
            this.containerElement.classList.add("closed");
            this.containerElement.classList.remove("open");
        }, 300);

    }

    submitModal(activedViaEvent) {

        if (activedViaEvent && !this.#isThisCurrentActiveModal())
            return

        if (this.submitCallback && typeof this.submitCallback === "function")    
            this.submitCallback(this.containerElement);

        this.closeModal();

    }

}

const modal = new Modal("#modalElement", ".open-modal-button"); // You can pass a callback function as a third argument to be executed on "ok button" (receive modal container element as parameter).
// Remember to always open modal via javascript so it can be properly pushed into the internal class stack.
modal.openModal(); // You can pass a callback function as a argument to be executed on open (receive modal container element as parameter).`;

    }

        return getModalJS(config).trim();

    }

}