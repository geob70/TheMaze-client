export default function Cell(r, c, canvas) {
  this.r = r;
  this.c = c;
  this.visited = false;
  this.hasWall = {
    left: true,
    right: true,
    top: true,
    bottom: true,
  };

  this.paint = () => {
    this.createWall();
  };

  this.createWall = () => {
    let x = this.c * 24;
    let y = this.r * 24;
    if (this.hasWall.top) {
      canvas.beginPath();
      canvas.moveTo(x, y);
      canvas.lineTo(x + 24, y);
      canvas.stroke();
    }
    if (this.hasWall.right) {
      canvas.beginPath();
      canvas.moveTo(x + 24, y);
      canvas.lineTo(x + 24, y + 24);
      canvas.stroke();
    }
    if (this.hasWall.bottom) {
      canvas.beginPath();
      canvas.moveTo(x + 24, y + 24);
      canvas.lineTo(x, y + 24);
      canvas.stroke();
    }
    if (this.hasWall.left) {
      canvas.beginPath();
      canvas.moveTo(x, y + 24);
      canvas.lineTo(x, y);
      canvas.stroke();
    }
  };

  this.getRow = () => {
    return this.r;
  };

  this.getCol = () => {
    return this.c;
  };

  this.iSvisited = () => {
    return this.visited;
  };

  this.visit = () => {
    this.visited = true;
  };

  this.getWall = () => {
    return this.hasWall;
  };

  this.removeWall = (i) => {
    if (i === 0) this.hasWall.top = false;
    else if (i === 1) this.hasWall.right = false;
    else if (i === 2) this.hasWall.bottom = false;
    else this.hasWall.left = false;
  };
}
