

var table;

$.get("/players", function(playerList){
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
        	text: "Add Player",
        	action: function(){
        		document.getElementById('newPlayerModal').style.display = "block";
        		window.onclick = function(event){
        			if(event.target == document.getElementById('newPlayerModal')) {
        				document.getElementById('newPlayerModal').style.display = "none"
        			}
        		}
        	}
        },
        {
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
						url: "/players/removePlayer",
						data: {"id" : rowsSelected[idx].id}
					})
				}
        	}
        },
        {
        	text: "Add to...",
        	action: function(){
        		var numberOfRowsSelected = table.rows('.selected').data().length;

				if(numberOfRowsSelected < 1){
					alert("You have to select at least one row");
					return false;
				}

        		document.getElementById('addToModal').style.display = "block";
        		window.onclick = function(event){
        			if(event.target == document.getElementById('addToModal')) {
        				document.getElementById('addToModal').style.display = "none"
        			}
	        	}
	        }
        },
        {
        	text: "Update Phone Number",
        	action: function(){
        		var numberOfRowsSelected = table.rows('.selected').data().length;

				if(numberOfRowsSelected == 0){
					alert("You have to select exactly one row");
					return false;
				}
				
        		document.getElementById('updatePhoneModal').style.display = "block";
        		window.onclick = function(event){
        			if(event.target == document.getElementById('updatePhoneModal')) {
        				document.getElementById('updatePhoneModal').style.display = "none"
        			}
	        	}
	        }
        },
        {
        	text: "Update Email Address",
        	action: function(){
        		var numberOfRowsSelected = table.rows('.selected').data().length;

				if(numberOfRowsSelected == 0){
					alert("You have to select exactly one row");
					return false;
				}
				
        		document.getElementById('updateEmailModal').style.display = "block";
        		window.onclick = function(event){
        			if(event.target == document.getElementById('updateEmailModal')) {
        				document.getElementById('updateEmailModal').style.display = "none"
        			}
	        	}
	        }
        }]
    } );
});

$("#levelOne").click(function(){
	loadDataTable(table, "levelOne");
})

$("#levelTwoA").click(function(){
	loadDataTable(table, "levelTwoA");
})

$("#levelTwoB").click(function(){
	loadDataTable(table, "levelTwoB");
})

$("#levelThree").click(function(){
	loadDataTable(table, "levelThree");
})

$("#levelFour").click(function(){
	loadDataTable(table, "levelFour");
})

$("#levelFive").click(function(){
	loadDataTable(table, "levelFive");
})

$("#levelSix").click(function(){
	loadDataTable(table, "levelSix");
})

$("#levelOneD").click(function(){
	loadDataTable(table, "levelOneD");
})

$("#levelTwoD").click(function(){
	loadDataTable(table, "levelTwoD");
})

$("#morning").click(function(){
	loadDataTable(table, "morning");
})

var validateNewPlayerForm = function(){
	var newPlayer = {}
	var form = document.forms["newPlayerForm"]

	newPlayer["firstName"] = form["firstName"].value
	newPlayer["lastName"] = form["lastName"].value
	newPlayer["email"] = form["email"].value
	newPlayer["phoneNumber"] = form["phoneNumber"].value

	$.ajax({
				type: "POST",
				url: "/players/addPlayer",
				data: newPlayer
			})

	table.row.add(newPlayer).draw();
}

var validateAddToForm = function(){
	var selectedLeague = $("#LeagueOptions").val();
	var playersSelected = table.rows('.selected').data().toArray();

	for(idx in playersSelected){
		var _data = {}
		_data[selectedLeague] = playersSelected[idx].id;
		$.ajax({
			type: "POST",
			url: "/players/movePlayerToLeague",
			data: _data
		})
	}
}

var validateUpdatePhoneForm = function(){
	var form = document.forms["updatePhoneForm"];
	var newNumber = form["newPhone"].value;
	var playerSelected = table.rows('.selected').data().toArray();
	var playerId = playerSelected[0].id;
	var _data = {}
	_data[playerId] = newNumber;

	$.ajax({
			type: "POST",
			url: "/players/updatePhone",
			data: _data
		})

}

var validateUpdateEmailForm = function(){
	var form = document.forms["updateEmailForm"];
	var newEmail = form["newEmail"].value;
	var playerSelected = table.rows('.selected').data().toArray();
	var playerId = playerSelected[0].id;
	var _data = {}
	_data[playerId] = newEmail;

	$.ajax({
			type: "POST",
			url: "/players/updateEmail",
			data: _data
		})
}

var loadDataTable = function(table, level){
	$('#playerlist').DataTable().clear().destroy();
    $.get("/players/" + level, function(playerList){
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
    					var tempObj = {};
    					tempObj[level] = rowsSelected[idx].id
    					$.ajax({
    						type: "POST",
    						url: "/players/removePlayerFromLeague",
    						data: tempObj
    					})
    				}
            	}
            }]
        } );
    });
}






