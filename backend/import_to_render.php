<?php
// PHP Script to import local SQL dump to Render PostgreSQL database

// 1. Bạn hãy copy "External Database URL" trên Render (bắt đầu bằng postgres://...) và dán vào đây:
$external_db_url = 'postgresql://acos_db_user:54fmc4EX89FnAWWfV5ssbKQTm5NWC68b@dpg-d91tkkpo3t8c73elu9ng-a.oregon-postgres.render.com/acos_db'; 

echo "Dang phan tich thong tin ket noi...\n";
$dbopts = parse_url($external_db_url);

if (!$dbopts || !isset($dbopts["host"])) {
    die("Loi: Dinh dang URL Database khong hop le!\n");
}

$host = $dbopts["host"];
$port = isset($dbopts["port"]) ? $dbopts["port"] : 5432;
$user = $dbopts["user"];
$pass = $dbopts["pass"];
$db = ltrim($dbopts["path"], '/');

try {
    echo "Dang ket noi toi Render Database...\n";
    $dsn = "pgsql:host=$host;port=$port;dbname=$db;sslmode=require";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "Ket noi thanh cong!\n";

    echo "Dang doc file export_postgres.sql...\n";
    $sql_file = __DIR__ . '/export_postgres.sql';
    if (!file_exists($sql_file)) {
        die("Loi: Khong tim thay file export_postgres.sql!\n");
    }
    
    $sql = file_get_contents($sql_file);

    echo "Dang thuc thi cac cau lenh SQL de nhap du lieu (nay co the mat vai giay)...\n";
    $pdo->exec($sql);
    
    echo "Chuc mung! Du lieu da duoc import vao Render Database thanh cong 100%!\n";
} catch (PDOException $e) {
    die("Loi ket noi hoac thuc thi SQL: " . $e->getMessage() . "\n");
}
