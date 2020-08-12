/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Display point values example
 *
 *  Demo JS code for line chart with point values [dark theme]
 *
 * ---------------------------------------------------------------------------- */

var updateInterval = 10000;

// Setup module
// ------------------------------

var EchartsLinesPointValuesDark = function() {


    //
    // Setup module components
    //

    // Line chart with point values
    var _linesPointValuesDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var line_values_element = document.getElementById('line_values');

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

                if (line_values_element) {

                    // Initialize chart
                    var line_values = echarts.init(line_values_element);


                    //
                    // Chart config
                    //

                    // Options
                    line_values.setOption({

                        // Define colors
                        color: ['#4DB6AC', '#F06292', '#D87A80'],

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
                            data: ['Maximum', 'Minimum', 'Feels Like'],
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
                            data: times,
                            axisLabel: {
                                color: '#fff',
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
                            }
                        }],

                        // Vertical axis
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C',
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
                                name: 'Maximum',
                                type: 'line',
                                xValueType: 'time',
                                data: dataset_max,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 7,
                                label: {
                                    normal: {
                                        show: true
                                    } 
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2
                                    }
                                }
                            },
                            {
                                name: 'Minimum',
                                type: 'line',
                                xValueType: 'time',
                                data: dataset_min,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 7,
                                label: {
                                    normal: {
                                        show: true
                                    } 
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2
                                    }
                                }
                            },
                            {
                                name: 'Feels Like',
                                type: 'line',
                                xValueType: 'time',
                                data: dataset_feels,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 7,
                                label: {
                                    normal: {
                                        show: true
                                    } 
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2
                                    }
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
                    line_values_element && line_values.resize();
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
            _linesPointValuesDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    $('#get_weather_data').click(function(){
        EchartsLinesPointValuesDark.init();
        
    });
});
