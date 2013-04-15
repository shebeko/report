/**
 * 
 * Функции для вычисления периода.
 * Возвращают литерал объекта с полями startDate, endDate.
 * 
 */
function calculateLastQtrPeriod(currentDate) {
	var period = {};
	// номер текущего квартала (0-3)
	var currentQtrNumber = Math.floor(((currentDate.getMonth())/3)); 
	// дата начала текущего квартала
	var currentQtrStartDate = new Date(currentDate.getFullYear(), currentQtrNumber*3);
	// начальная дата искомого периода
	period.startDate = new Date(currentQtrStartDate.getFullYear(), currentQtrStartDate.getMonth() - 3);
	// конечная дата искомого периода
	period.endDate = new Date();
	period.endDate.setTime(currentQtrStartDate.getTime() - 1);
	
	return period;
}

function calculateLastMonthPeriod(currentDate) {
	var period = {};
	period.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
	period.endDate = new Date(((new Date(currentDate.getFullYear(), currentDate.getMonth())).getTime()) - 1);
	
	return period;
}

function calculateLastYearPeriod(currentDate) {
	var period = {};
	var currentYear = currentDate.getFullYear();
	period.startDate = new Date(currentYear - 1, 0);
	period.endDate = new Date(((new Date(currentYear, 0).getTime())- 1));
	
	return period;
}


function calculateCurrentYearToDate(currentDate) {
	var period = {};
	period.startDate = new Date(currentDate.getFullYear(), 0);
	period.endDate = currentDate;
	
	return period;
}

function calculateMonthToDate(currentDate) {
	var period = {};
	period.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());
	period.endDate = currentDate;
	
	return period;
}

function calculateQtrToDate(currentDate) {
	var period = {};
	// номер текущего квартала (0-3)
	var currentQtrNumber = Math.floor(((currentDate.getMonth())/3)); 
	// дата начала текущего квартала
	var currentQtrStartDate = new Date(currentDate.getFullYear(), currentQtrNumber*3);
	period.startDate = currentQtrStartDate;
	period.endDate = currentDate;
	
	return period;
}