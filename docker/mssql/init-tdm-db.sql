DROP DATABASE IF EXISTS tdm_development;
DROP DATABASE IF EXISTS tdm_test;

DROP USER IF EXISTS tdm_development;
DROP USER IF EXISTS tdm_test;

CREATE DATABASE tdm_development;
CREATE DATABASE tdm_test;

CREATE USER 'tdm_development'@'%' IDENTIFIED BY 'tdm_development';
CREATE USER 'tdm_test'@'%' IDENTIFIED BY 'tdm_test';
CREATE USER IF NOT EXISTS 'root'@'%';

GRANT ALL ON tdm_development.* TO 'tdm_development'@'%' WITH GRANT OPTION;
GRANT ALL ON tdm_test.* TO 'tdm_test'@'%' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'root'@'%' WITH GRANT OPTION;

SET GLOBAL time_zone = "+00:00";

FLUSH PRIVILEGES;