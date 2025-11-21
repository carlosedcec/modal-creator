class ModalCreator {

    constructor(modalContainer, form, modalPreview) {

        this.modalPreview = modalPreview;
        this.containerElement = document.querySelector(modalContainer);
        this.modalElement = document.querySelector(modalContainer + " .modal");
        this.okButtonElement = document.querySelector(modalContainer + " .modal-ok");
        this.cancelButtonElement = document.querySelector(modalContainer + " .modal-cancel");
        this.closeButtonElements = document.querySelectorAll(modalContainer + " .modal-close");

        this.form = document.querySelector(form);

        this.changeModalPreviewMethods = {};
        this.modalProperties = {
            width: 280,
            height: 280,
            backgroundColor: "#fff",
            backdropColor: "rgba(0, 0, 0, 0.3)",
            showHeader: true,
            showFooter: true,
            title: "Title",
            textColor: "#26353e",
            okButton: "default",
            okButtonColor: "#447797",
            okButtonHoverColor: "#265470",
            okButtonTextColor: "#fff",
            closingButton: "topbottom",
            closingButtonColor: "#bd4040",
            closingButtonHoverColor: "#9c2929",
            closingButtonTextColor: "#fff",
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

    #rgbToHex(rgb) {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
    }

    #configModalProperty(property, value) {

        if (property === "backdropColor") {
            const rgb = this.#hexToRgb(value);
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        }

        if (property === "enterKey" || property === "escKey") {
            return (value === "true");
        }

        if (property === "showHeader" || property === "showFooter") {
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
        const rgbToHex = (hex) => this.#rgbToHex(hex);

        function getHoverColor(rgbColor) {
            function createHoverColor(originalColor, bias) {
                const newColor = originalColor - bias;
                return newColor > 0 ? newColor : (newColor + 15) > 0 ? (newColor + 15) : 0; 
            };
            return {
                r: createHoverColor(rgbColor.r, 30),
                g: createHoverColor(rgbColor.g, 42),
                b: createHoverColor(rgbColor.b, 42)
            }
        };

        function configHoverColorCSS(color, elementSelector) {

            let style = document.querySelector("head > style");

            if (!style) {
                style = document.createElement('style');
                document.querySelector('head').appendChild(style);
            }

            const css = `${elementSelector}:hover { background-color: rgba(${color.r}, ${color.g}, ${color.b}) !important; }`;
            style.innerHTML += css;

        };

        function getTextColor(bgColor) {
            const brightness = ((bgColor.r * 299) + (bgColor.g * 587) + (bgColor.b * 114)) / 1000;
            return (brightness < 128) ? "#fff" : "#000";
        };

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
            showHeader(show) {

                const showHeader = (show ===  "true");

                if (showHeader) {
                    this.modalElement.querySelector("header").classList.remove("hide");
                } else {
                    this.modalElement.querySelector("header").classList.add("hide");
                }

            },
            showFooter(show) {

                const showFooter = (show ===  "true");

                if (showFooter) {
                    this.modalElement.querySelector("footer").classList.remove("hide");
                } else {
                    this.modalElement.querySelector("footer").classList.add("hide");
                }

            },
            title(title) {
                this.modalElement.getElementsByTagName("h3")[0].innerHTML = title;
            },
            textColor(color) {
                this.modalElement.style.color = color;
            },
            okButton(value) {
                if (ModalCreator.hasOkButton(value)) {
                    this.okButtonElement.style.display = "block";
                } else {
                    this.okButtonElement.style.display = "none";
                }
            },
            okButtonColor(color) {

                this.okButtonElement.style.backgroundColor = color;

                const rgbHoverColor = getHoverColor(hexToRgb(color));
                configHoverColorCSS(rgbHoverColor, ".modal-footer .modal-ok");
                this.modalProperties.okButtonHoverColor = rgbToHex(rgbHoverColor);

                const textColor = getTextColor(hexToRgb(color));
                this.okButtonElement.style.color = textColor;
                this.modalProperties.okButtonTextColor = textColor;

            },
            closingButton(value) {
                const closeButtonDisplay = ModalCreator.hasCloseButton(value) ? "block" : "none";
                const cancelButtonDisplay = ModalCreator.hasCancelButton(value) ? "block" : "none";
                this.closeButtonElements.forEach((item) => item.style.display = closeButtonDisplay);
                this.cancelButtonElement.style.display = cancelButtonDisplay;
            },
            closingButtonColor(color) {

                this.cancelButtonElement.style.backgroundColor = color;
                this.closeButtonElements.forEach((item) => item.style.backgroundColor = color);

                const rgbHoverColor = getHoverColor(hexToRgb(color));
                configHoverColorCSS(rgbHoverColor, ".modal-header .modal-close");
                configHoverColorCSS(rgbHoverColor, ".modal-footer .modal-cancel");
                this.modalProperties.closingButtonHoverColor = rgbToHex(rgbHoverColor);

                const textColor = getTextColor(hexToRgb(color));
                this.cancelButtonElement.style.color = textColor;
                this.closeButtonElements.forEach((item) => item.style.color = textColor);
                this.modalProperties.closingButtonTextColor = textColor;

            },
            enterKey(value) {
                this.modalPreview.reconfigKeysEvents({ enterKey: (value === "true") });
            },
            escKey(value) {
                this.modalPreview.reconfigKeysEvents({ escKey: (value === "true") });
            }
        };

    }

    static hasCloseButton(value) {
        return (value === "topbottom" || value === "top");
    }

    static hasCancelButton(value) {
        return (value === "topbottom" || value === "bottom");
    }

    static hasOkButton(value) {
        return (value === "default");
    }

}