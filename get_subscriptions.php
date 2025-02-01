<?php
header('Content-Type: application/json');
require 'config.php';

$query = "SELECT * FROM subscriptions";
$stmt = $conn->prepare($query);
$stmt->execute();
$subscriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($subscriptions);
?>
