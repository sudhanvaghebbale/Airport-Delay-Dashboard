/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic bars example
 *
 *  Demo JS code for basic bar chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsBarsBasicDarkCarrier = function() {

    //
    // Setup module components
    //

    // Basic bar chart
    var _barsBasicDarkExampleCarrier = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var bars_basic_element_carrier = document.getElementById('bars_basic_carrier');

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            var rank = document.getElementById('carrier_options').value;
            var n_value = document.getElementById('n_value_carriers').value;
            var carrier_ranks = {};

            // Carrier Ranks 
            for (var i = 0; i < data.length; i++) {
                var airport_name = data[i].Airport.Name.split(':')[0];
                var carriers = data[i]["Statistics"]["Carriers"]["Names"].split(',');
                for (var j = 0; j < carriers.length; j++) {
                    if (airport_name in carrier_ranks) {
                        if (carrier_ranks[airport_name].includes(carriers[j])) {
                            continue
                        } else {
                            carrier_ranks[airport_name].push(carriers[j]);
                        }
                    } else {
                        carrier_ranks[airport_name] = [carriers[j]];
                    }
                }
            }

            keys = Object.keys(carrier_ranks);

            carrier_rank_length = {}
            for (var i = 0; i < keys.length; i++) {
                carrier_rank_length[keys[i]] = carrier_ranks[keys[i]].length;
            }

            var items = Object.keys(carrier_rank_length).map(function(key) {
                return [key, carrier_rank_length[key]];
            });

            items.sort(function(first, second) {
                return second[1] - first[1];
            });


            var dataArray = [];

            if (rank == 'top') {
                dataArray = items.slice(0, n_value);
            } else if (rank == 'bottom') {
                dataArray = items.reverse();
                dataArray = dataArray.slice(0, n_value);
            } else if (rank == 'all-d') {
                dataArray = items;
            } else {
                dataArray = items.reverse();
            }


            var cities = [];
            var stats = [];

            for (var i = 0; i < dataArray.length; i++) {
                cities.push(dataArray[i][0]);
                stats.push(dataArray[i][1]);
            }

            //
            // Charts configuration
            //

            if (bars_basic_element_carrier) {

                // Initialize chart
                var bars_basic_carrier = echarts.init(bars_basic_element_carrier);


                //
                // Chart config
                //

                // Options
                bars_basic_carrier.setOption({

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
                        data: cities.reverse(),
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
                        name: "No.of Carriers",
                        type: 'bar',
                        data: stats.reverse()
                    }]
                });
            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                bars_basic_element_carrier && bars_basic_carrier.resize();
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
            _barsBasicDarkExampleCarrier();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.getElementById('show_carriers');
    $(buttons).click(function() {
        document.getElementById("bars_basic_carrier").style.display = "block";
        EchartsBarsBasicDarkCarrier.init();
    });
});