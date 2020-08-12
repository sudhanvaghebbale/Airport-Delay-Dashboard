/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic column example
 *
 *  Demo JS code for basic column chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsColumnsBasicDarkMonth = function() {
    //
    // Setup module components
    //

    // Basic column chart
    var _columnsBasicDarkExampleMonth = function() {

        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var columns_basic_element_month = document.getElementById('column_basic_month');
        var city1 = document.getElementById('city_1').value;
        var city2 = document.getElementById('city_2').value;
        var month = document.getElementById('month').value;

        var statistic = $("#statistics option:selected");
        var statistic_value = statistic.text();

        var category = $("#sub_category option:selected");
        var category_value = category.text();

        monthDict = {
            [city1]: { '2004': 0, '2005': 0, '2006': 0, '2007': 0, '2008': 0, '2009': 0, '2010': 0, '2011': 0, '2012': 0, '2013': 0, '2014': 0, '2015': 0 },
            [city2]: { '2004': 0, '2005': 0, '2006': 0, '2007': 0, '2008': 0, '2009': 0, '2010': 0, '2011': 0, '2012': 0, '2013': 0, '2014': 0, '2015': 0 }
        };

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            for (var i = 0; i < data.length; i++) {
                var airport_name = data[i].Airport.Name.split(':')[0];
                var month_name = data[i]["Time"]["Month Name"].split('', 3).join('');
                var years = data[i].Time.Year;
                if (airport_name in monthDict && month_name == month && years > 2003 && years < 2016) {
                    monthDict[[airport_name]][
                        [years]
                    ] += data[i]["Statistics"][statistic_value][category_value];
                }
            }
            //
            // Charts configuration
            //

            if (columns_basic_element_month) {

                // Initialize chart
                var columns_basic_month = echarts.init(columns_basic_element_month);

                //
                // Chart config
                //

                var width = columns_basic_month.getWidth();
                var height = columns_basic_month.getHeight();

                // Options
                columns_basic_month.setOption({

                    // Define colors
                    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80'],

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
                        data: [city1, city2],
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
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        data: Object.keys(monthDict[[city1]]),
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
                    series: [{
                            triggerEvent: true,
                            name: [city1],
                            type: 'bar',
                            data: Object.values(monthDict[[city1]]),
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Average' }]
                            }
                        },
                        {
                            triggerEvent: true,
                            name: [city2],
                            type: 'bar',
                            data: Object.values(monthDict[[city2]]),
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Average' }]
                            }
                        }
                    ],
                });

                columns_basic_month.on('click', function(params) {
                    console.log(params);
                    var nextTab = $('#tabbed_navigation >li').length + 1;
                    var ids = "column_basic_year_" + nextTab;
                    $('<li><a href="#tab-dark-' + nextTab + '" class="navbar-nav-link" data-toggle="tab">' + params.name + ' - ' + params.seriesName +
                        '&nbsp;&nbsp;<button type="button" class="close" aria-label="Close" onclick="close_tab(this)"' +
                        '<span aria-hidden="true">&times;</span></button></a></li>').appendTo('#tabbed_navigation');

                    $('<div class="tab-pane fade" id="tab-dark-' + nextTab + '"><div class="chart has-fixed-height"><canvas id="' + ids + '" width="' + width + '" height="' + height + '"></canvas></div></div>').appendTo("#tab_contents");
                    yearly_trend(params.name, params.seriesName, statistic_value, category_value, nextTab);
                });
            }

            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                columns_basic_element_month && columns_basic_month.resize();
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
            _columnsBasicDarkExampleMonth();
        }
    }
}();



// Initialize module
// ------------------------------
$(document).ready(function() {
    var buttons = document.getElementById("show_monthly_delays");
    $(buttons).click(function() {
        document.getElementById("column_basic_month").style.display = "block";
        document.getElementById("columns_basic").style.display = "none";
        EchartsColumnsBasicDarkMonth.init();
    });
});