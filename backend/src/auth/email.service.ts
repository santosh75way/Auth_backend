import { sendMail } from "../common/lib/mailer";

type SendResetEmailParams = {
  toEmail: string;
  resetLink: string;
};

export async function sendPasswordResetEmail(
  params: SendResetEmailParams,
): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Password Reset Request</h2>
      <p>You requested a password reset.</p>
      <p>Click the button below to reset your password:</p>
      <a href="${params.resetLink}"
         style="display:inline-block;padding:10px 16px;background:#1976d2;color:#fff;text-decoration:none;border-radius:4px;">
         Reset Password
      </a>
      <p>This link will expire in 15 minutes.</p>
    </div>
  `;

  await sendMail({
    to: params.toEmail,
    subject: "Reset your password",
    html,
  });
}