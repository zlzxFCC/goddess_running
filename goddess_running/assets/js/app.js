(function(win) {
	win._random = function(min, max) {
	    if (max == null) {
	     	max = min;
	      	min = 0;
	    }
		return min + Math.floor(Math.random() * (max - min + 1));
	};

    win._isMobile = (/mobile/i).test(navigator.userAgent);
})(window);