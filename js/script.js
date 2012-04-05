/* Author: Francis Cortez

*/

$(function() {
    var speed = 0, // Initial speed.
        $back = $('#back'), //Cache layers as jQuery objects.
        $middle = $('#middle'), 
        $front = $('#front'),
	$rocketman = $('#rocketman'),
	rocketPos = 175,
	rocketCounter = 0,
	rocketAngle = 0,
        xPos = 0, // Initial x position of background images.
        $win = $(window); // Cache jQuery reference to window.
    
    // Respond to mousemove events.
    $(document).mousemove(function (e) {
        var halfWidth = $win.width()/2;
        // Calculate speed based on mouse position.
        // 0 (center of screen) to 1 at edges.
        speed = e.pageX - halfWidth;
        speed /= halfWidth;
    });
    
    // Kill speed on mouseout.
    $(document).mouseout(function (e) {
        speed = 0;
    });
    
    // Every 30ms, update each layer's background image position.
    // The two front layers use a scaled-up x position to
    // create the parallax effect.
    setInterval(function () {
        // Update the background position variable.
        xPos += speed;

	if (rocketCounter == 150) {
		rocketCounter = 0;
	} else if (rocketCounter < 100) {
		rocketPos += speed;
		rocketAngle += speed;
		rocketCounter++;
	} else {
		rocketPos -= speed * 2;
		rocketAngle -= speed * 10;
		rocketCounter++;
	}

	$rocketman.css('-webkit-transform', 'rotate(' + rocketAngle + 'deg)');

        
        // Apply it to the layers' background image positions,
        // scaled upf or the front two layers so they move quicker
        // than the farthest layer.
        $back.css({
            backgroundPosition: (xPos * 1) * 3 + 'px 0px'
        });
        $middle.css({
            backgroundPosition: (xPos * 2) * 10 + 'px 0px'
        });
        $front.css({
            backgroundPosition: (xPos * 3) * 10 + 'px 0px'
        });
        $rocketman.css({
	    top: rocketPos + 'px'
        });

    }, 30);
});




