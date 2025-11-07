class ModalCreator {

    constructor(modal, form) {
        this.element = document.querySelector(modal);
        this.form = document.querySelector(form);
        this.modalChangeMethods = {};
    }

    init() {
        this.addEventListeners();
        this.configModalChangeMethods();
    }

    addEventListeners() {
        const formElements = Array.from(this.form.elements);
        formElements.forEach((item) => {
            item.addEventListener("change", (event) => {
                this.handleElementChange(item, event);
            });
        });
    }

    handleElementChange(element, event) {
        // Remove "modal" from proporty name and change first letter to lower case;
        let property = element.name.replace("modal", "");
        property = String(property).charAt(0).toLowerCase() + String(property).slice(1);
        // Call changeModal;
        let changeModal = this.modalChangeMethods[property];
        if (changeModal && typeof changeModal === "function") {
            changeModal = changeModal.bind(this);
            changeModal(element.value);
        }
    }

    configModalChangeMethods() {
        this.modalChangeMethods = {
            width(width) {
                this.element.style.width = width + "px";
            },
            height(height) {
                this.element.style.height = height + "px";
            }
        };
    }

}

const modalCreator = new ModalCreator("#modalPreview", "#modalForm");
modalCreator.init();