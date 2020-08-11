import { dom } from "./dom.js";
import { modalsInit } from "./modals.js";
import { dragAndDropHandler} from "./drag_and_drop_handler.js";

function init() {
    dom.init();
    dom.loadBoards()
        .then(() => {
            modalsInit();
            setTimeout(() => dragAndDropHandler.init(), 500);
        });
    dom.handleFormButtons();
}

init();
