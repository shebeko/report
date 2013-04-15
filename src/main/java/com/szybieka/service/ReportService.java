package com.szybieka.service;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.szybieka.domain.Report;

/**
 * Сервисный класс для запросов по классу {@link Report}
 *
 */
public class ReportService {
	
	/** 
	 * @return все возможные значения performer объектов Report, сохраненных в БД
	 */
	@SuppressWarnings("unchecked")
	public static List<String> getPerformers() {
		List<String> performers = null;
		try  {
	          Session session = HibernateUtil.getSessionFactory().openSession();
	          session.beginTransaction();
	          String SQL_QUERY ="select performer from Report";
	          performers = session.createQuery(SQL_QUERY).list();
	          // автоматически закрываем сессию
	          session.getTransaction().commit();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}	
		return performers;
	}
	
	/**
	 * Метод ищет в БД те объекты Report, период которых [start_date, end_date]
	 * находится в внутри периода [startDate, endDate]
	 * @param startDate начало периода отчета. 
	 * 			Ищутся те объекты Report, поле которых start_date >= startDate.
	 * 			В случае null параметр игнорируется,
	 * @param endDate конец периода отчета.
	 * 			Ищутся те объекты Report, поле которых end_date <= endDate. 
	 * 			В случае null параметр игнорируется
	 * @param performer создатель отчета, в случае пустой строки параметр игнорируется
	 * @return список объектов Report, соответствующих startDate, endDate, performer
	 */
	@SuppressWarnings("unchecked")
	public static List<Report> getReportsByQueryParams(Date startDate, Date endDate, String performer) {
		List<Report> reports = null;
		try  {
	          Session session = HibernateUtil.getSessionFactory().openSession();
	          session.beginTransaction();
	          // строим запрос с учетом того,
	          // переданы ли параметры startDate, endDate, performer (они могут быть null)
	          Criteria criteria = session.createCriteria(Report.class);
	          if (startDate != null)
	        	  criteria.add(Restrictions.ge("startDate", startDate));
	          if (endDate != null)
	        	  criteria.add(Restrictions.le("endDate", endDate));
	          if (!performer.isEmpty()) {
	        	  criteria.add(Restrictions.eq("performer", performer));
	          }
	          reports = criteria.list();
	          // автоматически закрываем сессию
	          session.getTransaction().commit();          
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		return reports;
	}
}
