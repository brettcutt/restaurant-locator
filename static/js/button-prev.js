
function MoveElement(styles) {
    var left = styles['fromLeft']['from'];
    var height = styles['startHeight']
    var width = styles['startWidth']
    var fontsize = styles['startFontSize'];

    var box = document.querySelector('.box' + styles["boxNumber"]);

    var id = setInterval(frame, 20);
    function frame() {
        if (left == styles['fromLeft']['to']) {

            clearInterval(id)
        } else {

            left = styles.direction(left);
            height = styles.increment(height);
            width = styles.increment(width);
            document.querySelector('.box' + styles["boxNumber"]).style.zIndex = styles['zindex'];
            fontsize = styles.fontSize(fontsize)


            box.setAttribute('style', 'left: ' + left + '%;' +
                'height: ' + height + 'px;' +
                'width: ' + width + 'px;' +
                'font-size:' + fontsize + 'px;')


            box.setAttribute('class', styles['newClass'])

        }
    }
}

function moveBoxesPrev() {
    document.querySelector("#btn-prev").disabled = true;

    //Front Box going to the left
    function onMoveElementPrevLeft() {
        var styles = {
            "boxNumber": 1,
            "fromLeft": { "from": 50, "to": 20 },
            "startHeight": 300,
            "startWidth": 300,
            "startFontSize": 40,
            direction: function (left) {
                var elementDirection = left -= 1;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size -= 3.33
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize -= .3
                return size;
            },
            "newClass": "box2",
            "zindex": 3
        };

        MoveElement(styles)
    }
    onMoveElementPrevLeft()


    //Left Box going to the back
    function onMoveElementPrevBack() {
        var styles = {
            "boxNumber": 2,
            "fromLeft": { "from": 20, "to": 50 },
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            direction: function (left) {
                var elementDirection = left += 1;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size -= 3.33
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize -= .3
                return size;
            },
            "newClass": "box3",
            "zindex": 2
        };

        MoveElement(styles)
    }
    onMoveElementPrevBack()


    //Back Box going to the right
    function onMoveElementPrevRight() {
        var styles = {
            "boxNumber": 3,
            "fromLeft": { "from": 50, "to": 80 },
            "startHeight": 100,
            "startWidth": 100,
            "startFontSize": 22,
            direction: function (left) {
                var elementDirection = left += 1;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 3.33
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += .3
                return size;
            },

            "newClass": "box4",
            "zindex": 1
        };

        MoveElement(styles)
    }
    onMoveElementPrevRight()


    //Right Box going to the front
    function onMoveElementPrevFront() {
        var styles = {
            "boxNumber": 4,
            "fromLeft": { "from": 80, "to": 50 },
            "startHeight": 200,
            "startWidth": 200,
            "startFontSize": 31,
            direction: function (left) {
                var elementDirection = left -= 1;
                return elementDirection;
            },
            increment: function (size) {
                var elementSize = size += 3.33
                return elementSize
            },
            fontSize: function (fontsize) {
                var size = fontsize += .3
                return size;
            },
            "newClass": "box1",
            "zindex": 1
        };

        MoveElement(styles)
    }
    onMoveElementPrevFront()
    setTimeout(
        function () {
            document.querySelector("#btn-prev").disabled = false;

        }, 500)
}
