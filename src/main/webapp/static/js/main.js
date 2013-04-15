$(function() {
	$("select[name=timePeriod]").bind("click", updateDates);
	$("input[name=ajaxButton]").bind("click", validate);
	$("#reportsTable").hide();
});

/**
 * Функция заполняет поля startDate, endDate в соответствии с выбранным периодом
 */
function updateDates(event) {
	// Формат, в котором отображаются startDate и endDate
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
 * Функция проверяет на корректность заполненные поля startDate и endDate.
 * Поля должны являться валидными датами, быть указанными в формате DATE_FORMAT,
 * дата startDate не должна быть позже endDate.
 * Если поля валидны, вызывается функция makeAjaxRequest(),
 * в противном случае выводятся сообщения об ошибках.
 */
function validate(event) {
	var DATE_FORMAT = 'MMM dd, yyyy';
	var invalidDateFields = new Array(); // массив имен полей невалидных дат 
	var formatErrorFields = new Array(); // массив имен валидных дат, не подходящих под формат DATE_FORMAT
	
	// проверяем поля дат startDate и endDate
	var startDate = _validateDateField("startDate", invalidDateFields, formatErrorFields, DATE_FORMAT);
	var endDate = _validateDateField("endDate", invalidDateFields, formatErrorFields, DATE_FORMAT);
	
	if (invalidDateFields.length !== 0) {
		// даты не валидны
		showErrors(invalidDateFields, 'The following date fields are not valid:');
		return;
	}
	
	if (formatErrorFields.length !== 0) {
		// даты валидны, но не соответствуют формату DATE_FORMAT
		showErrors(formatErrorFields, 'The following date fields have incorrect format:');
		return;
	}
	
	// startDate не должна быть позже endDate
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
 * Функция инициирует Ajax-запрос на сервер для получения списка отчетов,
 * соответствующих передаваемым параметрам запроса (startDate, endDate, performer)
 * Если получен хотя бы один отчет, результат отображается в таблице,
 * в противном случае отображается сообщение о неудачном поиске.
 */
function makeAjaxRequest(event) {	
	var startDate = $("input[name=startDate]").val();
	var endDate = $("input[name=endDate]").val();
	var performer = $("select[name=performer]").val();
	$.get('get', {'startDate': startDate, 'endDate': endDate, 'performer': performer}, function(data) {
			// очищаем таблицу с результатами предыдущего запроса
			$("#reportsTable tr:has(td)").remove();
			// заполняем таблицу новыми данными
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
 * Вспомогательная функция
 */
function _hideSearchBottom() {
	$("#reportsTable").hide();
	$("#message").html("");	
}

/**
 * Вспомогательная фукнция, которая проверяет поле с именем fieldName
 * на валидность и соответствие формату dateFormat
 * @param fieldName имя поля даты
 * @param invalidDateFields массив ошибок валидации, в который добавляется поле fieldName
 * 			при невалидности
 * @param formatErrorFields массив ошибок нарушения формата, в который добавляется поле fieldName
 * 			при нарушении формата dateFormat
 * @param dateFormat требуемый формат, в котором должно отображаться поле fieldName
 * 
 * @returns цифровое значение поля fieldName
 */
function _validateDateField(fieldName, invalidDateFields, formatErrorFields, dateFormat) {
	var date;
	if ($("input[name=" + fieldName + "]").val() !== '') {
		// поле заполнено, поэтому проверяем его
		date = Date._parse($("input[name=" + fieldName + "]").val());
		// проверяем дату на валидность
		if (isNaN(date)) {
			// дата не валидна
			invalidDateFields.push(fieldName);
		}  else {
			// дата валидна, проверяем на соответствие даты формату dateFormat
			var formattedDate = new Date(date).toString(dateFormat);
			if (formattedDate !== $("input[name=" + fieldName + "]").val()) {
				// дата не соответствует формату dateFormat
				formatErrorFields.push(fieldName);
			}	
		}
	}
	return date;
}

/**
 * Функция отображает сообщение об ошибке для полей, указанных в массиве errorArray  
 * @param errorArray массив с именами полей, которые содержать ошибки
 * @param message сообщение об ошибке
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