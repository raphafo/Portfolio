<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON envoyées
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérification des champs
    if (empty($data['nom']) || empty($data['email']) || empty($data['message'])) {
        echo json_encode([
            'type' => 'danger',
            'message' => 'Tous les champs sont obligatoires.'
        ]);
        exit;
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'type' => 'danger',
            'message' => 'Email invalide.'
        ]);
        exit;
    }

    // Traitement des données (ex: insertion en base de données)
    try {
        // Connexion à la base de données
        $pdo = new PDO('mysql:host=localhost;dbname=portfolio', 'root', '');
        $stmt = $pdo->prepare("INSERT INTO contactez (nom, email, message) VALUES (?, ?, ?)");
        $stmt->execute([$data['nom'], $data['email'], $data['message']]);

        // Réponse de succès
        echo json_encode([
            'type' => 'success',
            'message' => 'Message envoyé avec succès !'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'type' => 'danger',
            'message' => 'Erreur lors de l\'enregistrement dans la base de données.'
        ]);
    }
} else {
    echo json_encode([
        'type' => 'danger',
        'message' => 'Méthode non autorisée.'
    ]);
}
?>

