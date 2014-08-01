

var newLedPanel = function() {
	var lp = {
		fb: null,
		w: 0, h: 0,
		callback: null,
		canvas: null,
		ctx: null,
		fadeout: 0.5,
		led: null,
		lwidth: 10,
		
		init: function(canvasid, lwidth, lcolor, fadeout) {
			var canvas = document.getElementById(canvasid);
			
			if (!canvas || !canvas.getContext) {
				return;
			}
			
			var ctx = canvas.getContext('2d');
			if (!ctx) {
				return;
			}
			
			lp.fb=[];
			for(var i=0; i<94*20; i++)
				lp.fb.push(0);

			ctx.fillStyle = "rgb(0, 0, 0)";  
			ctx.fillRect (0, 0, canvas.width, canvas.height);  

			lp.w = Math.floor(canvas.width / lwidth);
			lp.h = Math.floor(canvas.height / lwidth);
			
			//dprint(lp.w+"x"+lp.h);
			
			var gradient = ctx.createRadialGradient(
				lwidth/2,lwidth/2, 0, lwidth/2, lwidth/2, 
				lwidth);

			gradient.addColorStop(0, "#6ef");
			gradient.addColorStop(0.8, "#00f");
			gradient.addColorStop(1, "#000");
			
			ctx.fillStyle = gradient;
			ctx.beginPath(); 
			ctx.arc(lwidth/2,lwidth/2,lwidth/2,0,Math.PI*2, 1);
			ctx.closePath();
			ctx.fill();

			lp.led = ctx.getImageData(0, 0, 10, 10);

			ctx.fillStyle = "rgb(0, 0, 0)";  
			ctx.fillRect (0, 0, canvas.width, canvas.height); 

			lp.canvas = canvas;
			lp.ctx = ctx;
			lp.fadeout = fadeout;
			lp.lwidth = lwidth;
		},
		
		update: function(newstate) {
			if (newstate != [])
				lp.fb = newstate;
			ctx = lp.ctx;
			canvas = lp.canvas;

			ctx.fillStyle = "rgba(0, 0, 0, "+lp.fadeout+")";  
			ctx.fillRect (0, 0, canvas.width, canvas.height);  

			ctx.fillStyle = "rgb(0,0,255)"; 
			var i = 0;
			for (var y=0;y<lp.canvas.height;y=y+lp.lwidth)
			{
				for (var x=0;x<lp.canvas.width;x=x+lp.lwidth)
				{
					if (lp.fb[i] == 1)
					{
						ctx.putImageData(lp.led, x, y);
					}
					i++;
				}
			}
		},
	
	}

	return lp;
}();
