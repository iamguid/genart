import Line from './Line';

class Vertex {
    constructor (uid, point) {
        this.uid = uid; // Unique identifier
        this.point = point // Vertext position point
    }
}

class Edge {
    constructor (line) {
        this.line = line;
    }
}

class Graph {
    constructor () {
        this._vertexMap = {};
        this._adjMatrix = {};
    }

    addEdge (sourceUid, destUid) {
        var v = this.getVertex(sourceUid);
        var w = this.getVertex(destUid);

        if (!v || !w) {
            return undefined;
        }

        // Return edge if exist
        var edge = this.getEdge(sourceUid, destUid);
        if (typeof edge !== 'undefined') {
            return edge;
        }

        // Create edge line from first point to second point
        var p1 = v.point;
        var p2 = w.point;
        var line = new Line(p1, p2);

        // Save edge in special matrix
        var edge = new Edge(line);
        this._adjMatrix[sourceUid + ':' + destUid] = edge;

        return edge;
    }

    hasEdge (sourceUid, destUid) {
        var e = this.getEdge(sourceUid, destUid);
        return typeof e !== 'undefined';
    }

    getEdge (sourceUid, destUid) {
        var k1 = sourceUid + ':' + destUid;
        var k2 = destUid + ':' + sourceUid;
        return this._adjMatrix[k1] || this._adjMatrix[k2];
    }


    addVertex (vertexUid, point) {
        var v = this._vertexMap[vertexUid];

        if (typeof v === 'undefined') {
            v = new Vertex(vertexUid, point);
            this._vertexMap[vertexUid] = v;
        }

        return v;
    }

    hasVertex (vertexUid) {
        var v = this.getVertex(vertexUid);
        return typeof v !== 'undefined';
    }

    getVertex (vertexUid) {
        return this._vertexMap[vertexUid];
    }
}

export default {
    Vertex,
    Edge,
    Graph
}

