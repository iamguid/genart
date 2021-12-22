/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Rock = __webpack_require__(1);
	
	var _Rock2 = _interopRequireDefault(_Rock);
	
	var _Line = __webpack_require__(5);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _Point = __webpack_require__(3);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Utils = __webpack_require__(6);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var prepare = function prepare(size) {
	    var rootSvg = d3.select('body').append('svg').attr('width', size.width).attr('height', size.height);
	
	    var polygon = rootSvg.append('svg').attr('class', 'polygon').style('shape-rendering', 'geometricPrecision').attr('width', size.width).attr('height', size.height);
	
	    return {
	        svg: rootSvg,
	        polygon: polygon
	    };
	};
	
	function pointsToString(points) {
	    var firstPoint = points[0];
	
	    var string = points.reduce(function (total, point) {
	        var joined = [point.x, point.y].join(',');
	        var result = total + ' ' + joined;
	        return result;
	    }, '');
	
	    var firstPoint = points[0];
	    return string + ' ' + [firstPoint.x, firstPoint.y].join(',');
	}
	
	var drawPoint = function drawPoint(select) {
	    var pointEnter = select.enter().append('g').attr('class', 'point').append('circle').attr('cx', function (d) {
	        return d.x;
	    }).attr('cy', function (d) {
	        return d.y;
	    }).attr('r', 2.5).style('opacity', 0).style('fill', 'red');
	};
	
	var drawLine = function drawLine(select) {
	    var lineEnter = select.enter().append('polyline');
	
	    lineEnter.attr('points', function (line) {
	        return pointsToString([line.p1, line.p2]);
	    });
	
	    lineEnter.style('opacity', 0.3).style('stroke', 'black').style('stroke-width', 1).style('fill', 'none');
	};
	
	var drawRock = function drawRock(polygon, name, rock) {
	    var rockContainer = polygon.append('g').attr('class', 'rock').call(drawRockPoints, rock.pointsGraph).call(drawRockLines, rock.pointsGraph);
	    //.call(drawRect, name, rock);
	
	    function drawRect(select, name, rock) {
	        select.append('rect').attr('x', rock.x).attr('y', rock.y).attr('width', rock.s).attr('height', rock.s).style('fill', 'none').style('stroke', 'red').style('stroke-width', 1);
	
	        select.append('text').attr('x', rock.x).attr('y', rock.y - 10).text(name + ' (' + rock.x + ', ' + rock.y + ')').attr('font-family', 'sans-serif').attr('font-size', '13px').attr('fill', 'red');
	    }
	
	    function drawRockLines(select, pointsGraph) {
	        var lines = Object.keys(pointsGraph._adjMatrix).map(function (key) {
	            return pointsGraph._adjMatrix[key].line;
	        }, []);
	
	        var linesContainer = select.append('g').attr('class', 'rock-lines');
	
	        var line = linesContainer.selectAll('.line').data(lines).call(drawLine);
	    }
	
	    function drawRockPoints(select, pointsGraph) {
	        var points = Object.keys(pointsGraph._vertexMap).map(function (key) {
	            return pointsGraph._vertexMap[key].point;
	        });
	
	        var pointsContainer = select.append('g').attr('class', 'rock-points');
	
	        var point = pointsContainer.selectAll('.point').data(points).call(drawPoint);
	    }
	};
	
	/*
	 * Set globals
	 */
	
	var globalSize = {
	    width: 2248,
	    height: 1400
	};
	
	/*
	 * Draw all
	 */
	
	var prepared = prepare(globalSize);
	//drawRock(prepared.polygon, 'r1',  new Rock(400, 500, 260, 7, 1600));
	//drawRock(prepared.polygon, 'r2',  new Rock(374, 768, 30,  4, 1000));
	//drawRock(prepared.polygon, 'r7',  new Rock(300, 700, 80,  3, 300));
	//drawRock(prepared.polygon, 'r8',  new Rock(449, 860, 100, 5, 500));
	//drawRock(prepared.polygon, 'r9',  new Rock(334, 817, 40,  5, 1000));
	//drawRock(prepared.polygon, 'r10', new Rock(384, 914, 40,  5, 1000));
	//drawRock(prepared.polygon, 'r11', new Rock(450, 100, 100, 5, 500));
	
	var n = 1.4;
	var m = 1;
	
	drawRock(prepared.polygon, 'r10', new _Rock2.default(650 * n, 650 * n, 30 * n, 5, 300 * m));
	drawRock(prepared.polygon, 'r09', new _Rock2.default(820 * n, 540 * n, 180 * n, 7, 600 * m));
	drawRock(prepared.polygon, 'r01', new _Rock2.default(500 * n, 200 * n, 360 * n, 10, 300 * m));
	drawRock(prepared.polygon, 'r02', new _Rock2.default(200 * n, 250 * n, 260 * n, 7, 900 * m));
	drawRock(prepared.polygon, 'r05', new _Rock2.default(920 * n, 200 * n, 200 * n, 7, 400 * m));
	drawRock(prepared.polygon, 'r04', new _Rock2.default(480 * n, 120 * n, 90 * n, 8, 300 * m));
	drawRock(prepared.polygon, 'r06', new _Rock2.default(850 * n, 160 * n, 60 * n, 6, 300 * m));
	drawRock(prepared.polygon, 'r03', new _Rock2.default(450 * n, 548 * n, 100 * n, 8, 900 * m));
	drawRock(prepared.polygon, 'r07', new _Rock2.default(890 * n, 420 * n, 80 * n, 5, 900 * m));
	drawRock(prepared.polygon, 'r08', new _Rock2.default(1100 * n, 540 * n, 20 * n, 5, 300 * m));
	drawRock(prepared.polygon, 'r4', new _Rock2.default(260 * n, 530 * n, 30 * n, 5, 100 * m));
	drawRock(prepared.polygon, 'r5', new _Rock2.default(350 * n, 160 * n, 30 * n, 5, 100 * m));
	
	//drawRock(prepared.polygon, 'r',  new Rock(100, 100, 800,  6, 500));

	//var maxSize = 500;
	//var minSize = 260;

	//var leftOffset = 180;
	//for (var i = 0; i < 3; i++) {
	//var topOffset = 180

	//var cnt, size, fff;

	//for (var j = 0; j < 2; j++) {
	//cnt = Utils.getRandomInt(4, 5);
	//size = Utils.getRandomInt(150, 200);
	//fff = Utils.getRandomInt(2000, 3000);

	//drawRock(prepared.polygon, '', new Rock(leftOffset, topOffset, size, cnt, fff));

	//topOffset += 80 + size
	//}

	//leftOffset += 80 + size;
	//}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _earcut = __webpack_require__(2);
	
	var _earcut2 = _interopRequireDefault(_earcut);
	
	var _Point = __webpack_require__(3);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _PointsGraph = __webpack_require__(4);
	
	var _PointsGraph2 = _interopRequireDefault(_PointsGraph);
	
	var _Utils = __webpack_require__(6);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rock = function () {
	    function Rock(x, y, s, rockOuterPointCnt, minTriangleArea) {
	        _classCallCheck(this, Rock);
	
	        this.x = x;
	        this.y = y;
	        this.s = s;
	        this.rockOuterPointCnt = rockOuterPointCnt;
	        this.minTriangleArea = minTriangleArea;
	
	        this.pointsGraph = new _PointsGraph2.default.Graph();
	        this._generateRock();
	    }
	
	    _createClass(Rock, [{
	        key: '_generateRock',
	        value: function _generateRock() {
	            this._generateRockBody();
	        }
	    }, {
	        key: '_generateRockBody',
	        value: function _generateRockBody() {
	            var graph = this.pointsGraph;
	            var polygonPoints = this._randomPolygonPoints();
	            var baseTriangles = this._triangulatePolygon(polygonPoints);
	            var triangles = [];
	
	            // Forcing fill graph
	            var pref = 'body_';
	            baseTriangles.forEach(function (t, i) {
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
	                triangles = triangles.concat(splittedTriangles);
	            }
	        }
	    }, {
	        key: '_randomPolygonPoints',
	        value: function _randomPolygonPoints() {
	            var centerPoint = new _Point2.default(this.s / 2 + this.x, this.s / 2 + this.y);
	
	            var radius = this.s / 2;
	
	            return _Utils2.default.rndPolygonPoints(centerPoint, this.rockOuterPointCnt, radius, radius - 20);
	        }
	    }, {
	        key: '_splitTriangle',
	        value: function _splitTriangle(v1, v2, v3) {
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
	    }, {
	        key: '_generateRandPointInTriangle',
	        value: function _generateRandPointInTriangle(a, b, c) {
	            var r1 = Math.random();
	            var r2 = Math.random();
	            var sqrtr1 = Math.sqrt(r1);
	
	            var x = (1 - sqrtr1) * a.x + sqrtr1 * (1 - r2) * b.x + sqrtr1 * r2 * c.x;
	            var y = (1 - sqrtr1) * a.y + sqrtr1 * (1 - r2) * b.y + sqrtr1 * r2 * c.y;
	
	            return new _Point2.default(x, y);
	        }
	    }, {
	        key: '_triangulatePolygon',
	        value: function _triangulatePolygon(points) {
	            var triangles = (0, _earcut2.default)(points.reduce(function (total, p) {
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
	    }]);
	
	    return Rock;
	}();
	
	exports.default = Rock;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = earcut;
	
	function earcut(data, holeIndices, dim) {
	
	    dim = dim || 2;
	
	    var hasHoles = holeIndices && holeIndices.length,
	        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
	        outerNode = linkedList(data, 0, outerLen, dim, true),
	        triangles = [];
	
	    if (!outerNode) return triangles;
	
	    var minX, minY, maxX, maxY, x, y, size;
	
	    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
	
	    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
	    if (data.length > 80 * dim) {
	        minX = maxX = data[0];
	        minY = maxY = data[1];
	
	        for (var i = dim; i < outerLen; i += dim) {
	            x = data[i];
	            y = data[i + 1];
	            if (x < minX) minX = x;
	            if (y < minY) minY = y;
	            if (x > maxX) maxX = x;
	            if (y > maxY) maxY = y;
	        }
	
	        // minX, minY and size are later used to transform coords into integers for z-order calculation
	        size = Math.max(maxX - minX, maxY - minY);
	    }
	
	    earcutLinked(outerNode, triangles, dim, minX, minY, size);
	
	    return triangles;
	}
	
	// create a circular doubly linked list from polygon points in the specified winding order
	function linkedList(data, start, end, dim, clockwise) {
	    var i, last;
	
	    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
	        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	    } else {
	        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
	    }
	
	    if (last && equals(last, last.next)) {
	        removeNode(last);
	        last = last.next;
	    }
	
	    return last;
	}
	
	// eliminate colinear or duplicate points
	function filterPoints(start, end) {
	    if (!start) return start;
	    if (!end) end = start;
	
	    var p = start,
	        again;
	    do {
	        again = false;
	
	        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
	            removeNode(p);
	            p = end = p.prev;
	            if (p === p.next) return null;
	            again = true;
	
	        } else {
	            p = p.next;
	        }
	    } while (again || p !== end);
	
	    return end;
	}
	
	// main ear slicing loop which triangulates a polygon (given as a linked list)
	function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
	    if (!ear) return;
	
	    // interlink polygon nodes in z-order
	    if (!pass && size) indexCurve(ear, minX, minY, size);
	
	    var stop = ear,
	        prev, next;
	
	    // iterate through ears, slicing them one by one
	    while (ear.prev !== ear.next) {
	        prev = ear.prev;
	        next = ear.next;
	
	        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
	            // cut off the triangle
	            triangles.push(prev.i / dim);
	            triangles.push(ear.i / dim);
	            triangles.push(next.i / dim);
	
	            removeNode(ear);
	
	            // skipping the next vertice leads to less sliver triangles
	            ear = next.next;
	            stop = next.next;
	
	            continue;
	        }
	
	        ear = next;
	
	        // if we looped through the whole remaining polygon and can't find any more ears
	        if (ear === stop) {
	            // try filtering points and slicing again
	            if (!pass) {
	                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
	
	            // if this didn't work, try curing all small self-intersections locally
	            } else if (pass === 1) {
	                ear = cureLocalIntersections(ear, triangles, dim);
	                earcutLinked(ear, triangles, dim, minX, minY, size, 2);
	
	            // as a last resort, try splitting the remaining polygon into two
	            } else if (pass === 2) {
	                splitEarcut(ear, triangles, dim, minX, minY, size);
	            }
	
	            break;
	        }
	    }
	}
	
	// check whether a polygon node forms a valid ear with adjacent nodes
	function isEar(ear) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	
	    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	
	    // now make sure we don't have other points inside the potential ear
	    var p = ear.next.next;
	
	    while (p !== ear.prev) {
	        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.next;
	    }
	
	    return true;
	}
	
	function isEarHashed(ear, minX, minY, size) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	
	    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	
	    // triangle bbox; min & max are calculated like this for speed
	    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
	        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
	        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
	        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);
	
	    // z-order range for the current triangle bbox;
	    var minZ = zOrder(minTX, minTY, minX, minY, size),
	        maxZ = zOrder(maxTX, maxTY, minX, minY, size);
	
	    // first look for points inside the triangle in increasing z-order
	    var p = ear.nextZ;
	
	    while (p && p.z <= maxZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.nextZ;
	    }
	
	    // then look for points in decreasing z-order
	    p = ear.prevZ;
	
	    while (p && p.z >= minZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.prevZ;
	    }
	
	    return true;
	}
	
	// go through all polygon nodes and cure small local self-intersections
	function cureLocalIntersections(start, triangles, dim) {
	    var p = start;
	    do {
	        var a = p.prev,
	            b = p.next.next;
	
	        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
	
	            triangles.push(a.i / dim);
	            triangles.push(p.i / dim);
	            triangles.push(b.i / dim);
	
	            // remove two nodes involved
	            removeNode(p);
	            removeNode(p.next);
	
	            p = start = b;
	        }
	        p = p.next;
	    } while (p !== start);
	
	    return p;
	}
	
	// try splitting polygon into two and triangulate them independently
	function splitEarcut(start, triangles, dim, minX, minY, size) {
	    // look for a valid diagonal that divides the polygon into two
	    var a = start;
	    do {
	        var b = a.next.next;
	        while (b !== a.prev) {
	            if (a.i !== b.i && isValidDiagonal(a, b)) {
	                // split the polygon in two by the diagonal
	                var c = splitPolygon(a, b);
	
	                // filter colinear points around the cuts
	                a = filterPoints(a, a.next);
	                c = filterPoints(c, c.next);
	
	                // run earcut on each half
	                earcutLinked(a, triangles, dim, minX, minY, size);
	                earcutLinked(c, triangles, dim, minX, minY, size);
	                return;
	            }
	            b = b.next;
	        }
	        a = a.next;
	    } while (a !== start);
	}
	
	// link every hole into the outer loop, producing a single-ring polygon without holes
	function eliminateHoles(data, holeIndices, outerNode, dim) {
	    var queue = [],
	        i, len, start, end, list;
	
	    for (i = 0, len = holeIndices.length; i < len; i++) {
	        start = holeIndices[i] * dim;
	        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	        list = linkedList(data, start, end, dim, false);
	        if (list === list.next) list.steiner = true;
	        queue.push(getLeftmost(list));
	    }
	
	    queue.sort(compareX);
	
	    // process holes from left to right
	    for (i = 0; i < queue.length; i++) {
	        eliminateHole(queue[i], outerNode);
	        outerNode = filterPoints(outerNode, outerNode.next);
	    }
	
	    return outerNode;
	}
	
	function compareX(a, b) {
	    return a.x - b.x;
	}
	
	// find a bridge between vertices that connects hole with an outer ring and and link it
	function eliminateHole(hole, outerNode) {
	    outerNode = findHoleBridge(hole, outerNode);
	    if (outerNode) {
	        var b = splitPolygon(outerNode, hole);
	        filterPoints(b, b.next);
	    }
	}
	
	// David Eberly's algorithm for finding a bridge between hole and outer polygon
	function findHoleBridge(hole, outerNode) {
	    var p = outerNode,
	        hx = hole.x,
	        hy = hole.y,
	        qx = -Infinity,
	        m;
	
	    // find a segment intersected by a ray from the hole's leftmost point to the left;
	    // segment's endpoint with lesser x will be potential connection point
	    do {
	        if (hy <= p.y && hy >= p.next.y) {
	            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
	            if (x <= hx && x > qx) {
	                qx = x;
	                if (x === hx) {
	                    if (hy === p.y) return p;
	                    if (hy === p.next.y) return p.next;
	                }
	                m = p.x < p.next.x ? p : p.next;
	            }
	        }
	        p = p.next;
	    } while (p !== outerNode);
	
	    if (!m) return null;
	
	    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint
	
	    // look for points inside the triangle of hole point, segment intersection and endpoint;
	    // if there are no points found, we have a valid connection;
	    // otherwise choose the point of the minimum angle with the ray as connection point
	
	    var stop = m,
	        mx = m.x,
	        my = m.y,
	        tanMin = Infinity,
	        tan;
	
	    p = m.next;
	
	    while (p !== stop) {
	        if (hx >= p.x && p.x >= mx &&
	                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
	
	            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential
	
	            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
	                m = p;
	                tanMin = tan;
	            }
	        }
	
	        p = p.next;
	    }
	
	    return m;
	}
	
	// interlink polygon nodes in z-order
	function indexCurve(start, minX, minY, size) {
	    var p = start;
	    do {
	        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
	        p.prevZ = p.prev;
	        p.nextZ = p.next;
	        p = p.next;
	    } while (p !== start);
	
	    p.prevZ.nextZ = null;
	    p.prevZ = null;
	
	    sortLinked(p);
	}
	
	// Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
	function sortLinked(list) {
	    var i, p, q, e, tail, numMerges, pSize, qSize,
	        inSize = 1;
	
	    do {
	        p = list;
	        list = null;
	        tail = null;
	        numMerges = 0;
	
	        while (p) {
	            numMerges++;
	            q = p;
	            pSize = 0;
	            for (i = 0; i < inSize; i++) {
	                pSize++;
	                q = q.nextZ;
	                if (!q) break;
	            }
	
	            qSize = inSize;
	
	            while (pSize > 0 || (qSize > 0 && q)) {
	
	                if (pSize === 0) {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                } else if (qSize === 0 || !q) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else if (p.z <= q.z) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                }
	
	                if (tail) tail.nextZ = e;
	                else list = e;
	
	                e.prevZ = tail;
	                tail = e;
	            }
	
	            p = q;
	        }
	
	        tail.nextZ = null;
	        inSize *= 2;
	
	    } while (numMerges > 1);
	
	    return list;
	}
	
	// z-order of a point given coords and size of the data bounding box
	function zOrder(x, y, minX, minY, size) {
	    // coords are transformed into non-negative 15-bit integer range
	    x = 32767 * (x - minX) / size;
	    y = 32767 * (y - minY) / size;
	
	    x = (x | (x << 8)) & 0x00FF00FF;
	    x = (x | (x << 4)) & 0x0F0F0F0F;
	    x = (x | (x << 2)) & 0x33333333;
	    x = (x | (x << 1)) & 0x55555555;
	
	    y = (y | (y << 8)) & 0x00FF00FF;
	    y = (y | (y << 4)) & 0x0F0F0F0F;
	    y = (y | (y << 2)) & 0x33333333;
	    y = (y | (y << 1)) & 0x55555555;
	
	    return x | (y << 1);
	}
	
	// find the leftmost node of a polygon ring
	function getLeftmost(start) {
	    var p = start,
	        leftmost = start;
	    do {
	        if (p.x < leftmost.x) leftmost = p;
	        p = p.next;
	    } while (p !== start);
	
	    return leftmost;
	}
	
	// check if a point lies within a convex triangle
	function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
	           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
	           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
	}
	
	// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
	function isValidDiagonal(a, b) {
	    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
	           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
	}
	
	// signed area of a triangle
	function area(p, q, r) {
	    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	}
	
	// check if two points are equal
	function equals(p1, p2) {
	    return p1.x === p2.x && p1.y === p2.y;
	}
	
	// check if two segments intersect
	function intersects(p1, q1, p2, q2) {
	    if ((equals(p1, q1) && equals(p2, q2)) ||
	        (equals(p1, q2) && equals(p2, q1))) return true;
	    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
	           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
	}
	
	// check if a polygon diagonal intersects any polygon segments
	function intersectsPolygon(a, b) {
	    var p = a;
	    do {
	        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
	                intersects(p, p.next, a, b)) return true;
	        p = p.next;
	    } while (p !== a);
	
	    return false;
	}
	
	// check if a polygon diagonal is locally inside the polygon
	function locallyInside(a, b) {
	    return area(a.prev, a, a.next) < 0 ?
	        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
	        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
	}
	
	// check if the middle point of a polygon diagonal is inside the polygon
	function middleInside(a, b) {
	    var p = a,
	        inside = false,
	        px = (a.x + b.x) / 2,
	        py = (a.y + b.y) / 2;
	    do {
	        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
	            inside = !inside;
	        p = p.next;
	    } while (p !== a);
	
	    return inside;
	}
	
	// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring
	function splitPolygon(a, b) {
	    var a2 = new Node(a.i, a.x, a.y),
	        b2 = new Node(b.i, b.x, b.y),
	        an = a.next,
	        bp = b.prev;
	
	    a.next = b;
	    b.prev = a;
	
	    a2.next = an;
	    an.prev = a2;
	
	    b2.next = a2;
	    a2.prev = b2;
	
	    bp.next = b2;
	    b2.prev = bp;
	
	    return b2;
	}
	
	// create a node and optionally link it with previous one (in a circular doubly linked list)
	function insertNode(i, x, y, last) {
	    var p = new Node(i, x, y);
	
	    if (!last) {
	        p.prev = p;
	        p.next = p;
	
	    } else {
	        p.next = last.next;
	        p.prev = last;
	        last.next.prev = p;
	        last.next = p;
	    }
	    return p;
	}
	
	function removeNode(p) {
	    p.next.prev = p.prev;
	    p.prev.next = p.next;
	
	    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
	}
	
	function Node(i, x, y) {
	    // vertice index in coordinates array
	    this.i = i;
	
	    // vertex coordinates
	    this.x = x;
	    this.y = y;
	
	    // previous and next vertice nodes in a polygon ring
	    this.prev = null;
	    this.next = null;
	
	    // z-order curve value
	    this.z = null;
	
	    // previous and next nodes in z-order
	    this.prevZ = null;
	    this.nextZ = null;
	
	    // indicates whether this is a steiner point
	    this.steiner = false;
	}
	
	// return a percentage difference between the polygon area and its triangulation area;
	// used to verify correctness of triangulation
	earcut.deviation = function (data, holeIndices, dim, triangles) {
	    var hasHoles = holeIndices && holeIndices.length;
	    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
	
	    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
	    if (hasHoles) {
	        for (var i = 0, len = holeIndices.length; i < len; i++) {
	            var start = holeIndices[i] * dim;
	            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	            polygonArea -= Math.abs(signedArea(data, start, end, dim));
	        }
	    }
	
	    var trianglesArea = 0;
	    for (i = 0; i < triangles.length; i += 3) {
	        var a = triangles[i] * dim;
	        var b = triangles[i + 1] * dim;
	        var c = triangles[i + 2] * dim;
	        trianglesArea += Math.abs(
	            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
	            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
	    }
	
	    return polygonArea === 0 && trianglesArea === 0 ? 0 :
	        Math.abs((trianglesArea - polygonArea) / polygonArea);
	};
	
	function signedArea(data, start, end, dim) {
	    var sum = 0;
	    for (var i = start, j = end - dim; i < end; i += dim) {
	        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	        j = i;
	    }
	    return sum;
	}
	
	// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
	earcut.flatten = function (data) {
	    var dim = data[0][0].length,
	        result = {vertices: [], holes: [], dimensions: dim},
	        holeIndex = 0;
	
	    for (var i = 0; i < data.length; i++) {
	        for (var j = 0; j < data[i].length; j++) {
	            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
	        }
	        if (i > 0) {
	            holeIndex += data[i - 1].length;
	            result.holes.push(holeIndex);
	        }
	    }
	    return result;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Point = function () {
	    function Point(_x, _y) {
	        _classCallCheck(this, Point);
	
	        this.x = _x;
	        this.y = _y;
	    }
	
	    _createClass(Point, null, [{
	        key: "getDistance",
	        value: function getDistance(p1, p2) {
	            var powX = Math.pow(p1.x - p2.x, 2);
	            var powY = Math.pow(p1.y - p2.y, 2);
	
	            return Math.sqrt(powX + powY);
	        }
	    }]);
	
	    return Point;
	}();
	
	exports.default = Point;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Line = __webpack_require__(5);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vertex = function Vertex(uid, point) {
	    _classCallCheck(this, Vertex);
	
	    this.uid = uid; // Unique identifier
	    this.point = point; // Vertext position point
	};
	
	var Edge = function Edge(line) {
	    _classCallCheck(this, Edge);
	
	    this.line = line;
	};
	
	var Graph = function () {
	    function Graph() {
	        _classCallCheck(this, Graph);
	
	        this._vertexMap = {};
	        this._adjMatrix = {};
	    }
	
	    _createClass(Graph, [{
	        key: 'addEdge',
	        value: function addEdge(sourceUid, destUid) {
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
	            var line = new _Line2.default(p1, p2);
	
	            // Save edge in special matrix
	            var edge = new Edge(line);
	            this._adjMatrix[sourceUid + ':' + destUid] = edge;
	
	            return edge;
	        }
	    }, {
	        key: 'hasEdge',
	        value: function hasEdge(sourceUid, destUid) {
	            var e = this.getEdge(sourceUid, destUid);
	            return typeof e !== 'undefined';
	        }
	    }, {
	        key: 'getEdge',
	        value: function getEdge(sourceUid, destUid) {
	            var k1 = sourceUid + ':' + destUid;
	            var k2 = destUid + ':' + sourceUid;
	            return this._adjMatrix[k1] || this._adjMatrix[k2];
	        }
	    }, {
	        key: 'addVertex',
	        value: function addVertex(vertexUid, point) {
	            var v = this._vertexMap[vertexUid];
	
	            if (typeof v === 'undefined') {
	                v = new Vertex(vertexUid, point);
	                this._vertexMap[vertexUid] = v;
	            }
	
	            return v;
	        }
	    }, {
	        key: 'hasVertex',
	        value: function hasVertex(vertexUid) {
	            var v = this.getVertex(vertexUid);
	            return typeof v !== 'undefined';
	        }
	    }, {
	        key: 'getVertex',
	        value: function getVertex(vertexUid) {
	            return this._vertexMap[vertexUid];
	        }
	    }]);
	
	    return Graph;
	}();
	
	exports.default = {
	    Vertex: Vertex,
	    Edge: Edge,
	    Graph: Graph
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Point = __webpack_require__(3);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Utils = __webpack_require__(6);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Line = function () {
	    function Line(p1, p2) {
	        _classCallCheck(this, Line);
	
	        this.p1 = p1;
	        this.p2 = p2;
	
	        // Give the equation vars
	        this.a = p1.y - p2.y;
	        this.b = p2.x - p1.x;
	        this.c = -(this.a * p1.x + this.b * p1.y);
	
	        this.d = this.getDistance();
	    }
	
	    _createClass(Line, [{
	        key: 'getDistance',
	        value: function getDistance() {
	            return Line.getDistance(this);
	        }
	    }, {
	        key: 'getIntersectPoint',
	        value: function getIntersectPoint(line) {
	            return Line.getIntersectPoint(this, line);
	        }
	    }], [{
	        key: 'getDistance',
	        value: function getDistance(line) {
	            var a = Math.pow(line.p2.x - line.p1.x, 2);
	            var b = Math.pow(line.p2.y - line.p1.y, 2);
	            return Math.abs(Math.sqrt(a + b));
	        }
	    }, {
	        key: 'getIntersectPoint',
	        value: function getIntersectPoint(line1, line2) {
	            var det = function det(a1, a2, b1, b2) {
	                return a1 * b2 - a2 * b1;
	            };
	
	            var zn = det(line1.a, line1.b, line2.a, line2.b);
	            var dx = det(line1.c, line1.b, line2.c, line2.b);
	            var dy = det(line1.a, line1.c, line2.a, line2.c);
	
	            var x = -(dx / zn);
	            var y = -(dy / zn);
	
	            var h = line1.p1.x <= x && line1.p2.x >= x || line1.p2.x <= x && line1.p1.x >= x;
	            var v = line2.p1.x <= x && line2.p2.x >= x || line2.p2.x <= x && line2.p1.x >= x;
	
	            return h && v ? new _Point2.default(x, y) : undefined;
	        }
	    }]);
	
	    return Line;
	}();
	
	exports.default = Line;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Point = __webpack_require__(3);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Returns a random number between min (inclusive) and max (exclusive)
	function getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}
	
	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function getRandomItem(arr) {
	    var rndIndex = getRandomInt(0, arr.length);
	    return arr[rndIndex];
	}
	
	function range(arr) {
	    var copy = arr.map(function (i) {
	        return i;
	    }).sort(compareNum);
	    return [copy[0], copy[copy.length - 1]];
	}
	
	function compareNum(a, b) {
	    return a - b;
	}
	
	function degToRad(deg) {
	    return Math.PI / 180 * deg;
	}
	
	function rndPolygonPoints(pivotPoint, pointsCount, max, min) {
	    var points = [];
	
	    var maxAngleOffset = Math.PI * 2 / pointsCount;
	    var minAngleOffset = Math.PI * 2 / pointsCount / 30;
	
	    var minLength = min;
	    var maxLength = max;
	
	    var currentAngle = 0;
	    for (var i = pointsCount; i >= 0; --i) {
	        currentAngle += getRandomArbitrary(minAngleOffset, Math.PI * 2 - currentAngle - maxAngleOffset * i);
	        var rndLength = getRandomArbitrary(minLength, maxLength);
	        var x = pivotPoint.x + rndLength * Math.cos(currentAngle);
	        var y = pivotPoint.y + rndLength * Math.sin(currentAngle);
	
	        points.push(new _Point2.default(x, y));
	    }
	
	    return points;
	}
	
	exports.default = {
	    getRandomArbitrary: getRandomArbitrary,
	    getRandomInt: getRandomInt,
	    range: range,
	    compareNum: compareNum,
	    degToRad: degToRad,
	    rndPolygonPoints: rndPolygonPoints
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map