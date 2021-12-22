import earcut from 'earcut';
import Point from './Point';
import PointsGraph from './PointsGraph';
import Utils from './Utils';

class Rock {
    constructor (x, y, s, rockOuterPointCnt, minTriangleArea) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.rockOuterPointCnt = rockOuterPointCnt;
        this.minTriangleArea = minTriangleArea;

        this.pointsGraph = new PointsGraph.Graph();
        this._generateRock();
    }

    _generateRock () {
        this._generateRockBody();
    }

    _generateRockBody () {
        var graph = this.pointsGraph;
        var polygonPoints = this._randomPolygonPoints();
        var baseTriangles = this._triangulatePolygon(polygonPoints);
        var triangles = [];

        // Forcing fill graph
        var pref = 'body_';
        baseTriangles.forEach((t, i) => {
            var v1 = graph.addVertex(pref + t[0], polygonPoints[t[0]]);
            var v2 = graph.addVertex(pref + t[1], polygonPoints[t[1]]);
            var v3 = graph.addVertex(pref + t[2], polygonPoints[t[2]]);

            graph.addEdge(v1.uid, v2.uid);
            graph.addEdge(v2.uid, v3.uid);
            graph.addEdge(v3.uid, v1.uid);

            triangles.push([v1, v2, v3]);
        });

        while (triangles.length > 0) {
            var t = triangles.pop();

            var e1 = graph.getEdge(t[0].uid, t[1].uid);
            var e2 = graph.getEdge(t[1].uid, t[2].uid);
            var e3 = graph.getEdge(t[2].uid, t[0].uid);

            var a = e1.line.d;
            var b = e2.line.d;
            var c = e3.line.d;

            var p = (a + b + c) / 2;
            var area = Math.sqrt(p * (p - a) * (p - b) * (p - c));

            if (area < this.minTriangleArea) continue;

            var splittedTriangles = this._splitTriangle(t[0], t[1], t[2]);
            triangles = triangles.concat(splittedTriangles)
        }
    }

    _randomPolygonPoints () {
        var centerPoint = new Point (
            this.s / 2 + this.x,
            this.s / 2 + this.y
        );

        var radius = this.s / 2

        return Utils.rndPolygonPoints(centerPoint, this.rockOuterPointCnt, radius, radius - 20);
    }

    _splitTriangle (v1, v2, v3) {
        var rndPoint = this._generateRandPointInTriangle(v1.point, v2.point, v3.point);
        var rv = this.pointsGraph.addVertex(v1.uid + v2.uid + v3.uid, rndPoint);

        this.pointsGraph.addEdge(rv.uid, v1.uid);
        this.pointsGraph.addEdge(rv.uid, v2.uid);
        this.pointsGraph.addEdge(rv.uid, v3.uid);

        var t1 = [v1, v2, rv];
        var t2 = [v2, v3, rv];
        var t3 = [v3, v1, rv];

        return [t1, t2, t3];
    }

    _generateRandPointInTriangle (a, b, c) {
        var r1 = Math.random();
        var r2 = Math.random();
        var sqrtr1 = Math.sqrt(r1);

        var x = (1 - sqrtr1) * a.x + (sqrtr1 * (1 - r2)) * b.x + (sqrtr1 * r2) * c.x
        var y = (1 - sqrtr1) * a.y + (sqrtr1 * (1 - r2)) * b.y + (sqrtr1 * r2) * c.y

        return new Point(x, y);
    }

    _triangulatePolygon (points) {
        var triangles = earcut(points.reduce((total, p) => {
            total.push(p.x);
            total.push(p.y);
            return total;
        }, []));

        // Split result array to chunks
        var result = [];
        for (var i = 0, len = triangles.length; i < len; i += 3) {
            result.push(triangles.slice(i, i + 3));
        }

        return result;
    }
}

export default Rock
