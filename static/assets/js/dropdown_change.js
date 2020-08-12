$(document).ready(function() {
    document.getElementById("weather_data").style.display = "none";
    document.getElementById("city_1_data").style.display = "none";
    document.getElementById("city_2_data").style.display = "none";
    document.getElementById("city_corr_data").style.display = "none";
    document.getElementById("month_data").style.display = "none";
    document.getElementById("month_data_corr").style.display = "none";

    document.getElementById("rank_options_data").style.display = "none";
    document.getElementById("carrier_options_data").style.display = "none";
    document.getElementById("airport_options_data").style.display = "none";

    document.getElementById("statistics_data").style.display = "none";
    document.getElementById("sub_category_data").style.display = "none";
    document.getElementById("statistics_data_1").style.display = "none";
    document.getElementById("sub_category_data_1").style.display = "none";
    document.getElementById("statistics_data_2").style.display = "none";
    document.getElementById("sub_category_data_2").style.display = "none";
    document.getElementById("statistics_data_3").style.display = "none";
    document.getElementById("sub_category_data_3").style.display = "none";

    document.getElementById("show_yearly_delays").style.display = "none";
    document.getElementById("show_monthly_delays").style.display = "none";
    document.getElementById("show_correlations").style.display = "none";
    document.getElementById("show_ranks").style.display = "none";
    document.getElementById("show_carriers").style.display = "none";
    document.getElementById("show_airports").style.display = "none";

    document.getElementById("columns_basic").style.display = "none";
    document.getElementById("column_basic").style.display = "none";
    document.getElementById("column_basic_month").style.display = "none";
    document.getElementById("column_basic_year").style.display = "none";
    document.getElementById("area_multiple_correlation").style.display = "none";
    document.getElementById("area_multiple_year").style.display = "none";
    document.getElementById("bars_basic").style.display = "none";
    document.getElementById("bars_basic_carrier").style.display = "none";
    document.getElementById("bars_basic_airports").style.display = "none";

    document.getElementById("n-val_carriers").style.display = "none";
    document.getElementById("n-val_airports").style.display = "none";

    $('#chart_type').change(function() {
        e = document.getElementById('chart_type');
        var values = e.options[e.selectedIndex].value;

        if (values == 'yearly_chart') {
            document.getElementById("weather_data").style.display = "block";
            document.getElementById("month_data").style.display = "none";
            document.getElementById("month_data_corr").style.display = "none";
            document.getElementById("city_corr_data").style.display = "none";
            document.getElementById("show_yearly_delays").style.display = "block";
            document.getElementById("show_yearly_delays").disabled = true;
            document.getElementById("show_monthly_delays").style.display = "none";
            document.getElementById("sub_category_data_1").style.display = "none";
            document.getElementById("sub_category_data_2").style.display = "none";
            document.getElementById("sub_category_data_3").style.display = "none";

        } else if (values == "monthly_trend") {
            document.getElementById("weather_data").style.display = "none";
            document.getElementById("month_data").style.display = "block";
            document.getElementById("month_data_corr").style.display = "none";
            document.getElementById("city_corr_data").style.display = "none";
            document.getElementById("show_yearly_delays").style.display = "none";
            document.getElementById("show_monthly_delays").style.display = "block";
            document.getElementById("show_monthly_delays").disabled = true;

        } else if (values == "correlations") {
            document.getElementById("weather_data").style.display = "none";
            document.getElementById("month_data_corr").style.display = "block";
            document.getElementById("city_corr_data").style.display = "none";

            document.getElementById("statistics_data_1").style.display = "none";
            document.getElementById("statistics_data_2").style.display = "none";

            document.getElementById("sub_category_data").style.display = "none";
            document.getElementById("sub_category_data_1").style.display = "none";
            document.getElementById("sub_category_data_2").style.display = "none";

            document.getElementById("show_correlations").style.display = "block";
            document.getElementById("show_correlations").disabled = true;

        } else if (values == "rankings") {
            document.getElementById("rank_options_data").style.display = "block";
            document.getElementById("sub_category_data").style.display = "none";
            document.getElementById("sub_category_data_1").style.display = "none";
            document.getElementById("sub_category_data_2").style.display = "none";
            document.getElementById("show_ranks").style.display = "block";
            document.getElementById("show_ranks").disabled = true;

        } else if (values == "carriers") {
            document.getElementById("carrier_options_data").style.display = "block";
            document.getElementById("sub_category_data").style.display = "none";
            document.getElementById("statistics_data").style.display = "none";
            document.getElementById("statistics_data_1").style.display = "none";
            document.getElementById("statistics_data_2").style.display = "none";
            document.getElementById("statistics_data_3").style.display = "none";
            document.getElementById("sub_category_data_1").style.display = "none";
            document.getElementById("sub_category_data_2").style.display = "none";
            document.getElementById("sub_category_data_3").style.display = "none";
            document.getElementById("show_carriers").style.display = "block";
            document.getElementById("show_carriers").disabled = true;

        } else if (values == "airport") {
            document.getElementById("airport_options_data").style.display = "block";
            document.getElementById("sub_category_data").style.display = "none";
            document.getElementById("statistics_data").style.display = "none";
            document.getElementById("statistics_data_1").style.display = "none";
            document.getElementById("statistics_data_2").style.display = "none";
            document.getElementById("statistics_data_3").style.display = "none";
            document.getElementById("sub_category_data_1").style.display = "none";
            document.getElementById("sub_category_data_2").style.display = "none";
            document.getElementById("sub_category_data_3").style.display = "none";
            document.getElementById("show_airports").style.display = "block";
            document.getElementById("show_airports").disabled = true;
        }
    });

    $('#rank_options').change(function() {
        document.getElementById("statistics_data_3").style.display = "block";
    });

    $('#carrier_options').change(function() {
        document.getElementById("show_carriers").disabled = false;
        var categorys = $("#carrier_options option:selected");
        var category_carriers = categorys.text();
        if (category_carriers == 'Top' || category_carriers == 'Bottom') {
            document.getElementById("n-val_carriers").style.display = "block";
        } else {
            document.getElementById("n-val_carriers").style.display = "none";
        }
    });

    $('#airport_options').change(function() {
        document.getElementById("show_airports").disabled = false;
        var category = $("#airport_options option:selected");
        var category_airports = category.text();
        if (category_airports == 'Top' || category_airports == 'Bottom') {
            document.getElementById("n-val_airports").style.display = "block";
        } else {
            document.getElementById("n-val_airports").style.display = "none";
        }
    });

    $('#weather_data').change(function() {
        document.getElementById("city_1_data").style.display = "block";
        document.getElementById("city_2_data").style.display = "block";
        document.getElementById("statistics_data").style.display = "block";
        document.getElementById("sub_category_data").style.display = "none";
    });

    $('#month_data').change(function() {
        document.getElementById("city_1_data").style.display = "block";
        document.getElementById("city_2_data").style.display = "block";
        document.getElementById("sub_category_data").style.display = "none";
        document.getElementById("statistics_data").style.display = "block";
    });

    $('#month_corr').change(function() {
        document.getElementById("city_corr_data").style.display = "block";
        document.getElementById("statistics_data_1").style.display = "block";
        document.getElementById("statistics_data_2").style.display = "block";
    });

    $("#statistics").change(function() {
        document.getElementById("sub_category_data").style.display = "block";
    });

    var $statistics = $('#statistics'),
        $category = $('#sub_category'),
        $options = $category.find('option');

    $statistics.on('change', function() {
        $category.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    $('#sub_category').change(function() {
        var type = $("#chart_type option:selected");
        var type_value = type.text();
        if (type_value == 'Yearly Comparison') {
            document.getElementById("show_yearly_delays").style.display = "block";
        } else {
            document.getElementById("show_monthly_delays").style.display = "block";
        }
        document.getElementById("show_monthly_delays").disabled = false;
        document.getElementById("show_yearly_delays").disabled = false;
    });

    /*
        Extra Buttons for Correlation Data.
    */

    var $statistics_1 = $('#statistics_1'),
        $category_1 = $('#sub_category_1'),
        $options_1 = $category_1.find('option');

    $statistics_1.on('change', function() {
        document.getElementById("sub_category_data_1").style.display = "block";
        $category_1.html($options_1.filter('[value="' + this.value + '"]'));
    }).trigger('change');


    var $statistics_2 = $('#statistics_2'),
        $category_2 = $('#sub_category_2'),
        $options_2 = $category_2.find('option');

    $statistics_2.on('change', function() {
        document.getElementById("sub_category_data_2").style.display = "block";
        $category_2.html($options_2.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    $('#sub_category_2').change(function() {
        document.getElementById("show_correlations").disabled = false;
    });


    /*
    Ranks
    */

    var $statistics_3 = $('#statistics_3'),
        $category_3 = $('#sub_category_3'),
        $options_3 = $category_3.find('option');

    $statistics_3.on('change', function() {
        document.getElementById("sub_category_data_3").style.display = "block";
        $category_3.html($options_3.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    $('#sub_category_3').change(function() {
        document.getElementById("show_ranks").disabled = false;
    });



    $(".close").click(close_tab(this), function() {
        $('.nav-tabs li:nth-child(' + 1 + ') a').show();
    });
});

function close_tab(tab_li) {
    var tabContentId = $(tab_li).parent().attr("href");
    var li_list = $(tab_li).parent().parent().parent();
    $(tab_li).parent().parent().remove(); //remove li of tab
    if ($(tabContentId).is(":visible")) {
        li_list.find("a").eq(0).tab('show'); // Select first tab
    }
    $(tabContentId).remove(); //remove respective tab content
}