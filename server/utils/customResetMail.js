export const resetOtpMailHTML = `
<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
                <!-- Basic meta tags for email clients -->
                <style type="text/css">
                    /* Client-specific resets */
                    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                    
                    /* Custom styles */
                    body { margin: 0; padding: 0; background-color: rgb(255, 255, 255); }
                    a { color: #f44a4aff; text-decoration: none; }
                    
                    /* Responsive styles for mobile */
                    @media screen and (max-width: 600px) {
                        .full-width-mobile { width: 100% !important; max-width: 100% !important; }
                        .padding-mobile { padding: 20px !important; }
                        .header-text { font-size: 24px !important; }
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: rgb(245, 245, 245); font-family: 'Inter', sans-serif;">

            <!-- Outer wrapper table for background and max width -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td align="center" style="padding: 40px 10px;">
                        <!-- Content Container (600px wide, centered) -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="full-width-mobile" style="max-width: 600px;">
                            
                            <!-- Logo/Header Section -->
                            <tr>
                                <td align="center" style="padding: 20px 0 30px 0;">
                                    <!-- Replace with your logo or company name -->
                                    <h1 style="margin: 0; color: rgb(255, 101, 101); font-size: 32px; font-weight: 700;">
                                        Astrolab
                                    </h1>
                                </td>
                            </tr>

                            <!-- Main Content Card -->
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 30px 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);">

                                    <!-- Greeting -->
                                    <h2 class="header-text" style="color: #1f2937;text-align: center; font-size: 28px; margin: 0 0 15px 0; font-weight: 700;">
                                        Password Reset OTP
                                    </h2>

                                    <!-- Body Paragraph 1 -->
                                    <p style="color: #4b5563; font-size: 16px; line-height: 150%; margin: 0 0 20px 0;">
                                        Thank you for joining our community. We are excited to have you on board! You are now one step closer to accessing all the powerful features we offer.
                                    </p>

                                    <!-- Call to Action (CTA) Button -->
                                    <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                        <tr>
                                            <p style="text-align: center; font-style: italic; font-size: medium; font-weight: 500; padding: 8px; background-color: #4b5563; color: aliceblue;">Here is your Password reset OTP</p>
                                            <td align="center" bgcolor="#10b981" style="border-radius: 8px; padding: 30px; width: 10%; font-size: 30px; font-weight: 700; color: aliceblue;">
                                                [OTP]
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Body Paragraph 2 -->
                                    <p style="color: #4b5563; font-size: 16px; line-height: 150%; margin: 0 0 20px 0;">
                                        To ensure you have the best experience, here are a few things you can do next:
                                    </p>
                                    
                                    <!-- Feature List -->
                                    <ul style="color: #4b5563; font-size: 16px; line-height: 150%; padding-left: 20px; margin: 0 0 25px 0;">
                                        <li style="margin-bottom: 10px;">Set up your profile and preferences.</li>
                                        <li style="margin-bottom: 10px;">Explore the main features (link to feature guide).</li>
                                        <li>Invite your team or friends to join you!</li>
                                    </ul>

                                    <!-- Closing -->
                                    <p style="color: #4b5563; font-size: 16px; line-height: 150%; margin: 0 0 10px 0;">
                                        If you have any questions, feel free to reply to this email.
                                    </p>
                                    <p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0;">
                                        Happy building,
                                    </p>
                                    <p style="color: #4b5563; font-size: 16px; margin: 5px 0 0 0;">
                                        The Astrolab Team.
                                    </p>

                                </td>
                            </tr>
                            
                            <!-- Footer Section -->
                            <tr>
                                <td align="center" style="padding: 30px 20px 0 20px;">
                                    <p style="color: #9ca3af; font-size: 12px; line-height: 150%; margin: 0 0 10px 0;">
                                        You received this email because you signed up on our platform.
                                    </p>
                                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                        Astolab | Accra, Kumasi
                                    </p>
                                </td>
                            </tr>

                        </table>
                        <!-- End Content Container -->
                    </td>
                </tr>
            </table>
            <!-- End Outer Wrapper -->

            </body>
            </html>
        `