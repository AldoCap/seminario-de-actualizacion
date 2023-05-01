SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


CREATE SCHEMA IF NOT EXISTS `sakila` ;
USE `sakila` ;

CREATE TABLE IF NOT EXISTS `sakila`.`users` (
  `id_users` INT(20) NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE INDEX `id_users_UNIQUE` (`id_users` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`data_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`data_users` (
  `id_data_users` INT(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `dni` INT(6) NOT NULL,
  `id_users` INT(20) NULL,
  `student` TINYINT(1) NOT NULL,
  `teacher` TINYINT(1) NOT NULL,
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
  INDEX `id_users_idx` (`id_users` ASC),
  PRIMARY KEY (`id_data_users`),
  CONSTRAINT `id_users`
    FOREIGN KEY (`id_users`)
    REFERENCES `sakila`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`passwords`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`passwords` (
  `id_pass` INT(20) NOT NULL,
  `password_users` VARCHAR(45) NULL,
  `passwordscol` INT(20) NOT NULL,
  PRIMARY KEY (`id_pass`),
  UNIQUE INDEX `password_users_UNIQUE` (`password_users` ASC),
  CONSTRAINT `Id_data_users`
    FOREIGN KEY (`id_pass`)
    REFERENCES `sakila`.`data_users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
