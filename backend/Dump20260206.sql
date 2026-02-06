-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: moduleproject2_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendancedID` int NOT NULL AUTO_INCREMENT,
  `attendanceDate` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `employeeId` int NOT NULL,
  PRIMARY KEY (`attendancedID`),
  KEY `EmployeeID_idx` (`employeeId`),
  CONSTRAINT `A.employeeID` FOREIGN KEY (`employeeId`) REFERENCES `employeeinformation` (`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2025-07-25','Present',1),(2,'2025-07-26','Absent',1),(3,'2025-07-27','Present',1),(4,'2025-07-28','Present',1),(5,'2025-07-29','Present',1),(6,'2025-07-25','Present',2),(7,'2025-07-26','Present',2),(8,'2025-07-27','Absent',2),(9,'2025-07-28','Present',2),(10,'2025-07-29','Present',2),(11,'2025-07-25','Present',3),(12,'2025-07-26','Present',3),(13,'2025-07-27','Present',3),(14,'2025-07-28','Absent',3),(15,'2025-07-29','Present',3),(16,'2025-07-25','Absent',4),(17,'2025-07-26','Present',4),(18,'2025-07-27','Present',4),(19,'2025-07-28','Present',4),(20,'2025-07-29','Present',4),(21,'2025-07-25','Present',5),(22,'2025-07-26','Present',5),(23,'2025-07-27','Absent',5),(24,'2025-07-28','Present',5),(25,'2025-07-29','Present',5),(26,'2025-07-25','Present',6),(27,'2025-07-26','Present',6),(28,'2025-07-27','Absent',6),(29,'2025-07-28','Present',6),(30,'2025-07-29','Present',6),(31,'2025-07-25','Present',7),(32,'2025-07-26','Present',7),(33,'2025-07-27','Present',7),(34,'2025-07-28','Absent',7),(35,'2025-07-29','Present',7),(36,'2025-07-25','Present',8),(37,'2025-07-26','Absent',8),(38,'2025-07-27','Present',8),(39,'2025-07-28','Present',8),(40,'2025-07-29','Present',8),(41,'2025-07-25','Present',9),(42,'2025-07-26','Present',9),(43,'2025-07-27','Present',9),(44,'2025-07-28','Absent',9),(45,'2025-07-29','Present',9),(46,'2025-07-25','Present',10),(47,'2025-07-26','Present',10),(48,'2025-07-27','Absent',10),(49,'2025-07-28','Present',10),(50,'2025-07-29','Present',10);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeeinformation`
--

DROP TABLE IF EXISTS `employeeinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeinformation` (
  `employeeId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `employmentHistory` text NOT NULL,
  `contact` varchar(150) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`employeeId`),
  UNIQUE KEY `contact` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeinformation`
--

LOCK TABLES `employeeinformation` WRITE;
/*!40000 ALTER TABLE `employeeinformation` DISABLE KEYS */;
INSERT INTO `employeeinformation` VALUES (1,'Sibongile Nkosi','Software Engineer','Development',70000.00,'Joined in 2015, promoted to Senior in 2018','sibongile.nkosi@moderntech.com','Sibongile.jpg'),(2,'Lungile Moyo','HR Manager','HR',80000.00,'Joined in 2013, promoted to Manager in 2017','lungile.moyo@moderntech.com','Lungile.jpg'),(3,'Thabo Molefe','Quality Analyst','QA',55000.00,'Joined in 2018','thabo.molefe@moderntech.com','Thabo.jpg'),(4,'Keshav Naidoo','Sales Representative','Sales',60000.00,'Joined in 2020','keshav.naidoo@moderntech.com','Keshav.jpg'),(5,'Zanele Khumalo','Marketing Specialist','Marketing',58000.00,'Joined in 2019','zanele.khumalo@moderntech.com','Zanele.jpg'),(6,'Sipho Zulu','UI/UX Designer','Design',65000.00,'Joined in 2016','sipho.zulu@moderntech.com','Sipho.jpg'),(7,'Naledi Moeketsi','DevOps Engineer','IT',72000.00,'Joined in 2017','naledi.moeketsi@moderntech.com','Naledi.jpg'),(8,'Farai Gumbo','Content Strategist','Marketing',56000.00,'Joined in 2021','farai.gumbo@moderntech.com','Farai.jpg'),(9,'Karabo Dlamini','Accountant','Finance',62000.00,'Joined in 2018','karabo.dlamini@moderntech.com','Karabo.jpg'),(10,'Fatima Patel','Customer Support Lead','Support',58000.00,'Joined in 2016','fatima.patel@moderntech.com','Fatima.jpg');
/*!40000 ALTER TABLE `employeeinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaverequests`
--

DROP TABLE IF EXISTS `leaverequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequests` (
  `leaveRequests_ID` int NOT NULL AUTO_INCREMENT,
  `leaveDate` date NOT NULL,
  `reason` varchar(45) NOT NULL,
  `leaveStatus` varchar(45) NOT NULL,
  `employeeId` int NOT NULL,
  PRIMARY KEY (`leaveRequests_ID`),
  KEY `L.employeeId_idx` (`employeeId`),
  CONSTRAINT `L.employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employeeinformation` (`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequests`
--

LOCK TABLES `leaverequests` WRITE;
/*!40000 ALTER TABLE `leaverequests` DISABLE KEYS */;
INSERT INTO `leaverequests` VALUES (1,'2025-07-22','Sick Leave','Approved',1),(2,'2024-12-01','Personal','Denied',1),(3,'2025-07-15','Family Responsibility','Denied',2),(4,'2024-12-02','Vacation','Approved',2),(5,'2025-07-10','Medical Appointment','Approved',3),(6,'2024-12-05','Personal','Denied',3),(7,'2025-07-20','Bereavement','Approved',4),(8,'2024-12-01','Childcare','Denied',5),(9,'2025-07-18','Sick Leave','Approved',6),(10,'2025-07-22','Vacation','Denied',7),(11,'2024-12-02','Medical Appointment','Approved',8),(12,'2025-07-19','Childcare','Denied',9),(13,'2024-12-03','Vacation','Denied',10),(14,'2026-02-06','leave','Approved',1),(15,'2026-02-06','leave','Pending',1),(16,'2026-02-06','leave','Pending',1);
/*!40000 ALTER TABLE `leaverequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `payroll_Id` int NOT NULL AUTO_INCREMENT,
  `hoursWorked` int NOT NULL,
  `leaveDeductions` int NOT NULL,
  `finalSalary` decimal(10,2) NOT NULL,
  `employeeId` int NOT NULL,
  PRIMARY KEY (`payroll_Id`),
  KEY `pFK_employee_idx` (`employeeId`),
  CONSTRAINT `pr.employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employeeinformation` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
INSERT INTO `payroll` VALUES (1,160,8,69500.00,1),(2,150,10,79000.00,2),(3,170,4,54800.00,3),(4,165,6,59700.00,4),(5,158,5,57850.00,5),(6,168,2,64800.00,6),(7,175,3,71800.00,7),(8,160,0,56000.00,8),(9,155,5,61500.00,9),(10,162,4,57750.00,10);
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-06 12:33:06
