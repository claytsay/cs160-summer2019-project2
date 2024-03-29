var e = false;

function erase() {
  e = true;
}

var startcolor;

window.onload = function () {
    console.log(window.location.href);
    
    // Palette setup
    var canvas = document.getElementById("palette-canvas");
  
    var mandala = {
        item: null,
        lastClicked: null,
      //E
        filePath: '/static/coloring/images/Color_Palette_clip_art.svg'
    };
  
    var cp = {
				history: ["#ffffff"], // black selected by default
				options: [],
				$container: $('#color-palette')
			};
    
    var chosen = [];
  
    startcolor = function() {
    localStorage.setItem("chosen", JSON.stringify(chosen));
    }
    
    function createColorPalette(colors){
			// create a swatch for each color

			for (var i = colors.length - 1; i >= 0; i--) {
				var $swatch = $('<div>').css("background-color", colors[i])
									   .addClass("swatch");
				$swatch.click(function(){
					// add color to the color palette history
          
					cp.history.push($(this).css("background-color"));

				});
				cp.$container.append($swatch);
			}
		}

			// loads a set of colors from a json to create a color palette
		function getColorsCreatePalette(){
      var colors = ["#607d8b"];
			cp.$container.html(" ");
			$.getJSON('/static/coloring/vendors/material/colors.json', function(colors){
				var keys = Object.keys(colors);
				for (var i = keys.length - 1; i >= 0; i--) {
          
					cp.options.push(colors[keys[i]][500]);
				}
//         cp.options = cp.options.concat(JSON.parse(localStorage.getItem("chosen")));
				createColorPalette(cp.options);
			});
		}			
  
    var index;
    function myInteraction() {
      var tool = new paper.Tool();
      
      tool.onMouseDown = function (event) {
          var hit = mandala.item.hitTest(event.point, {
              tolerance: 10,
              fill: true
          });
        
          
          if (hit) {
              if (e) {
                index = chosen.indexOf(hit.item.fillColor.toCSS(true));
                if(index!=-1){
                   chosen.splice(index, 1);
                }
                
                hit.item.fillColor = "#ffffff";
                e = false;
                console.log(chosen);
              } else {
                
                var prev = new paper.Color(cp.history[cp.history.length - 1]);
                var curr = new paper.Color(hit.item.fillColor);
                var result = curr.multiply(prev);

                hit.item.fillColor = new paper.Color(result);
                
                index = chosen.indexOf(curr.toCSS(true));
                if(index!=-1){
                   chosen.splice(index, 1);
                }
                
                chosen.push(result.toCSS(true));
                console.log(chosen);
              }
              
          }
      }
    }
  
    function init() {
      paper.setup(canvas);
      getColorsCreatePalette();
      
      paper.project.importSVG(mandala.filePath, function(item){
        mandala.item = item._children["design-freepik"];
        paper.project.insertLayer(0, mandala.item);
        
//         item.bounds = new paper.Rectangle(0, 0, paletteCanvas.width, paletteCanvas.height);

        myInteraction();
        // palette.item.scale(0.5, new paper.Point(0, 0));
      });
    }
    var url = window.location.href;
    init();
  

    // Initialize things with Paper.js
    // FIXME: Get the palette SVG to size correctly
    // The key perhaps is here?: https://github.com/paperjs/paper.js/issues/949

        // palette.item.scale(0.5, new paper.Point(0, 0));

    // TODO: Try utilising exportJSON to transition between pages?

    // Get the well-filling mechanics to work


}