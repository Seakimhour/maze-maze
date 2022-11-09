class MazeGenerator {
  #area;
  #size;
  #maze;

  constructor (area) {
    this.#area = area;
    this.#size = this.#area * 2 + 1;
    this.#maze = this.#initMaze(this.#size);

    this.#generateWalls('horizontal', 1, this.#size - 2, 1, this.#size - 2);
  }

  #initMaze (size) {
    const maze = new Array(size).fill().map(() => new Array(size).fill());

    maze.forEach((row, r) => {
      row.forEach((col, c) => {
        maze[r][c] = (r % 2 === 0 && c % 2 === 0)
          ? '+'
          : (r === 0 || r === size - 1)
              ? '---'
              : (c === 0 || c === size - 1)
                  ? '|'
                  : (c % 2 === 0)
                      ? ' '
                      : '   ';
      });

      if (r === 0) {
        const exit = Math.floor(this.#randomNumber(1, size - 1) / 2) * 2 + 1;
        maze[r][exit] = '   ';
      }

      if (r === size - 1) {
        const entrance = Math.floor(this.#randomNumber(1, size - 1) / 2) * 2 + 1;
        maze[r][entrance] = '   ';
      }
    });

    return maze;
  }

  #generateWalls (angles, minX, maxX, minY, maxY) {
    if (angles === 'horizontal') {
      if (maxX - minX < 2) return;

      const wall = Math.floor(this.#randomNumber(minY + 1, maxY - 1) / 2) * 2;
      this.#addWall('horizontal', minX, maxX, wall);
      this.#generateWalls('vertical', minX, maxX, minY, wall - 1);
      this.#generateWalls('vertical', minX, maxX, wall + 1, maxY);
    } else {
      if (maxY - minY < 2) return;

      const wall = Math.floor(this.#randomNumber(minX + 1, maxX - 1) / 2) * 2;
      this.#addWall('vertical', minY, maxY, wall);
      this.#generateWalls('horizontal', minX, wall - 1, minY, maxY);
      this.#generateWalls('horizontal', wall + 1, maxX, minY, maxY);
    }
  }

  #addWall (angles, min, max, wall) {
    const hole = Math.floor(this.#randomNumber(min, max) / 2) * 2 + 1;

    for (let i = min; i <= max; i++) {
      if (i % 2 !== 0) {
        if (angles === 'horizontal') this.#maze[wall][i] = (hole === i) ? '   ' : '---';
        else this.#maze[i][wall] = (hole === i) ? ' ' : '|';
      }
    }
  }

  #randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  print () {
    this.#maze.forEach(row => console.log(row.join('')));
  }
}

const maze = new MazeGenerator(12);
maze.print();
