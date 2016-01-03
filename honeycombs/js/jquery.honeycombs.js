(function($){

    $.fn.honeycombs = function(options){

        var settings = $.extend({
            combWidth: 250,
            margin: 0,
            horizontal: false
        }, options);

        function initialize(element){
            
            $(element).addClass('honeycombs-wrapper');
            
            var width = 0;          // Width of the honeycomb
            var combWidth = 0;      // Width of a single comb, measured from corner to corner
            var combHeight = 0;     // Height of a single comb, set equal to combWidth
            var $wrapper = null;    // Honeycomb inner-wrapper
            
            /* Build the dom. */
            function buildHtml(){

                $(element).find('.comb').wrapAll('<div class="honeycombs-inner-wrapper"></div>');
                $wrapper = $(element).find('.honeycombs-inner-wrapper');

                $(element).find('.comb').append('<div class="inner front"></div>');
                $(element).find('.comb').append('<div class="inner back"></div>');
                $(element).find('.inner').append('<div class="wrapper"></div>');
                $(element).find('.comb').append('<span class="icon-hex-lg"></span>');
                
                $(element).find('.comb').each(function(){

                    if($(this).find('.inner').length > 0){
                        $(this).find('.inner.front .wrapper').html($(this).find('.front-content').html());
                        $(this).find('.inner.back .wrapper').html($(this).find('.back-content').html());
                        $(this).find('.front-content').remove();
                        $(this).find('.back-content').remove();
                    }else{
                        $(this).find('.inner').remove();
                    }
                });

                // Rotate hexagon
                if (settings.horizontal == true) {
                    $('.comb span').addClass('horizontal');
                }
            }
            
            /* Update all scale values */
            function updateScales(){
                combWidth = settings.combWidth;
                combHeight = combWidth;
                $(element).find('.comb').width(combWidth).height(combHeight);
                $(element).find('.icon-hex-lg').css('font-size', combWidth)
            }
            
            /* Update honeycomb layout */
            function reorder(animate){
                
                updateScales();
                width = $(element).width();

                var maxLeft = 0;                    // Max left positioning for honeycomb, increases as combs are added
                var row = 0;                        // Current row of honeycomb
                var topHorizontalRow = true;        // If horizontal is selected, indicates if comb is in the top row
                var left = 0;                       // Left positioning of a comb
                var top = 0;                        // Top positioning of a comb

                /* Hexagon apothem is distance from center to midpoint of any side. 
                Used as top-handler for a horizontal layout and the left-handler for a vertical layout. */
                var apothem = function(){
                    return ( 0.5 * combWidth * 0.5 * Math.sqrt(3) );
                };

               /* Three quarters of the maximum distance across the hexagon. 
                Used as top-handler for a vertical layout and the left-handler for a horizontal layout. */
                var threeQuartersCombWidth = function(){
                    return ( 0.75 * combWidth );
                };

                function orderCombs(topHandler){

                    $(element).find('.comb').each(function(index){

                        top = row * ( topHandler() + settings.margin );     // Set top position for current comb
                        
                        if(animate == true){
                            $(this).stop(true, false);
                            $(this).animate({'left': left, 'top': top});
                        }else{
                            $(this).css('left', left).css('top', top);
                        }

                        /* Horizontal Layout */
                        if(settings.horizontal == true){
                            
                            /* For the first row in a horizontal layout, the comb must maintain shape. Therefore, the combs must be laid out differently
                            for the first row until we reach the element width */
                            if(topHorizontalRow == true){

                                if(row != 0){   // Only increment left position when not the top row
                                    left = left + threeQuartersCombWidth() + settings.margin;
                                }

                                if(left > maxLeft) {
                                    maxLeft = left + 0.25 * combWidth;
                                }

                                row = ( index % 3 == 0 ? 2 : ( index % 3 == 1 ? 1 : 0) );   // Determines row for the next comb based on current index

                                if(left + combWidth > width){
                                    topHorizontalRow = false;
                                    row = 3;
                                    left = (row % 2) * ( threeQuartersCombWidth() + settings.margin );
                                }
                            }
                            /* After the first horizontal row, add combs to empty bottom spaces */
                            else{
                                left = left + 2 * ( threeQuartersCombWidth() + settings.margin );

                                if(left + combWidth > width){
                                    row = row + 1;
                                    left = (row % 2) * ( threeQuartersCombWidth() + settings.margin );
                                }
                            }
                        }

                        /* Vertical Layout */
                        else{
                            left = left + ( 2 * apothem() + settings.margin );
                            
                            if(left + 0.5 * ( combWidth - 2 * apothem() ) > maxLeft) {
                                maxLeft = left + 0.5 * ( combWidth - 2 * apothem() );
                            }
                            
                            if(left + combWidth > width){
                                row = row + 1;
                                left = (row % 2) / 2 * ( 2 * apothem() + settings.margin );
                            }
                        }
                    });
                }

                if(settings.horizontal == true){
                    orderCombs(apothem);
                }
                else{
                    orderCombs(threeQuartersCombWidth);
                }
                
                $wrapper.height(top + combHeight).width(maxLeft + settings.margin);
            }
            
            $(window).resize(function(){
                reorder(true);
            });

            buildHtml();
            reorder(false);
        }

        return this.each(function() {
            initialize(this);
        });
    }

})(jQuery);
