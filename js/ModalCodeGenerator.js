class ModalCodeGenerator {

    static generateModalHTML(config) {
        return `
<div class="modal-container closed" data-open="false">
    <div class="modal">
        <header class="modal-header">
            <h3>${config.title}</h3>
            ${config.closeButton === "topbottom" || "top" ? '<button class="modal-close"></button>' : ""}
        </header>
        <section class="modal-body">
            Lorem Ipsum
        </section>
        <footer class="modal-footer">
            ${config.cancelButton === "topbottom" || "bottom" ? '<button class="modal-cancel">Cancel</button>' : ""}
            ${config.okButton === "default" ? '<button class="modal-ok">Ok</button>' : ""}
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
    background-color: ${config.closingButtonColor};
    background-image: url("../img/fechar.svg");
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    top: -16px;
    right: -16px;
    border-radius: 50%;
}
.modal-header .modal-close:active {
    background-position: 10px 10px;
}
.modal-header .modal-close:hover {
    background-color: rgb(156, 41, 41);
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
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
}
.modal-footer .modal-cancel {
    background-color: ${config.closingButtonColor};
}
.modal-footer .modal-cancel:hover {
    background-color: #9c2929;
}
.modal-footer .modal-ok {
    background-color: ${config.okButtonColor};
}
.modal-footer .modal-ok:hover {
    background-color: #265470;
}
        `.trim();
    }

    static generateModalJS(config) {
        return `
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
            if (!item) return;
            item.addEventListener("click", (event) => {
                this.openModal(item, event);
            });
        });

        const closeButtons = [this.cancelButtonElement, this.closeButtonElement];
        closeButtons.forEach((item) => {
            if (!item) return;
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

const modal = new Modal(<modal-container-element>, <open-modal-button>);
        `.trim();
    }

}