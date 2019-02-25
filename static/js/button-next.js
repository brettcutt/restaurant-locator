
function MoveElementNext(styles) {
    var left = styles['fromLeft']['from'];
    var top = styles['fromTop']
    var height = styles['startHeight'];
    var width = styles['startWidth'];
    var fontsize = styles['startFontSize'];

    var box = document.querySelector('.box' + styles["boxNumber"]);

    var id = setInterval(frame, 20);

    function frame() {
        if (left == styles['fromLeft']['to']) {

            clearInterval(id)

        } else {

            left = styles.direction(left);
            top = styles.directionTop(top);
            height = styles.increment(height);
            width = styles.increment(width);
            fontsize = styles.fontSize(fontsize);

            document.querySelector('.box' + styles["boxNumber"]).style.zIndex = styles['zindex'];

            box.setAttribute('style', 'left: ' + left + '%;' +
                'top:' + top + '%;' +
                'height: ' + height + 'px;' +
                'width: ' + width + 'px;' +
                'font-size:' + fontsize + 'px;')

            box.setAttribute('class', styles['newClass'])

        }
    }
}

function moveBoxesNext() {
    document.querySelector("#btn-next").disabled = true;

    function frontToFarRight() {
        var styles = {
            "boxNumber": 1,
            "fromLeft": { "from": 50, "to": 80 },
            "fromTop": 51,
            "startHeight": 300,
            "startWidth": 300,
            "startFontSize": 40,
            direction: function (left) {
                var elementDirection = left += 2;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top -= .4;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size -= 6.66
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize -= .6
                return size;
            },
            "newClass": "box5",
            "zindex": 3
        };

        MoveElementNext(styles)
    }
    frontToFarRight();

    function farRightToBackRight() {
        var styles = {
            "boxNumber": 5,
            "fromLeft": { "from": 80, "to": 65 },
            "fromTop": 45,
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            direction: function (left) {
                var elementDirection = left -= 1;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top -= .3;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size -= 6.66
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize -= .6
                return size;
            },
            "newClass": "box4",
            "zindex": 2
        };

        MoveElementNext(styles)
    }
    farRightToBackRight()

    function backRightToBackLeft() {
        var styles = {
            "boxNumber": 4,
            "fromLeft": { "from": 65, "to": 35 },
            "fromTop": 40,
            "startHeight": 100,
            "startWidth": 100,
            "startFontSize": 22,
            direction: function (left) {
                var elementDirection = left -= 2;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top -= 0;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 0
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += 0
                return size;
            },

            "newClass": "box3",
            "zindex": 1
        };

        MoveElementNext(styles)
    }
    backRightToBackLeft()

    function backLeftToFarLeft() {
        var styles = {
            "boxNumber": 3,
            "fromLeft": { "from": 35, "to": 20 },
            "fromTop": 40,
            "startHeight": 100,
            "startWidth": 100,
            "startFontSize": 22,
            direction: function (left) {
                var elementDirection = left -= 1;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top += .3;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 6.66
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += .6
                return size;
            },
            "newClass": "box2",
            "zindex": 1
        };

        MoveElementNext(styles)
    }
    backLeftToFarLeft()

    function farLeftToFront() {
        var styles = {
            "boxNumber": 2,
            "fromLeft": { "from": 20, "to": 50 },
            "fromTop": 45,
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            direction: function (left) {
                var elementDirection = left += 2;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top += .4;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 6.66;
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += .6
                return size;
            },
            "newClass": "box1",
            "zindex": 2
        };

        MoveElementNext(styles)
    }

    farLeftToFront()

    setTimeout(
        function () {
            document.querySelector("#btn-next").disabled = false;

        }, 500)
}