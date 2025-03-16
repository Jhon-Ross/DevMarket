<?php
include 'config.php';

$stmt = $pdo->query('SELECT * FROM produtos');
$produtos = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Loja Online</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Produtos</h1>
    <div class="produtos">
        <?php foreach ($produtos as $produto): ?>
            <div class="produto">
                <h2><?php echo htmlspecialchars($produto['nome']); ?></h2>
                <p><?php echo htmlspecialchars($produto['descricao']); ?></p>
                <p>R$ <?php echo htmlspecialchars($produto['preco']); ?></p>
                <a href="produto.php?id=<?php echo $produto['id']; ?>">Ver Detalhes</a>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>