import Point from './Point';
import Line from './Line';
import Utils from './Utils';

class Vector {
    constructor (startPoint, length, degAngle) {
        this.point = startPoint;
        this.length = length
        this.angle = Utils.degToRad(degAngle);

        this.line = undefined;
        this._updateLine();
    }

    _updateLine () {
        var x = this.point.x + this.length * Math.cos(this.angle);
        var y = this.point.y + this.length * Math.sin(this.angle);

        var p2 = new Point(x, y);
        this.line = new Line(this.point, p2);
    }

    setAngle (degAngle) {
        this.angle = Utils.degToRad(degAngle);
        this._updateLine();
    }

    setLength (length) {
        this.length = length;
        this._updateLine();
    }
}

export default Vector;
