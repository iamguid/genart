class Point {
    constructor (_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    static getDistance (p1, p2) {
        var powX = Math.pow((p1.x - p2.x), 2);
        var powY = Math.pow((p1.y - p2.y), 2);

        return Math.sqrt(powX + powY);
    }
}

export default Point
