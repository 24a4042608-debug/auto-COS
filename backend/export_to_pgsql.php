<?php
// Ensure this script can bootstrap Laravel
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$tables = [
    'tenants',
    'users',
    'categories',
    'brands',
    'suppliers',
    'assets',
    'products',
    'product_assets',
    'product_variants'
];

$sql = "-- PostgreSQL Data Export for ACOS\n";
$sql .= "BEGIN;\n\n";

// Disable foreign key constraints temporarily during insertion
$sql .= "SET CONSTRAINTS ALL DEFERRED;\n\n";

foreach ($tables as $table) {
    if (!Schema::hasTable($table)) {
        continue;
    }
    
    $rows = DB::table($table)->get();
    if ($rows->isEmpty()) {
        continue;
    }
    
    $sql .= "-- Data for table: {$table}\n";
    
    // Get columns
    $firstRow = (array)$rows[0];
    $columns = array_keys($firstRow);
    $columnsList = implode(', ', array_map(fn($c) => "\"{$c}\"", $columns));
    
    foreach ($rows as $row) {
        $values = [];
        foreach ($columns as $column) {
            $val = $row->$column;
            if (is_null($val)) {
                $values[] = 'NULL';
            } elseif (str_starts_with($column, 'is_') || str_starts_with($column, 'has_') || $column === 'pivot_is_primary') {
                $values[] = $val ? 'true' : 'false';
            } elseif (is_bool($val)) {
                $values[] = $val ? 'true' : 'false';
            } elseif (is_numeric($val) && !is_string($val)) {
                // If it is integer or float, output as raw number
                $values[] = $val;
            } else {
                // Escape single quotes for PostgreSQL standard
                $escaped = str_replace("'", "''", $val);
                $values[] = "'{$escaped}'";
            }
        }
        $valuesList = implode(', ', $values);
        $sql .= "INSERT INTO \"{$table}\" ({$columnsList}) VALUES ({$valuesList}) ON CONFLICT DO NOTHING;\n";
    }
    
    // Reset PostgreSQL auto-increment sequences so future database inserts won't conflict
    if (in_array('id', $columns)) {
        $sql .= "SELECT setval(pg_get_serial_sequence('\"{$table}\"', 'id'), coalesce(max(id), 1)) FROM \"{$table}\";\n";
    }
    $sql .= "\n";
}

$sql .= "COMMIT;\n";

file_put_contents(__DIR__ . '/export_postgres.sql', $sql);
echo "Exported successfully to export_postgres.sql!\n";
