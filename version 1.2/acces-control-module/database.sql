SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

delimiter $$
CREATE DATABASE IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */
$$
delimiter ;

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- -----------------------------------------------------
-- Create Tables
-- -----------------------------------------------------
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nick_name` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(55) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idusuarios_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `nick_name_UNIQUE` (`nick_name` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idgroup_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`user_group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`user_has_group` (
  `id_user` INT NOT NULL ,
  `id_group` INT NOT NULL ,
  PRIMARY KEY (`id_user`, `id_group`) ,
  INDEX `id-user_idx` (`id_user` ASC) ,
  INDEX `id-group_idx` (`id_group` ASC) ,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) ,
  CONSTRAINT `id-user`
    FOREIGN KEY (`id_user` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id-group`
    FOREIGN KEY (`id_group` )
    REFERENCES `mydb`.`group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`data`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`data` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(55) NULL DEFAULT NULL ,
  `surname` VARCHAR(55) NULL DEFAULT NULL ,
  `NID` INT NULL ,
  `email` VARCHAR(255) NULL ,
  `phone` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `iddata_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) ,
  UNIQUE INDEX `NID_UNIQUE` (`NID` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_data`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`user_data` (
  `id_user` INT NOT NULL ,
  `id_data` INT NOT NULL ,
  PRIMARY KEY (`id_user`, `id_data`) ,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) ,
  UNIQUE INDEX `id_data_UNIQUE` (`id_data` ASC) ,
  CONSTRAINT `id-user_idx`
    FOREIGN KEY (`id_user` )
    REFERENCES `mydb`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id-data`
    FOREIGN KEY (`id_data` )
    REFERENCES `mydb`.`data` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`access`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`access` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(255) NOT NULL ,
  `path` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idacces_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) ,
  UNIQUE INDEX `path_UNIQUE` (`path` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`group_access`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`group_access` (
  `id_group` INT NOT NULL ,
  `id_access` INT NOT NULL ,
  PRIMARY KEY (`id_group`, `id_access`) ,
  CONSTRAINT `id-group_idx`
    FOREIGN KEY (`id_group` )
    REFERENCES `mydb`.`group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-access`
    FOREIGN KEY (`id_access` )
    REFERENCES `mydb`.`access` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mydb` ;


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------
-- PROCEDIMIENTOS ALMACENADOS
-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------

-- -----------------------------------------------------
-- procedure mp_CreateGroup
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_CreateGroup`(IN groupName VARCHAR(45))
BEGIN
	INSERT INTO `group` (`name`) VALUES (groupName);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure mp_CreateUser
-- -----------------------------------------------------

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_CreateUser`(IN userNickName VARCHAR(45), userPassword VARCHAR(55), userName VARCHAR(55), userSurname VARCHAR(55), userNID INT, userEmail VARCHAR(255), userPhone VARCHAR(45))
BEGIN
	DECLARE aux_user_id INT;
	DECLARE aux_data_id INT;
	DECLARE aux_result_code INT;
	DECLARE aux_result_message TEXT;
	DECLARE aux_result_json VARCHAR(500);

	INSERT INTO `user` (`nick_name`,`password`)
    VALUES (userNickName, userPassword);
	SET aux_user_id = LAST_INSERT_ID();

	-- comprobamos si se creo bien el usuario
	IF aux_user_id > 0 THEN
		INSERT INTO `data`(`name`,`surname`,`NID`,`email`,`phone`)
		VALUES (userName, userSurname, userNID, userEmail, userPhone);
		SET aux_data_id = LAST_INSERT_ID();
	
		-- comprobamos si se inserta bien la data 
		IF aux_data_id > 0 THEN
			INSERT INTO `user_data` (`id_user`, `id_data`)
			VALUES (aux_user_id, aux_data_id);
		
			INSERT INTO `user_has_group` (`id_user`, `id_group`)
			VALUES (aux_user_id, 2);

			SET aux_result_code = 1;
			SET aux_result_message = "usuario creado correctamente";
		
		ELSE
			SET aux_result_code = 2;
			SET aux_result_message = "error al insertar la data del usuario";
		END IF;

	ELSE
		SET aux_result_code = 3;
		SET aux_result_message = "error al crear usuario (nickName repetido)";
	END IF;
	
  -- devuelve un JSON con status y message, status=1 creado correctamente
	SET aux_result_json = CONCAT('{ "status": ', aux_result_code, ', "message": ', aux_result_message, ', "id": ', aux_user_id, ' }');
  SELECT aux_result_json AS result;

END$$

DELIMITER ;
-- -----------------------------------------------------
-- procedure mp_GetAllGroups
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_GetAllGroups`()
BEGIN
	SELECT `name` from `group` ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure mp_GetAllUsers
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_GetAllUsers`()
BEGIN
    SELECT `nick_name` from `user` ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure mp_GetDataUserByNickName
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_GetDataUserByNickName`(IN NickName VARCHAR(45))
BEGIN
	SELECT `name`,`surname`,`NID`,`email`,`phone` 
	FROM data
	LEFT JOIN user_data ON data.id = user_data.id_data
	LEFT JOIN user ON user_data.id_user = user.id
	WHERE user.nick_name = NickName;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure mp_ValidateUser
-- -----------------------------------------------------

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mp_ValidateUser`(IN nickName VARCHAR(45), userPassword VARCHAR(55))
BEGIN
	DECLARE aux_idUser INT;
	DECLARE aux_validated BOOLEAN;
	DECLARE aux_result_json VARCHAR(1000);

	SELECT `id`, `password`= userPassword INTO aux_idUser, aux_validated  FROM `user` WHERE nick_name=nickName;

-- devuelve un JSON con un buleano y el id del usuario si el boolean es true
	SET aux_result_json = CONCAT('{ "validated": ', aux_validated, ', "iduser": ', IF(aux_validated, aux_iduser, 'null'), ' }');
  SELECT aux_result_json AS result;

END

DELIMITER ;

-- -----------------------------------------------------
-- -----------------------------------------------------
-- Insert Default
-- -----------------------------------------------------
-- -----------------------------------------------------


INSERT INTO `mydb`.`group`(`name`)
VALUES ("admin"),("guest"); 
-- id:1 , id:2

INSERT INTO `mydb`.`user` (`nick_name`,`password`)
VALUES ("aldo", "aldo1234");

INSERT INTO `mydb`.`user_has_group` (`id_user`,`id_group`)
VALUES (1,1);

INSERT INTO `mydb`.`data` (`name`,`surname`,`NID`,`email`,`phone`)
VALUES ("Aldo capurro","aldo",26008013,"ac.capurro@gmail.com",2236121091);

INSERT INTO `mydb`.`user_data` (`id_user`,`id_data`)
VALUES (1,1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
