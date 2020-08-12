import {dataHandler} from "./data_handler.js";
import {
    createDeleteBoardButton,
    createEditBoardButton
} from "./board_handler.js";
import {
    generateBoards,
    handleDetailButton,
    createTemplateOfBoardsHTML,
    assignTask,
    createNewTask,
    handleEvent,
    getLastButton,
    initNewColumnsWithDragAndDrop
} from './container_generator.js';

import {dragAndDropHandler, initTask} from './drag_and_drop_handler.js';


export let dom = {
    init: function () {
    },

    loadBoards: function () {
        return new Promise((resolve => {
            dataHandler.getBoards(function (boards) {
                dom.showBoards(boards);
                resolve();
            });
        }));
    },

    showBoards: function (boards) {
        const boardList = generateBoards(boards);
        const outerHtml = `
            <ul class="board-container flex-column">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        handleDetailButton();
    },

    loadCards: function (boardId) {
        dataHandler.getBoard(boardId, function (response) {
            dom.showCards(response);
            dragAndDropHandler.init();
        });
    },

    showCards: function (cards) {
        assignTask(cards);
    },

    displayNewBoard: function (title, board_id) {
        const boardContainer = document.querySelector('.board-container');
        const newBoard = createTemplateOfBoardsHTML(title, board_id);
        boardContainer.insertAdjacentHTML("beforeend", newBoard);

        handleEvent(getLastButton());
        initNewColumnsWithDragAndDrop(board_id);

        const boardButtons = document.querySelector(`li[boardid="${board_id}"] > .title`);
        const boardTitleBar = document.querySelector(`li[boardid="${board_id}"]`);

        const deleteButton = createDeleteBoardButton(board_id, boardTitleBar);
        boardButtons.appendChild(deleteButton);

        const editButton = createEditBoardButton(board_id);
        boardButtons.appendChild(editButton);
    },

    displayNewCard: function (parent, title, taskId, taskOrderNumber) {
        const newTask = createNewTask(title, taskId, taskOrderNumber);
        initTask(newTask);
        parent.appendChild(newTask);
    },
};
