// var ViewZoom = function(){
//
//     var project = paper.project;
//     var factor = 1.25;
//
//     var _minZoom;
//     var _maxZoom;
//     var mouseNativeStart =  paper.Point;
//     var viewCenterStart = paper.Point;
//
//     this.project = project;
//
//     var view = this.project.view;
//
//     ($("#myCanvas")).mousewheel(function(event){
//         var mousePosition = new paper.Point(event.offsetX, event.offsetY);
//         this.changeZoomCentered(event.deltaY, mousePosition);
//     });
//
//     view.on("mousedown", function(ev) {
//         this.viewCenterStart = view.center;
//         // Have to use native mouse offset, because ev.delta
//         //  changes as the view is scrolled.
//         this.mouseNativeStart = new paper.Point(ev.event.offsetX, ev.event.offsetY);
//     });
//
//     view.on("mousedrag", function(ev) {
//         if(this.viewCenterStart){
//             var nativeDelta = new paper.Point(
//                 ev.event.offsetX - this.mouseNativeStart.x,
//                 ev.event.offsetY - this.mouseNativeStart.y
//             );
//             // Move into view coordinates to subract delta,
//             //  then back into project coords.
//             view.center = view.viewToProject(
//                 view.projectToView(this.viewCenterStart)
//                 .subtract(nativeDelta));
//         }
//     });
//
//     view.on("mouseup", function(ev) {
//         if(this.mouseNativeStart){
//             this.mouseNativeStart = null;
//             this.viewCenterStart = null;
//         }
//     });
//
//     this.zoom = function(){
//         return this.project.view.zoom;
//     }
//
//     this.zoomRange = function(){
//         return [this._minZoom, this._maxZoom];
//     }
//
//     /**
//      * Set zoom level.
//      * @returns zoom level that was set, or null if it was not changed
//      */
//     this.setZoomConstrained = function(zoom){
//         if(this._minZoom) {
//             zoom = Math.max(zoom, this._minZoom);
//         }
//         if(this._maxZoom){
//             zoom = Math.min(zoom, this._maxZoom);
//         }
//         var view = this.project.view;
//         if(zoom != view.zoom){
//             view.zoom = zoom;
//             return zoom;
//         }
//         return null;
//     }
//
//     this.setZoomRange = function(range){
//         var view = this.project.view;
//         var aSize = range.shift();
//         var bSize = range.shift();
//         var a = aSize && Math.min(
//             view.bounds.height / aSize.height,
//             view.bounds.width / aSize.width);
//         var b = bSize && Math.min(
//             view.bounds.height / bSize.height,
//             view.bounds.width / bSize.width);
//         var min = Math.min(a,b);
//         if(min){
//             this._minZoom = min;
//         }
//         var max = Math.max(a,b);
//         if(max){
//             this._maxZoom = max;
//         }
//         return [this._minZoom, this._maxZoom];
//     }
//
//     this.changeZoomCentered = function(delta, mousePos) {
//         if (!delta) {
//             return;
//         }
//         var view = this.project.view;
//         var oldZoom = view.zoom;
//         var oldCenter = view.center;
//         var viewPos = view.viewToProject(mousePos);
//
//         var newZoom = delta > 0
//             ? view.zoom * this.factor
//             : view.zoom / this.factor;
//         newZoom = this.setZoomConstrained(newZoom);
//
//         if(!newZoom){
//             return;
//         }
//
//         var zoomScale = oldZoom / newZoom;
//         var centerAdjust = viewPos.subtract(oldCenter);
//         var offset = viewPos.subtract(centerAdjust.multiply(zoomScale))
//             .subtract(oldCenter);
//
//         view.center = view.center.add(offset);
//     };
//
//     this.zoomTo = function(rect){
//         var view = this.project.view;
//         view.center = rect.center;
//         view.zoom = Math.min(
//             view.viewSize.height / rect.height,
//             view.viewSize.width / rect.width);
//     }
// }

	setSizeCanvas = function(){
		var ctx = canvas.getContext('2d');
		trackTransforms(ctx);
		function redraw(){
			// Clear the entire canvas
			// var p1 = ctx.transformedPoint(0,0);
			// var p2 = ctx.transformedPoint(canvas.width,canvas.height);
			// ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

			// Alternatively:
			ctx.save();
			ctx.setTransform(1,0,0,1,0,0);
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.restore();


		}
		redraw();

		var lastX=canvas.width/2, lastY=canvas.height/2;
		var dragStart,dragged;
		canvas.addEventListener('mousedown',function(evt){
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragStart = ctx.transformedPoint(lastX,lastY);
			dragged = false;
		},false);
		canvas.addEventListener('mousemove',function(evt){
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragged = true;
			if (dragStart){
				var pt = ctx.transformedPoint(lastX,lastY);
				ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
				redraw();
			}
		},false);
		canvas.addEventListener('mouseup',function(evt){
			dragStart = null;
			if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		},false);

		var scaleFactor = 1.1;
		var zoom = function(clicks){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x,pt.y);
			var factor = Math.pow(scaleFactor,clicks);
			ctx.scale(factor,factor);
			ctx.translate(-pt.x,-pt.y);
			redraw();
		}

	var handleScroll = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom(delta);
			return evt.preventDefault() && false;
		};
		canvas.addEventListener('DOMMouseScroll',handleScroll,false);
		canvas.addEventListener('mousewheel',handleScroll,false);
	};

	// Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
	function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };

		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}
