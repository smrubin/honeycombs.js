Honeycombs.js
========================

A modified version of mstrehse's Honeycombs jQuery Plugin. It produces responsive hexagon grids.

![Demo Image](https://raw.githubusercontent.com/Tiotao/honeycombs/master/demo.png)

## Original
- Author: mstrehse
- Repo: https://github.com/mstrehse/honeycombs
- Example: http://examples.rabbid.net/honeycombs/demo.html

## Modifications
- No longer support hexagon with background image as the hexagon is now made by iconic font rather than CSS.

## Improvements
- Support IE8
- Responsive for single column orientation (in mobile screens)
- placehoder class provides more flexibility in arranging hexagons.

## Usage
To generate a honeycomb grid, use the following markup:

```
<script src="honeycombs/js/jquery.honeycombs.js"></script>
<link rel="stylesheet" type="text/css" href="honeycombs/css/honeycombs.css" />
<div class="honeycombs">
		<div class="comb">
			<div class="front-content">
				<p>I am a front title</p>
			</div>
			<div class="back-content">
				<p>I am a back title</p>
			</div>
		</div>
		<div class="comb">
			<div class="front-content">
				<p>I am a front title</p>
			</div>
			<div class="back-content">
				<p>I am a back title</p>
			</div>
		</div>
</div>
```
and add the following code at the end of the `<body>` tag

```
<script>
	$(document).ready(function() {
	$('.honeycombs').honeycombs({
		combWidth:250,  // width of the hexagon
		margin: 0,		// spacing between hexagon
		threshold: 3  	// hide placeholder hexagons when number of hexagons in a row is more than the threshold number
	});
});
</script>
```

