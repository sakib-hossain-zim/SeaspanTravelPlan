$(document).ready(function() {
    'use strict';

    /**
     * Sidebar title content
     */
    $('.sidebar-title-inner').on('click', function() {
        $('body').toggleClass('sidebar-title-content-open');
    });

    /**
     * Side
     */
    $('.content-side-toggle').on('click', function() {
        $('body').toggleClass('content-side-open');
    });

    /**
     * Toolbar
     */
    $('.toolbar-actions-toggle, .toolbar-actions .toolbar-slide-close').on('click', function() {
        $('body').toggleClass('toolbar-actions-open');
    });

    $('.toolbar-search-toggle, .toolbar-search .toolbar-slide-close').on('click', function() {
        $('body').toggleClass('toolbar-search-open');
    });

    /**
     * Chart
     */
    if ($('.ct-chart').length !== 0) {
        let data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };

        let options = {
            high: 10,
            low: 0,
            axisY: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        };

        new Chartist.Bar('.ct-chart', data, options);
    }
});