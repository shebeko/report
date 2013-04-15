DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS reports (
	id INTEGER NOT NULL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    performer VARCHAR(80),
    activity VARCHAR(255)	
);

INSERT INTO reports VALUES ('1', '2013-03-25', '2013-04-01', 'sales manager', 'bargaining');
INSERT INTO reports VALUES ('2', '2013-04-01', '2013-04-05', 'analyst', 'creating requirements specification');
INSERT INTO reports VALUES ('3', '2013-04-06', '2013-04-17', 'developer', 'developing software');
INSERT INTO reports VALUES ('4', '2013-04-15', '2013-04-17', 'tester', 'testing software');
INSERT INTO reports VALUES ('5', '2013-04-17', '2013-04-17', 'technical director', 'signing');


