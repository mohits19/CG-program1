/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


// Vector class
class Vector { 
    constructor(x=0,y=0,z=0) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix) {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static cross method
    static cross(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else
                return(new Vector((v1.y*v2.z - v1.z*v2.y), (v1.z*v2.x - v1.x*v2.z), (v1.x*v2.y - v1.y*v2.x)));
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end cross static method

    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                //v.toConsole("Vector.subtract: ");
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
} // end Vector class

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids


var context, ellipsoids, bgColor, eye, up, lookAt, light;

// performs the ray casting algorithm for a given set of ellipsoids
function rayCasting(){
    var window = windowCorners();
    var width = context.canvas.width;
    var height = context.canvas.height;
    var imagedata = context.createImageData(width, height);

    for(var x=0; x<width; x++){
        for(var y=0; y<height; y++){                 // for each pixel

            // find pixel coordinates by linear interpolation
            var s = y/(height-1);
            var t = x/(width-1);

            var pl = Vector.add(window.ul, Vector.scale(s, Vector.subtract(window.ll, window.ul)));
            var pr = Vector.add(window.ur, Vector.scale(s, Vector.subtract(window.lr, window.ur)));
            var P = Vector.add(pl, Vector.scale(t, Vector.subtract(pr, pl)));

            var D = Vector.subtract(P, eye);        // direction vector

            var eIndex = -1;
            var tValue = Number.MAX_VALUE;

            for(var e=0; e<ellipsoids.length; e++){           // for each ellipsoid
                var center = new Vector(ellipsoids[e].x, ellipsoids[e].y, ellipsoids[e].z);
                var axes = new Vector(ellipsoids[e].a, ellipsoids[e].b, ellipsoids[e].c);
                
                // ray-ellipsoid intersection
                var DbyA = new Vector(D.x/axes.x, D.y/axes.y, D.z/axes.z);
                var EminusC = Vector.subtract(eye, center);
                var ECbyA = new Vector(EminusC.x/axes.x, EminusC.y/axes.y, EminusC.z/axes.z);

                var a = Vector.dot(DbyA, DbyA);
                var b = 2 * Vector.dot(DbyA, ECbyA);
                var c = Vector.dot(ECbyA, ECbyA) - 1;
                var discriminant = b*b - 4*a*c;

                if(discriminant >= 0){          // ray intersects object
                    var t1 = (-b + Math.sqrt(discriminant)) / (2*a);
                    var t2 = (-b - Math.sqrt(discriminant)) / (2*a);
                    var min = Math.min(t1, t2);
                    if(min < tValue){             // closest interaction
                        eIndex = e;           // record ellipse, t-value
                        tValue = min;
                    }
                }
            }

            if(eIndex == -1){         // if no intersection then draw background color
                drawPixel(imagedata, x, y, bgColor);
            }
            else{                           // perform local illumination calculation and draw color
                var ellipsoid = ellipsoids[eIndex];
                var point = Vector.add(eye, Vector.scale(tValue, D));  // ray-ellipsoid intersection point
                
                drawPixel(imagedata, x, y, blinnPhong(eIndex, point));
            }
        }
    }

    context.putImageData(imagedata,0,0);
}

// returns color to be drawn at given point on given ellipse using Blinn-Phong Illumination Model
function blinnPhong(eIndex, point){
    var ellipsoid = ellipsoids[eIndex];
    var N = Vector.normalize(new Vector((2/(ellipsoid.a*ellipsoid.a))*(point.x - ellipsoid.x),
        (2/(ellipsoid.b*ellipsoid.b))*(point.y - ellipsoid.y),
        (2/(ellipsoid.c*ellipsoid.c))*(point.z - ellipsoid.z)));            // normal vector

    var L = Vector.normalize(Vector.subtract(light.position, point));       // light direction
    var V = Vector.normalize(Vector.subtract(eye, point));                  // eye direction

    var NdotL = Vector.dot(N, L);                                           // (N.L)

    var H = Vector.normalize(Vector.add(V, L));                             // half vector
    var NdotHeN = Math.pow(Vector.dot(N, H), ellipsoid.n);                  // (N.H)^n

    var S = shadowFactor(eIndex, point);

    var Ir = Math.max(0, ellipsoid.ambient[0]*light.ambient) + 
        S*(Math.max(0, ellipsoid.diffuse[0]*light.diffuse*NdotL) + 
        Math.max(0, ellipsoid.specular[0]*light.specular*NdotHeN));

    var Ig = Math.max(0, ellipsoid.ambient[1]*light.ambient) + 
        S*(Math.max(0, ellipsoid.diffuse[1]*light.diffuse*NdotL) + 
        Math.max(0, ellipsoid.specular[1]*light.specular*NdotHeN));

    var Ib = Math.max(0, ellipsoid.ambient[2]*light.ambient) + 
        S*(Math.max(0, ellipsoid.diffuse[2]*light.diffuse*NdotL) + 
        Math.max(0, ellipsoid.specular[2]*light.specular*NdotHeN));

    return new Color(Ir*255, Ig*255, Ib*255, 255);
}

// returns 0 if point is in shadow, 1 otherwise
function shadowFactor(eIndex, point){
    var shadowRay = Vector.subtract(light.position, point);     // shadow ray from point to light

    for(var e=0; e<ellipsoids.length; e++){             // for each ellipsoid
        if(e != eIndex){                          // that is not itself
            var center = new Vector(ellipsoids[e].x, ellipsoids[e].y, ellipsoids[e].z);
            var axes = new Vector(ellipsoids[e].a, ellipsoids[e].b, ellipsoids[e].c);
            
            // ray-ellipsoid intersection
            var DbyA = new Vector(shadowRay.x/axes.x, shadowRay.y/axes.y, shadowRay.z/axes.z);
            var EminusC = Vector.subtract(point, center);
            var ECbyA = new Vector(EminusC.x/axes.x, EminusC.y/axes.y, EminusC.z/axes.z);
    
            var a = Vector.dot(DbyA, DbyA);
            var b = 2 * Vector.dot(DbyA, ECbyA);
            var c = Vector.dot(ECbyA, ECbyA) - 1;
            var discriminant = b*b - 4*a*c;
    
            if(discriminant >= 0){
                var t1 = (-b + Math.sqrt(discriminant)) / (2*a);
                var t2 = (-b - Math.sqrt(discriminant)) / (2*a);

                if(t1 > 0 && t2 > 0 && t1 < 1 && t2 < 1)        // then shadow ray is occluded
                    return 0;
            }
        }        
    }
    // if no intersections found then no occlusion
    return 1;
}

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    context = canvas.getContext("2d");

    // set default values
    bgColor = new Color(1, 0, 0, 255);

    eye = new Vector(0.5, 0.5, -0.5);
    up = new Vector(0, 1, 0);
    lookAt = new Vector(0, 0, 1);

    light = {position: new Vector(-1, 3, -0.5), ambient:1, diffuse:1, specular:1};

    ellipsoids = getInputEllipsoids();
    
    if(ellipsoids != String.null){
        rayCasting();
    }
}

