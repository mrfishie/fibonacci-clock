var cells = [
    document.getElementById('cell-5'),
    document.getElementById('cell-4'),
    document.getElementById('cell-3'),
    document.getElementById('cell-2'),
    document.getElementById('cell-1')
];
var cellSizes = [];

for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    var size = parseInt(cell.getAttribute('data-size'));
    cellSizes.push(size);
}

function removeDuplicates(items, key) {
    var s = {};
    return items.filter(function(item) {
        var k = key ? key.apply(item) : item;
        return k in s ? false : s[k] = true;
    });
}

function convertToSet(num, startOffset, endOffset) {
    if (startOffset == null) startOffset = 0;
    if (endOffset == null) endOffset = cellSizes.length;

    var originalNum = num;

    if (startOffset >= cellSizes.length) return [];
    if (endOffset <= startOffset) return [];

    var result = [[]];
    for (var i = startOffset; i < endOffset && num > 0; i++) {
        var size = cellSizes[i];
        if (num >= size) {
            num -= size;
            result[0].push(i);
        }
    }

    // Validate result
    if (num !== 0) result[0] = [];

    // Remove the highest and try again
    result = result.concat(convertToSet(originalNum, startOffset + 1, endOffset));

    // Remove the lowest and try again
    result = result.concat(convertToSet(originalNum, startOffset, endOffset - 1));

    // Remove duplicates
    result = removeDuplicates(result, function() {
        return JSON.stringify(this);
    });

    if (!result[0].length) return result.slice(1);
    return result;
}

function findElements(num) {
    var indexes = convertToSet(num, 0);

    return indexes.map(function(items) {
        return items.map(function(index) {
            return cells[index];
        });
    });
}

function updateCell($cell, secondItems, minuteItems, hourItems) {
    var isMinute, isHour;

    isSecond = secondItems.indexOf($cell) !== -1;
    isMinute = minuteItems.indexOf($cell) !== -1;
    isHour = hourItems.indexOf($cell) !== -1;

    if (!isSecond) $cell.classList.remove('second');
    else {
        $cell.classList.add('second');
        setTimeout(function() {
            $cell.classList.remove('second');
        }, 4000);
    }

    if (!isMinute) clearElementMinute($cell);
    else setElementMinute($cell);

    if (!isHour) clearElementHour($cell);
    else setElementHour($cell);
}

function updateCells(seconds, minutes, hours) {
    var secs = Math.round(seconds / 5);
    var secondElts = findElements(secs);
    if (!secondElts.length) secondElts = [[]];
    //var secondItems = secondElts[Math.floor(Math.random() * secondElts.length)];
    var secondItems = secondElts[0];

    var mins = Math.round(minutes / 5);
    var minuteElts = findElements(mins);
    if (!minuteElts.length) minuteElts = [[]];
    //var minuteItems = minuteElts[Math.floor(Math.random() * minuteElts.length)];
    var minuteItems = minuteElts[0];

    var hourElts = findElements(hours);
    if (!hourElts.length) hourElts = [[]];
    //var hourItems = hourElts[Math.floor(Math.random() * hourElts.length)];
    var hourItems = hourElts[0];

    for (var i = 0; i < cells.length; i++) {
        updateCell(cells[i], secondItems, minuteItems, hourItems);
    }
}

function elementChanged($elt) {
    if ($elt.classList.contains('changing')) return;
    $elt.classList.add('changing');
    setTimeout(function() {
        $elt.classList.remove('changing');
    }, 2000);
}

function clearElementMinute($elt) {
    if (!$elt.classList.contains('minute')) return;
    $elt.classList.remove('minute');
    elementChanged($elt);
}
function clearElementHour($elt) {
    if (!$elt.classList.contains('hour')) return;
    $elt.classList.remove('hour');
    elementChanged($elt);
}
function setElementMinute($elt) {
    if ($elt.classList.contains('minute')) return;
    $elt.classList.add('minute');
    elementChanged($elt);
}
function setElementHour($elt) {
    if ($elt.classList.contains('hour')) return;
    $elt.classList.add('hour');
    elementChanged($elt);
}

function getNow() {
    var time = new Date(),
        hours24 = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds();

    var hours12 = hours24 > 11 ? hours24 - 12 : hours24;
    if (hours12 === 0) hours12 = 12;

    return {
        hours: hours12,
        minutes: minutes,
        seconds: seconds
    };
}

// Start the update loop
var previousSecond, previousMinute, previousHour;
function updateAll() {
    var time = getNow();

    //if (hours12 !== previousHour) updateHours(hours12);
    //if (minutes !== previousMinute) updateMinutes(minutes);

    if (time.seconds !== previousSecond ||
        time.minutes !== previousMinute ||
        time.hours   !== previousHour) updateCells(time.seconds, time.minutes, time.hours);

    previousSecond = time.seconds;
    previousMinute = time.minutes;
    previousHour = time.hours;
}

updateAll();
setInterval(updateAll, 5000); // update every 5 seconds

function pad(num, length) {
    var str = num.toString();
    var diff = length - str.length;
    for (var i = 0; i < diff; i++) {
        str = "0" + str;
    }
    return str;
}

var $time = document.getElementById('time'),
    $clock = document.getElementById('clock');
function updateTime() {
    var time = getNow();

    $time.textContent = pad(time.hours, 2) + ":"
        + pad(time.minutes, 2) + ":"
        + pad(time.seconds, 2);
}

var isShown = false;

$time.addEventListener('mouseover', function() {
    $time.style.color = "#FFF";
    $time.style.marginTop = "300px";
    $time.style.height = "100px";

    $clock.style.marginTop = "-300px";
});

$time.addEventListener('mouseout', function() {
    if (!isShown) {
        $time.style.color = "";
        $time.style.marginTop = "";
        $time.style.height = "";
        $clock.style.marginTop = "";
    }
});

$time.addEventListener('click', function() {
    isShown = !isShown;
});

updateTime();
setInterval(updateTime, 1000); // update every second

// Set opacity to full mid-animation to prevent it from disappearing when the animation is complete
setTimeout(function() {
    for (var i = 1; i < cells.length; i++) {
        cells[i].style.opacity = 1;
    }
}, 1000);

// Because there is no overlap between the other 4 boxes and this one's fade in, we have to do it a bit
// later
setTimeout(function() {
    cells[0].style.opacity = 1;
}, 1300);