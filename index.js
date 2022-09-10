class Game {
  board = [];
  symbols = ["X", "O"];
  player = this.symbols[0];
  containerElement = null;
  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  init(containerElement) {
    this.board = new Array(9).fill("");
    this.containerElement = containerElement;
  }

  drawBoard() {
    let element = "";
    this.board.forEach((_, index) => {
      element += `
      <div class="element">
        ${this.board[index]}
      </div>
      `;
    });

    this.containerElement.innerHTML = element;
    const elements = document.querySelectorAll(".element");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", () => this.play(i));
    }
  }
  togglePlayer() {
    this.player =
      this.player === this.symbols[0] ? this.symbols[1] : this.symbols[0];
  }
  isSequenceEqual(list) {
    return list.every((el) => el === "X") || list.every((el) => el === "O");
  }
  verifyGameover() {
    let content = [];
    for (let i = 0; i < this.winningConditions.length; i++) {
      for (let j = 0; j < this.winningConditions[i].length; j++) {
        content.push(this.board[this.winningConditions[i][j]]);
      }
      if (this.isSequenceEqual(content)) {
        return { gameover: true };
      }
      content = [];
    }
    return this.board.every((el) => el !== "")
      ? { gameover: true, notWinners: true }
      : { gameover: false };
  }
  setGameOver(notWinners) {
    this.init(this.containerElement);
    setTimeout(() => {
      this.drawBoard();
      alert(notWinners ? "Velha" : `Jogador ${this.player} venceu!`);
      this.player = this.symbols[0];
    }, 100);
  }
  play(position) {
    if (!this.board[position]) {
      this.board[position] = this.player;
      this.drawBoard();
      const { gameover, notWinners = false } = this.verifyGameover();
      if (gameover) {
        this.setGameOver(notWinners);
      } else {
        this.togglePlayer();
      }
    }
  }
}

class Main {
  constructor() {
    const board = document.querySelector(".game");
    const game = new Game();
    game.init(board);
    game.drawBoard();
  }
}

new Main();
