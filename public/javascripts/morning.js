var table;

$.get("/players/morning", function(playerList){
    table = $('#playerlist').DataTable( {
    	dom: 'Bfrtip',
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]],
        data: Object.values(playerList),
        columns:[{
        	title: 'Select',
        	data: null,
        	defaultContent: ''
        },
        {
        	title: 'Last Name',
        	data: 'lastName'
        },
        {
        	title: 'First Name',
        	data: 'firstName'
        },
        {
        	title: 'Email',
        	data: 'email'
        },
        {
        	title: 'Phone Number',
        	data: 'phoneNumber'
        }
        ],
        buttons: [{
        	text: "Remove Player",
        	action: function(){
        		var numberOfRowsSelected = table.rows('.selected').data().length;

				if(numberOfRowsSelected < 1){
					alert("You have to select at least one row");
					return false;
				}

				var rowsSelected = table.rows('.selected').data().toArray();

				table.rows('.selected').remove();

				for(idx in rowsSelected){
					$.ajax({
						type: "POST",
						url: "/players/removePlayerFromLeague",
						data: {"morning" : rowsSelected[idx].id}
					})
				}
        	}
        }]
    } );
});


