package com.szybieka.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * Domain-класс, представл€ющий сущность ќтчет (Report)
 *
 */
public class Report implements Serializable {
	private Long id;
	private Date startDate;
	private Date endDate;
	private String performer;
	private String activity;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getStartDate() {
		return startDate;
	}
	
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	public Date getEndDate() {
		return endDate;
	}
	
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	public String getPerformer() {
		return performer;
	}
	
	public void setPerformer(String performer) {
		this.performer = performer;
	}
	
	public String getActivity() {
		return activity;
	}
	
	public void setActivity(String activity) {
		this.activity = activity;
	}
}
