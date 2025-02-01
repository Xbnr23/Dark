<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$phone = $data['phone'];
$amount = $data['amount'];
$startDate = $data['startDate'];
$endDate = date('Y-m-d', strtotime($startDate . ' + 30 days')); // احتساب تاريخ النهاية

$query = "INSERT INTO subscriptions (name, phone, amount, startDate, endDate, status) 
          VALUES (:name, :phone, :amount, :startDate, :endDate, 'active')";
$stmt = $conn->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':phone', $phone);
$stmt->bindParam(':amount', $amount);
$stmt->bindParam(':startDate', $startDate);
$stmt->bindParam(':endDate', $endDate);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'تمت إضافة الاشتراك بنجاح']);
} else {
    echo json_encode(['success' => false, 'message' => 'فشل في إضافة الاشتراك']);
}
?>
