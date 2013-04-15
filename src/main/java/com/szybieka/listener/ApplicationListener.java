package com.szybieka.listener;

import javax.naming.*;
import javax.servlet.*;
import javax.sql.DataSource;

import com.szybieka.service.DBInitializer;

public class ApplicationListener implements ServletContextListener  {

	/**
	 * В методе инициируется запуск скрипта создания таблицы приложения и 
	 * заполнения ее данными. 
	 * Также загружается класс HibernateUtil для последующей работы c Hibernate.
	 * @param sce объект ServletContextEvent 
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
			// загрузка класса HibernateUtil
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
