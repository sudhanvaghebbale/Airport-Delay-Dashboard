/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Multiple area charts example
 *
 *  Demo JS code for area chart multiples [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------
function year_correlation(year, city, statistic1, category1, statistic2, category2, nextTab) {

    var EchartsAreaMultipleDarkYear = function() {
        //
        // Setup module components
        //

        // Multiple area chart
        var _areaMultipleDarkExampleYear = function() {
            if (typeof echarts == 'undefined') {
                console.warn('Warning - echarts.min.js is not loaded.');
                return;
            }

            // Define element
            var area_multiple_element_year = document.getElementById('area_multiple_year_' + nextTab);
            var ids = "tab-dark-" + nextTab;
            statistics_1_dict = { 'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0 };
            statistics_2_dict = { 'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0 };

            $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
                for (var i = 0; i < data.length; i++) {
                    var airport_name = data[i].Airport.Name.split(':')[0];
                    var month_name = data[i]["Time"]["Month Name"].split('', 3).join('');
                    var years = data[i].Time.Year;
                    if (airport_name == city && month_name in statistics_1_dict && month_name in statistics_2_dict && years == year) {
                        statistics_1_dict[month_name] += data[i]["Statistics"][statistic1][category1];
                        statistics_2_dict[month_name] += data[i]["Statistics"][statistic2][category2];
                    }
                }
                //
                // Charts configuration
                //
                console.log(statistics_1_dict, statistics_2_dict);
                if (area_multiple_element_year) {

                    // Initialize chart
                    var area_multiple_correlation_year = echarts.init(area_multiple_element_year);

                    //
                    // Chart config
                    //

                    // Options
                    area_multiple_correlation_year.setOption({

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
                                text: category1,
                                top: 0,
                                textStyle: {
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: '#fff'
                                }
                            },
                            {
                                left: 'center',
                                text: category2,
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
                                name: category1,
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
                                name: category2,
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
                }


                //
                // Resize charts
                //

                // Resize function
                var triggerChartResize = function() {
                    area_multiple_element_year && area_multiple_year.resize();
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
                _areaMultipleDarkExampleYear();
            }
        }
    }();

    EchartsAreaMultipleDarkYear.init();
}