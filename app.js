/*

board:

0,1,2
3,4,5
6,7,8


(winconditions)
winCon = [
    0,1,2,//done
    0,3,6,//done
    1,4,7,//done
    2,5,8,//done
    3,4,5,//done
    6,7,8,//done
    0,4,8,//done
    2,4,6,//done
]
if (winCon[0] === winCon[1] === winCon[2]) {}


-Total 2 players

-player 1's symbol = "x"
-player 2's symbol = "o"

-player 1 goes first

-once a square gets a "x" or and "o" it cannot be shared or replaced by the other player (can't even be overwritten by the player who placed it)

-tie condition, when all the blocks are filled and the winner still isn't declared

-winCondition is 3 matching symbols in a horizontal or vertical or diagonal pattern

-alert the winner

-provide a game reset

*/

const playerTurnElement = document.querySelector("span#player-turn")
const divTableHolder = document.querySelector("#table-holder");
const tableRowElements = document.getElementsByClassName("table-row");
const tableCellElements = document.getElementsByClassName("table-cell");
const rulesBtn = document.querySelector("button#rules-btn");
const resetGameBtn = document.querySelector("button#resetGame-btn");
const player1Symbol = `&#x2718;`// = "X"
const player2Symbol = `&#9678;`// = "O"
const player1Turn = "x"
const player2Turn = "o"
const gameRulesText = (`
    Game Rules:
1. Place you symbols in a "line" to win. (The line has to touch each end of the game board and be a straight "horizontal", "vertical", "diagonal" line)

2. You can and should block your oppenent's "line" with your symbol (prevents the enemy line from reaching the other side, therefore preventing your oppenent's win)

3. If you and your oppenent didn't make a line across the board, then the match will end in a draw

More Infomation:
- The game will start with player 1's turn
- "Home" keyboard button brings the rules up again
- "Tab" keyboard button will prompt you to reset the game

`);

let currentPlayerTurn = "x";
playerTurnElement.innerHTML = `${player1Symbol} 's Turn`;
let gameBoard = Array.from(tableCellElements);
let isGameOver = false;

// Takes a "pic" of all cells then resets them then defaults to p1's turn
const resetGame = () => {
    const currentCellNodeList = document.querySelectorAll(".table-cell");//put here to take a "pic" of the array-like
    currentCellNodeList.forEach((evt)=>{evt.classList.add("full")});//prevents player from adding their symbol after the winner has been declared
    if (window.confirm("Do you want to reset the game?")) {
        isGameOver = true;
        console.log(currentCellNodeList);
        currentPlayerTurn = "x";
        playerTurnElement.innerHTML = `${player1Symbol} 's Turn`;
        gameBoard = Array.from(tableCellElements);
        for (const element of currentCellNodeList) {
            element.innerHTML = "";
            element.classList.remove("p1Cell");
            element.classList.remove("p2Cell");
            element.classList.remove("full");
            element.classList.add("none");
        }
    }
}


//keyboard shortcuts
document.body.addEventListener("keydown", (e) => {
    if (e.key === "Home") {
        alert(`${gameRulesText}`);
    } else if (e.key === "Tab") {
        setTimeout(resetGame, 125);
    }
});


//Adds playerSymbol to the board and switches players
const playerClickSymbol = (e) => {
    playerTurnElement.style.display = "block";
    if (e.target.classList.contains("table-cell") && !e.target.classList.contains("full")) {
        isGameOver = false;
        if (e.target.classList.contains("none") && currentPlayerTurn === "x") {

            console.log(e.target.dataset.index);  //test for the data set
            gameBoard[e.target.dataset.index] = "p1"  //test for the data set
            console.log(gameBoard);  //test for the data set

            e.target.innerHTML = `<span class="x-symbols symbol">${player1Symbol}</span>`;
            e.target.classList.add("p1Cell");
            e.target.classList.add("full");
            e.target.classList.remove("none");

            playerTurnElement.innerHTML = `${player2Symbol} 's Turn`;
            currentPlayerTurn = "o";
            console.log(currentPlayerTurn,"'s turn");
        } else if (e.target.classList.contains("none") && currentPlayerTurn === "o") {

            console.log(e.target.dataset.index);  //test for the data set
            gameBoard[e.target.dataset.index] = "p2";  //test for the data set
            console.log(gameBoard);  //test for the data set

            e.target.innerHTML = `<span class="o-symbols symbol">${player2Symbol}</span>`;
            e.target.classList.add("p2Cell");
            e.target.classList.add("full");
            e.target.classList.remove("none");

            playerTurnElement.innerHTML = `${player1Symbol} 's Turn`;
            currentPlayerTurn = "x";
            console.log(currentPlayerTurn,"'s turn");
        }
    checkWin(e);
    }
}
divTableHolder.addEventListener("click", playerClickSymbol);


rulesBtn.addEventListener("click", () => {
    alert(`${gameRulesText}`);
});


resetGameBtn.addEventListener("click", () => {
    resetGame();
});

// Better Way to Check for Win/Draw
// const checkWin = () => {
//     const currentCellNodeList = document.querySelectorAll(".table-cell");//put here to take a "pic" of the array-like
//     let currentCellArray = Array.from(currentCellNodeList);
//     // Draw
//     if (currentCellArray) {
//         let cellCounter = 0;
//         for (const element of currentCellArray) {
//             if (element.classList.contains("full")) {
//                 cellCounter++;
//             }
//         }
//         if (cellCounter >= currentCellArray.length) {
//             alert(`DRAW!`);
//         }
//     }
// }

/*
winCon = [
    0,1,2, = row-1
    0,3,6, = row-2
    1,4,7, = row-3
    2,5,8, = 1st column
    3,4,5, = 2nd column
    6,7,8, = 3rd column
    0,4,8, = 1st diagonal (top-left to bottom-right)
    2,4,6, = 2ns diagonal (bottom-left to top-right)
]
*/


