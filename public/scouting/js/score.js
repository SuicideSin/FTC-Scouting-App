function autoscore()
{
	auto_land = document.getElementById("auto-land").checked;
	auto_sampling = document.getElementById("auto-sampling").checked;
	auto_teammarker = document.getElementById("auto-teammarker").checked;
	auto_park = document.getElementById("auto-park").checked;
	auto_mincargo = document.getElementById("auto-mincargo").value;
	auto_mindepot = document.getElementById("auto-mindepot").value;
	
	var score = 0;
	if(auto_land) score += 30;
	if(auto_sampling) score += 25;
	if(auto_teammarker) score += 15;
	if(auto_park) score += 10;
	score += auto_mindepot*2;
	score += auto_mincargo*5;
	document.getElementById("autoscore").value = score;
	return score;
}

function driverscore()
{
	driver_mincargo = document.getElementById("driver-mincargo").value;
	driver_mindepot = document.getElementById("driver-mindepot").value;
	var score = 0;
	score += driver_mindepot*2;
	score += driver_mincargo*5;
	document.getElementById("driverscore").value = score;
	return score;
}

function endscore()
{
	endgame_mincargo = document.getElementById("endgame-mincargo").value;
	endgame_mindepot = document.getElementById("endgame-mindepot").value;
	endgame_latch = document.getElementById("endgame-latch").checked;
	endgame_cratercomplete = document.getElementById("endgame-cratercomplete").checked;
	endgame_crater = document.getElementById("endgame-crater").checked;

	var count = 0;
	if(endgame_latch) count++;
	if(endgame_cratercomplete) count++;
	if(endgame_crater) count++;
	if(count > 1){
		document.getElementById("endscoreE").innerHTML = "End Game robot can only either latch, be completely in crater, or be in crater (not completely).";
		return 0;
	}
	else{
		var score = 0;
		if(endgame_latch) score += 50;
		if(endgame_cratercomplete) score += 25;
		if(endgame_crater) score += 15;
		score += endgame_mindepot*2;
		score += endgame_mincargo*5;
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