// returns 4 corners of viewing window based on values in eye, up, lookAt
function windowCorners(){
    var distanceFromEye = 0.5;
    var windowWidth = 1;
    var windowHeight = 1;

    var center = Vector.add(eye, Vector.scale(distanceFromEye, lookAt));    // center = eye + distanceFromEye(lookAt)
    var right = Vector.cross(up, lookAt);                                   // vector normal to both up and lookAt

    return ({ul:Vector.add(center, Vector.add(Vector.scale(-windowWidth/2, right), Vector.scale(windowHeight/2, up))),
            ur:Vector.add(center, Vector.add(Vector.scale(windowWidth/2, right), Vector.scale(windowHeight/2, up))),
            ll:Vector.add(center, Vector.add(Vector.scale(-windowWidth/2, right), Vector.scale(-windowHeight/2, up))),
            lr:Vector.add(center, Vector.add(Vector.scale(windowWidth/2, right), Vector.scale(-windowHeight/2, up)))});
}

// redraw image based on new input
function redraw(){    
    var canvas = document.getElementById("viewport");
    canvas.width = document.getElementById("view-width").value;
    canvas.height = document.getElementById("view-height").value;
    context = canvas.getContext("2d");

    eye.set(parseFloat(document.getElementById("eye-x").value), parseFloat(document.getElementById("eye-y").value), parseFloat(document.getElementById("eye-z").value));
    up.set(parseFloat(document.getElementById("up-x").value), parseFloat(document.getElementById("up-y").value), parseFloat(document.getElementById("up-z").value));
    lookAt.set(parseFloat(document.getElementById("look-x").value), parseFloat(document.getElementById("look-y").value), parseFloat(document.getElementById("look-z").value));

    light.position.set(parseFloat(document.getElementById("light-x").value), parseFloat(document.getElementById("light-y").value), parseFloat(document.getElementById("light-z").value));

    rayCasting();
}
