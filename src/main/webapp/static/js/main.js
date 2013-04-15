$(function() {
	$("select[name=timePeriod]").bind("click", updateDates);
	$("input[name=ajaxButton]").bind("click", validate);
	$("#reportsTable").hide();
});

/**
 * ������� ��������� ���� startDate, endDate � ������������ � ��������� ��������
 */
function updateDates(event) {
	// ������, � ������� ������������ startDate � endDate
	var DATE_FORMAT = 'MMM dd, yyyy';
	var currentDate = new Date();
	var period;
	var selected = $("select[name=timePeriod]").val();
	switch (selected) {
		case "Last Qtr" :
				period = calculateLastQtrPeriod(currentDate);
				break;
		case "Last Month" :
			 	period = calculateLastMonthPeriod(currentDate);
				break;
		case "Last Calendar Year" :
				period =  calculateLastYearPeriod(currentDate);
				break;
		case "Current Year to Date" :
				period = calculateCurrentYearToDate(currentDate);
				break;
		case "Current Qtr to Date" :
				period = calculateMonthToDate(currentDate);
				break;
		case "Current Month to Date" :
				period = calculateQtrToDate(currentDate);
				break;
		default:
				clearDateFields();
				return;
	}
	$("input[name=startDate]").val(period.startDate.toString(DATE_FORMAT));
	$("input[name=endDate]").val(period.endDate.toString(DATE_FORMAT));
}

function clearDateFields() {
	$("input[name=startDate]").val('');
	$("input[name=endDate]").val('');
}

/**
 * ������� ��������� �� ������������ ����������� ���� startDate � endDate.
 * ���� ������ �������� ��������� ������, ���� ���������� � ������� DATE_FORMAT,
 * ���� startDate �� ������ ���� ����� endDate.
 * ���� ���� �������, ���������� ������� makeAjaxRequest(),
 * � ��������� ������ ��������� ��������� �� �������.
 */
function validate(event) {
	var DATE_FORMAT = 'MMM dd, yyyy';
	var invalidDateFields = new Array(); // ������ ���� ����� ���������� ��� 
	var formatErrorFields = new Array(); // ������ ���� �������� ���, �� ���������� ��� ������ DATE_FORMAT
	
	// ��������� ���� ��� startDate � endDate
	var startDate = _validateDateField("startDate", invalidDateFields, formatErrorFields, DATE_FORMAT);
	var endDate = _validateDateField("endDate", invalidDateFields, formatErrorFields, DATE_FORMAT);
	
	if (invalidDateFields.length !== 0) {
		// ���� �� �������
		showErrors(invalidDateFields, 'The following date fields are not valid:');
		return;
	}
	
	if (formatErrorFields.length !== 0) {
		// ���� �������, �� �� ������������� ������� DATE_FORMAT
		showErrors(formatErrorFields, 'The following date fields have incorrect format:');
		return;
	}
	
	// startDate �� ������ ���� ����� endDate
	if (($("input[name=startDate]").val() !== '') && ($("input[name=endDate]").val() !== '')) {
		if (startDate > endDate) {
			$("#error").html("Start date cannot be after end date");
			_hideSearchBottom();
			return;
		}
	}
	$("#error").html("");
	makeAjaxRequest(event);
}

/**
 * ������� ���������� Ajax-������ �� ������ ��� ��������� ������ �������,
 * ��������������� ������������ ���������� ������� (startDate, endDate, performer)
 * ���� ������� ���� �� ���� �����, ��������� ������������ � �������,
 * � ��������� ������ ������������ ��������� � ��������� ������.
 */
function makeAjaxRequest(event) {	
	var startDate = $("input[name=startDate]").val();
	var endDate = $("input[name=endDate]").val();
	var performer = $("select[name=performer]").val();
	$.get('get', {'startDate': startDate, 'endDate': endDate, 'performer': performer}, function(data) {
			// ������� ������� � ������������ ����������� �������
			$("#reportsTable tr:has(td)").remove();
			// ��������� ������� ������ �������
			for (var i = 0; i < data.length; i++) {
				var sDate = data[i].startDate;
				var eDate = data[i].endDate;
				var performer = data[i].performer;
				var activity = data[i].activity;
				var st = "<tr id='" + i + "'><td>" + performer +  
				"</td>" +
				"<td>" + sDate + "</td>" +
				"<td>" + eDate + "</td>" +
				"<td>" + activity + "</td>" +
				"</tr>";
				$(st).insertAfter("#"+(i-1));
				
			}
			if (data.length == 0) {
				$("#message").html("No report results");	
				$("#reportsTable").hide();
			} else {
				$("#message").html("");
				$("#reportsTable").show();
			}
		});
}

/**
 * ��������������� �������
 */
function _hideSearchBottom() {
	$("#reportsTable").hide();
	$("#message").html("");	
}

/**
 * ��������������� �������, ������� ��������� ���� � ������ fieldName
 * �� ���������� � ������������ ������� dateFormat
 * @param fieldName ��� ���� ����
 * @param invalidDateFields ������ ������ ���������, � ������� ����������� ���� fieldName
 * 			��� ������������
 * @param formatErrorFields ������ ������ ��������� �������, � ������� ����������� ���� fieldName
 * 			��� ��������� ������� dateFormat
 * @param dateFormat ��������� ������, � ������� ������ ������������ ���� fieldName
 * 
 * @returns �������� �������� ���� fieldName
 */
function _validateDateField(fieldName, invalidDateFields, formatErrorFields, dateFormat) {
	var date;
	if ($("input[name=" + fieldName + "]").val() !== '') {
		// ���� ���������, ������� ��������� ���
		date = Date._parse($("input[name=" + fieldName + "]").val());
		// ��������� ���� �� ����������
		if (isNaN(date)) {
			// ���� �� �������
			invalidDateFields.push(fieldName);
		}  else {
			// ���� �������, ��������� �� ������������ ���� ������� dateFormat
			var formattedDate = new Date(date).toString(dateFormat);
			if (formattedDate !== $("input[name=" + fieldName + "]").val()) {
				// ���� �� ������������� ������� dateFormat
				formatErrorFields.push(fieldName);
			}	
		}
	}
	return date;
}

/**
 * ������� ���������� ��������� �� ������ ��� �����, ��������� � ������� errorArray  
 * @param errorArray ������ � ������� �����, ������� ��������� ������
 * @param message ��������� �� ������
 */
function showErrors(errorArray, message) {
	if (errorArray.length !== 0) {
		$("#error").html(message + "<br/> <ul>");
		for (var i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li><br/>").appendTo("#error");
		}
		$("</ul>").appendTo("#error");
		_hideSearchBottom();
	}
}