import { transporter, mailOptions } from "../services/emailService.js";

export const sendMailEthereal = async (req, res) => {
    try {
        const response = await transporter.sendMail(mailOptions)
        console.log(response)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}