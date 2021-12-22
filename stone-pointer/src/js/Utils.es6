import Point from './Point';

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

function getRandomItem (arr) {
    var rndIndex = getRandomInt(0, arr.length);
    return arr[rndIndex];
}

function range (arr) {
    var copy = arr.map(i => i).sort(compareNum);
    return [copy[0], copy[copy.length - 1]];
}

function compareNum (a, b) {
    return a - b;
}

function degToRad (deg) {
    return Math.PI / 180 * deg;
}

function rndPolygonPoints (pivotPoint, pointsCount, max, min) {
    var points = [];

    var maxAngleOffset = Math.PI * 2 / pointsCount;
    var minAngleOffset = Math.PI * 2 / pointsCount / 30;

    var minLength = min;
    var maxLength = max;

    var currentAngle = 0;
    for (var i = pointsCount; i >= 0; --i) {
        currentAngle += getRandomArbitrary(minAngleOffset, (Math.PI * 2 - currentAngle) - maxAngleOffset * i);
        var rndLength = getRandomArbitrary(minLength, maxLength);
        var x = pivotPoint.x + rndLength * Math.cos(currentAngle);
        var y = pivotPoint.y + rndLength * Math.sin(currentAngle);

        points.push(new Point(x, y));
    }

    return points;
}

export default {
    getRandomArbitrary,
    getRandomInt,
    range,
    compareNum,
    degToRad,
    rndPolygonPoints
};
