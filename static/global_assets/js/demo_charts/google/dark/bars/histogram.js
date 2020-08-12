/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - histogram
 *
 *  Google Visualization histogram demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleHistogram = function() {


    //
    // Setup module components
    //

    // Histogram
    var _googleHistogram = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }


        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function(data) {
            var rank = document.getElementById('rank_options').value;
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

            if (rank == 'top-5') {
                dataArray = items.slice(0, 5);
            } else {
                dataArray = items.slice(-6, -1).reverse();
            }

            // Initialize chart
            google.charts.load('current', {
                callback: function() {

                    // Draw chart
                    drawHistogram();

                    // Resize on sidebar width change
                    var sidebarToggle = document.querySelector('.sidebar-control');
                    sidebarToggle && sidebarToggle.addEventListener('click', drawHistogram);

                    // Resize on window resize
                    var resizeHistogram;
                    window.addEventListener('resize', function() {
                        clearTimeout(resizeHistogram);
                        resizeHistogram = setTimeout(function() {
                            drawHistogram();
                        }, 200);
                    });
                },
                packages: ['corechart']
            });

            // Chart settings
            function drawHistogram() {

                // Define charts element
                var histogram_chart_element = document.getElementById('google-histogram');

                // Data
                var data = google.visualization.arrayToDataTable([
                    ['Dinosaur', 'Length'],
                    dataArray[0],
                    dataArray[1],
                    dataArray[2],
                    dataArray[3],
                    dataArray[4]
                ]);


                // Options
                var options_histogram = {
                    fontName: 'Roboto',
                    height: 400,
                    fontSize: 12,
                    backgroundColor: 'transparent',
                    isStacked: true,
                    chartArea: {
                        left: '5%',
                        width: '95%',
                        height: 350
                    },
                    tooltip: {
                        textStyle: {
                            fontName: 'Roboto',
                            fontSize: 13
                        }
                    },
                    vAxis: {
                        title: 'Dinosaur length',
                        titleTextStyle: {
                            fontSize: 13,
                            italic: false,
                            color: '#fff'
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        baselineColor: '#697692',
                        gridlines: {
                            color: '#4b5975',
                            count: 10
                        },
                        minorGridlines: {
                            color: '#3e495f'
                        },
                        minValue: 0
                    },
                    hAxis: {
                        textStyle: {
                            color: '#fff'
                        },
                        baselineColor: '#697692',
                        gridlines: {
                            color: '#4b5975'
                        },
                        minorGridlines: {
                            color: '#3e495f'
                        },
                        minValue: 0
                    },
                    legend: {
                        position: 'top',
                        alignment: 'center',
                        textStyle: {
                            fontSize: 12,
                            color: '#fff'
                        }
                    },
                    series: [{ color: '#ffb980' }]
                };

                // Draw chart
                var histogram = new google.visualization.Histogram(histogram_chart_element);
                histogram.draw(data, options_histogram);
            }
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleHistogram();
        }
    }
}();


// Initialize module
// ------------------------------
$(document).ready(function() {
    var buttons = document.getElementById('show_ranks');
    $(buttons).click(function() {
        document.getElementById('google-histogram').style.display = "block";
        GoogleHistogram.init();
    });
});