class ConnectFour {

    constructor(columns, rows, pOneCol, pTwoCol) {
        this.rows = rows;
        this.columns = columns;
        this.playerOne = "One";
        this.playerTwo = "Two";
        this.pOneCol = pOneCol;
        this.pTwoCol = pTwoCol;
        this.board = [];
        this.gameOver = false;
        this.currPlayer = this.playerOne;
        this.currColumn = [];
    }

    getRows = () => {
        return this.rows;
    }

    getColumns = () => {
        return this.columns;
    }

    getPlayerOne = () => {
        return this.playerOne;
    }

    getPlayerTwo = () => {
        return this.playerTwo;
    }

    getPOneCol = () => {
        return this.pOneCol;
    }

    getPTwoCol = () => {
        return this.pTwoCol;
    }

    getBoard = () => {
        return this.board;
    }

    getGameOver = () => {
        return this.gameOver;
    }

    getCurrPlayer = () => {
        return this.currPlayer;
    }

    getCurrColumn = () => {
        return this.currColumn;
    }


    setBoard = (col, row) => {
        // Créer ConnFour div
        let connFour = document.createElement("div");
        connFour.setAttribute("id", "connect-four");

        // Injecte connFour dans le main
        let target_main = document.querySelector("main");
        target_main.appendChild(connFour)


        // Génération des colonnes du jeu
        for (let c = 0; c < this.getColumns(); c++) {
            let create_col = document.createElement("div");
            create_col.setAttribute("class", "col");
            create_col.addEventListener("click", (event) => this.setTile(event));

            this.addTile(create_col, this.getRows(), c);

            let target_conn = document.getElementById("connect-four");
            target_conn.appendChild(create_col);

            // Initialise currColumn pour l'ajout des jetons
            this.getCurrColumn().push(0);
        }
        this.setJsBoard();
    }

    addTile = (target_col, rows, c_id) => {
        for (let r = 0; r < rows; r++) {
            let tile = document.createElement("div")
            tile.id = c_id.toString() + "-" + r.toString();
            tile.setAttribute("class", "tile");
            target_col.appendChild(tile);
        }
    }

    setTile = (event) => {
        if (this.gameOver == true) {
            return;
        } else {
            let columnCoord = event.target.id.split("-");
            let c = parseInt(columnCoord[0]);
            let r = this.currColumn[c];
            //console.log("column=" + c + " " + "row=" +r);


            if (r >= this.rows) {
                return
            }

            // Place la pièce
            let tileId = c.toString() + "-" + r.toString();
            //console.log(tileId);
            let tile = document.getElementById(tileId);
            //console.log(tile);

            this.board[c][r] = this.getCurrPlayer();

            if (this.currPlayer == this.playerOne) {
                tile.style.backgroundColor = this.pOneCol;
                this.victoryConditions();
                this.currPlayer = this.getPlayerTwo();
            } else {
                tile.style.backgroundColor = this.pTwoCol;
                this.victoryConditions();
                this.currPlayer = this.getPlayerOne();
            }


            // Gère la "gravité"
            r += 1;
            this.currColumn[c] = r;
            //console.log(this.currColumn);

        }
    }

    // Tableau 2D JS pour les conditions de victoire
    setJsBoard = () => {
        for (let r = 0; r < this.getRows(); r++) {
            let row = [];
            for (let c = 0; c < this.columns - 1; c++) {
                row.push(null);
            }
            this.getBoard().push(row);
        }
        //console.log(this.board);
    }

    victoryConditions = () => {
        // VICTOIRE horizontale
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns - 3; c++) {
                if (this.board[c][r] !== null &&
                    this.board[c][r] === this.board[c + 1][r] &&
                    this.board[c][r] === this.board[c + 2][r] &&
                    this.board[c][r] === this.board[c + 3][r]) {

                    alert(`Player ${this.board[c][r]} wins !`)
                    this.gameOver = true;
                }
            }
        }

        // VICTOIRE verticale
        for (let c = 0; c < this.rows; c++) {
            for (let r = 0; r < this.rows - 3; r++) {
                if (this.board[c][r] !== null &&
                    this.board[c][r] === this.board[c][r + 1] &&
                    this.board[c][r] === this.board[c][r + 2] &&
                    this.board[c][r] === this.board[c][r + 3]) {

                    alert(`Player ${this.board[c][r]} wins !`)
                    this.gameOver = true;
                }
            }
        }
    }
}

export { ConnectFour };