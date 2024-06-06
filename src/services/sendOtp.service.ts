import axios from "axios";
import configs from "../config/config";

const sendOtp = async (email: string, firstName: string) => {
  try {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Set expiration time (1 hour from now)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 60);

    const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
    const brevoApiKey = configs.BREVO_API_KEY;

    // Send OTP via Brevo
    const subject = "OTP Verification";
    const htmlContent = `Hello ${firstName}, your OTP for verification is: ${otp}`;

    const payload = {
      sender: {
        name: "Sparrow Tv",
        email: "dchief200@gmail.com",
      },
      to: [{ email, name: firstName }],
      subject,
      htmlContent,
    };

    const response = await axios.post(brevoApiUrl, payload, {
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return { otp, expirationTime };
    } else {
      throw { status: 500, message: "Failed to send OTP: Server error" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error sending OTP" };
  }
};

export { sendOtp };
