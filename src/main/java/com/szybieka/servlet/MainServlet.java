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
 * �������, ������� ������� ������ ��� ����������� �� ��������� �������� ����������
 *
 */
public class MainServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		// �������� ������ ���� �������� performer �� ��
		List<String> performers = ReportService.getPerformers();
		// ������ � �������� ��������� ������� ������ performers
		// ��� ����������� � ���������� ������
		request.setAttribute("performers", performers);
		RequestDispatcher view = request.getRequestDispatcher("WEB-INF/views/main.jsp");
		view.forward(request, response);
	}
}
