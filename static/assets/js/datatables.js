$(document).ready(function(){
    var dataset = [];
    $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function (data) {
        for (var i = 0; i < data.length; i++) {
            var temp = [];
            temp.push(data[i].Airport.Code);
            temp.push(data[i].Airport.Name);
            temp.push(data[i].Statistics.Flights.Total);
            temp.push(data[i]['Statistics']['Minutes Delayed']['Total']);
            temp.push(data[i].Time.Label);
            dataset.push(temp);
        }
        $('#data-table').DataTable({  
            data: dataset
        });
    });
});  