var data = document.getElementById('match');
var str = "<table id='datatable'><tr><th>Match Number</th><th bgcolor='#EF3125'>Red 1</th><th bgcolor='#EF3125'>Red 2</th><th bgcolor='#1E59E0'>Blue 1</th><th bgcolor='#1E59E0'>Blue 2</th></tr>";
var arr = [];

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
		var t2 = s.indexOf("teamname");
		var t3 = s.indexOf("totalscore");
		arr.push({
			"table": s.substring(t1+13,s.indexOf(",",t1)-1)+' ('+s.substring(t2+11,s.indexOf(",",t2)-1)+'): '+s.substring(t3+13,s.indexOf(",",t3)-1),
			"totalscore": parseInt(s.substring(t3+13,s.indexOf(",",t3)-1))});
		return 0;
	}
}

for(var i = 1; i < 300; i++){
	var exit = 0;
	str += '<tr><th>'+i+'</th>';
	var n = getMatch(i,'r1');
	if(n == 1) arr.push({"table": "", "totalscore": 0});
	exit += n;
	n = getMatch(i,'r2');
	if(n == 1) arr.push({"table": "", "totalscore": 0});
	exit += n;
	n = getMatch(i,'b1');
	if(n == 1) arr.push({"table": "", "totalscore": 0});
	exit += n;
	n = getMatch(i,'b2');
	if(n == 1) arr.push({"table": "", "totalscore": 0});
	exit += n;

	var red = arr[0]["totalscore"]+arr[1]["totalscore"];
	var blue = arr[2]["totalscore"]+arr[3]["totalscore"];
	if(red > blue){
		str += "<th bgcolor='yellow'>"+arr[0]["table"]+"</th><th bgcolor='yellow'>"+arr[1]["table"]+"</th><th>"+arr[2]["table"]+"</th><th>"+arr[3]["table"]+"</th>";
	} else if(blue > red){
		str += "<th>"+arr[0]["table"]+"</th><th>"+arr[1]["table"]+"</th><th bgcolor='yellow'>"+arr[2]["table"]+"</th><th bgcolor='yellow'>"+arr[3]["table"]+"</th>";
	} else{
		str += "<th>"+arr[0]["table"]+"</th><th>"+arr[1]["table"]+"</th><th>"+arr[2]["table"]+"</th><th>"+arr[3]["table"]+"</th>";
	}

	str += '</tr>';
	arr = [];
	if(exit == 4) break;
}
str += "</table>";
data.innerHTML = str;