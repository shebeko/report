<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<script src="static/js/jquery-1.9.1.js"></script>
	<script src="static/js/date.js"></script>
	<script src="static/js/periodCalculation.js"></script>
	<script src="static/js/main.js"></script>
	<link rel="stylesheet" href="static/css/main.css">
	<title>Reports</title>
</head>
<body>
	<form name="reportsQueryForm">
		Start date: <input type="text" name="startDate" size="12" maxlength="12"/> <br/>
		End date: <input type="text" name="endDate" size="12" maxlength="12"/> <br/>
		Performer: 
		<select name="performer">
			<option value="">All Performers</option>
			<c:forEach var="performer" items="${performers}">
				<option value="${performer}">${performer}</option> 
			</c:forEach>	
		</select> <br/>
		Time Period: 
		<select name="timePeriod">
			<option value=""></option>
			<option value="Last Qtr">Last Qtr</option>
			<option value="Last Month">Last Month</option>
			<option value="Last Calendar Year">Last Calendar Year</option>
			<option value="Current Year to Date">Current Year to Date</option>
			<option value="Current Qtr to Date">Current Qtr to Date</option>
			<option value="Current Month to Date">Current Month to Date</option>
		</select> <br/>
		<input type="button" name="ajaxButton" value="Search"/>
	</form>
	<div id="error"></div>
	<div id="message"></div>
	<table id="reportsTable" border="1">
		<tr id="-1">
			<th>Performer</th>
			<th>Start date</th>
			<th>End date</th>
			<th style="width: 400px">Activity</th>
		</tr>
	</table>
</body>
</html>