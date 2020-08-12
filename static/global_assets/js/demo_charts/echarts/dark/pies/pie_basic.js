/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic pie example
 *
 *  Demo JS code for basic pie chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */

var yearsDict = {2005: 0, 2006: 0, 2007: 0, 2008: 0, 2009: 0, 2010: 0, 2011: 0, 2012: 0, 2013: 0, 2014: 0, 2015: 0};
// Setup module
// ------------------------------

var EchartsPieBasicDark = function() {


    //
    // Setup module components
    //

    // Basic pie chart
    var _scatterPieBasicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var pie_basic_element = document.getElementById('pie_basic');
        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function (data) {
        
            for(var i = 0; i < data.length; i++){
                if(data[i].Time.Year >= 2005 && data[i].Time.Year <= 2015){
                    yearsDict[data[i].Time.Year] += data[i].Statistics.Flights.Cancelled;
                }
                else{
                    continue;
                }
            }
            //
            // Charts configuration
            //

            if (pie_basic_element) {

                // Initialize chart
                var pie_basic = echarts.init(pie_basic_element);


                //
                // Chart config
                //

                // Options
                pie_basic.setOption({

                    // Colors
                    color: [
                        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089',
                        '#66bb6a'
                    ],

                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 13
                    },

                    // Add title
                    title: {
                        text: 'Cancelled Flights',
                        subtext: 'From 2005 to 2015',
                        left: 'center',
                        textStyle: {
                            fontSize: 17,
                            fontWeight: 500,
                            color: '#fff'
                        },
                        subtextStyle: {
                            fontSize: 12,
                            color: '#fff'
                        }
                    },

                    // Add tooltip
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        padding: [10, 15],
                        textStyle: {
                            color: '#222',
                            fontSize: 13,
                            fontFamily: 'Roboto, sans-serif'
                        },
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },

                    // Add legend
                    legend: {
                        orient: 'vertical',
                        top: 'center',
                        left: 0,
                        data: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
                        itemHeight: 8,
                        itemWidth: 8,
                        textStyle: {
                            color: '#fff'
                        }
                    },

                    // Add series
                    series: [{
                        name: 'Cancelled Flights',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '57.5%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#353f53'
                            }
                        },
                        data: [
                            {value: yearsDict['2005'], name: '2005'},
                            {value: yearsDict['2006'], name: '2006'},
                            {value: yearsDict['2007'], name: '2007'},
                            {value: yearsDict['2008'], name: '2008'},
                            {value: yearsDict['2009'], name: '2009'},
                            {value: yearsDict['2010'], name: '2010'},
                            {value: yearsDict['2011'], name: '2011'},
                            {value: yearsDict['2012'], name: '2012'},
                            {value: yearsDict['2013'], name: '2013'},
                            {value: yearsDict['2014'], name: '2014'},
                            {value: yearsDict['2015'], name: '2015'},
                        ]
                    }]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                pie_basic_element && pie_basic.resize();
            };

            // On sidebar width change
            var sidebarToggle = document.querySelector('.sidebar-control');
            sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

            // On window resize
            var resizeCharts;
            window.addEventListener('resize', function() {
                clearTimeout(resizeCharts);
                resizeCharts = setTimeout(function () {
                    triggerChartResize();
                }, 200);
            });
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _scatterPieBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsPieBasicDark.init();
});
