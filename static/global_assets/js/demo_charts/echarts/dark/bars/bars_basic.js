/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic bars example
 *
 *  Demo JS code for basic bar chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsBarsBasicDark = function() {


    //
    // Setup module components
    //

    // Basic bar chart
    var _barsBasicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var bars_basic_element = document.getElementById('bars_basic');

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

            if (bars_basic_element) {

                // Initialize chart
                var bars_basic = echarts.init(bars_basic_element);


                //
                // Chart config
                //

                // Options
                bars_basic.setOption({

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
                        right: 30,
                        top: 35,
                        bottom: 0,
                        containLabel: true
                    },

                    // Add legend
                    legend: {
                        data: stat,
                        itemHeight: 8,
                        itemGap: 20,
                        textStyle: {
                            padding: [0, 5],
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
                        },
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'value',
                        boundaryGap: [0, 0.01],
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
                        data: cities,
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
                        data: stats
                    }]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                bars_basic_element && bars_basic.resize();
            };

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
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _barsBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.getElementById('show_ranks');
    $(buttons).click(function() {
        document.getElementById("bars_basic").style.display = "block";
        EchartsBarsBasicDark.init();
    });
});