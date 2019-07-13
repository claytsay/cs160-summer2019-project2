window.onload = function () {
    var url = window.location.href;

    // Palette setup
    var paletteCanvas = document.getElementById("palette-canvas");
    var palette = {
        item: null,
        lastClicked: null,
        filePath: '/static/coloring/images/palette.svg'
    };

    // Initialize things with Paper.js
    // FIXME: Get the palette SVG to size correctly
    // The key perhaps is here?: https://github.com/paperjs/paper.js/issues/949
    paper.setup(paletteCanvas);
    paper.project.importSVG(palette.filePath, (item) => {
        item.bounds = new paper.Rectangle(0, 0, paletteCanvas.width, paletteCanvas.height);
        palette.item = item._children["design-palette"];
        paper.project.insertLayer(0, palette.item);
        // palette.item.scale(0.5, new paper.Point(0, 0));
    });
    // TODO: Try utilising exportJSON to transition between pages?

    // Get the well-filling mechanics to work
    var tool = new paper.Tool();

    tool.onMouseDown = function (event) {
        var hit = palette.item.hitTest(event.point, {
            tolerance: 10,
            fill: true
        });
        if (hit) {
            hit.item.fillColor = '#ff0000';
        }
    }

}