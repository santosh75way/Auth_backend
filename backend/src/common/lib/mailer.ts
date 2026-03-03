import nodemailer from "nodemailer";
import { env } from "../config/env";
import { AppError } from "../types/appError";

type SendMailParams = {
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, // true if 465
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendMail(params: SendMailParams): Promise<void> {
  try {
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
  } catch (err) {
    throw new AppError("Failed to send email", 500, "EMAIL_SEND_FAILED");
  }
}