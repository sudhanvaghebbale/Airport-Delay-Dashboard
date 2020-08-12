function monthly_trend(month, city, statistic, category, nextTab) {
    /* ------------------------------------------------------------------------------
     *
     *  # Echarts - Basic column example
     *
     *  Demo JS code for basic column chart [dark theme]
     *
     * ---------------------------------------------------------------------------- */


    // Setup module
    // ------------------------------

    var EchartColumnsBasicDark = function() {
        //
        // Setup module components
        //

        // Basic column chart
        var _columnBasicDarkExample = function() {

            if (typeof echarts == 'undefined') {
                console.warn('Warning - echarts.min.js is not loaded.');
                return;
            }

            // Define element
            var column_basic_element = document.getElementById('column_basic_' + nextTab);
            var ids = "tab-dark-" + nextTab;
            month_trend = {}

            for (var i = 2004; i < 2016; i++) {
                month_trend[i] = 0;
            }

            $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
                for (var i = 0; i < data.length; i++) {
                    var airport_name = data[i].Airport.Name.split(':')[0];
                    var month_name = data[i]["Time"]["Month Name"].split('', 3).join('');
                    var years = data[i].Time.Year;
                    if (airport_name == city && month_name == month && years > 2003 && years < 2016) {
                        month_trend[years] += data[i]["Statistics"][statistic][category];
                    }
                }

                var keys = Object.keys(month_trend);
                var values = Object.values(month_trend);
                //
                // Charts configuration
                //

                if (column_basic_element) {

                    // Initialize chart
                    var column_basic = echarts.init(column_basic_element);

                    //
                    // Chart config
                    //
                    // Options
                    column_basic.setOption({

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
                            data: statistic,
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
                            name: 'Months',
                            type: 'category',
                            data: keys,
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
                            name: month,
                            type: 'bar',
                            data: values,
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
                        }],

                    });
                }

                //
                // Resize charts
                //

                // Resize function
                var triggerChartResize = function() {
                    column_basic_element && column_basic.resize();
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
                _columnBasicDarkExample();
            }
        }
    }();
    EchartColumnsBasicDark.init();
}



function yearly_trend(year, city, statistic, category, nextTab) {
    /* ------------------------------------------------------------------------------
     *
     *  # Echarts - Basic column example
     *
     *  Demo JS code for basic column chart [dark theme]
     *
     * ---------------------------------------------------------------------------- */


    // Setup module
    // ------------------------------

    var EchartColumnsBasicDarkYear = function() {
        //
        // Setup module components
        //

        // Basic column chart
        var _columnBasicDarkExampleYear = function() {

            if (typeof echarts == 'undefined') {
                console.warn('Warning - echarts.min.js is not loaded.');
                return;
            }

            // Define element
            var column_basic_element_year = document.getElementById('column_basic_year_' + nextTab);
            var ids = "tab-dark-" + nextTab;
            year_trend = { 'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0 }

            $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
                for (var i = 0; i < data.length; i++) {
                    var airport_name = data[i].Airport.Name.split(':')[0];
                    var month_name = data[i]["Time"]["Month Name"].split('', 3).join('');
                    var years = data[i].Time.Year;
                    if (airport_name == city && month_name in year_trend && years == year) {
                        year_trend[month_name] += data[i]["Statistics"][statistic][category];
                    }
                }

                var keys = Object.keys(year_trend);
                var values = Object.values(year_trend);
                //
                // Charts configuration
                //

                if (column_basic_element_year) {

                    // Initialize chart
                    var column_basic_year = echarts.init(column_basic_element_year);

                    //
                    // Chart config
                    //
                    // Options
                    column_basic_year.setOption({

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
                            data: statistic,
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
                            data: keys,
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
                            name: month,
                            type: 'bar',
                            data: values,
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
                        }],

                    });
                }

                //
                // Resize charts
                //

                // Resize function
                var triggerChartResize = function() {
                    column_basic_element_year && column_basic_year.resize();
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
                _columnBasicDarkExampleYear();
            }
        }
    }();
    EchartColumnsBasicDarkYear.init();
}

function carrier_trend(name, airport_ranks, carrier_ranks, carrier_rank_length, nextTab) {
    $.getJSON('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json', function(data) {
        console.log(data);
        var ids = "mapid_" + nextTab;
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGViMjIiLCJhIjoiY2tjeG91emYzMDIybTJ6bmhkcDZtYnhhMyJ9.38q5Pr7Itmup8NRwmtensQ';
        var map = new mapboxgl.Map({
            container: ids, // container id
            style: 'mapbox://styles/mapbox/outdoors-v11', //hosted style id
            center: [-100.04, 38.907], // starting position
            zoom: 2, // starting zoom
        });
        map.addControl(new mapboxgl.FullscreenControl());
        console.log(carrier_ranks, airport_ranks);
        for(var i = 0; i < airport_ranks[name].length; i++){
            var city = airport_ranks[name][i];
            var city_abbr = city.split(',')[0].trim(); 
            for (var j=0; j < data.length; j++) {
                if(data[j].city == city_abbr){
                    var marker = new mapboxgl.Marker()
                    .setLngLat([data[j].longitude, data[j].latitude])
                    .setPopup(new mapboxgl.Popup()
                        .setHTML("<p style=color:black;>" + city + ": " + carrier_rank_length[city] + "</p>"))
                    .addTo(map);                    
                }
            }
        };

    });
};