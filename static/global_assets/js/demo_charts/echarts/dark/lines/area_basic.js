/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic area chart example
 *
 *  Demo JS code for basic area chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */

var updateInterval = 2000;

// Setup module
// ------------------------------

var EchartsAreaBasicDark = function() {


    //
    // Setup module components
    //

    // Basic area chart
    var _areaBasicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var area_basic_element = document.getElementById('area_basic');

        var dataset_max = [];
        var dataset_min = [];
        var dataset_feels = [];
        var times = [];
        
        var city = document.getElementById('city_text').value;

        var updateChart = function () {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a8c68e25b41670c9b07fe00a609dac02&units=metric", function(data) {
                var time = Date.now();
                times.push(time);
                dataset_max.push(data.main.temp_max);
                dataset_min.push(data.main.temp_min);
                dataset_feels.push(data.main.feels_like);

                //
                // Charts configuration
                //

                if (area_basic_element) {

                    // Initialize chart
                    var area_basic = echarts.init(area_basic_element);


                    //
                    // Chart config
                    //

                    // Options
                    area_basic.setOption({

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
                            data: ['Maximum Temp.', 'Minimum Temp.', 'Feels Like'],
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
                            data: time,
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
                                name: 'Maximum Temp.',
                                xValueType: "dateTime",
                                xValueFormatString: "hh:mm:ss TT",
                                yValueFormatString: "##°C",
                                type: 'line',
                                data: dataset_max,
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
                                }
                            },
                            {
                                name: 'Minimum Temp.',
                                type: 'line',
                                xValueType: "dateTime",
                                xValueFormatString: "hh:mm:ss TT",
                                yValueFormatString: "##°C",
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 7,
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        opacity: 0.25
                                    }
                                },
                                data: dataset_min
                            },
                            {
                                name: 'Feels Like',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                xValueType: "dateTime",
                                xValueFormatString: "hh:mm:ss TT",
                                yValueFormatString: "##°C",
                                symbolSize: 7,
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        opacity: 0.25
                                    }
                                },
                                data: dataset_feels
                            }
                        ]
                    });
                }


                //
                // Resize charts
                //

                // Resize function
                var triggerChartResize = function() {
                    area_basic_element && area_basic.resize();
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
        }
        setInterval(function(){updateChart();}, updateInterval); 
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _areaBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------
document.addEventListener('DOMContentLoaded', function() {
    $('#get_weather_data').click(function(){
        EchartsAreaBasicDark.init();
        
    });
});
