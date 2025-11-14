class ModalCodeGenerator {

    static generateModalHTML(config) {
        return `
<div class="modal-container closed" data-open="false">
    <div class="modal">
        <header class="modal-header">
            <h3>${config.title}</h3>
            ${config.closeButton ? '<button class="modal-close"></button>' : ""}
        </header>
        <section class="modal-body">
            Lorem Ipsum
        </section>
        <footer class="modal-footer">
            ${config.cancelButton ? '<button class="modal-cancel">Cancel</button>' : ""}
            ${config.okButton ? '<button class="modal-ok">Ok</button>' : ""}
        </footer>
    </div>
</div>
        `.trim().replace(/<(?!\/)/g, "&lt;").replace(/>/g, "&gt").replace(/<\//g, "&lt;/");
    }

    static generateModalCSS(config) {
        return `
/* Modal Container */
.modal-container {
    width: ${config.width + "px"};
    height: ${config.height + "px"};
    background-color: rgba(0, 0, 0, .3);
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

/* Open Button */
.modal-open-button {
    background: linear-gradient(to top, #ddd, #fff);
    color: var(--color1);
    border: 1px solid var(--color1);
    padding: 16px 28px;
    border-radius: 6px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    font-weight: bold;
    font-family: "Poppins";
    cursor: pointer;
    position: absolute;
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

}