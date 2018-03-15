//Player view

var table;
var playerScheduleFlag = false;
var currentLevelInView;

$("#playerScheduleSlider").hide();

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
        	title: 'Seed',
        	data: null,
        	defaultContent: 'N/A'
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

var initLevel = function(level){
	currentLevelInView = level;
	playerScheduleFlag = true;
	$('#playerlist').DataTable().clear().destroy();
	$("#playerScheduleSlider").css('display', 'inline-block');
	loadDataTable(table, level);
	$('#playerScheduleSlider').on('change', function() {
		if(playerScheduleFlag == false){
			$('#leagueSchedule').remove();
			document.getElementById("dataTable").innerHTML = "<table id='playerlist' class='display' cellspacing='0' width='100%'></table>";
			loadDataTable(table, level);
			playerScheduleFlag = true;
		} else {
			$('#playerlist').DataTable().clear().destroy();
			$('#playerlist').remove();
    		showScheduleList(level);
    		playerScheduleFlag = false;
		}
	});
}

$("#levelOne").click(function(){
	initLevel("levelOne");
})

$("#levelTwoA").click(function(){
	initLevel("levelTwoA");
})

$("#levelTwoB").click(function(){
	initLevel("levelTwoB");
})

$("#levelThree").click(function(){
	initLevel("levelThree");
})

$("#levelFour").click(function(){
	initLevel("levelFour");
})

$("#levelFive").click(function(){
	initLevel("levelFive");
})

$("#levelSix").click(function(){
	initLevel("levelSix");
})

$("#levelOneD").click(function(){
	initLevel("levelOneD");
})

$("#levelTwoD").click(function(){
	initLevel("levelTwoD");
})

$("#morning").click(function(){
	initLevel("morning");
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
		var player = {}
		player[selectedLeague] = playersSelected[idx].id;
		$.ajax({
			type: "POST",
			url: "/players/movePlayerToLeague",
			data: player
		})
	}
}

var validateUpdatePhoneForm = function(){
	var form = document.forms["updatePhoneForm"];
	var newNumber = form["newPhone"].value;
	var playerSelected = table.rows('.selected').data().toArray();
	var playerId = playerSelected[0].id;

	//Sending in format {id:newNumber}
	var updateObject = {}
	updateObject[playerId] = newNumber;

	$.ajax({
			type: "POST",
			url: "/players/updatePhone",
			data: updateObject
		})

}

var validateUpdateEmailForm = function(){
	var form = document.forms["updateEmailForm"];
	var newEmail = form["newEmail"].value;
	var playerSelected = table.rows('.selected').data().toArray();
	var playerId = playerSelected[0].id;

	//Sending in format {id:newEmail}
	var updateObject = {}
	updateObject[playerId] = newEmail;

	$.ajax({
			type: "POST",
			url: "/players/updateEmail",
			data: updateObject
		})
}

var validateUpdateSeedForm = function(){
	var form = document.forms["updateSeedForm"];
	var newSeed = form["newSeed"].value;
	var playerSelected = table.rows('.selected').data().toArray();
	var playerId = playerSelected[0].id;

	var updateObject = {}
	updateObject["id"] = playerId
	updateObject["seed"] = newSeed;
	updateObject["level"] = currentLevelInView;

	$.ajax({
			type: "POST",
			url: "/players/updateSeed",
			data: updateObject
		})
}


var loadDataTable = function(table, level){
    $.get("/players/" + level, function(leagueInfo){
    	var playerList = leagueInfo['players']
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
            	title: 'Seed',
            	data: 'seed',
            	defaultContent: '<input type="text" value="0" size="10"/>'
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
            },
	        {
	        	text: "Record Seeds",
	        	action: function(){
	        			var data = table.rows().data();
						data.each(function (value, index) {
							var updateObject = {};
							updateObject["id"] = value["id"];
							updateObject["seed"] = table.cell(index,1).nodes().to$().find('input').val();
							updateObject["level"] = currentLevelInView;
							$.ajax({
								type: "POST",
								url: "/players/updateSeed",
								data: updateObject
							})
						});
		        }
	        },
	        {
	        	text: "Update Seed",
	        	action: function(){
	        		var numberOfRowsSelected = table.rows('.selected').data().length;

					if(numberOfRowsSelected == 0){
						alert("You have to select exactly one row");
						return false;
					}
					
	        		document.getElementById('updateSeedModal').style.display = "block";
	        		window.onclick = function(event){
	        			if(event.target == document.getElementById('updateSeedModal')) {
	        				document.getElementById('updateSeedModal').style.display = "none"
	        			}
		        	}
		        }
	        }]
        } );
    });
}

var showScheduleList = function(level){
	//Fetch schedule data from database
	$('#leagueSchedule').show();
}






