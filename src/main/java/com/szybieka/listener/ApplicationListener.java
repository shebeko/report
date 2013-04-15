package com.szybieka.listener;

import javax.naming.*;
import javax.servlet.*;
import javax.sql.DataSource;

import com.szybieka.service.DBInitializer;

public class ApplicationListener implements ServletContextListener  {

	/**
	 * � ������ ������������ ������ ������� �������� ������� ���������� � 
	 * ���������� �� �������. 
	 * ����� ����������� ����� HibernateUtil ��� ����������� ������ c Hibernate.
	 * @param sce ������ ServletContextEvent 
	 */
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext sc = sce.getServletContext();
		DataSource pool;
		Context env = null;
		try {
			env = (Context)new InitialContext().lookup("java:comp/env");
			pool = (DataSource)env.lookup("jdbc/mysql-test");
			if (pool == null) {
				throw new RuntimeException("'mysql-test' is an unknown DataSource");
			}
			// �������� ������ HibernateUtil
			 Class.forName("com.szybieka.service.HibernateUtil").newInstance();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		DBInitializer initializer = new DBInitializer(pool);
		String script = sc.getRealPath("/") + sc.getInitParameter("initScript");
		initializer.initDB(script);
	}
	
	public void contextDestroyed(ServletContextEvent sce) {
		
	}
}
