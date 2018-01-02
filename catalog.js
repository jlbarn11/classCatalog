// Jessica Barnett

"use strict";
var $ = function(id) { return document.getElementById(id); };

//global array to hold all classes
var classes = [];

// Adds a course to the table/memory
var addCourse = function(){
	var singleClass = [];
	//take in user input
	var name = $("className").value;
	var number = $("classNumber").value;
	var startDate = $("startDate").value;
	var length = $("classLength").value;
	var days = $("weekday").value;
	var time = $("classTime").value;
	var description = $("classDesc").value;

	//validate
	if(validateCourse(name, number, startDate, length, days, time, description)){

		//add the valid course to an array
		classes.push(name);
		localStorage.classes = classes.join("|");
		classes.push(number);
		localStorage.classes = classes.join("|");
		classes.push(startDate);
		localStorage.classes = classes.join("|");
		classes.push(length);
		localStorage.classes = classes.join("|");
		classes.push(days);
		localStorage.classes = classes.join("|");
		classes.push(time);
		localStorage.classes = classes.join("|");
		classes.push(description);
		localStorage.classes = classes.join("|");

		//add class to table if valid
		var table = $("tbl");
		var tbody = table.tBodies[0];
		var row = tbody.insertRow(-1);
		var textNode = document.createTextNode(name);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(number);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(startDate);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(length);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(days);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(time);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);
		textNode = document.createTextNode(description);
		var cellNode = row.insertCell(-1);
		cellNode.appendChild(textNode);

		clearForm();
		$("className").focus();
	}
};

//pulls classes saved in memory and populates the table with them
var displayCourses = function(){
    // if there are no classes in classes array, check storage
    if (classes.length === 0) {
        // get tasks from storage or empty string if nothing in storage
        var storage = localStorage.getItem("classes") || "";

        // if not empty, convert to array and store in global tasks variable
        if (storage.length > 0) { classes = storage.split("|"); }
    }

    // display classes in table
    var table = $("tbl");
	var tbody = table.tBodies[0];
  	var counter = 0;
  	while(counter < classes.length){
  		if((classes.length % 7) == 0){
  			var row = tbody.insertRow(-1);
  			for (var i = 0; i < 7; i++) {
	    	var textNode = document.createTextNode(classes[counter]);
			var cellNode = row.insertCell(-1);
			cellNode.appendChild(textNode);
			counter++;
			}
  		}
  	}

    $("className").focus();
};

// Checks to see whether a course has all fields filled in
var validateCourse = function(name, number, startDate, length, days, time, description){
	var isValid = false;
	var now = new Date();
	var date = convertDate(startDate);
	now.setHours(0,0,0,0);
	date.setHours(0,0,0,0);
	if (name === "") {
        alert("Please enter a course name.");
        return false;
    }else if (number === "") {
        alert("Please enter a course number.");
         return false;
    }else if (startDate === "") {
        alert("Please enter a course start date after the current date.");
         return false;
    }else if(!(dateCompare(date, now))){
    	alert("Please enter a course start date after the current date.");
         return false;
    }else if (length === "") {
        alert("Please enter the number of weeks the course will last.");
         return false;
    }else if (days === "") {
        alert("Please enter the days of the week the course will meet.");
         return false;
    }else if (time === "") {
        alert("Please enter the meeting time of the course.");
         return false;
    }else if (description === "") {
        alert("Please enter a course description.");
         return false;
    }
    return true;
};

//takes the string date and converts to a form the js date understands
var convertDate = function(startDate){
	var month;
	var day;
	var year;
	month = startDate.substr(0,2);
	day = startDate.substr(3,2);
	year = startDate.substr(6,2);

	var fullYear = "20" + year; 
	var newDate = new Date(fullYear, month, day);
	return newDate;
};

//compares today with the date entered to see if the class starts after today
var dateCompare = function(date1, date2){
	if(date1.getFullYear() < date2.getFullYear()){
		return false;
	}else if(date1.getFullYear() > date2.getFullYear()){
		return true;
	}else{
		if(date1.getMonth() < date2.getMonth()){
			return false;
		}else if(date1.getDate() < date2.getDate()){
			return false;
		}
	}
};

// Clears values from form 
var clearForm = function(){
	$("classCatalog").reset();
};

//onload event handler that attaches functions to the buttons
window.onload = function() {
    $("add").onclick = addCourse;
    $("clear").onclick = clearForm;
    $("className").focus();
    displayCourses();
};