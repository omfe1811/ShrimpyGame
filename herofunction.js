
//object constructor to create Hero
//same can be created with class too

function Hero(name, x = 0, y = 0) {
  this.name = name;
  this.x = x; // Hero's grid X position
  this.y = y; // Hero's grid Y position
  this.weapons = {};
  this.shields = {};
  this.baseAttackPower = Math.floor(Math.random() * 10) + 1;
  this.baseDefensePower = Math.floor(Math.random() * 10) + 1;

  this.init = function () {
    const heroElement = document.createElement("div");
    heroElement.id = "heroimage";
    heroElement.style.width = "50px";
    heroElement.style.height = "50px";
    heroElement.style.backgroundColor = "blue";

    // Place the hero on the map initially
    gameMap.placeObject(this.x, this.y, heroElement);

    console.log(`${this.name} placed at (${this.x}, ${this.y})`);
  };

  this.move = function (dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    // Ensure the new position is within bounds
    if (newX >= 0 && newX < gameMap.cols && newY >= 0 && newY < gameMap.rows) {
      this.x = newX;
      this.y = newY;

      // Move the hero element to the new position
      const heroElement = document.getElementById("heroimage");
      gameMap.placeObject(this.x, this.y, heroElement);

      console.log(`${this.name} moved to (${this.x}, ${this.y})`);
      //we also update screen text
      document.getElementById(
        "hero-position"
      ).innerHTML = `${this.name} moved to (${this.x}, ${this.y})`;
    } else {
      console.log("Out of bounds! Movement restricted.");
    }
  };

  //this.newWeapon = function (newWeapon) {};

  this.bindKeyPressEvents = function () {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.move(0, -1); // Move up
          break;
        case "ArrowDown":
          this.move(0, 1); // Move down
          break;
        case "ArrowLeft":
          this.move(-1, 0); // Move left
          break;
        case "ArrowRight":
          this.move(1, 0); // Move right
          break;
        default:
          console.log(`Key ${event.key} does not control the hero.`);
      }
    });
    if (enemy.x == hero.x && enemy.y == hero.y) {
      Fight();
    };
  };
}

function GameMap(rows, cols, cellSize) {
  this.rows = rows; // Number of rows in the map
  this.cols = cols; // Number of columns in the map
  this.cellSize = cellSize; // Size of each cell (e.g., 50px)

  this.init = function () {
    const playboard = document.getElementById("playboard");

    // Clear the playboard before rendering (useful for resetting the map)
    playboard.innerHTML = "";

    // Set up the grid dynamically
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.x = x; // Store x coordinate in the cell
        cell.dataset.y = y; // Store y coordinate in the cell
        playboard.appendChild(cell);
      }
    }

    console.log("Map initialized with rows:", this.rows, "cols:", this.cols);
  };

  this.getCell = function (x, y) {
    // Get a specific cell by x, y coordinates
    return document.querySelector(`.grid-cell[data-x="${x}"][data-y="${y}"]`);
  };

  this.placeObject = function (x, y, element) {
    // Place an object (like the hero) in a specific cell
    const cell = this.getCell(x, y);
    if (cell) {
      cell.appendChild(element);
    }
  };
}



function Enemy(name, x = 0, y = 0) {
  this.name = name;
  this.x = x; // Hero's grid X position
  this.y = y; // Hero's grid Y position
  this.baseAttackPower = Math.floor(Math.random() * 10) + 1;
  this.baseDefensePower = Math.floor(Math.random() * 10) + 1;

  this.init = function () {
    const enemyElement = document.createElement("div");
    enemyElement.id = "enemyimage";
    enemyElement.style.width = "50px";
    enemyElement.style.height = "50px";
    enemyElement.style.backgroundColor = "red";

    // Place the hero on the map initially
    gameMap.placeObject(this.x, this.y, enemyElement);

    console.log(`${this.name} placed at (${this.x}, ${this.y})`);
  };
}


// Example: Create a 20x20 grid map with each cell being 50px
const gameMap = new GameMap(3, 3, 50);
gameMap.init();

// Example: Initialize hero
const hero = new Hero("Xantos", 0, 0);
const enemy = new Enemy("Crab", 2, 2);
enemy.init();
hero.init();
hero.bindKeyPressEvents();


const fight = document.getElementById("fight");
function Fight() {
  fight.style.visibility = "visible";
};

console.log(enemy.x, enemy.y);
console.log(hero.x, hero.y);
