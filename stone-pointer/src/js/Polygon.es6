class Polygon {
    constructor (polygonPoints) {
        this.points = polygonPoints;
    }

    getArea () {
        return Polygon.getArea(this);
    }

    static getArea (polygon) {
        var pts = polygon.points;

        var area = 0;
        for (var i = 0, len = pts.length; i < len; i++) {
            var iNext = (i == len - 1) ? 0 : i + 1;
            var iPrev = (i == 0) ? len - 1 : i - 1;
            area += pts[i].y * (pts[iNext].x - pts[iPrev].x);
        }

        return Math.abs(1 / 2 * area);
    }
}

export default Polygon
