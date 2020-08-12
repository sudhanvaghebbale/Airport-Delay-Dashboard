/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Multiple area charts example
 *
 *  Demo JS code for area chart multiples [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsAreaMultipleDarkCorrelation = function() {


    //
    // Setup module components
    //

    // Multiple area chart
    var _areaMultipleDarkExampleCorrelation = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var area_multiple_element_correlation = document.getElementById('area_multiple_correlation');

        var city = document.getElementById('city_corr').value;
        var month_corr = document.getElementById('month_corr').value;
        var statistic_1 = $("#statistics_1 option:selected");
        var statistic_value_1 = statistic_1.text();

        var category_1 = $("#sub_category_1 option:selected");
        var category_value_1 = category_1.text();

        var statistic_2 = $("#statistics_2 option:selected");
        var statistic_value_2 = statistic_2.text();

        var category_2 = $("#sub_category_2 option:selected");
        var category_value_2 = category_2.text();


        statistics_1_dict = { '2004': 0, '2005': 0, '2006': 0, '2007': 0, '2008': 0, '2009': 0, '2010': 0, '2011': 0, '2012': 0, '2013': 0, '2014': 0, '2015': 0 };

        statistics_2_dict = { '2004': 0, '2005': 0, '2006': 0, '2007': 0, '2008': 0, '2009': 0, '2010': 0, '2011': 0, '2012': 0, '2013': 0, '2014': 0, '2015': 0 };

        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            for (var i = 0; i < data.length; i++) {
                var airport_name = data[i].Airport.Name.split(':')[0];
                var month_name = data[i]["Time"]["Month Name"].split('', 3).join('');
                var years = data[i].Time.Year;
                if (airport_name == city && month_name == month_corr && years > 2003 && years < 2016) {
                    statistics_1_dict[years] += data[i]["Statistics"][statistic_value_1][category_value_1];
                    statistics_2_dict[years] += data[i]["Statistics"][statistic_value_2][category_value_2];
                }
            }
            //
            // Charts configuration
            //

            if (area_multiple_element_correlation) {

                // Initialize chart
                var area_multiple_correlation = echarts.init(area_multiple_element_correlation);

                //
                // Chart config
                //

                var width = area_multiple_correlation.getWidth();
                var height = area_multiple_correlation.getHeight() + 200;

                // Options
                area_multiple_correlation.setOption({

                    // Define colors
                    color: ['#f17a52', '#03A9F4'],

                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 13
                    },

                    // Chart animation duration
                    animationDuration: 750,

                    // Setup grid
                    grid: [{
                            left: 0,
                            right: 20,
                            top: 40,
                            height: 160,
                            containLabel: true
                        },
                        {
                            left: 0,
                            right: 20,
                            top: 280,
                            height: 160,
                            containLabel: true
                        }
                    ],

                    // Title
                    title: [{
                            left: 'center',
                            text: category_value_1,
                            top: 0,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 700,
                                color: '#fff'
                            }
                        },
                        {
                            left: 'center',
                            text: category_value_2,
                            top: 240,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 700,
                                color: '#fff'
                            }
                        }
                    ],

                    // Tooltip
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        padding: [10, 15],
                        textStyle: {
                            color: '#222',
                            fontSize: 13,
                            fontFamily: 'Roboto, sans-serif'
                        },
                        formatter: function(a) {
                            return (
                                a[0]['axisValueLabel'] + "<br>" +
                                '<span class="badge badge-mark mr-2" style="border-color: ' + a[0]['color'] + '"></span>' +
                                a[0]['seriesName'] + ': ' + a[0]['value'] + "<br>" +
                                '<span class="badge badge-mark mr-2" style="border-color: ' + a[1]['color'] + '"></span>' +
                                a[1]['seriesName'] + ': ' + a[1]['value']
                            );
                        }
                    },

                    // Connect axis pointers
                    axisPointer: {
                        link: {
                            xAxisIndex: 'all'
                        },
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.25)'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.1)',
                                    width: 1,
                                    type: 'dashed'
                                }
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)']
                                }
                            },
                            data: Object.keys(statistics_1_dict),
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.25)'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.1)',
                                    width: 1,
                                    type: 'dashed'
                                }
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)']
                                }
                            },
                            data: Object.keys(statistics_2_dict),
                        }
                    ],

                    // Vertical axis
                    yAxis: [{
                            type: 'value',
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.25)'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.1)',
                                    width: 1,
                                    type: 'dashed'
                                }
                            }
                        },
                        {
                            gridIndex: 1,
                            type: 'value',
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.25)'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,0.1)',
                                    width: 1,
                                    type: 'dashed'
                                }
                            }
                        }
                    ],

                    // Add series
                    series: [{
                            name: category_value_1,
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: Object.values(statistics_1_dict),
                        },
                        {
                            name: category_value_2,
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            areaStyle: {
                                normal: {
                                    opacity: 0.25
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: Object.values(statistics_2_dict),
                        }
                    ]
                });

                area_multiple_correlation.on('click', function(params) {
                    var nextTab = $('#tabbed_navigation >li').length + 1;
                    var ids = "area_multiple_year_" + nextTab;
                    $('<li><a href="#tab-dark-' + nextTab + '" class="navbar-nav-link" data-toggle="tab">' + params.name + ' - ' + params.seriesName +
                        '&nbsp;&nbsp;<button type="button" class="close" aria-label="Close" onclick="close_tab(this)"' +
                        '<span aria-hidden="true">&times;</span></button></a></li>').appendTo('#tabbed_navigation');

                    $('<div class="tab-pane fade" id="tab-dark-' + nextTab + '"><div class="chart has-fixed-height"><canvas id="' + ids + '" width="' + width + '" height="' + height + '"></canvas></div></div>').appendTo("#tab_contents");
                    year_correlation(params.name, city, statistic_value_1, category_value_1, statistic_value_2, category_value_2, nextTab);
                });

            }


            //
            // Resize charts
            //

            // Resize function
            var triggerChartResize = function() {
                area_multiple_element_correlation && area_multiple_correlation.resize();
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
            _areaMultipleDarkExampleCorrelation();
        }
    }
}();


// Initialize module
// ------------------------------

$(document).ready(function() {
    var buttons = document.getElementById("show_correlations");
    $(buttons).click(function() {
        document.getElementById("columns_basic").style.display = "none";
        document.getElementById("column_basic_month").style.display = "none";
        document.getElementById("area_multiple_correlation").style.display = "block";
        EchartsAreaMultipleDarkCorrelation.init();
    });
});