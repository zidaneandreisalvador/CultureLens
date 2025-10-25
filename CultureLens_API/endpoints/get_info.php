<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

// Optional: ?type=about / contact / faq
$type = strtolower($_GET["type"] ?? "about");

// If you have a table called "AppInfo"
if ($result = $conn->query("SHOW TABLES LIKE 'AppInfo'")) {
    if ($result->num_rows > 0) {
        $stmt = $conn->prepare("SELECT * FROM AppInfo WHERE InfoType = ?");
        $stmt->bind_param("s", $type);
        $stmt->execute();
        $res = $stmt->get_result();
        $data = [];

        while ($row = $res->fetch_assoc()) {
            $data[] = [
                "Title" => $row["Title"],
                "Content" => $row["Content"]
            ];
        }

        echo json_encode([
            "success" => true,
            "type" => $type,
            "count" => count($data),
            "data" => $data
        ]);
        exit;
    }
}

// Fallback (if no database table)
$info = [
    "about" => [
        ["Title" => "About CultureLens", "Content" => "CultureLens helps travelers explore and understand global cultures with AI-driven insights."],
        ["Title" => "Our Mission", "Content" => "To promote cultural awareness and respectful travel experiences worldwide."]
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

$conn->close();
?>
