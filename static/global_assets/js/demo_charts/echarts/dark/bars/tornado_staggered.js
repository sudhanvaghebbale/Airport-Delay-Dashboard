/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Staggered tornado example
 *
 *  Demo JS code for staggered tornado chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsTornadoStaggeredDark = function() {


    //
    // Setup module components
    //

    // Basic bar chart
    var _tornadoStaggeredDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var tornado_staggered_element = document.getElementById('tornado_staggered');

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            var rank = document.getElementById('rank_options').value;
            var n_value = document.getElementById('n_value').value;
            console.log(n_value)
            var city_ranks = {};
            var statistic = $("#statistics_3 option:selected");
            var statistic_value = statistic.text();

            var category = $("#sub_category_3 option:selected");
            var category_value = category.text();


            for (var i = 0; i < data.length; i++) {
                var airport_name = data[i].Airport.Name.split(':')[0];
                if (airport_name in city_ranks) {
                    city_ranks[airport_name] += data[i]["Statistics"][statistic_value][category_value];
                } else {
                    city_ranks[airport_name] = data[i]["Statistics"][statistic_value][category_value];
                }
            }

            var items = Object.keys(city_ranks).map(function(key) {
                return [key, city_ranks[key]];
            });

            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            var dataArray = [];

            if (rank == 'top') {
                dataArray = items.slice(0, n_value).reverse();
            } else {
                dataArray = items.slice((-n_value - 1), -1);
            }

            var cities = [];
            var stats = [];

            for (var i = 0; i < dataArray.length; i++) {
                cities.push(dataArray[i][0]);
                stats.push(dataArray[i][1]);
            }

            var stat = statistic_value + ' -- ' + category_value;

            //
            // Charts configuration
            //

            if (tornado_staggered_element) {

                // Initialize chart
                var tornado_staggered = echarts.init(tornado_staggered_element);

                //
                // Chart config
                //

                // Common styles
                var labelRight = {
                    normal: {
                        color: '#ffb980',
                        label: {
                            position: 'right'
                        }
                    }
                };

                // Options
                tornado_staggered.setOption({

                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 13
                    },

                    // Chart animation duration
                    animationDuration: 750,

                    // Setup grid
                    grid: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 5,
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
                        },
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        formatter: function(params) {
                            return params[0].axisValueLabel + ': ' + params[0].value;
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'value',
                        position: 'top',
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
                        type: 'category',
                        axisLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        data: cities,
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

                    // Add series
                    series: [{
                        name: stat,
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: '#80ff9d',
                                barBorderRadius: 3,
                                label: {
                                    show: true,
                                    position: 'left',
                                    padding: [0, 10],
                                    formatter: '{b}'
                                }
                            }
                        },
                        data: stats
                    }]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                tornado_staggered_element && tornado_staggered.resize();
            };

            /*
            // On sidebar width change
            var sidebarToggle = document.querySelector('.sidebar-control');
            sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

            // On window resize
            var resizeCharts;
            window.addEventListener('resize', function() {
                clearTimeout(resizeCharts);
                resizeCharts = setTimeout(function() {
                    triggerChartResize();
                }, 200);
            });
            */
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _tornadoStaggeredDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------
$(document).ready(function() {
    var buttons = document.getElementById('show_ranks');
    $(buttons).click(function() {
        document.getElementById('tornado_staggered').style.display = "block";
        EchartsTornadoStaggeredDark.init();
    });
});