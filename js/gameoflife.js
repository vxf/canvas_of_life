var gameOfLife = function() {
	var gof = {
		state: [],
		w: 0, h: 0,
		
		init: function(w, h) {
			gof.w = w; gof.h = h;
		
			for (var x=0;x<w*h;x++)
			{
				gof.state.push(Math.round(Math.random()));
			}
			
		},

		getnextgen: function() {
			var w = gof.w;
			var h = gof.h;
			var newstate = [];
			var oldstate = gof.state;
			
			
			var uprow = (h-1)*w;

			var upper = null;
			var crrnt = oldstate.slice(uprow, uprow+w);
				crrnt.unshift(oldstate[uprow+w-1]);
				crrnt.push(oldstate[uprow]);
			var lower = oldstate.slice(0, w);
				lower.unshift(oldstate[w-1]);
				lower.push(oldstate[0]);

			for (var y=0; y<h; y++)
			{
				var lowrow = ((y+1)%h)*w;
				
				upper = crrnt;
				crrnt = lower;
				lower = oldstate.slice(lowrow, lowrow+w);
					lower.unshift(oldstate[lowrow+w-1]);
					lower.push(oldstate[lowrow]);

				for (var x=0; x<w; x++)
				{
					var neigh = upper[x] + upper[x+1] + upper[x+2] +
						crrnt[x] + crrnt[x+2] +
						lower[x] + lower[x+1] + lower[x+2];

					if (oldstate[x+(y*w)] == 1)
					{
						if(neigh < 2 || neigh > 3)
							newstate.push(0);
						else
							newstate.push(1);
					}
					else
					{
						if(neigh != 3)
							newstate.push(0);
						else
							newstate.push(1);
					}
				}
			}

			gof.state = newstate;
			return newstate;
		}
	}

	return gof;
}();
