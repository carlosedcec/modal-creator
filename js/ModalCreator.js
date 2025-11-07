class ModalCreator {

    constructor(modal, form) {
        this.element = document.querySelector(modal);
        this.backdropElement = document.querySelector("#modalBackdrop");
        this.okButtonElement = document.querySelector(modal + " #modalOkBtn");
        this.cancelButtonElement = document.querySelector(modal + " #modalCancelBtn");
        this.closeButtonElement = document.querySelector(modal + " #modalCloseBtn");
        this.form = document.querySelector(form);
        this.changeModalPreviewMethods = {};
        this.modalProperties = {};
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
        this.modalProperties[property] = value;
        console.log(this.modalProperties);

    }

    configModalPreviewMethods() {

        const hexToRgb = (hex) => this.#hexToRgb(hex);

        this.changeModalPreviewMethods = {
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
                const rgb = hexToRgb(backdropColor);
                this.backdropElement.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, .3)`
            },
            title(title) {
                this.element.getElementsByTagName("h3")[0].innerHTML = title;
            },
            textColor(color) {
                this.element.style.color = color;
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
        };

    }

}