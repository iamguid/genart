import Point from './Point';
import Utils from './Utils';

class Line {
    constructor (p1, p2) {
        this.p1 = p1
        this.p2 = p2

        // Give the equation vars
        this.a = p1.y - p2.y;
        this.b = p2.x - p1.x;
        this.c = -(this.a * p1.x + this.b * p1.y);

        this.d = this.getDistance();
    }

    getDistance () {
        return Line.getDistance(this);
    }

    getIntersectPoint (line) {
        return Line.getIntersectPoint(this, line);
    }

    static getDistance (line) {
        var a = Math.pow((line.p2.x - line.p1.x), 2);
        var b = Math.pow((line.p2.y - line.p1.y), 2);
        return Math.abs(Math.sqrt(a + b));
    }

    static getIntersectPoint (line1, line2) {
        var det = function (a1, a2, b1, b2 ) {
            return a1 * b2 - a2 * b1;
        }

        var zn = det(line1.a, line1.b, line2.a, line2.b);
        var dx = det(line1.c, line1.b, line2.c, line2.b);
        var dy = det(line1.a, line1.c, line2.a, line2.c);

        var x = -(dx / zn);
        var y = -(dy / zn);

        var h = (line1.p1.x <= x && line1.p2.x >= x) || (line1.p2.x <= x && line1.p1.x >= x);
        var v = (line2.p1.x <= x && line2.p2.x >= x) || (line2.p2.x <= x && line2.p1.x >= x);

        return (h && v) ? new Point (x, y) : undefined;
    }
}

export default Line
