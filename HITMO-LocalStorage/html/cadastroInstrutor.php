<?php
include('verificaLogin.php');
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style-area.css">
    <title>Cadastro de Instrutores</title>
</head>
<body>

    <div id="barra-nav">
        <ul>
            <li><img src="../img/icone-barra.png" alt="logo">
            <li><a href="instrutores.html">Instrutores</a>
            <li id="sair"><a href="logoff.php">Logoff</a>
        </ul>
    </div>

    <div id = "container">
        <h1><Img src="/img/funcionario1-removebg-preview.png"></Img></h1>
        <form id="registrar-form-instrutores">
            <div class="box-conteiner-instrutores">

                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" placeholder="Nome">

                <label for="cpf">CPF:</label>
                <input type="text" name="cpf" id="cpf" placeholder="CPF">

                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" placeholder="E-mail">

                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" placeholder="Senha">

                <label for="passwordConfirma">Confirmação de senha:</label>
                <input type="password" name="passwordConfirma" id="passwordConfirma" placeholder="Confirmação de senha">

            </div>
            <input type="submit" id="btn-submit" value="Registrar">
        </form>
    </div>
    <p class="msg-erro template">Texto teste</p>

    <script src="../js/script.js"></script>
</body>
</html>