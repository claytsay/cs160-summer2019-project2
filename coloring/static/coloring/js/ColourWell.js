/**
 * A class representing a well in a palette with various paints mixed together.
 */
class ColourWell {

  constructor() {
    this.colours = [];
  }


  /**
   * Adds a colour to the well.
   * 
   * @param {string} hex the colour to add to the well in hexadecimal format
   */
  addColour(hex) {
    this.colours.push(hex);
  }

  /**
   * Converts a colour from RGB to a hex string.
   * 
   * Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * 
   * @param {number} r the red value of the colour
   * @param {number} g the green value of the colour
   * @param {number} b the blue value of the colour
   * @return {string} the hexademical string indicating the colour
   */
  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Converts a colour from hex to RGB in an object.
   * 
   * If there is any sort of error, will return `null`.
   * Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * 
   * @param {string} hex the hexademical string indicating the colour
   * @return {*} with value `r`, `g`, and `b` indicating RGB values
   */
  hexToRgb(hex) {
    hex = hex.toLowerCase();
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Converts a RBG string into a RGB object.
   * @param {string} rgbstring in the form `"rgb(1, 12, 123)"`
   */
  rgbStringToObject(rgbstring) {
    let results = /rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\)/.exec(rgbstring);
    return {
      r: results[1],
      g: results[2],
      b: results[3]
    }
  }

  /**
   * Determines what colour is the overall of the mix.
   * 
   * The algorithm comes from Minecraft. Source: https://minecraft.gamepedia.com/Dye#Dyeing_armor
   * 
   * @returns {string} the hexadecimal string indicating the overall colour
   */
  getColour() {
    let total = {
      r: 0,
      g: 0,
      b: 0,
      maximum: 0
    }

    if (this.colours.length == 0) {
      return 'rgb(255, 255, 255)';
    }
    for (let i = 0; i < this.colours.length; i++) {
      let colourRGB = this.rgbStringToObject(this.colours[i]);
      if (colourRGB == null) {
        continue;
      }

      total.r += colourRGB.r;
      total.g += colourRGB.g;
      total.b += colourRGB.b;
      total.maximum += Math.max(colourRGB.r, colourRGB.g, colourRGB.b);
    }

    let average = {
      r: total.r / this.colours.length,
      g: total.g / this.colours.length,
      b: total.b / this.colours.length,
      maximum: total.maximum / this.colours.length
    }

    let gainFactor = average.maximum / Math.max(average.r, average.g, average.b);
    let result = {
      r: average.r * gainFactor,
      g: average.g * gainFactor,
      b: average.b * gainFactor
    };
    return this.rgbToHex(result.r, result.g, result.b);

  }
}