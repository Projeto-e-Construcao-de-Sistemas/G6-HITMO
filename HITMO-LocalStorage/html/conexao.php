<?php

/*$dbHost = 'Localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'usuarios-academia';*/

define('HOST', 'Localhost');
define('USUARIO', 'root');
define('SENHA', '');
define('DB', 'usuarios-academia');

$conexao = mysqli_connect()(HOST, USUARIO, SENHA, DB) or die ('Errou burro');