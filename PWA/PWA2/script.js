var timeIn, timeInms, timeOut, timeOutms, timeParked, timeParkedms;
//var row;
var plateNumberCell, timeInCell, timeOutCell;
var parkingChargeCell = 35;

var pnArr = [];
var pcArr = [];


//loading service worker file
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('SW registered');
    });
}

function getTimeParked(){
	//timeIn = new Date("March 31, 2018 01:25:10");
	//timeInms = timeIn.getTime(timeIn);
	//timeOut = new Date("March 31, 2018 04:25:18");	
	//timeOutms = timeOut.getTime(timeOut);

	var diff = timeOutms - timeInms;
	var seconds = 1000;
	var minutes = seconds*60;
	var hours = minutes*60;
	
	//Compute Parking Charge
	if (diff < (2000*60*60)){
		//console.log(parkingChargeCell.innerHTML);
		parkingChargeCell.innerHTML = 35;
		parkingChargeCell.innerHTML;
		pcArr.unshift(parkingChargeCell.innerHTML);
	}  else if (diff > (2000*60*60) && diff < (3000*60*60)) {
		parkingChargeCell.innerHTML = 45;
		parkingChargeCell.innerHTML;
	}else if (diff > (3000*60*60) && diff < (4000*60*60)) {
		parkingChargeCell.innerHTML = 55;
		parkingChargeCell.innerHTML;
	} else if (diff > (4000*60*60) && diff < (5000*60*60)) {
		parkingChargeCell.innerHTML = 65;
		parkingChargeCell.innerHTML;
	} else if (diff > (5000*60*60) && diff < (6000*60*60)) {
		parkingChargeCell.innerHTML = 75;
		parkingChargeCell.innerHTML;
	} else if (diff > (6000*60*60) && diff < (7000*60*60)) {
		parkingChargeCell.innerHTML = 85;
		parkingChargeCell.innerHTML;
	} else if (diff > (7000*60*60) && diff < (8000*60*60)) {
		parkingChargeCell.innerHTML = 95;
		parkingChargeCell.innerHTML;
	} else if (diff > (8000*60*60) && diff < (9000*60*60)) {
		parkingChargeCell.innerHTML = 105;
		parkingChargeCell.innerHTML;
	} else if (diff > (9000*60*60) && diff < (10000*60*60)) {
		parkingChargeCell.innerHTML = 115;
		parkingChargeCell.innerHTML;
	} else if (diff > (10000*60*60) && diff < (11000*60*60)) {
		parkingChargeCell.innerHTML = 125;
		parkingChargeCell.innerHTML;
	} else if (diff > (11000*60*60) && diff < (12000*60*60)) {
		parkingChargeCell.innerHTML = 135;
		parkingChargeCell.innerHTML;
	}
}

function getTimeIn() {
	timeIn = new Date();
	timeInms= timeIn.getTime(timeIn);
	var table = document.getElementById("Parking-Table");
	var row = table.insertRow(1);
	
	//insert row cells
	var plateNumberCell = row.insertCell(0);
	plateNumberCell.style.textAlign = 'center';
	pnArr.unshift(plateNumberCell.innerHTML);
	var timeInCell = row.insertCell(1);
	timeInCell.style.textAlign = 'center';
	var timeOutCell = row.insertCell(2);
	timeOutCell.style.textAlign = 'center';
	
	//insert row values
	plateNumberCell.innerHTML = document.getElementById("Enter-Plate-Number").value;
	timeInCell.innerHTML = formatNum(timeIn.getHours()) +":" + formatNum(timeIn.getMinutes()) +":" + formatNum(timeIn.getSeconds());
	
	var btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.setAttribute('name', 'ewan');
	btn.setAttribute('value', ' Time Out ');
	btn.onclick = function() {
		getTimeOut();
		getTimeParked();
		getTotalAmount();
		var table = document.getElementById("Parking-Table");
	}
	timeOutCell.appendChild(btn);
}

function getTimeOut() {
    timeOut = new Date();
	timeOutms= timeOut.getTime(timeOut);
    var t = formatNum(timeOut.getHours()) +":" + formatNum(timeOut.getMinutes()) +":" + formatNum(timeOut.getSeconds());
	
	var table = document.getElementById("Recent-Table");
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
	//insert row cells
	var plateNumberCell = row.insertCell(0);
	plateNumberCell.style.textAlign = 'center';
	var timeInCell = row.insertCell(1);
	timeInCell.style.textAlign = 'center';
	var timeOutCell = row.insertCell(2);
	timeOutCell.style.textAlign = 'center';
	parkingChargeCell = row.insertCell(3);
	parkingChargeCell.style.textAlign = 'center';
	
	//insert row values
	plateNumberCell.innerHTML = plateNumberCell;
	timeInCell.innerHTML = formatNum(timeIn.getHours()) +":" + formatNum(timeIn.getMinutes()) +":" + formatNum(timeIn.getSeconds());
	timeOutCell.innerHTML = t;
}

function getNumberOfCars() {
	var numCar = pnArr.length;
	document.getElementById("totalNumberOfCars").innerHTML = numCar;
}

function getTotalAmount() {
	var totalAmount = 0;
	var i;
	for(i=0; i<pcArr.length;i++){
		totalAmount = totalAmount + parseInt(pcArr[i]);
	}
	document.getElementById("totalAmount").innerHTML = totalAmount;
}	

function formatNum(num){
	if((num+"").length == 1){
		return "0"+num;
	}else{
		return num;
	}	
}


//Summary
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var date = new Date();
var dateToday = month[date.getMonth()] +" "+ date.getDate() +", "+ date.getFullYear();
//var document.getElementById("getDateToday").innerHTML = dateToday;

function displayCalendar(){
	var htmlContent ="";
	var FebNumberOfDays ="";
	var counter = 1;
	var dateNow = new Date();
	var month = dateNow.getMonth();
	var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
	var prevMonth = month -1;
	var day = dateNow.getDate();
	var year = dateNow.getFullYear();
	//Determining if February (28,or 29)
	if (month == 1){
		if ( (year%100!=0) && (year%4==0) || (year%400==0)){
			FebNumberOfDays = 29;
		}else{
			FebNumberOfDays = 28;
		}
	}
	// names of months and week days.
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
	var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
	var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"]
	// days in previous month and next one , and day of week.
	var nextDate = new Date(nextMonth +' 1 ,'+year);
	var weekdays= nextDate.getDay();
	var weekdays2 = weekdays
	var numOfDays = dayPerMonth[month];
	// this leave a white space for days of pervious month.
	while (weekdays>0){
		htmlContent += "<td class='monthPre'></td>";
		// used in next loop.
		weekdays--;
	}
	// loop to build the calander body.
	while (counter <= numOfDays){
	// When to start new line.
	if (weekdays2 > 6){
		weekdays2 = 0;
		htmlContent += "</tr><tr>";
	}
	// if counter is current day.
	// highlight current day using the CSS defined in header.
	if (counter == day){
		htmlContent +="<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' "+"onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>"+counter+"</td>";
	}else{
		htmlContent +="<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'"+" onMouseOut='this.style.background=\"#FFFFFF\"'>"+counter+"</td>";    
	}
	weekdays2++;
	counter++;
	}
	// building the calendar html body.
	var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'>"+monthNames[month]+" "+ year +"</th></tr>";
	calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+"<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
	calendarBody += "<tr>";
	calendarBody += htmlContent;
	calendarBody += "</tr></table>";
	// set the content of div .
	document.getElementById("calendar").innerHTML=calendarBody;
}