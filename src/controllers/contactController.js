import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendContactMessage = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ success: false, message: "Uzupełnij wszystkie pola." });
    }

    try {
        await transporter.sendMail({
            from: `Formularz <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `[Formularz WWW] ${subject}`,
            html: `<p><strong>Od:</strong> ${email}</p><p>${message}</p>`
        });
        res.status(200).json({ success: true, message: "Wiadomość wysłana!" });
    } catch (err) {
        console.error("Błąd e-mail:", err);
        res.status(500).json({ success: false, message: "Błąd serwera." });
    }
};