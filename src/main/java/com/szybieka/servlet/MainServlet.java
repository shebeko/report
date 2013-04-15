package com.szybieka.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.szybieka.service.ReportService;

/**
 * 
 * —ервлет, который готовит данные дл€ отображени€ на стартовой странице приложени€
 *
 */
public class MainServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		// получаем список всех значений performer из Ѕƒ
		List<String> performers = ReportService.getPerformers();
		// задаем в качестве аттрибута запроса список performers
		// дл€ отображени€ в выпадающем списке
		request.setAttribute("performers", performers);
		RequestDispatcher view = request.getRequestDispatcher("WEB-INF/views/main.jsp");
		view.forward(request, response);
	}
}
