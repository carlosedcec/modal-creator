const modalCreator = new ModalCreator("#modalPreview", "#modalForm");
modalCreator.init();

const modalPreview = new Modal("#modalPreview", "#modalPreviewDesktop .modal-open-button");

const modalCode = new Modal("#modalCode", "#generateCode");