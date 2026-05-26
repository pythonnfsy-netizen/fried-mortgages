import { Resend } from 'resend';

// מפעילים את השרת עם המפתח הסודי שקיבלת מ-Resend
const resend = new Resend('re_8TkiBQPY_FxBCfmxaRayFHAfAWCuYXZdk'); // <-- שים כאן את המפתח מ-Resend

export default async function handler(req, res) {
  // מאפשרים לקליינט של React לגשת לשרת הזה (הגדרות CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // אנחנו מקבלים מה-React את המייל ואת הקוד שנולד
  if (req.method === 'POST') {
    const { email, otpCode } = req.body;

    try {
      const data = await resend.emails.send({
        from: 'Fried Mortgages <onboarding@resend.dev>', // בשלב החינמי זה המייל השולח של Resend
        to: [email],
        subject: 'קוד אימות חד-פעמי - פריד משכנתאות',
        html: `
          <div dir="rtl" style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-size: 16px;">
            <h2 style="color: #0f172a; text-align: center;">פריד משכנתאות</h2>
            <p style="color: #475569; font-size: 14px; text-align: center;">התקבלה בקשת התחברות למערכת הניהול המאובטחת.</p>
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 12px; text-align: center; margin: 20px 0;">
              <span style="font-size: 11px; font-weight: bold; color: #64748b; display: block; margin-bottom: 5px;">קוד האימות שלך:</span>
              <span style="font-size: 28px; font-weight: bold; color: #f59e0b; letter-spacing: 4px;">${otpCode}</span>
            </div>
            <p style="color: #94a3b8; font-size: 11px; text-align: center;">אם לא ביקשת קוד זה, ניתן להתעלם מהודעה זו בבטחה.</p>
          </div>
        `,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}