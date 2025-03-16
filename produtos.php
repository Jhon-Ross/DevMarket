<?php
include 'config.php';

$id = $_GET['id'];
$stmt = $pdo->prepare('SELECT * FROM produtos WHERE id = ?');
$stmt->execute([$id]);
$produto = $stmt->fetch();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($produto['nome']); ?></title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1><?php echo htmlspecialchars($produto['nome']); ?></h1>
    <p><?php echo htmlspecialchars($produto['descricao']); ?></p>
    <p>R$ <?php echo htmlspecialchars($produto['preco']); ?></p>
    <a href="carrinho.php?acao=add&id=<?php echo $produto['id']; ?>">Adicionar ao Carrinho</a>
</body>
</html>