class ModalCreator {

    constructor(modalContainer, form, modalPreview) {

        this.modalPreview = modalPreview;
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok");
        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel");
        this.closeButtonElement = document.querySelector(modalContainer + " .modal-close");

        this.form = document.querySelector(form);

        this.changeModalPreviewMethods = {};
        this.modalProperties = {
            width: 200,
            height: 200,
            backgroundColor: "#fff",
            backdropColor: "rgba(0, 0, 0, 0.3)",
            title: "Title",
            textColor: "#26353e",
            okButton: "default",
            okButtonColor: "#447797",
            closingButton: "topbottom",
            closingButtonColor: "#bd4040",
            enterKey: true,
            escKey: true
        };

    }

    init() {
        this.addEventListeners();
        this.configModalPreviewMethods();
    }

    #hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    #configModalProperty(property, value) {

        if (property === "backdropColor") {
            const rgb = this.#hexToRgb(value);
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        }

        if (property === "enterKey" || property === "escKey") {
            return (value === "true");
        }

        return value;

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

        const value = element.value;

        // Remove "modal" from proporty name and change first letter to lower case;
        let property = element.name.replace("modal", "");
        property = String(property).charAt(0).toLowerCase() + String(property).slice(1);

        // Call changeModalPreview;
        let changeModalPreview = this.changeModalPreviewMethods[property];
        if (changeModalPreview && typeof changeModalPreview === "function") {
            changeModalPreview = changeModalPreview.bind(this);
            changeModalPreview(value);
        }

        // Save property
        this.modalProperties[property] = this.#configModalProperty(property, value);

    }

    configModalPreviewMethods() {

        const hexToRgb = (hex) => this.#hexToRgb(hex);

        this.changeModalPreviewMethods = {
            width(width) {
                this.modalElement.style.width = width + "px";
            },
            height(height) {
                this.modalElement.style.height = height + "px";
            },
            backgroundColor(backgroundColor) {
                this.modalElement.style.backgroundColor = backgroundColor;
            },
            backdropColor(backdropColor) {
                const rgb = hexToRgb(backdropColor);
                this.containerElement.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, .3)`;
            },
            title(title) {
                this.modalElement.getElementsByTagName("h3")[0].innerHTML = title;
            },
            textColor(color) {
                this.modalElement.style.color = color;
            },
            okButton(value) {
                if (value === "default") {
                    this.okButtonElement.style.display = "block";
                } else {
                    this.okButtonElement.style.display = "none";
                }
            },
            okButtonColor(color) {
                this.okButtonElement.style.backgroundColor = color;
            },
            closingButton(value) {
                const closeButtonDisplay = (value === "topbottom" || value === "top") ? "block" : "none";
                const cancelButtonDisplay = (value === "topbottom" || value === "bottom") ? "block" : "none";
                this.closeButtonElement.style.display = closeButtonDisplay;
                this.cancelButtonElement.style.display = cancelButtonDisplay;
            },
            closingButtonColor(color) {
                this.cancelButtonElement.style.backgroundColor = color;
                this.closeButtonElement.style.backgroundColor = color;
            },
            enterKey(value) {
                this.modalPreview.reconfigKeysEvents({ enterKey: (value === "true") });
            },
            escKey(value) {
                this.modalPreview.reconfigKeysEvents({ escKey: (value === "true") });
            }
        };

    }

}