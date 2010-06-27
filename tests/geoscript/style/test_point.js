
var ASSERT = require("assert");
var STYLE = require("geoscript/style");

exports["test: constructor"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    
    ASSERT.ok(symbolizer instanceof STYLE.Symbolizer, "PointSymbolizer is a Symbolizer");
    ASSERT.ok(symbolizer instanceof STYLE.PointSymbolizer, "PointSymbolizer is a PointSymbolizer");

    var symbolizer = new STYLE.PointSymbolizer({
        shape: "circle",
        strokeColor: "#ff00ff",
        fillOpacity: 0.7
    });
    ASSERT.strictEqual(symbolizer.shape, "circle", "shape properly set");
    ASSERT.strictEqual(symbolizer.strokeColor, "#ff00ff", "stroke color properly set");
    ASSERT.strictEqual(symbolizer.fillOpacity, 0.7, "fill opacity properly set");
    
};

exports["test: shape"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.shape, "square", "square mark by default");
    
    symbolizer.shape = "star";
    ASSERT.strictEqual(symbolizer.shape, "star", "shape properly set");
    
};

exports["test: size"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.ok(isNaN(symbolizer.size), "size NaN by default");
    
    symbolizer.size = 10;
    ASSERT.strictEqual(symbolizer.size, 10, "size properly set");
    
};

exports["test: rotation"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.rotation, 0, "rotation 0 by default");
    
    symbolizer.rotation = 45;
    ASSERT.strictEqual(symbolizer.rotation, 45, "rotation properly set");
    
};

exports["test: strokeColor"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.strokeColor, "#000000", "stroke color black by default");

    symbolizer.strokeColor = "#ff0000";
    ASSERT.strictEqual(symbolizer.strokeColor, "#ff0000", "stroke color properly set");
    
};

exports["test: strokeWdith"] = function() {

    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.strokeWidth, 1, "stroke width 1 by default");

    symbolizer.strokeWidth = 3;
    ASSERT.strictEqual(symbolizer.strokeWidth, 3, "stroke width properly set");

};

exports["test: strokeOpacity"] = function() {

    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.strokeOpacity, 1, "stroke opacity 1 by default");

    symbolizer.strokeOpacity = 0.8;    
    ASSERT.strictEqual(symbolizer.strokeOpacity, 0.8, "stroke opacity properly set");
    
};

exports["test: fillColor"] = function() {
    
    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.fillColor, "#808080", "fill color gray by default");

    symbolizer.fillColor = "#00FF00";
    ASSERT.strictEqual(symbolizer.fillColor, "#00FF00", "fill color properly set");

};

exports["test: fillOpacity"] = function() {

    var symbolizer = new STYLE.PointSymbolizer({});
    ASSERT.strictEqual(symbolizer.fillOpacity, 1, "fill opcity 1 by default");

    symbolizer.fillOpacity = 0.8;    
    ASSERT.strictEqual(symbolizer.fillOpacity, 0.8, "fill opacity properly set");
    
};

if (require.main == module.id) {
    require("test").run(exports);
}