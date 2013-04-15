Данный проект является решением "Тестового задания по JSP"

Используемые технологии:

HTML, CSS, JavaScript(+jQuery) - на клиентской стороне
JSP, Servlet, Hibernate - на серверной стороне
Используемая СУБД - MySQL
Build tool - Maven

Для запуска приложения под Tomcat (проверено на 7-ой версии) нужно
в файле conf/context.xml добавить следующий фрагмент:

 <Resource name="jdbc/mysql-test" auth="Container"
	      type="javax.sql.DataSource"
	      url="jdbc:mysql://localhost:3306/test"
	      driverClassName="com.mysql.jdbc.Driver"
	      username=""
	      password=""
	      maxActive="20" maxIdle="10"
	      description="MySQL version 5.5.28"/>	

		  
и указать username и password к базе данных MySQL.