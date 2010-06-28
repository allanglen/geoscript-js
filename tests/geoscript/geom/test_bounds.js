var ASSERT = require("assert");
var GEOM = require("geoscript/geom");
var PROJ = require("geoscript/proj");

exports["test: constructor"] = function() {
    
    var bounds = new GEOM.Bounds();
    ASSERT.ok(bounds instanceof GEOM.Bounds, "constructor returns instance");
    
};

exports["test: minx, miny, maxx, maxy"] = function() {
    
    var bounds = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    
    ASSERT.strictEqual(bounds.minx, -180, "correct minx");
    ASSERT.strictEqual(bounds.maxx, 180, "correct maxx");
    ASSERT.strictEqual(bounds.miny, -90, "correct miny");
    ASSERT.strictEqual(bounds.maxy, 90, "correct maxy");
    
};

exports["test: projection"] = function() {

    var gg = new PROJ.Projection("epsg:4326");
    
    // set after construction
    var bounds = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    ASSERT.strictEqual(bounds.projection, null, "projection null by default");
    
    bounds.projection = gg;
    ASSERT.ok(bounds.projection instanceof PROJ.Projection, "projection set after construction");
    ASSERT.ok(bounds.projection.equals(gg), "correct projection set after construction");
    
    // with instance
    bounds = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90,
        projection: gg
    });    
    ASSERT.ok(bounds.projection instanceof PROJ.Projection, "projection set from instance");
    ASSERT.ok(bounds.projection.equals(gg), "correct projection set from instance");
    
    // with string
    var bounds = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90,
        projection: "epsg:4326"
    });
    ASSERT.ok(bounds.projection instanceof PROJ.Projection, "projection set from string");
    ASSERT.ok(bounds.projection.equals(gg), "correct projection set from string");
    
};

exports["test: equals"] = function() {
    
    var b1 = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    
    var b2 = new GEOM.Bounds({
        minx: -160, maxx: 180, miny: -90, maxy: 90
    });
    
    var b3 = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    
    var b4 = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90, projection: "epsg:4326"
    });
    
    ASSERT.isFalse(b1.equals(b2), "same bounds");
    ASSERT.ok(b1.equals(b3), "different bounds");
    ASSERT.isFalse(b1.equals(b4), "different projection");
    
};

exports["test: include"] = function() {
    
    var b1 = new GEOM.Bounds({
        minx: -10, maxx: 10, miny: -9, maxy: 9
    });
    
    var b2 = new GEOM.Bounds({
        minx: -11, maxx: 9, miny: -8, maxy: 10
    });
    
    var point = new GEOM.Point([20, 0]);
    
    var line = new GEOM.LineString([[0, 0], [20, 20]]);
    
    var r = b1.include(b2);
    ASSERT.ok(r === b1, "include returns the bounds");
    ASSERT.deepEqual([-11, -9, 10, 10], b1.toArray(), "include bounds works");
    
    b1.include(point);
    ASSERT.deepEqual([-11, -9, 20, 10], b1.toArray(), "include point works");
    
    b1.include(line);
    ASSERT.deepEqual([-11, -9, 20, 20], b1.toArray(), "include line works");
    
};

exports["test: intersects"] = function() {

    var b = new GEOM.Bounds({
        minx: -10, maxx: 10, miny: -5, maxy: 5
    });
    
    var inside = new GEOM.Bounds({
        minx: -5, maxx: 5, miny: -2, maxy: 2
    });
    
    var touching1 = new GEOM.Bounds({
        minx: -10, maxx: 5, miny: -2, maxy: 5
    });

    var touching2 = new GEOM.Bounds({
        minx: 10, maxx: 15, miny: -5, maxy: 5
    });
    
    var intersecting = new GEOM.Bounds({
        minx: 0, maxx: 20, miny: 0, maxy: 10
    });
    
    var outside = new GEOM.Bounds({
        minx: 50, maxx: 60, miny: 50, maxy: 50
    });
    
    ASSERT.ok(b.intersects(inside), "inside");
    ASSERT.ok(inside.intersects(b), "r:inside");
    ASSERT.ok(b.intersects(touching1), "touching inside");
    ASSERT.ok(touching1.intersects(b), "r:touching inside");
    ASSERT.ok(b.intersects(touching2), "touching edges");
    ASSERT.ok(touching1.intersects(b), "r:touching edges");
    ASSERT.ok(b.intersects(intersecting), "intersecting");
    ASSERT.ok(intersecting.intersects(b), "r:intersecting");
    ASSERT.isFalse(b.intersects(outside), "outside");
    ASSERT.isFalse(outside.intersects(b), "r:outside");
    
    ASSERT.ok(b.intersects(GEOM.create([[0, 0], [2, 2]])), "inside line");
    ASSERT.ok(b.intersects(GEOM.create([[0, 0], [20, 20]])), "intersecting line");
    ASSERT.ok(b.intersects(GEOM.create([[10, 0], [20, 0]])), "touching line");
    ASSERT.isFalse(b.intersects(GEOM.create([[15, 15], [20, 20]])), "outside line");
    
};

