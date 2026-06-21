const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '';

export async function sendToTelegram(message: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram credentials not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error('Telegram send error:', error);
    return false;
  }
}

export function formatContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  plan?: string;
  message?: string;
}): string {
  return `
📩 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🛠 *Service:* ${data.service}
📦 *Plan:* ${data.plan || 'Not specified'}

💬 *Message:*
${data.message || 'No message'}

---
_Sent from the Aarohan Enterprises website_
  `.trim();
}

export function formatAssessmentMessage(data: {
  name: string;
  email: string;
  phone?: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  answersSummary: string;
}): string {
  return `
🎯 *New Assessment Lead*

👤 *Contact Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}

📊 *Assessment Results:*
• Score: ${data.score}/${data.maxScore} (${data.percentage}%)
• Level: ${data.level}

📝 *Responses:*
${data.answersSummary}

⏰ Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();
}
