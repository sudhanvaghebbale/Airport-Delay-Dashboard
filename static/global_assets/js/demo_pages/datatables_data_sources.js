/* ------------------------------------------------------------------------------
 *
 *  # Datatables data sources
 *
 *  Demo JS code for datatable_data_sources.html page
 *
 * ---------------------------------------------------------------------------- */

var dataSet = [];

// Setup module
// ------------------------------

var DatatableDataSources = function() {


    //
    // Setup module components
    //

    // Basic Datatable examples
    var _componentDatatableDataSources = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Data
        
        $.getJSON('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json', function (data) {
            for (var i = 0; i < data.length; i++) {
                var temp = [];
                temp.push(data[i].Airport.Code);
                temp.push(data[i].Airport.Name);
                temp.push(data[i].Statistics.Flights.Total);
                dataSet.push(temp);
            }

            // Setting datatable defaults
            $.extend( $.fn.dataTable.defaults, {
                autoWidth: false,
                dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
                language: {
                    search: '<span>Filter:</span> _INPUT_',
                    searchPlaceholder: 'Type to filter...',
                    lengthMenu: '<span>Show:</span> _MENU_',
                    paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
                }
            });


            // HTML sourced data
            $('.datatable-html').dataTable({
                columnDefs: [{ 
                    orderable: false,
                    width: 100,
                    targets: [ 5 ]
                }]
            });


            // AJAX sourced data
            $('.datatable-ajax').dataTable({
                ajax: 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json'
            });


            //
            // Javascript sourced data
            //

            
            // Initialize
            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: []
            });


            //
            // Nested object data
            //

            $('.datatable-nested').dataTable({
                ajax: '../../../../global_assets/demo_data/tables/datatable_nested.json',
                columns: [
                    {data: "name[, ]"},
                    {data: "hr.0" },
                    {data: "office"},
                    {data: "extn"},
                    {data: "hr.2"},
                    {data: "hr.1"}
                ]
            });


            //
            // Generate content for a column
            //

            // Table config
            var table = $('.datatable-generated').DataTable({
                ajax: '../../../../global_assets/demo_data/tables/datatable_ajax.json',
                columnDefs: [{
                    targets: 2,
                    data: null,
                    defaultContent: "<a class='badge badge-secondary text-white cursor-pointer'>Show</a>"
                },
                { 
                    orderable: false,
                    targets: [0, 2]
                }]
            });
            
            // Location alert
            $('.datatable-generated tbody').on('click', 'a', function () {
                var data = table.row($(this).parents('tr')).data();
                alert(data[0] +"'s location is: "+ data[ 2 ]);
            });
        

            // Select2 for length menu styling
            var _componentSelect2 = function() {
                if (!$().select2) {
                    console.warn('Warning - select2.min.js is not loaded.');
                    return;
                }

                // Initialize
                $('.dataTables_length select').select2({
                    minimumResultsForSearch: Infinity,
                    dropdownAutoWidth: true,
                    width: 'auto'
                });
            };
        });
    }


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableDataSources();
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DatatableDataSources.init();
});
