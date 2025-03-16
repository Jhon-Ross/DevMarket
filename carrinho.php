<?php
session_start();
include 'config.php';

if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

$acao = $_GET['acao'] ?? '';
$id = $_GET['id'] ?? 0;

if ($acao == 'add' && $id > 0) {
    if (isset($_SESSION['carrinho'][$id])) {
        $_SESSION['carrinho'][$id]++;
    } else {
        $_SESSION['carrinho'][$id] = 1;
    }
}

// Aqui você pode adicionar mais ações como 'remover', 'atualizar', etc.

header('Location: index.php');
exit;
?>