package com.szybieka.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import javax.sql.DataSource;

public class DBInitializer {
	
	private DataSource pool;
	
	public DBInitializer(DataSource pool) {
		this.pool = pool;
	}
	
	/**
	 * ����� ��������� SQL-������ �� ����� � ������ fileName,
	 * ������ � ��������� ���
	 * @param fileName ��� �����-�������
	 */
	public void initDB(String fileName) {
		BufferedReader br = null;
		StringBuilder text = null;
		try {
			br =  new BufferedReader(new FileReader(fileName));
			String line = "";
			text = new StringBuilder();
			while ((line = br.readLine()) != null) {
				text = text.append(line);
			}
		} catch (FileNotFoundException fnfex) {
			System.err.println("File not found: " + fileName);
		} catch (IOException ioex) {
		}
		String[] queries = text.toString().split(";");
		executeQueries(queries);
	}
	
	// ����� ��������� ������� queries
	private void executeQueries(String[] queries) {
		Connection conn = null;
		Statement stmt = null;
		try {
			// �������� ���������� �� ���� ����������
			conn = pool.getConnection();
			stmt = conn.createStatement();
			for (String query : queries) {
				stmt.execute(query);
			}
		} catch(Exception e) {
		} finally {
			try {
				if (stmt != null) {
					stmt.close();
				}
				// ��������� ���������� � ���
				if (conn != null) {
					conn.close();
				}
			} catch(SQLException sqlex) {
			}
		}
	}
}
