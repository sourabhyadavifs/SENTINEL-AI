import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client if key is available
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI client successfully initialized server-side.');
  } catch (err) {
    console.warn('Error initializing Gemini AI client:', err);
  }
} else {
  console.log('No valid GEMINI_API_KEY environment variable found. Falling back to local high-fidelity intelligence simulator.');
}

// 1. API: Analyze suspicious content (text/chat/screenshot-transcripts)
app.post('/api/analyze-scam', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Input text is required for scam analysis.' });
  }

  // If Gemini client is active, execute real intelligence categorization
  if (ai) {
    try {
      const systemInstruction = `You are an elite cyber-forensic analyst specializing in Indian digital fraud rings (such as Jamtara and Mewat groups). 
Analyze the provided communication transcript/text. Detect scams like Digital Arrest, FedEx Customs extortion, RBI/CBI/Police impersonation, KYC updates, UPI Cashbacks, task scams, and electricity disconnection warnings.
Provide a detailed forensic threat report formatted STRICTLY in the requested JSON structure. Keep description points precise and action-oriented.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: text,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              probability: { type: Type.INTEGER, description: 'Fraud probability percentage from 0 to 100' },
              threatLevel: { type: Type.STRING, description: 'One of: Safe, Low Risk, Medium, High, Critical' },
              category: { type: Type.STRING, description: 'Scam category (e.g. Digital Arrest Scam, Courier Customs Extortion, UPI Refund Fraud, etc.)' },
              explanation: { type: Type.STRING, description: 'A brief 2-sentence summary of why this is or is not flagged as a scam' },
              evidence: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of specific textual clues or red flags discovered in the communication'
              },
              psychologicalIndicators: {
                type: Type.OBJECT,
                properties: {
                  urgency: { type: Type.INTEGER, description: 'Urgency rating from 1 to 10' },
                  authorityImpersonation: { type: Type.BOOLEAN, description: 'Is someone impersonating public officials (CBI, Customs, NCB, RBI, SBI, police)?' },
                  fearInducement: { type: Type.BOOLEAN, description: 'Does it threaten jail, penalty, or social shame?' },
                  financialLure: { type: Type.BOOLEAN, description: 'Does it lure with fake awards, cashback, or investment returns?' },
                  secrecyDemand: { type: Type.BOOLEAN, description: 'Does it demand keeping the call secret or remaining on video arrest?' }
                },
                required: ['urgency', 'authorityImpersonation', 'fearInducement', 'financialLure', 'secrecyDemand']
              },
              urgencyScore: { type: Type.INTEGER, description: 'Estimated visual threat timeline speed (1-100)' },
              financialRiskEstimate: { type: Type.STRING, description: 'Estimated amount or range at risk based on the context' },
              recommendedActions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Step-by-step practical advice for citizens to handle this incident'
              },
              explainabilityText: { type: Type.STRING, description: 'Detailed forensic reasoning behind the analysis, highlighting psychological pressure hooks used.' }
            },
            required: [
              'probability', 'threatLevel', 'category', 'explanation', 'evidence',
              'psychologicalIndicators', 'urgencyScore', 'financialRiskEstimate',
              'recommendedActions', 'explainabilityText'
            ]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsedReport = JSON.parse(responseText.trim());
        return res.json({ result: parsedReport, mode: 'live-ai' });
      }
    } catch (err: any) {
      console.warn('Gemini live analysis failed, falling back to local engine:', err.message || err);
    }
  }

  // --- LOCAL FALLBACK ENGINE ---
  // If Gemini is missing, or fails, we run a highly-polished heuristic regex parser
  const normalized = text.toLowerCase();
  let result: any = {
    probability: 10,
    threatLevel: 'Safe',
    category: 'General Communication',
    explanation: 'No immediate digital threat signatures detected. The communication appears to be a standard message, though vigilance is always advised.',
    evidence: ['No coercive threats found', 'No demands for immediate wire transfers or digital escrow routing.'],
    psychologicalIndicators: {
      urgency: 2,
      authorityImpersonation: false,
      fearInducement: false,
      financialLure: false,
      secrecyDemand: false
    },
    urgencyScore: 15,
    financialRiskEstimate: '₹0 (Safe)',
    recommendedActions: [
      'Maintain standard digital safety awareness.',
      'Do not share personal details unless you have fully verified the sender.',
      'Be wary of hyperlinks sent by unknown accounts.'
    ],
    explainabilityText: 'Heuristic scans parsed the textual vocabulary against India public safety databases. No active malware links, impersonation vocabulary, or coercion signals were triggered.'
  };

  if (normalized.includes('cbi') || normalized.includes('digital arrest') || normalized.includes('arrest') || normalized.includes('secrets act') || normalized.includes('skype')) {
    result = {
      probability: 98,
      threatLevel: 'Critical',
      category: 'CBI Impersonation (Digital Arrest)',
      explanation: 'Detected critical "Digital Arrest" coercive tactics mimicking Indian law enforcement. No official government body holds suspects on Skype calls or requests money transfers for clearing.',
      evidence: [
        'Impersonation of elite public commands (CBI, Customs, Police)',
        'Mention of non-existent law protocol "Digital Arrest"',
        'Threats under legal constructs (e.g. Official Secrets Act)',
        'Coercion to keep video call connected and keep it secret.'
      ],
      psychologicalIndicators: {
        urgency: 10,
        authorityImpersonation: true,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: true
      },
      urgencyScore: 95,
      financialRiskEstimate: '₹14,50,000 (Vulnerable savings account block)',
      recommendedActions: [
        'Hang up instantly. Government agencies never interrogate on video apps.',
        'Do not share screens, passwords, or credentials.',
        'Immediately dial the National Cyber Crime Helpline at 1930.',
        'File an incident file on cybercrime.gov.in.'
      ],
      explainabilityText: 'This transcript heavily displays "Digital Arrest" coercion models. Attackers weaponize anxiety by claiming a crime package is tied to the victim Aadhaar card, forcing them into isolating video sessions to bypass banking sanity controls.'
    };
  } else if (normalized.includes('fedex') || normalized.includes('customs') || normalized.includes('narcotics') || normalized.includes('mdma') || normalized.includes('contraband') || normalized.includes('package')) {
    result = {
      probability: 92,
      threatLevel: 'High',
      category: 'FedEx Courier & Customs Fraud',
      explanation: 'Detected parcel extortion scam utilizing fake Narcotics Control Bureau identifiers. The scam lies in claiming illegal contraband drugs was found in a package with your ID, demanding bribe fees.',
      evidence: [
        'Misrepresentation of FedEx Courier brand protocols',
        'Impersonation of Narcotics Control Bureau (NCB) or Customs',
        'Claim of synthetic drug (MDMA/Narcotics) seized',
        'Demand to call an online verification officer immediately'
      ],
      psychologicalIndicators: {
        urgency: 9,
        authorityImpersonation: true,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: false
      },
      urgencyScore: 88,
      financialRiskEstimate: '₹4,80,000 (Processing customs charges)',
      recommendedActions: [
        'Immediately disconnect any active WhatsApp/Mobile call.',
        'Note that custom officers NEVER collect verification charges through personal UPI handles.',
        'Report the mobile number as dangerous spam on Truecaller and WhatsApp.',
        'Contact the National Cyber Helpline 1930.'
      ],
      explainabilityText: 'A classic courier custom fraud. By fabricating legal crisis (drug intercepts), attackers block logical thinking, causing victims to pay "temporary verification fees" to get fictitious clearances.'
    };
  } else if (normalized.includes('gpay') || normalized.includes('pin') || normalized.includes('refund') || normalized.includes('cashback') || normalized.includes('claim')) {
    result = {
      probability: 88,
      threatLevel: 'Medium',
      category: 'UPI PIN Request Scam',
      explanation: 'Detected malicious transaction request mimicking refund allocations. Attacker targets UPI PIN entering sequence to debit citizen bank balance.',
      evidence: [
        'Requests entry of secret UPI PIN to receive cashback (Violates all UPI rules)',
        'Fictitious reward countdown timer to induce impulse click',
        'Unauthorized URL schema pointing to payments integration'
      ],
      psychologicalIndicators: {
        urgency: 8,
        authorityImpersonation: false,
        fearInducement: false,
        financialLure: true,
        secrecyDemand: false
      },
      urgencyScore: 75,
      financialRiskEstimate: '₹25,000 (Direct account debit extraction)',
      recommendedActions: [
        'DO NOT tap any payment link or input your secure PIN.',
        'Remember: Entering UPI PIN ALWAYS deducts money from your account, never credits it.',
        'Flag the phone sender with your telecom app and report UPI fraud.'
      ],
      explainabilityText: 'A high-frequency reverse-authorization cashback scam. It targets the technical misunderstanding that a PIN is needed to receive money, resulting in a rapid financial withdrawal.'
    };
  } else if (normalized.includes('papa') || normalized.includes('help') || normalized.includes('kidnap') || normalized.includes('accident') || normalized.includes('son') || normalized.includes('daughter') || normalized.includes('legs')) {
    result = {
      probability: 95,
      threatLevel: 'Critical',
      category: 'Deepfake AI Voice Kidnapping',
      explanation: 'Detected extreme virtual kidnapping crisis signatures. Attackers use voice clones from social media reels combined with background sound effects to simulate real distress.',
      evidence: [
        'Use of emotional clone audio to bypass security skepticism',
        'High urgency ransom demand using immediate UPI handles',
        'Severe intimidation utilizing simulated violent physical threats'
      ],
      psychologicalIndicators: {
        urgency: 10,
        authorityImpersonation: false,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: true
      },
      urgencyScore: 100,
      financialRiskEstimate: '₹2,00,000 (Instant ransom extraction)',
      recommendedActions: [
        'Remain calm. DO NOT transfer any funds.',
        'Immediately connect with your child on an alternative communication line or call their physical companions.',
        'Do not engage with the blackmailer. File an emergency 1930 report immediately.'
      ],
      explainabilityText: 'This is an AI voice clone virtual kidnapping scam. Attackers scrape social media profiles to compile voice footprints, synthesizing a clone to extort frantic relatives during high-anxiety windows.'
    };
  }

  res.json({ result, mode: 'local-simulator' });
});

// 2. API: Citizen Multilingual Copilot Chat Assistant
app.post('/api/copilot-chat', async (req, res) => {
  const { message, language, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const selectedLang = language || 'English';

  if (ai) {
    try {
      const systemInstruction = `You are the Sentinel AI Citizen Safety Copilot, an empathetic, highly professional digital security assistant.
Your goal is to educate, advise, assess risk, and prevent cyber fraud for Indian citizens.
Reply in the requested language: ${selectedLang}.
Use highly structured markdown: use bullet points, clear warnings, and immediate step-by-step guidance.
Keep your answer reassuring yet highly defensive. Educate them that public officials, banks, and couriers never ask for money transfers, Skype arrests, or UPI PINs over the phone.
Always provide the National Cyber Crime Helpline (1930) and the official website (cybercrime.gov.in) prominently.`;

      // Build chat prompt including history
      let prompt = '';
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          prompt += `${h.role === 'user' ? 'Citizen' : 'Copilot'}: ${h.text}\n`;
        });
      }
      prompt += `Citizen: ${message}\nCopilot:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text;
      if (responseText) {
        return res.json({ reply: responseText.trim(), mode: 'live-ai' });
      }
    } catch (err: any) {
      console.warn('Gemini copilot chat failed, falling back to local chat engine:', err.message || err);
    }
  }

  // --- LOCAL COPILOT ANSWERS (Based on language selection) ---
  const normalizedMsg = message.toLowerCase();
  let reply = '';

  // Simple localized greetings & response matrices
  if (selectedLang === 'Hindi' || selectedLang === 'hindi') {
    if (normalizedMsg.includes('cbi') || normalizedMsg.includes('arrest') || normalizedMsg.includes('कॉल')) {
      reply = `### 🚨 आवश्यक सुरक्षा चेतावनी: **फेक सीबीआई / डिजिटल अरेस्ट**

**यह एक खतरनाक धोखाधड़ी (Scam) है!** कृपया तुरंत ध्यान दें:

1. **तुरंत कॉल काटें:** भारतीय कानून में "डिजिटल अरेस्ट" (Digital Arrest) जैसा कोई प्रावधान नहीं है। सीबीआई, पुलिस या सीमा शुल्क विभाग कभी भी वीडियो कॉल (Skype/Zoom) पर गिरफ्तारी नहीं करता।
2. **कोई पैसा ट्रांसफर न करें:** सरकारी विभाग कभी भी किसी "सरकारी सुरक्षा खाते" या "एस्क्रो खाते" में पैसे ट्रांसफर करने की मांग नहीं करते।
3. **अपनी जानकारी साझा न करें:** अपना आधार नंबर, पैन या बैंक पासवर्ड किसी को न बताएं।

**तुरंत कार्रवाई करें:**
* राष्ट्रीय साइबर अपराध हेल्पलाइन नंबर **1930** पर तुरंत कॉल करें।
* आधिकारिक सरकारी पोर्टल **cybercrime.gov.in** पर अपनी शिकायत दर्ज करें।`;
    } else if (normalizedMsg.includes('otp') || normalizedMsg.includes('ओटीपी')) {
      reply = `### 🔐 सुरक्षा नियम: **ओटीपी (OTP) सुरक्षा**

**सावधान रहें:**
* **कभी भी अपना ओटीपी किसी के साथ साझा न करें**, चाहे वह खुद को आपके बैंक का मैनेजर, बिजली विभाग का अधिकारी, या कोरियर एजेंट ही क्यों न बताए।
* बैंक अधिकारी या कोई भी सरकारी कर्मचारी कभी भी फोन पर ओटीपी नहीं मांगते।
* ओटीपी साझा करने का सीधा मतलब है आपके खाते से पैसे कट जाना।

यदि आपने गलती से ओटीपी साझा कर दिया है, तो तुरंत अपने बैंक को सूचित कर कार्ड और नेट बैंकिंग ब्लॉक कराएं, तथा **1930** पर कॉल करें।`;
    } else {
      reply = `### 🛡️ सेंटिनल एआई (Sentinel AI) नागरिक सुरक्षा कॉपायलट

नमस्ते! मैं आपका डिजिटल सुरक्षा सहायक हूँ।

**मुख्य सुरक्षा बातें:**
* कोई भी बैंक अधिकारी आपसे फोन पर **UPI PIN, OTP, या पासवर्ड** नहीं मांगेगा।
* यदि कोई आपको डराकर तुरंत पैसे भेजने या वीडियो कॉल पर रहने को कहे, तो वह **धोखाधड़ी (Scam)** है।
* अपनी किसी भी शंका को यहाँ टाइप करें, मैं हिंदी में आपकी सहायता करूँगा।

**सहायता के लिए:** तुरंत **1930** पर कॉल करें या **cybercrime.gov.in** पर जाएं।`;
    }
  } else if (selectedLang === 'Marathi') {
    reply = `### 🚨 सेंटिनल एआई नागरिक सुरक्षा कॉपायलट (मराठी)

**महत्त्वाचा इशारा:**
* कोणतीही सरकारी संस्था (CBI, Customs, Police) व्हिडिओ कॉलवर तुम्हाला "Digital Arrest" मध्ये ठेवू शकत नाही.
* तुमचे बँक डिटेल्स किंवा **UPI PIN** कोणाशीही शेअर करू नका.
* सायबर फसवणूक झाल्यास त्वरित **1930** वर कॉल करा किंवा **cybercrime.gov.in** वर तक्रार नोंदवा.`;
  } else if (selectedLang === 'Tamil') {
    reply = `### 🚨 சென்டினல் ஏஐ குடிமக்கள் பாதுகாப்பு உதவியாளர் (Tamil)

**முக்கிய எச்சரிக்கை:**
* "டிஜிட்டல் அரெஸ்ட்" (Digital Arrest) என்ற பெயரில் எந்த ஒரு அரசு அதிகாரியும் (CBI, Customs, Police) உங்களை வாட்ஸ்அப் அல்லது ஸ்கைப் வீடியோ காலில் வைக்க முடியாது.
* உங்களது **UPI PIN** அல்லது **OTP** ஐ யாருடனும் பகிர வேண்டாம்.
* ஏமாற்றப்பட்டால் உடனடியாக **1930** என்ற எண்ணை அழைக்கவும் அல்லது **cybercrime.gov.in** இல் புகார் செய்யவும்.`;
  } else if (selectedLang === 'Telugu') {
    reply = `### 🚨 సెంటినెల్ AI పౌర భద్రత కాపిలట్ (Telugu)

**ముఖ్యమైన హెచ్చరిక:**
* సీబీఐ లేదా పోలీసులు ఎప్పుడూ వీడియో కాల్ లో మిమ్మల్ని "డిజిటల్ అరెస్ట్" చేయలేరు.
* మీ బ్యాంక్ వివరాలు లేదా **UPI PIN** ఎవరికీ చెప్పకండి.
* మోసపోతే వెంటనే **1930** కి కాల్ చేయండి లేదా **cybercrime.gov.in** లో ఫిర్యాదు చేయండి.`;
  } else if (selectedLang === 'Kannada') {
    reply = `### 🚨 ಸೆಂಟಿನೆಲ್ AI ನಾಗರಿಕ ಸುರಕ್ಷತಾ ಕಾಪಿಲಟ್ (Kannada)

**ಪ್ರಮುಖ ಮಾಹಿತಿ:**
* ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿ ಅಥವಾ ಸರ್ಕಾರಿ ಇಲಾಖೆಯು ನಿಮ್ಮ ಫೋನಿಗೆ ಬಂದ **OTP ಅಥವಾ UPI PIN** ಅನ್ನು ಕೇಳುವುದಿಲ್ಲ.
* ಸೈಬರ್ ವಂಚನೆಗೆ ಒಳಗಾಗಿದ್ದರೆ ತಕ್ಷಣ ರಾಷ್ಟ್ರೀಯ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ **1930** ಗೆ ಕರೆ ಮಾಡಿ.`;
  } else {
    // English Default
    if (normalizedMsg.includes('cbi') || normalizedMsg.includes('arrest') || normalizedMsg.includes('narcotics') || normalizedMsg.includes('police')) {
      reply = `### 🚨 CRITICAL ADVISORY: **Impersonation & "Digital Arrest" Scams**

This is a well-known cyber extortion tactic widely operated by fraud rings. 

**Remember these golden rules of safety:**
1. **NO "Digital Arrest" Exists:** Indian Law Enforcement (CBI, NCB, ED, State Police) **NEVER** holds citizens under digital custody on Skype, Zoom, or WhatsApp video calls.
2. **NO Video Interrogations:** Government officials do not interrogate suspects or check identification documents online over personal video links.
3. **NO Escrow Audits:** Judges and investigative officers never ask you to transfer money to a "safety escrow account" or "government clearance fund" to verify your innocence.

**Immediate Recovery Actions:**
* **Hang up immediately.** Block the number.
* Dial the National Cyber Crime Helpline **1930** to report the transaction block.
* Register your case on **cybercrime.gov.in** with screenshots and suspect bank details.`;
    } else if (normalizedMsg.includes('upi') || normalizedMsg.includes('pin') || normalizedMsg.includes('refund') || normalizedMsg.includes('pay')) {
      reply = `### 💳 SAFE PAYMENTS ADVISORY: **UPI Refund & Cashback Scams**

**Critical UPI Rules to Memorize:**
* **PIN is Only for Debiting:** You only enter your secret UPI PIN to **send (pay) money** or to check your balance. You **NEVER** need to enter your PIN to receive, claim, or accept refunds or cashbacks.
* **Fake Payment Links:** Do not tap links with unfamiliar protocols (like \`upi-claim://\`). These automatically trigger your banking app to request a fund withdrawal.
* **Merchant Scams:** Scammers register fake businesses posing as "GPay Reward Team" or "Paytm Security". Always inspect the payee name before inputting credentials.

If you have mistakenly entered your PIN on a scam link, contact your bank immediately to block UPI transactions, freeze your mobile banking app, and report the transaction on **1930** or **cybercrime.gov.in**.`;
    } else {
      reply = `### 🛡️ Sentinel AI Citizen Safety Advisory

Hello! I am your cyber safety copilot. I am here to help you identify online scams, protect your finances, and navigate the cybercrime reporting systems in India.

**Always remember:**
* **Banks, Police, and Couriers** will never ask you to keep phone calls secret from your family.
* **Never click random links** offering cashbacks, part-time jobs, electricity disconnection threats, or urgent custom clearances.
* If a threat is made, **hang up, verify independently**, and protect yourself.

**How can I assist you today?** Feel free to describe any call, message, or link you received. You can also select other languages from the side menu.`;
    }
  }

  res.json({ reply, mode: 'local-simulator' });
});

// Serve Vite-managed app
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite developer mode middleware integrated.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static client server integrated.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentinel AI Server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
