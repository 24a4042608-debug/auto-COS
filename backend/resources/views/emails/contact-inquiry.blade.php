<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry – VHSM Atelier</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f4f1eb; font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e0d9ce; }
        .header { background: #1a1a1a; padding: 36px 40px; text-align: center; }
        .header-label { color: #c9a96e; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; font-family: Arial, sans-serif; margin-bottom: 8px; }
        .header-title { color: #ffffff; font-size: 22px; letter-spacing: 0.1em; text-transform: uppercase; }
        .body { padding: 40px; }
        .section-label { font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: #c9a96e; margin-bottom: 6px; }
        .section-value { font-size: 15px; color: #1a1a1a; margin-bottom: 28px; line-height: 1.6; border-bottom: 1px solid #f0ece4; padding-bottom: 20px; }
        .message-box { background: #faf8f4; border-left: 3px solid #c9a96e; padding: 20px 24px; margin-top: 8px; font-size: 14px; line-height: 1.8; color: #3a3a3a; }
        .footer { background: #f4f1eb; padding: 24px 40px; text-align: center; }
        .footer p { font-family: Arial, sans-serif; font-size: 11px; color: #888; letter-spacing: 0.05em; }
        .divider { border: none; border-top: 1px solid #e0d9ce; margin: 0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <p class="header-label">Communications Office</p>
            <h1 class="header-title">VHSM Atelier</h1>
        </div>

        <div class="body">
            <p style="font-family: Arial, sans-serif; font-size: 12px; color: #888; margin-bottom: 32px;">
                A new inquiry has been received via the Atelier contact form.
            </p>

            <p class="section-label">From</p>
            <p class="section-value">{{ $senderName }} &lt;{{ $senderEmail }}&gt;</p>

            <p class="section-label">Inquiry Type</p>
            <p class="section-value">{{ $category }}</p>

            <p class="section-label">Message</p>
            <div class="message-box">{{ $message }}</div>
        </div>

        <hr class="divider">

        <div class="footer">
            <p>This email was sent automatically by VHSM Atelier correspondence system.</p>
            <p style="margin-top: 6px;">Reply directly to this email to respond to the sender.</p>
        </div>
    </div>
</body>
</html>
