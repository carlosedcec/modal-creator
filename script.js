class ModalCreator {

    constructor(modal, form) {
        this.element = document.querySelector(modal);
        this.backdropElement = document.querySelector("#modalBackdrop");
        this.form = document.querySelector(form);
        this.modalChangeMethods = {};
    }

    init() {
        this.addEventListeners();
        this.configModalChangeMethods();
    }

    _hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    addEventListeners() {
        const formElements = Array.from(this.form.elements);
        formElements.forEach((item) => {
            item.addEventListener("change", (event) => {
                this.handleElementChange(item, event);
                console.log(item.value);
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
            },
            backgroundColor(backgroundColor) {
                this.element.style.backgroundColor = backgroundColor;
            },
            backdropColor(backdropColor) {
                const rgb = this._hexToRgb(backdropColor);
                this.backdropElement.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, .3)`
            }
        };
    }

}

const modalCreator = new ModalCreator("#modalPreview", "#modalForm");
modalCreator.init();