exports["test: intersection"] = function() {
    
    var b1 = GEOM.Bounds.fromArray([0, 0, 10, 10]);
    var b2 = GEOM.Bounds.fromArray([5, 5, 20, 20]);
    var b3 = GEOM.Bounds.fromArray([20, 20, 30, 30]);
    
    var r = b1.intersection(b2);
    ASSERT.deepEqual([5, 5, 10, 10], r.toArray(), "correct intersection");
    
    r = b1.intersection(b3);
    ASSERT.ok(r.empty, "empty intersection");
    
};

exports["test: contains"] = function() {
    
    var b = new GEOM.Bounds({
        minx: -10, maxx: 10, miny: -5, maxy: 5
    });
    
    var inside = new GEOM.Bounds({
        minx: -5, maxx: 5, miny: -2, maxy: 2
    });
    
    var touching = new GEOM.Bounds({
        minx: -10, maxx: 5, miny: -2, maxy: 5
    });
    
    var intersecting = new GEOM.Bounds({
        minx: 0, maxx: 20, miny: 0, maxy: 10
    });
    
    var outside = new GEOM.Bounds({
        minx: 50, maxx: 60, miny: 50, maxy: 50
    });
    
    ASSERT.ok(b.contains(inside), "inside");
    ASSERT.ok(b.contains(touching), "touching");
    ASSERT.isFalse(b.contains(intersecting), "intersecting");
    ASSERT.isFalse(b.contains(outside), "outside");
    
    ASSERT.ok(b.contains(GEOM.create([[0, 0], [2, 2]])), "inside line");
    ASSERT.isFalse(b.contains(GEOM.create([[0, 0], [20, 20]])), "intersecting line");
    
};

exports["test: clone"] = function() {
    
    var b = new GEOM.Bounds({
        minx: -150, maxx: 160, miny: -60, maxy: 50, projection: "epsg:4326"
    });
    
    var c = b.clone();
    
    ASSERT.ok(c instanceof GEOM.Bounds, "clone is bounds");
    ASSERT.ok(c.equals(b), "clone is equivalent to original");
    
    b.include(new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90, projection: "epsg:4326"
    }));
    
    ASSERT.isFalse(c.equals(b), "modifying original doesn't modify clone");
    
};


exports["test: fromArray"] = function() {
    
    var b1 = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    
    var b2 = GEOM.Bounds.fromArray([-180, -90, 180, 90]);
    
    ASSERT.ok(b1.equals(b2), "bounds from array is equivalent");
    
};

exports["test: toArray"] = function() {

    var b1 = new GEOM.Bounds({
        minx: -180, maxx: 180, miny: -90, maxy: 90
    });
    
    ASSERT.deepEqual([-180, -90, 180, 90], b1.toArray(), "correct array");
    
};

exports["test: transform"] = function() {
    
    var gg = new PROJ.Projection("epsg:4326");
    var mt = new PROJ.Projection("epsg:2256");
    
    var bounds = GEOM.Bounds.fromArray([
        -116.0400, 44.3600, -104.0200, 49.0000 
    ]);
    bounds.projection = gg;
    
    var b2 = bounds.transform(mt);
    //259210.89459448296,40589.91024867553,3401247.9728652285,1797356.1848749956
    
    ASSERT.strictEqual(b2.minx | 0, 259210, "correct minx");
    ASSERT.strictEqual(b2.miny | 0, 40589, "correct miny");
    ASSERT.strictEqual(b2.maxx | 0, 3401247, "correct maxx");
    ASSERT.strictEqual(b2.maxy | 0, 1797356, "correct maxy");
    
};

exports["test: empty"] = function() {
    
    var b1 = new GEOM.Bounds({
        minx: -10, miny: -20, maxx: 10, maxy: -10
    });
    var b2 = new GEOM.Bounds({
        minx: -10, miny: 0, maxx: 10, maxy: 20
    });
    
    // b1 doesn't intersect b2
    var b3 = b1.intersection(b2);
    ASSERT.ok(b3.empty, "empty intersection");
    
    // create an empty bounds with no projection
    var empty1 = new GEOM.Bounds({});
    ASSERT.ok(empty1.empty, "constructed empty with no projection");
    ASSERT.strictEqual(empty1.projection, null, "empty bounds with null projection");

    // create an empty bounds with projection
    var empty2 = new GEOM.Bounds({projection: "epsg:4326"});
    ASSERT.ok(empty2.empty, "constructed empty with projection");
    ASSERT.ok(empty2.projection instanceof PROJ.Projection, "constructed empty with projection");
        
};

if (require.main == module.id) {
    require("test").run(exports);
}
