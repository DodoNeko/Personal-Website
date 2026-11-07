import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
console.log("--- TEST ZMIENNYCH ---");
console.log("USER:", process.env.SMTP_USER);
console.log("PASS:", process.env.SMTP_PASS ? "Zaladowano" : "Brak!");
console.log("----------------------");

export const sendContactMessage = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ success: false, message: "Uzupełnij wszystkie pola." });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        logger: true,
        debug: true 
    });

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