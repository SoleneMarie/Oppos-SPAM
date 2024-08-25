require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

const sentFrom = new Sender(`solene@${process.env.DOMAIN}`, "Solène Plassart");

app.post("/contact", async (req, res) => {
  try {
    console.log("La route post marche");
    const recipients = [
      new Recipient(
        req.body.email,
        `${req.body.firstName} ${req.body.lastName}`
      ),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(req.body.email)
      .setSubject("Oppossum pictures")
      .setHtml("Here is your bunch of possums! Thank you for your support.")
      .setText("Here is your bunch of possums! Thank you for your support!")
      .setAttachments(
        "https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/jpzkmgqmzz1l059v/images/9ccc2eac-7a74-4a5b-99ab-84ed203fbce0.jpg",
        "https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/jpzkmgqmzz1l059v/images/9ccc2eaa-e4a5-434c-961a-bbec6911ba96.jpg",
        "https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/jpzkmgqmzz1l059v/images/9ccc2eab-da87-4f7e-8726-fd1ae93ae020.jpg"
      );
    console.log(emailParams);
    const result = await mailerSend.email.send(emailParams); // AIE!
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server Ok");
});
