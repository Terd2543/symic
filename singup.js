<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สมัครสมาชิก</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="signup-container">
        <form id="signupForm">
            <h2>สมัครสมาชิก</h2>
            <input type="text" id="newUsername" placeholder="ชื่อผู้ใช้" required>
            <input type="email" id="newEmail" placeholder="อีเมล" required>
            <input type="password" id="newPassword" placeholder="รหัสผ่าน" required>
            <button type="submit">สมัครสมาชิก</button>
        </form>
    </div>
    <script src="signup.js"></script>
</body>
</html>
