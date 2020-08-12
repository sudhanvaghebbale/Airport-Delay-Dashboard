/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic bars example
 *
 *  Demo JS code for basic bar chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsBarsBasicDarkAirport = function() {

    //
    // Setup module components
    //

    // Basic bar chart
    var _barsBasicDarkExampleAirport = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var bars_basic_element_airport = document.getElementById('bars_basic_airports');

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            var rank = document.getElementById('airport_options').value;
            var n_value = document.getElementById('n_value_airports').value;
            var airport_ranks = {};

            // Carrier Ranks
            for (var i = 0; i < data.length; i++) {
                var airport_name = data[i].Airport.Name.split(':')[0];
                var carriers = data[i]["Statistics"]["Carriers"]["Names"].split(',');
                for (var j = 0; j < carriers.length; j++) {
                    if (carriers[j] in airport_ranks) {
                        if (airport_ranks[carriers[j]].includes(airport_name)) {
                            continue
                        } else {
                            airport_ranks[carriers[j]].push(airport_name);
                        }
                    } else {
                        airport_ranks[carriers[j]] = [airport_name];
                    }
                }
            }

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

            keys = Object.keys(airport_ranks);

            airport_rank_length = {}
            for (var i = 0; i < keys.length; i++) {
                airport_rank_length[keys[i]] = airport_ranks[keys[i]].length;
            }

            var items = Object.keys(airport_rank_length).map(function(key) {
                return [key, airport_rank_length[key]];
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

            keys = Object.keys(carrier_ranks);

            carrier_rank_length = {}
            for (var i = 0; i < keys.length; i++) {
                carrier_rank_length[keys[i]] = carrier_ranks[keys[i]].length;
            }

            //
            // Charts configuration
            //

            if (bars_basic_element_airport) {

                // Initialize chart
                var bars_basic_airport = echarts.init(bars_basic_element_airport);

                var width = bars_basic_airport.getWidth();
                var height = bars_basic_airport.getHeight();

                //
                // Chart config
                //

                // Options
                bars_basic_airport.setOption({

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
                        name: "No.of Airports",
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
                bars_basic_element_airport && bars_basic_airport.resize();
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

            bars_basic_airport.on('click', function(params) {
                var nextTab = $('#tabbed_navigation >li').length + 1;
                var ids = "mapid_" + nextTab;
                $('<li><a href="#tab-dark-' + nextTab + '" class="navbar-nav-link" data-toggle="tab">' + params.name + ' - ' + params.seriesName +
                    '&nbsp;&nbsp;<button type="button" class="close" aria-label="Close" onclick="close_tab(this)"' +
                    '<span aria-hidden="true">&times;</span></button></a></li>').appendTo('#tabbed_navigation');

                $('<div class="tab-pane fade" id="tab-dark-' + nextTab + '"><div class="has-fixed-height" id= ' + ids + ' style="width: 100%; display: block; position: relative;"></div></div>').appendTo("#tab_contents");
                
                carrier_trend(params.name, airport_ranks, carrier_ranks, carrier_rank_length, nextTab);
            });
        });
    };

    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _barsBasicDarkExampleAirport();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.getElementById('show_airports');
    $(buttons).click(function() {
        document.getElementById("bars_basic_airports").style.display = "block";
        EchartsBarsBasicDarkAirport.init();
    });
});