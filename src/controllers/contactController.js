import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMessage = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ success: false, message: "Uzupełnij wszystkie pola." });
    }

    try {
        await resend.emails.send({
            from: 'Formularz <onboarding@resend.dev>',
            to: process.env.EMAIL_TO,
            reply_to: email,
            subject: `[Formularz WWW] ${subject}`,
            html: `<p><strong>Od:</strong> ${email}</p><p>${message}</p>`
        });
        
        res.status(200).json({ success: true, message: "Wiadomość wysłana!" });
    } catch (err) {
        console.error("Błąd e-mail:", err);
        res.status(500).json({ success: false, message: "Błąd serwera." });
    }
};