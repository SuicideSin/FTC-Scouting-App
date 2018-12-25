function autoscore()
{
	auto_land = document.getElementById("auto-land").value.toLowerCase();
	auto_sampling = document.getElementById("auto-sampling").value.toLowerCase();
	auto_teammarker = document.getElementById("auto-teammarker").value.toLowerCase();
	auto_park = document.getElementById("auto-park").value.toLowerCase();
	auto_mincargo = parseInt(document.getElementById("auto-mincargo").value);
	auto_mindepot = parseInt(document.getElementById("auto-mindepot").value);

	if(auto_land.length != 0 && auto_land != 'y' && auto_land != 'n'){
		document.getElementById("autoscoreE").innerHTML = "Autonomous: Landing? must be 'y' or 'n'";
		return 0;
	}
	else if(auto_sampling.length != 0 && auto_sampling != 'y' && auto_sampling != 'n'){
		document.getElementById("autoscoreE").innerHTML = "Autonomous: Sampling? must be 'y' or 'n'";
		return 0;
	}
	else if(auto_teammarker.length != 0 && auto_teammarker != 'y' && auto_teammarker != 'n'){
		document.getElementById("autoscoreE").innerHTML = "Autonomous: Team Marker? must be 'y' or 'n'";
		return 0;
	}
	else if(auto_park.length != 0 && auto_park != 'y' && auto_park != 'n'){
		document.getElementById("autoscoreE").innerHTML = "Autonomous: Parking? must be 'y' or 'n'";
		return 0;
	}
	else{
		var score = 0;
		if(auto_land == 'y') score += 30;
		if(auto_sampling == 'y') score += 25;
		if(auto_teammarker == 'y') score += 15;
		if(auto_park == 'y') score += 10;
		if(Number.isNaN(auto_mindepot) == false) score += auto_mindepot*2;
		if(Number.isNaN(auto_mincargo) == false) score += auto_mincargo*5;
		document.getElementById("autoscoreE").innerHTML = "";
		document.getElementById("autoscore").value = score;
		return score;
	}
}

function driverscore()
{
	driver_mincargo = parseInt(document.getElementById("driver-mincargo").value);
	driver_mindepot = parseInt(document.getElementById("driver-mindepot").value);

	var score = 0;
	if(Number.isNaN(driver_mindepot) == false) score += driver_mindepot*2;
	if(Number.isNaN(driver_mincargo) == false) score += driver_mincargo*5;
	document.getElementById("driverscore").value = score;
	return score;
}

function endscore()
{
	endgame_mincargo = parseInt(document.getElementById("endgame-mincargo").value);
	endgame_mindepot = parseInt(document.getElementById("endgame-mindepot").value);
	endgame_latch = document.getElementById("endgame-latch").value.toLowerCase();
	endgame_cratercomplete = document.getElementById("endgame-cratercomplete").value.toLowerCase();
	endgame_crater = document.getElementById("endgame-crater").value.toLowerCase();

	var count = 0;
	if(endgame_latch.length != 0){
		if(endgame_latch != 'y' && endgame_latch != 'n')
			document.getElementById("endscoreE").innerHTML = "End Game: Latching? must be 'y' or 'n'";
		count++;
	}
	if(endgame_cratercomplete.length != 0){
		if(endgame_cratercomplete != 'y' && endgame_cratercomplete != 'n')
			document.getElementById("endscoreE").innerHTML = "End Game: Robot Completely in Crater? must be 'y' or 'n'";
		count++;
	}
	if(endgame_crater.length != 0){
		if(endgame_crater != 'y' && endgame_crater != 'n')
			document.getElementById("endscoreE").innerHTML = "End Game: Robot in Crater? must be 'y' or 'n'";count++;
		count++;
	}

	if(count > 1){
		document.getElementById("endscoreE").innerHTML = "End Game robot can only either latch, be completely in crater, or be in crater (not completely).";
		return 0;
	}
	else{
		var score = 0;

		if(endgame_latch == 'y') score += 50;
		if(endgame_cratercomplete == 'y') score += 25;
		if(endgame_crater == 'y') score += 15;
		
		if(Number.isNaN(endgame_mindepot) == false) score += endgame_mindepot*2;
		if(Number.isNaN(endgame_mincargo) == false) score += endgame_mincargo*5;
		document.getElementById("endscore").value = score;
		document.getElementById("endscoreE").innerHTML = "";
		return score;
	}
}

function calculate()
{
	var score = autoscore() + driverscore() + endscore();
	document.getElementById("total").value = score;
}