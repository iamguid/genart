import Rock from './Rock';
import Line from './Line';
import Point from './Point';
import Utils from './Utils';

var prepare = function (size) {
    var rootSvg = d3.select('body')
        .append('svg')
        .attr('width', size.width)
        .attr('height', size.height);

    var polygon = rootSvg
        .append('svg')
        .attr('class', 'polygon')
        .style('shape-rendering', 'geometricPrecision')
        .attr('width', size.width)
        .attr('height', size.height)

    return {
        svg: rootSvg,
        polygon: polygon
    };
}

function pointsToString (points) {
    var firstPoint = points[0]

    var string = points.reduce((total, point) => {
        var joined = [point.x, point.y].join(',');
        var result = total + ' ' + joined;
        return result
    }, '')

    var firstPoint = points[0];
    return string + ' ' + [firstPoint.x, firstPoint.y].join(',');
}

var drawPoint = function (select) {
    var pointEnter = select
        .enter()
        .append('g')
        .attr('class', 'point')
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 2.5)
        .style('opacity', 0)
        .style('fill', 'red');
}

var drawLine = function (select) {
    var lineEnter = select
        .enter()
        .append('polyline');

    lineEnter.attr('points', (line) => {
        return pointsToString([line.p1, line.p2]);
    });

    lineEnter
        .style('opacity', 0.3)
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style('fill', 'none');
}

var drawRock = function (polygon, name, rock) {
    var rockContainer = polygon
        .append('g')
        .attr('class', 'rock')
        .call(drawRockPoints, rock.pointsGraph)
        .call(drawRockLines, rock.pointsGraph)
        //.call(drawRect, name, rock);

    function drawRect (select, name, rock) {
        select
            .append('rect')
            .attr('x', rock.x)
            .attr('y', rock.y)
            .attr('width', rock.s)
            .attr('height', rock.s)
            .style('fill', 'none')
            .style('stroke', 'red')
            .style('stroke-width', 1);

        select
            .append('text')
            .attr('x', rock.x)
            .attr('y', rock.y - 10)
            .text(`${name} (${rock.x}, ${rock.y})`)
            .attr('font-family', 'sans-serif')
            .attr('font-size', '13px')
            .attr('fill', 'red');
    }

    function drawRockLines (select, pointsGraph) {
        var lines = Object.keys(pointsGraph._adjMatrix).map(key => {
            return pointsGraph._adjMatrix[key].line;
        }, [])

        var linesContainer = select
            .append('g')
            .attr('class', 'rock-lines');

        var line = linesContainer
            .selectAll('.line')
            .data(lines)
            .call(drawLine);
    }

    function drawRockPoints (select, pointsGraph) {
        var points = Object.keys(pointsGraph._vertexMap).map((key) => {
            return pointsGraph._vertexMap[key].point;
        })

        var pointsContainer = select
            .append('g')
            .attr('class', 'rock-points');

        var point = pointsContainer
            .selectAll('.point')
            .data(points)
            .call(drawPoint);
    }
}


/*
 * Set globals
 */

var globalSize = {
    width: 2248,
    height: 1400
}


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

var n = 1.4
var m = 1

drawRock(prepared.polygon, 'r10', new Rock(650  * n, 650 * n, 30  * n, 5,  300 * m));
drawRock(prepared.polygon, 'r09', new Rock(820  * n, 540 * n, 180 * n, 7,  600 * m));
drawRock(prepared.polygon, 'r01', new Rock(500  * n, 200 * n, 360 * n, 10, 300 * m));
drawRock(prepared.polygon, 'r02', new Rock(200  * n, 250 * n, 260 * n, 7,  900 * m));
drawRock(prepared.polygon, 'r05', new Rock(920  * n, 200 * n, 200 * n, 7,  400 * m));
drawRock(prepared.polygon, 'r04', new Rock(480  * n, 120 * n, 90  * n, 8,  300 * m));
drawRock(prepared.polygon, 'r06', new Rock(850  * n, 160 * n, 60  * n, 6,  300 * m));
drawRock(prepared.polygon, 'r03', new Rock(450  * n, 548 * n, 100 * n, 8,  900 * m));
drawRock(prepared.polygon, 'r07', new Rock(890  * n, 420 * n, 80  * n, 5,  900 * m));
drawRock(prepared.polygon, 'r08', new Rock(1100 * n, 540 * n, 20  * n, 5,  300 * m));
drawRock(prepared.polygon, 'r4',  new Rock(260  * n, 530 * n, 30  * n, 5,  100 * m));
drawRock(prepared.polygon, 'r5',  new Rock(350  * n, 160 * n, 30  * n, 5,  100 * m));




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


