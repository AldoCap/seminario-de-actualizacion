<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$dbname = "handleruser";
$username = "root";
$password = "root";

/*
  SELECT * FROM users WHERE id=1 OR 1=1 
  Con esta instruccion de puedo 
  retornar todos los registros de la tabla users.
*/
/* 
  Se puede usar consultas preparadas 
  o parametrizadas, que separan la estructura de la consulta de los valores 
  de los parámetros, evitando así que se interpreten como parte de la consulta
  $sql = "SELECT * FROM users WHERE id=?";
  */
  
  try 
  {
    // Crear una nueva instancia de conexión a la base de datos
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener el ID del usuario a través del método GET
    $usuario_id = json_decode(file_get_contents('php://input'));
  
    // Preparar una consulta con un marcador de posición para el parámetro
    $sql = "SELECT * FROM users WHERE id=?";
  
    // Preparar la sentencia SQL
    $stmt = $connection->prepare($sql);
  
    // Vincular el parámetro con el valor recibido por GET
    $stmt->bindParam(1, $usuario_id, PDO::PARAM_INT);
  
    // Ejecutar la sentencia SQL
    $stmt->execute();
  
    // Obtener los resultados
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
    // Cerrar la conexión a la base de datos
    $connection = null;
  
    // Devolver los resultados en formato JSON
    header('Content-Type: application/json');
    echo json_encode($results);
   
  } catch (PDOException $e) 
  {
    echo "Error: " . $e->getMessage();
  }
  ?>
 