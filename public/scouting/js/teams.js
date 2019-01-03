var data = document.getElementById('match');
var str = "<table id='datatable'><tr><th>Rank</th><th>Team</th><th>Total Score</th><th>Auto Score</th><th>Driver Score</th><th>Endgame Score</th><th>Notes</th></tr>";
var arr = [];
var priorNotes = "";

function getMatch(matchnumber,alliance){
	var http = new XMLHttpRequest();
	var url = '/';
	var params = 'matchnumber='+matchnumber+'&alliance='+alliance;
	http.open('POST', url, false);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.send(params);
	if(http.responseText == 'Data not found.' || http.responseText == 'All fields required.'){
		return 1;
	}
	else{
		var s = http.responseText;
		var t1 = s.indexOf("teamnumber");
		var teamnumber = s.substring(t1+13,s.indexOf(",",t1)-1);
		var t2 = s.indexOf("teamname");
		var teamname = s.substring(t2+11,s.indexOf(",",t2)-1);
		var t3 = s.indexOf("autoscore");
		var autoscore = s.substring(t3+12,s.indexOf(",",t3)-1);
		var t4 = s.indexOf("driverscore");
		var driverscore = s.substring(t4+14,s.indexOf(",",t4)-1);
		var t5 = s.indexOf("endscore");
		var endscore = s.substring(t5+11,s.indexOf(",",t5)-1);
		var t6 = s.indexOf("totalscore");
		var totalscore = s.substring(t6+13,s.indexOf(",",t6)-1);
		var t7 = s.indexOf("notes");
		var notes = s.substring(t7+8,s.length-10).toLowerCase();
		if(notes.length > 70){
			for(var i = 0; i+70 <= notes.length; i += 70){
				notes = notes.substring(i,i+70) + "<br>" + notes.substring(i+70,notes.length);
			}
		}

		if(typeof arr.find(x => x.teamnumber === teamnumber) === 'undefined'){
			var team = {
				"teamnumber": teamnumber,
				"teamname": teamname,
				"autoscore": autoscore,
				"driverscore": driverscore,
				"endscore": endscore,
				"totalscore": totalscore,
				"notes": notes,
				"count": 1
			}
			arr.push(team);
			priorNotes = notes;
		} else{
			var index = arr.findIndex(x => x.teamnumber === teamnumber);
			arr[index]["autoscore"] = (parseInt(arr[index]["autoscore"]) + parseInt(autoscore)).toString();
			arr[index]["driverscore"] = (parseInt(arr[index]["driverscore"]) + parseInt(driverscore)).toString();
			arr[index]["endscore"] = (parseInt(arr[index]["endscore"]) + parseInt(endscore)).toString();
			arr[index]["totalscore"] = (parseInt(arr[index]["totalscore"]) + parseInt(totalscore)).toString();
			if(priorNotes.length > 0) arr[index]["notes"] += "<br>"+notes;
			else arr[index]["notes"] += notes;
			priorNotes = notes;
			arr[index]["count"]++;
		}
		return 0;
	}
}

function compare(a, b) {
   if (parseInt(a["totalscore"]) < parseInt(b["totalscore"])) return 1;
   if (parseInt(a["totalscore"]) > parseInt(b["totalscore"])) return -1;
   return 0;
}

for(var i = 1; i < 300; i++){
	var exit = 0;
	var n = getMatch(i,'r1');
	exit += n;
	n = getMatch(i,'r2');
	exit += n;
	n = getMatch(i,'b1');
	exit += n;
	n = getMatch(i,'b2');
	exit += n;
	if(exit == 4) break;
}

for(var i = 0; i < arr.length; i++){
	arr[i]["autoscore"] = (Math.round(parseInt(arr[i]["autoscore"])/parseInt(arr[i]["count"])*10)/10).toString();
	arr[i]["driverscore"] = (Math.round(parseInt(arr[i]["driverscore"])/parseInt(arr[i]["count"])*10)/10).toString();
	arr[i]["endscore"] = (Math.round(parseInt(arr[i]["endscore"])/parseInt(arr[i]["count"])*10)/10).toString();
	arr[i]["totalscore"] = (Math.round(parseInt(arr[i]["totalscore"])/parseInt(arr[i]["count"])*10)/10).toString();
}
arr.sort(compare);
for(var i = 0; i < arr.length; i++){
	if(i < 4){
		str += "<tr><th>"+(i+1)+"</th><th style='background-color:yellow'>"+arr[i]["teamnumber"]+": "+arr[i]["teamname"]+"</th><th>"+arr[i]["totalscore"]+"</th><th>"+arr[i]["autoscore"]+"</th><th>"+arr[i]["driverscore"]+"</th><th>"+arr[i]["endscore"]+"</th><th>"+arr[i]["notes"]+"</th></tr>";
	} else{
		str += "<tr><th>"+(i+1)+"</th><th>"+arr[i]["teamnumber"]+": "+arr[i]["teamname"]+"</th><th>"+arr[i]["totalscore"]+"</th><th>"+arr[i]["autoscore"]+"</th><th>"+arr[i]["driverscore"]+"</th><th>"+arr[i]["endscore"]+"</th><th>"+arr[i]["notes"]+"</th></tr>";
	}
}
str += "</table>";
data.innerHTML = str;