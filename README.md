Honeycombs.js
========================

A modified version of mstrehse's & Tiotao's Honeycombs jQuery Plugin. It produces responsive hexagon grids for both vertical and horizontal orientations.

### Vertical Orientation

![Demo Image](https://github.com/smrubin/honeycombs.js/blob/master/honeycombs-vertical.png)

### Horizontal Orientation

![Demo Image](https://github.com/smrubin/honeycombs.js/blob/master/honeycombs-horizontal.png)

## Original
- Author(s): mstrehse, Tiotao
- Repo: https://github.com/mstrehse/honeycombs, https://github.com/tiotao/honeycombs

## Modifications
- Different equations used to calculate width and spacing of the combs for both vertical and horizontal orientations.

## Improvements
- Ability for users to orient the combs (hexagons) vertically or horizontally and maintain responsive layout.

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
		combWidth:250,  	// width of the hexagon
		margin: 0,		// spacing between hexagon
		horizontal: false  	// option to orient the hexagons horizontally
	});
});
</script>
```

