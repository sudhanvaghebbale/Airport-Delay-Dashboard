/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Stacked area chart example
 *
 *  Demo JS code for stacked area chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var delayDict = {'2009': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                '2011': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                '2013': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                '2015': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};

var EchartsAreaStackedDark = function() {


    //
    // Setup module components
    //

    // Stacked area chart
    var _areaStackedDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var area_stacked_element = document.getElementById('area_stacked');

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function (data) {
        
            for(var i = 0; i < data.length; i++){
                if(data[i].Time.Year == 2009 || data[i].Time.Year == 2011 || data[i].Time.Year == 2013 || data[i].Time.Year == 2015){
                    delayDict[data[i].Time.Year][data[i].Time.Month-1] += data[i].Statistics.Flights.Delayed;
                }        
            }

            var delayed = $.map(delayDict, function(value, key) { return value });

            
            //
            // Charts configuration
            //

            if (area_stacked_element) {

                // Initialize chart
                var area_stacked = echarts.init(area_stacked_element);


                //
                // Chart config
                //

                // Options
                area_stacked.setOption({

                    // Define colors
                    color: ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80'],

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
                        data: ['2009', '2011', '2013', '2015'],
                        itemHeight: 8,
                        itemGap: 20,
                        textStyle: {
                            color: '#fff'
                        }
                    },

                    // Add tooltip
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        padding: [10, 15],
                        textStyle: {
                            color: '#222',
                            fontSize: 13,
                            fontFamily: 'Roboto, sans-serif'
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        axisLabel: {
                            color: '#fff'
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
                        axisLabel: {
                            color: '#fff'
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.25)'
                            }
                        },
                        splitLine: {
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
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    }],

                    // Add series
                    series: [
                        {
                            name: '2009',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: delayed.slice(0,12)
                        },
                        {
                            name: '2011',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: delayed.slice(12,24)
                        },
                        {
                            name: '2013',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: delayed.slice(24,36)
                        },
                        {
                            name: '2015',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: delayed.slice(36,48)
                        }
                    ]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                area_stacked_element && area_stacked.resize();
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
            _areaStackedDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsAreaStackedDark.init();
});