// OLD WAY (DON"T DO THIS) 
// All Winconditions
const checkWin = () => {
    const currentCellNodeList = document.querySelectorAll(".table-cell");//put here to take a "pic" of the array-like
    let currentCellArray = Array.from(currentCellNodeList);

    // 0,1,2 or row-1
    if (tableCellElements[0].textContent === tableCellElements[1].textContent && tableCellElements[0].textContent === tableCellElements[2].textContent && tableCellElements[1].textContent === tableCellElements[2].textContent) {
        if (tableCellElements[0].classList.contains("p1Cell") && tableCellElements[1].classList.contains("p1Cell") && tableCellElements[2].classList.contains("p1Cell")) {
            alert(`
            Player 1 Wins!
            (row-1 is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[0].classList.contains("p2Cell") && tableCellElements[1].classList.contains("p2Cell") && tableCellElements[2].classList.contains("p2Cell")) {
            alert(`
            Player 2 Wins!
            (row-1 is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 3,4,5 or row-2
    if (tableCellElements[3].textContent === tableCellElements[4].textContent && tableCellElements[3].textContent === tableCellElements[5].textContent && tableCellElements[4].textContent === tableCellElements[5].textContent) {
        if (tableCellElements[3].classList.contains("p1Cell") && tableCellElements[4].classList.contains("p1Cell") && tableCellElements[5].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (row-2 is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[3].classList.contains("p2Cell") && tableCellElements[4].classList.contains("p2Cell") && tableCellElements[5].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (row-2 is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 6,7,8 or row-3
    if (tableCellElements[6].textContent === tableCellElements[7].textContent && tableCellElements[6].textContent === tableCellElements[8].textContent && tableCellElements[7].textContent === tableCellElements[8].textContent) {
        if (tableCellElements[6].classList.contains("p1Cell") && tableCellElements[7].classList.contains("p1Cell") && tableCellElements[8].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (row-3 is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[6].classList.contains("p2Cell") && tableCellElements[7].classList.contains("p2Cell") && tableCellElements[8].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (row-3 is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 0,3,6 or 1st column
    if (tableCellElements[0].textContent === tableCellElements[3].textContent && tableCellElements[0].textContent === tableCellElements[6].textContent && tableCellElements[3].textContent === tableCellElements[6].textContent) {
        if (tableCellElements[0].classList.contains("p1Cell") && tableCellElements[3].classList.contains("p1Cell") && tableCellElements[6].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (1st column is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[0].classList.contains("p2Cell") && tableCellElements[3].classList.contains("p2Cell") && tableCellElements[6].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (1st column is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 1,4,7 or 2nd column
    if (tableCellElements[1].textContent === tableCellElements[4].textContent && tableCellElements[1].textContent === tableCellElements[7].textContent && tableCellElements[4].textContent === tableCellElements[7].textContent) {
        if (tableCellElements[1].classList.contains("p1Cell") && tableCellElements[4].classList.contains("p1Cell") && tableCellElements[7].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (2nd column is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[1].classList.contains("p2Cell") && tableCellElements[4].classList.contains("p2Cell") && tableCellElements[7].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (2nd column is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 2,5,8 or 3rd column
    if (tableCellElements[2].textContent === tableCellElements[5].textContent && tableCellElements[2].textContent === tableCellElements[8].textContent && tableCellElements[5].textContent === tableCellElements[8].textContent) {
        if (tableCellElements[2].classList.contains("p1Cell") && tableCellElements[5].classList.contains("p1Cell") && tableCellElements[8].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (3rd column is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[2].classList.contains("p2Cell") && tableCellElements[5].classList.contains("p2Cell") && tableCellElements[8].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (3rd column is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 0,4,8 or diagonal top-left to bottom-right
    if (tableCellElements[0].textContent === tableCellElements[4].textContent && tableCellElements[0].textContent === tableCellElements[8].textContent && tableCellElements[4].textContent === tableCellElements[8].textContent) {
        if (tableCellElements[0].classList.contains("p1Cell") && tableCellElements[4].classList.contains("p1Cell") && tableCellElements[8].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (diagonal top-left to bottom-right is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[0].classList.contains("p2Cell") && tableCellElements[4].classList.contains("p2Cell") && tableCellElements[8].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (diagonal top-left to bottom-right is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // 2,4,6 or diagonal bottom-left to top-right
    if (tableCellElements[2].textContent === tableCellElements[4].textContent && tableCellElements[2].textContent === tableCellElements[6].textContent && tableCellElements[4].textContent === tableCellElements[6].textContent) {
        if (tableCellElements[2].classList.contains("p1Cell") && tableCellElements[4].classList.contains("p1Cell") && tableCellElements[6].classList.contains("p1Cell")) {
            alert(`
            player 1 Wins!
            (diagonal bottom-left to top-right is x)
            `);
            setTimeout(resetGame, 125);
        } else if (tableCellElements[2].classList.contains("p2Cell") && tableCellElements[4].classList.contains("p2Cell") && tableCellElements[6].classList.contains("p2Cell")) {
            alert(`
            player 2 Wins!
            (diagonal bottom-left to top-right is o)
            `);
            setTimeout(resetGame, 125);
        }
    }

    // Draw
    if (isGameOver === false) {
        let cellCounter = 0;
        for (const element of currentCellArray) {
            if (element.classList.contains("full") ) {
                cellCounter++;
            }
        }
        if (cellCounter >= currentCellArray.length) {//if cellCounter is >= to the number of cells
            alert(`DRAW!`);
            playerTurnElement.innerHTML = ``;
            setTimeout(resetGame, 125);
        }
    }
}
