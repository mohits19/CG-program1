# Computer Graphics (CSC 561)
### Program 1: Ray Casting
The following parts of code were taken from either the given shell code or from previous exercises:
1. `class Color`
2. `class Vector`
3. `function drawPixel(imagedata,x,y,color)`
4. `function getInputEllipsoids()`

The following helper functions were added by me:
1. `static cross(v1, v2)` in `Vector` class that computes and returns the cross product of the two vectors
2. `function windowCorners()` which returns the 4 corners of the viewing window. This function uses values set in global variables `eye`, `up`, `lookAt` to compute the coordinates of the 4 corners. The function assumes that window is located at a distance of 0.5 from `eye` and is a 1x1 square normal to `lookAt` and parallel to `up` vector.
3. `function redraw()` which redraws image based on new input
4. `function rayCasting()` which implements ray casting algorithm
5. `function blinnPhong(eIndex, point)` which calculates color to be drawn at the given point on the given ellipsoid.
6. `function shadowFactor(eIndex, point)` which caclulates the shadow factor at the given point on ellipsoid.

#### _Part 1_ (Basic Ray Casting)
Implemented in `function rayCasting()`. It uses values defined in global variables (`context`, `ellipsoids`, `bgColor`, `eye`, `up`, `lookAt`). 
1. The `function windowCorners()` is called to determine the 4 corners of the viewing window.
2. The Basic Ray Casting algorithm has been implemented (based on slides and notes).
3. For each pixel, if no intersection is found then `bgColor` (background color) is drawn. Otherwise the appropriate color for the closest ellipsoid intersection is drawn by calling  `function blinnPhong(eIndex, point)`.

#### _Part 2_ (Blinn-Phong Illumination)
Implemented in `function blinnPhong(eIndex, point)`.
1. The normal vector at each point is calculated as [2(xi-cx)/(a\*a), 2(yi-cy)/(b\*b), 2(zi-cz)/(c\*c)] since F = {(x-cx)/a}^2 + {(y-cy)/b}^2 + {(z-cz)/c}^2 and normal vector Rn = [dF/dx dF/dy dF/dz] according to [the given link](http://www.bmsc.washington.edu/people/merritt/graphics/quadrics.html).
2. The math for the Blinn-Phong model has been implemented (based on notes) to determine the R,G,B values of the color to return.
3. For each ambient, diffuse and specular terms, any negative values are converted to zero.

#### _Extra Credit_
1. **Arbitrarily sized images (and interface windows)**
    The desired width and height of the viewport can be entered by user into the corresponding input boxes on the right side of the page. On clicking the "ReDraw" button the `function redraw()` is called which renders a new image.

2. **Support arbitrary viewing setups**
    The desired coordinates for eye, up and lookAt vectors can be enetered by user into the corresponding input boxes on the right side of the page. On clicking the "ReDraw" button the `function redraw()` is called which renders a new image.

3. **Detect shadow rays**
    separate function called `shadowFactor(eIndex, point)` calculates intersection of shadow ray with other ellipsoids. If there is an intersection with 0 < t < 1 then 0 is returned, 1 otherwise. In `blinnPhong(eIndex, point)`, the shadow factor is multiplied with diffuse and specular terms.