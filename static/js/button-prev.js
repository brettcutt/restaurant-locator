
function MoveElement(styles) {
    var left = styles['fromLeft']['from'];
    var top = styles['fromTop']
    var height = styles['startHeight']
    var width = styles['startWidth']
    var fontsize = styles['startFontSize'];

    var box = document.querySelector('.box' + styles["boxNumber"]);

    var id = setInterval(frame, 20);
    function frame() {
        if (left == styles['fromLeft']['to']) {

            clearInterval(id)
        } else {

            left = styles.directionLeft(left);
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

function moveBoxesPrev() {
    document.querySelector("#btn-prev").disabled = true;


    function frontToFarLeft() {
        var styles = {
            "boxNumber": 1,
            "fromLeft": { "from": 50, "to": 20 },
            "fromTop": 51,
            "startHeight": 300,
            "startWidth": 300,
            "startFontSize": 40,
            directionLeft: function (left) {
                var elementDirection = left -= 2;
                return elementDirection;
            }, directionTop: function (top) {
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
            "newClass": "box2",
            "zindex": 3
        };

        MoveElement(styles)
    }

    frontToFarLeft()


    function farLeftToBackLeft() {
        var styles = {
            "boxNumber": 2,
            "fromLeft": { "from": 20, "to": 35 },
            "fromTop": 45,
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            directionLeft: function (left) {
                var elementDirection = left += 1;
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
            "newClass": "box3",
            "zindex": 2
        };

        MoveElement(styles)
    }

    farLeftToBackLeft()

    function backLeftToBackRight() {
        var styles = {
            "boxNumber": 3,
            "fromLeft": { "from": 35, "to": 65 },
            "fromTop": 40,
            "startHeight": 100,
            "startWidth": 100,
            "startFontSize": 22,
            directionLeft: function (left) {
                var elementDirection = left += 2;
                return elementDirection;
            },
            directionTop: function (top) {
                var elementDirection = top -= 0;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 0;
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += 0
                return size;
            },

            "newClass": "box4",
            "zindex": 1
        };

        MoveElement(styles)
    }

    backLeftToBackRight()

    function backRightToFarRight() {
        var styles = {
            "boxNumber": 4,
            "fromLeft": { "from": 65, "to": 80 },
            "fromTop": 40,
            "startHeight": 100,
            "startWidth": 100,
            "startFontSize": 22,
            directionLeft: function (left) {
                var elementDirection = left += 1;
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
            "newClass": "box5",
            "zindex": 1
        };

        MoveElement(styles)
    }

    backRightToFarRight()

    //Right Box going to the front
    function farRightToFront() {
        var styles = {
            "boxNumber": 5,
            "fromLeft": { "from": 80, "to": 50 },
            "fromTop": 45,
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            directionLeft: function (left) {
                var elementDirection = left -= 2;
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

        MoveElement(styles)
    }

    farRightToFront()

    setTimeout(
        function () {
            document.querySelector("#btn-prev").disabled = false;

        }, 500)
}
