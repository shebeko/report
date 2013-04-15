package com.szybieka.service;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.szybieka.domain.Report;

/**
 * ��������� ����� ��� �������� �� ������ {@link Report}
 *
 */
public class ReportService {
	
	/** 
	 * @return ��� ��������� �������� performer �������� Report, ����������� � ��
	 */
	@SuppressWarnings("unchecked")
	public static List<String> getPerformers() {
		List<String> performers = null;
		try  {
	          Session session = HibernateUtil.getSessionFactory().openSession();
	          session.beginTransaction();
	          String SQL_QUERY ="select performer from Report";
	          performers = session.createQuery(SQL_QUERY).list();
	          // ������������� ��������� ������
	          session.getTransaction().commit();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}	
		return performers;
	}
	
	/**
	 * ����� ���� � �� �� ������� Report, ������ ������� [start_date, end_date]
	 * ��������� � ������ ������� [startDate, endDate]
	 * @param startDate ������ ������� ������. 
	 * 			������ �� ������� Report, ���� ������� start_date >= startDate.
	 * 			� ������ null �������� ������������,
	 * @param endDate ����� ������� ������.
	 * 			������ �� ������� Report, ���� ������� end_date <= endDate. 
	 * 			� ������ null �������� ������������
	 * @param performer ��������� ������, � ������ ������ ������ �������� ������������
	 * @return ������ �������� Report, ��������������� startDate, endDate, performer
	 */
	@SuppressWarnings("unchecked")
	public static List<Report> getReportsByQueryParams(Date startDate, Date endDate, String performer) {
		List<Report> reports = null;
		try  {
	          Session session = HibernateUtil.getSessionFactory().openSession();
	          session.beginTransaction();
	          // ������ ������ � ������ ����,
	          // �������� �� ��������� startDate, endDate, performer (��� ����� ���� null)
	          Criteria criteria = session.createCriteria(Report.class);
	          if (startDate != null)
	        	  criteria.add(Restrictions.ge("startDate", startDate));
	          if (endDate != null)
	        	  criteria.add(Restrictions.le("endDate", endDate));
	          if (!performer.isEmpty()) {
	        	  criteria.add(Restrictions.eq("performer", performer));
	          }
	          reports = criteria.list();
	          // ������������� ��������� ������
	          session.getTransaction().commit();          
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		return reports;
	}
}
