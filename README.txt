������ ������ �������� �������� "��������� ������� �� JSP"

������������ ����������:

HTML, CSS, JavaScript(+jQuery) - �� ���������� �������
JSP, Servlet, Hibernate - �� ��������� �������
������������ ���� - MySQL
Build tool - Maven

��� ������� ���������� ��� Tomcat (��������� �� 7-�� ������) �����
� ����� conf/context.xml �������� ��������� ��������:

 <Resource name="jdbc/mysql-test" auth="Container"
	      type="javax.sql.DataSource"
	      url="jdbc:mysql://localhost:3306/test"
	      driverClassName="com.mysql.jdbc.Driver"
	      username=""
	      password=""
	      maxActive="20" maxIdle="10"
	      description="MySQL version 5.5.28"/>	

		  
� ������� username � password � ���� ������ MySQL.