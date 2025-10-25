<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

// Optional: ?type=about / contact / faq
$type = strtolower($_GET["type"] ?? "about");

try {
    // Check if "appinfo" table exists
    $checkTable = $conn->query("SELECT to_regclass('public.appinfo') AS exists_table");
    $tableExists = $checkTable->fetch(PDO::FETCH_ASSOC)["exists_table"];

    if ($tableExists) {
        $stmt = $conn->prepare("SELECT title, content FROM appinfo WHERE infotype = :type");
        $stmt->bindParam(":type", $type, PDO::PARAM_STR);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "success" => true,
            "type" => $type,
            "count" => count($data),
            "data" => $data
        ]);
        exit;
    }

    // --- FALLBACK (if no table found) ---
    $info = [
        "about" => [
            [
                "Title" => "About CultureLens",
                "Content" => "CultureLens helps travelers explore and understand global cultures with AI-driven insights."
            ],
            [
                "Title" => "Our Mission",
                "Content" => "To promote cultural awareness and respectful travel experiences worldwide."
            ]
        ],
        "contact" => [
            ["Title" => "Email", "Content" => "support@culturelens.app"],
            ["Title" => "Phone", "Content" => "+63 912 345 6789"]
        ],
        "faq" => [
            ["Title" => "Is CultureLens free to use?", "Content" => "Yes, all cultural insights and AI travel tools are free for registered users."],
            ["Title" => "Do I need internet?", "Content" => "An internet connection is needed for AI translation and itinerary planning."]
        ]
    ];

    echo json_encode([
        "success" => true,
        "type" => $type,
        "count" => count($info[$type]),
        "data" => $info[$type]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
