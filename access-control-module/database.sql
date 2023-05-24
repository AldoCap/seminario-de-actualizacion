-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sakila` ;
USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`group_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`group_data` (
  `id_data_users` INT(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `isActive` VARCHAR(45) NULL,
  PRIMARY KEY (`id_data_users`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`users` (
  `id_users` INT(20) NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(50) NOT NULL,
  `password` VARCHAR(45) NULL,
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
  `role` TINYINT(1) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`id_data_users`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`group` (
  `id_data_users` INT(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_data_users`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`group_data_has_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`group_data_has_group` (
  `group_data_id_data_users` INT(20) NOT NULL,
  `group_id_data_users` INT(20) NOT NULL,
  PRIMARY KEY (`group_data_id_data_users`, `group_id_data_users`),
  INDEX `fk_group_data_has_group_group1_idx` (`group_id_data_users` ASC),
  INDEX `fk_group_data_has_group_group_data1_idx` (`group_data_id_data_users` ASC),
  CONSTRAINT `fk_group_data_has_group_group_data1`
    FOREIGN KEY (`group_data_id_data_users`)
    REFERENCES `sakila`.`group_data` (`id_data_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_data_has_group_group1`
    FOREIGN KEY (`group_id_data_users`)
    REFERENCES `sakila`.`group` (`id_data_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`users_has_data_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`users_has_data_users` (
  `users_id_users` INT(20) NOT NULL,
  `data_users_copy1_id_data_users` INT(20) NOT NULL,
  PRIMARY KEY (`users_id_users`, `data_users_copy1_id_data_users`),
  INDEX `fk_users_has_data_users_copy1_data_users_copy11_idx` (`data_users_copy1_id_data_users` ASC),
  INDEX `fk_users_has_data_users_copy1_users1_idx` (`users_id_users` ASC),
  CONSTRAINT `fk_users_has_data_users_copy1_users1`
    FOREIGN KEY (`users_id_users`)
    REFERENCES `sakila`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_data_users_copy1_data_users_copy11`
    FOREIGN KEY (`data_users_copy1_id_data_users`)
    REFERENCES `sakila`.`data_users` (`id_data_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
