/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic scatter example
 *
 *  Demo JS code for basic scatter chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var shirt_prices = [];
var mug_prices = [];

var EchartsScatterBasicDark = function() {
    
    //
    // Setup module components
    //

    // Basic scatter chart
    var _scatterBasicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_basic_element = document.getElementById('scatter_basic');
        
        request = new XMLHttpRequest;
        request.open('GET', 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400){
                // Success!    
                data = JSON.parse(request.responseText);
                for (var i = 0; i < data.length; i++) {
                    
                }
            }
            
            else {
                alert("Error!");
            }
        
            //
            // Charts configuration
            //

            if (scatter_basic_element) {

                // Initialize chart
                var scatter_basic = echarts.init(scatter_basic_element);

                //
                // Chart config
                //

                // Options
                scatter_basic.setOption({

                    // Main colors
                    color: ['#d87a80', '#5ab1ef'],

                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 13
                    },

                    // Chart animation duration
                    animationDuration: 750,

                    // Setup grid
                    grid: {
                        left: 0,
                        right: 40,
                        top: 35,
                        bottom: 0,
                        containLabel: true
                    },

                    // Add legend
                    legend: {
                        data: ['shirt', 'mug'],
                        itemGap: 20,
                        textStyle: {
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
                        axisPointer: {
                            type: 'cross',
                            lineStyle: {
                                type: 'dashed',
                                width: 1
                            }
                        },
                        formatter: function (params) {
                            if (params.value.length > 1) {
                                return params.seriesName + ':<br/>'
                                + params.value[0] + 'cm ' 
                                + params.value[1] + 'kg ';
                            }
                            else {
                                return params.seriesName + ':<br/>'
                                + params.name + ': '
                                + params.value + 'kg ';
                            }
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            color: '#fff',
                            formatter: '{value} cm'
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.25)'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)',
                                type: 'dashed'
                            }
                        }
                    }],

                    // Vertical axis
                    yAxis: [{
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            color: '#fff',
                            formatter: '{value} kg'
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.25)'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)']
                            }
                        }
                    }],

                    // Axis pointer
                    axisPointer: [{
                        label: {
                            backgroundColor: '#b6a2de',
                            shadowBlur: 0
                        }
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Shirt',
                            type: 'scatter',
                            data: [],
                            markLine: {
                                data: [{
                                    type: 'average',
                                    name: 'Average'
                                }]
                            }
                        },
                        {
                            name: 'Mug',
                            type: 'scatter',
                            data: [],
                            markLine: {
                                data: [{
                                    type: 'average',
                                    name: 'Average'
                                }]
                            }
                        }
                    ]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                scatter_basic_element && scatter_basic.resize();
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
        }
        request.send();
    };
    


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _scatterBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterBasicDark.init();
});