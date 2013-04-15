package com.szybieka.servlet;

import com.szybieka.service.ReportService;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.szybieka.domain.Report;

/**
 * 
 * Сервлет, который формирует списки Report-ов, соответствующих 
 * параметрам запроса startDate, endDate, performer.
 * Списки передаются как массив JSON в ответ на асинхронный Ajax-запрос.
 *
 */
public class AjaxServlet extends HttpServlet {
	
	// Формат, в котором будут отображатся даты периода отчетов
	private static final String JSON_DATE_FORMAT = "dd-MMM-yyyy";
		
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM, Locale.US);
		Date startDate = null;
		Date endDate = null;
		try {
			if (request.getParameter("startDate") != "") {
				startDate = df.parse(request.getParameter("startDate"));
			}
			if (request.getParameter("endDate") != "") {
				endDate = df.parse(request.getParameter("endDate"));
			}
		} catch (ParseException pe) {
			throw new ServletException(pe.getMessage());
		}
		String performer = request.getParameter("performer");
		// получаем список отчетов по полученным параметрам запроса
		List<Report> reports = ReportService.getReportsByQueryParams(startDate, endDate, performer);
		// формируем JSON объект и записываем его в поток response
		Gson gson = new GsonBuilder().setDateFormat(JSON_DATE_FORMAT).create();
		String json = gson.toJson(reports);
		response.setContentType("application/json");
		response.getWriter().print(json);
	}
}
