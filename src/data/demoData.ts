import { DemoScenario, HeatmapPoint, ThreatIntelBriefing } from '../types';

export const INDIA_HEATMAP_DATA: HeatmapPoint[] = [
  {
    city: 'New Delhi (NCR)',
    lat: 28.6139,
    lng: 77.2090,
    scamDensity: 'Critical',
    lossesPrevented: '₹3.4 Cr',
    lossesOccurred: '₹1.8 Cr',
    complaintVolume: 2450,
    growthRate: '+38%',
    topScamType: 'CBI Impersonation & Digital Arrest',
    riskForecast7Day: 'Risk is high around West Delhi and Noida sectors; expecting courier fraud spike.'
  },
  {
    city: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    scamDensity: 'High',
    lossesPrevented: '₹2.9 Cr',
    lossesOccurred: '₹1.5 Cr',
    complaintVolume: 1820,
    growthRate: '+19%',
    topScamType: 'Stock & Crypto Investment Scams',
    riskForecast7Day: 'Particularly targeting corporate areas (BKC, Lower Parel) with elite wealth advisor scams.'
  },
  {
    city: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    scamDensity: 'High',
    lossesPrevented: '₹2.1 Cr',
    lossesOccurred: '₹95 Lakhs',
    complaintVolume: 1210,
    growthRate: '+12%',
    topScamType: 'FedEx Courier & Customs Scams',
    riskForecast7Day: 'IT corridor (Whitefield, Bellandur) targeting young professionals with fake custom threats.'
  },
  {
    city: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    scamDensity: 'Medium',
    lossesPrevented: '₹1.8 Cr',
    lossesOccurred: '₹88 Lakhs',
    complaintVolume: 980,
    growthRate: '+24%',
    topScamType: 'KYC & Bank Update Smishing',
    riskForecast7Day: 'Spike in SMS-based bank link scams mimicking State Bank of India and HDFC alerts.'
  },
  {
    city: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    scamDensity: 'Medium',
    lossesPrevented: '₹1.3 Cr',
    lossesOccurred: '₹62 Lakhs',
    complaintVolume: 740,
    growthRate: '+8%',
    topScamType: 'Electricity Bill Default Scams',
    riskForecast7Day: 'Slight increase in WhatsApp warnings threatening power disconnection within 2 hours.'
  },
  {
    city: 'Kolkata',
    lat: 22.5726,
    lng: 88.3639,
    scamDensity: 'High',
    lossesPrevented: '₹1.0 Cr',
    lossesOccurred: '₹1.1 Cr',
    complaintVolume: 1050,
    growthRate: '+31%',
    topScamType: 'Aadhaar Enabled Payment System (AePS) Cloning',
    riskForecast7Day: 'Rural-urban fringe showing biometric registry cloning. Recommending biometric locking.'
  }
];

export const DAILY_THREAT_INTEL: ThreatIntelBriefing = {
  dailySummary: 'ALERT: Organized phishing rings located in Jamtara (Jharkhand) and Mewat (Haryana) have shifted operations towards "Customs & Narcotics Interdiction" digital arrests. High-volume automated robocalls posing as India Post or FedEx are currently harvesting biometric and identity details. Law enforcement is advised to watch HDFC and ICICI mule account creations with suspicious OTP forwarding patterns.',
  trendingScripts: [
    {
      title: 'The Skype Digital Arrest Script',
      category: 'CBI/Customs Impersonation',
      scriptSnippet: '“Your package contains 140g MDMA. Do not disconnect this Skype call. Under Section 144 CrPC, you are under digital custody. You must transfer your funds to our security account for verification.”',
      counterMeasure: 'CBI or Customs never conduct investigations over video calls. Biometric/financial verification is NEVER done via Skype. Promptly lock WhatsApp profile picture.'
    },
    {
      title: 'Electricity Bill Disconnection SMS',
      category: 'Utility Smishing',
      scriptSnippet: '“Dear Customer, your electricity line will be disconnected at 9:30 PM tonight as your previous month bill is not updated. Connect with our officer Mr. Sharma at 9811xxxxxx.”',
      counterMeasure: 'State Discoms send bills via official SMS Shortcodes. Personal phone numbers in bills are always fraudulent. Disconnections require prior legal notice.'
    },
    {
      title: 'Fake Stock Trading WhatsApp Groups',
      category: 'Investment Scams',
      scriptSnippet: '“Welcome to Capital Growth Academy. Dr. Raghuram Rajan VIP class is giving 400% returns inside our custom app SEBI-Verify Pro. Please deposit ₹5 Lakhs to start shorting.”',
      counterMeasure: 'Verify any stock market adviser via the SEBI Register Portal. Refuse to install third-party APK files for trading.'
    }
  ],
  targetedDemographics: [
    { group: 'Senior Citizens (Retirees)', vulnerabilityLevel: 'High', scamType: 'RBI/Pension Verification & Digital Arrest', percentage: 42 },
    { group: 'Young IT Professionals', vulnerabilityLevel: 'High', scamType: 'FedEx Customs & MDMA Scams', percentage: 28 },
    { group: 'Housewives & Self-employed', vulnerabilityLevel: 'Medium', scamType: 'Part-time Like & Earn YouTube Tasks', percentage: 18 },
    { group: 'Rural Account Holders', vulnerabilityLevel: 'High', scamType: 'AePS Biometric Cloning & UPI Cashbacks', percentage: 12 }
  ]
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'cbi_digital_arrest',
    title: 'CBI Impersonation (Digital Arrest)',
    headline: 'Fake CBI Officer: Skype video investigation scam',
    inputText: `This is Inspector Vijay Kumar from Delhi CBI Cybercrime Command. Your Aadhaar card has been tied to an illegal package containing contraband drugs intercepted at the Mumbai International Terminal. You are currently under "Digital Arrest". Do not call anyone or reveal this to family, under the Official Secrets Act. We are adding you to a Skype call immediately. You must move all money from your bank account to the CBI escrow account for legal clearance. Failure to comply will lead to immediate arrest by local police.`,
    scamCategory: 'CBI Impersonation & Digital Arrest',
    threatLevel: 'Critical',
    financialLoss: '₹14,50,000',
    scamResult: {
      probability: 98,
      threatLevel: 'Critical',
      category: 'Digital Arrest / CBI Impersonation',
      explanation: 'The communication poses as an official CBI officer demanding the victim remain in "Digital Arrest" on video, demanding complete secrecy, and asking to transfer funds to a fake escrow account. Government agencies NEVER execute arrests, video clearances, or fund transfers in this manner.',
      evidence: [
        'Use of fake official title: Inspector Vijay Kumar',
        'Impersonation of Delhi CBI Cybercrime Command',
        'Demand for "Digital Arrest" (which does not exist in Indian Law)',
        'Threat under the Official Secrets Act',
        'Coercion to transfer money to a pseudo "escrow account"',
        'Insistence on downloading video tools (Skype/Zoom) for absolute control'
      ],
      psychologicalIndicators: {
        urgency: 10,
        authorityImpersonation: true,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: true
      },
      urgencyScore: 95,
      financialRiskEstimate: '₹14,50,000 (Entire savings threatened)',
      recommendedActions: [
        'Disconnect any active calls immediately.',
        'DO NOT download Skype or share your screen.',
        'Lock your profile pictures and WhatsApp settings.',
        'File an instant complaint on cybercrime.gov.in or dial national helpline 1930.',
        'Notify your bank branch of a potential coercion fraud.'
      ],
      explainabilityText: 'Sentinel AI flagged this at 98% Confidence due to three overlapping critical signals: (1) Impersonation of elite CBI and narcotics units, (2) Coercive instructions demanding total privacy, and (3) Financial mandate requiring fund clearing. In India, no legal investigation is conducted in secrecy via Skype, nor do courts utilize digital escrow accounts.'
    },
    networkData: {
      nodes: [
        { id: 'v1', label: 'Victim: Dr. Ramesh S.', type: 'Victim', status: 'Secure', details: 'Cardholder in New Delhi, Ret. Physician', location: 'New Delhi' },
        { id: 'f1', label: 'Suspect Caller: "Insp. Vijay"', type: 'Fraudster', status: 'Flagged', details: 'VoIP Caller spoofing Delhi CBI numbers', location: 'Mewat/Jamtara' },
        { id: 'p1', label: '+91 91048-28192', type: 'Phone', status: 'Flagged', details: 'Pre-activated SIM registered under fake ID', location: 'Jharkhand Circle' },
        { id: 'a1', label: 'Mule Account: HDFC 501004312', type: 'Account', status: 'Flagged', details: 'Shell account opened in rural Bihar, high churn rate', location: 'Patna' },
        { id: 'd1', label: 'Device: OnePlus Nord CE', type: 'Device', status: 'Flagged', details: 'IMEI: 359124018281901', location: 'Deoghar' },
        { id: 'a2', label: 'Mule Account: SBI 39182010', type: 'Account', status: 'Flagged', details: 'Secondary withdrawal account', location: 'Jamtara' }
      ],
      links: [
        { source: 'f1', target: 'p1', label: 'Uses SIM', type: 'Registered' },
        { source: 'p1', target: 'v1', label: 'Called Victim', type: 'Communicated' },
        { source: 'f1', target: 'd1', label: 'Active Device', type: 'Shared' },
        { source: 'v1', target: 'a1', label: 'Forced Transfer Attempt', type: 'Transacted' },
        { source: 'a1', target: 'a2', label: 'Layering Transfer', type: 'Transacted' },
        { source: 'd1', target: 'a2', label: 'Logged UPI', type: 'Shared' }
      ],
      networkRiskScore: 94,
      fraudRingConfidence: 96,
      connectionsCount: 6,
      criticalLeads: [
        'Device IMEI tied to 4 other cybercrime cases in Jharkhand and Haryana.',
        'Mule account in HDFC has routed ₹85 Lakhs in the last 48 hours in ₹1.5L bundles.',
        'SIM activated with a forged voter card belonging to a non-existent person in rural Bengal.'
      ]
    },
    policeLeads: {
      id: 'L-001',
      title: 'Delhi CBI Impersonation Ring',
      severity: 'Critical',
      category: 'Digital Arrest Fraud',
      timestamp: '2026-06-23T11:15:00',
      status: 'Open',
      leads: [
        'Device registered IMEI: 359124018281901 is currently pinging from Jamtara, Jharkhand cell towers.',
        'UPI ID: cbi.verify.gov@icici (tied to Mule Account HDFC 501004312) has active merchant routing.',
        'VoIP endpoint resolved to a VPN server based in Frankfurt, spoofing CBI public numbers.'
      ],
      suggestedActions: [
        'Request immediate emergency freeze on HDFC Account 501004312.',
        'Issue KYC block on SIM card +91 91048-28192 with telecom service provider.',
        'Submit Jamtara GPS tower grid reference to local cyber-crime unit for physical interdiction.'
      ]
    },
    investigationCase: {
      id: 'CASE-2026-904',
      title: 'Dossier on Delhi CBI Digital Arrest Fraud',
      scamCategory: 'Digital Arrest / CBI Impersonation',
      threatLevel: 'Critical',
      dateCreated: '2026-06-23T11:18:34',
      victimName: 'Dr. Ramesh S.',
      financialAmount: '₹14,50,000',
      phoneNumbers: ['+91 91048-28192'],
      muleAccounts: ['HDFC Bank 501004312'],
      status: 'Under Investigation',
      timeline: [
        { time: '10:15 AM', event: 'Victim receives WhatsApp voice call posing as Fedex/CBI automated system', source: 'Telco Log' },
        { time: '10:20 AM', event: 'Caller redirects victim to "Inspector Vijay Kumar" on Skype video, displaying fake police station background', source: 'Victim Report' },
        { time: '10:45 AM', event: 'Suspect issues digital arrest warrant under forged signature of Director CBI', source: 'Uploaded Image' },
        { time: '11:05 AM', event: 'Victim attempts to transfer savings of ₹14.5 Lakhs. Bank system flags transaction internally; Sentinel AI is triggered.', source: 'API Telemetry' }
      ],
      evidenceChain: [
        { id: 'E-01', type: 'Audio', name: 'CBI Caller Voice Memo.wav', hash: 'SHA256: 4b921faefc893902', verified: true },
        { id: 'E-02', type: 'Document', name: 'Forged CBI Arrest Memo.pdf', hash: 'SHA256: ab2093f18e90d238', verified: true },
        { id: 'E-03', type: 'Screenshot', name: 'Skype Video Frame Call.png', hash: 'SHA256: d8372bf901c08273', verified: false }
      ],
      notes: [
        'Background noise on audio file contains heavy hum characteristic of standard calling center setup.',
        'Metadata on CBI PDF reveals it was created in MS Word 2016 under user name "Admin", using generic templates.',
        'Urgent coordinated action requested to freeze the destination HDFC account before cash-out via ATMs in Jamtara.'
      ]
    },
    firDraft: {
      policeStation: 'Cyber Crime Police Station',
      district: 'South Delhi District',
      state: 'Delhi',
      complainantName: 'Dr. Ramesh S.',
      complainantContact: '+91 98112-XXXXX',
      suspectDetails: 'Posing as Inspector Vijay Kumar, operating SIM +91 91048-28192, and utilizing HDFC account 501004312.',
      offenseSection: [
        'Section 66D IT Act (Cheating by personation)',
        'Section 419 IPC (Punishment for cheating by personation)',
        'Section 420 IPC (Cheating and dishonestly inducing delivery of property)',
        'Section 170 IPC (Personating a public servant)'
      ],
      incidentNarrative: 'The complainant was contacted by a person pretending to be CBI Inspector Vijay Kumar. The suspect stated that a courier package containing 140g of MDMA tied to complainant\'s Aadhaar was seized. The suspect threatened immediate arrest and coercion under the Official Secrets Act, instructing the victim to stay on a video feed for hours ("Digital Arrest") and forced him to transfer savings of ₹14,50,000 for clearing. This is a severe criminal impersonation and electronic fraud ring.',
      timestamp: '2026-06-23T11:18:34',
      amountLost: '₹14,50,000'
    }
  },
  {
    id: 'fedex_customs_scam',
    title: 'FedEx Customs Fraud',
    headline: 'Fake Customs Officer: Drug intercept package blackmail',
    inputText: `FEDEX EXPRESS INCIDENT REPORT: Your tracking ID FD-82710-IN has been blocked. We found 5 illegal passports, 8 active credit cards, and 210g MDMA (Synthetic Narcotic). The Narcotics Control Bureau (NCB) Mumbai division has launched a criminal dossier against you. Call Cyber Narcotics Officer Mr. Sameer Wankhede immediately at +91 88204-10294. Any delay will be treated as an attempt to flee the country. Your bank accounts are being monitored for immediate freeze.`,
    scamCategory: 'FedEx Courier & Customs Scams',
    threatLevel: 'High',
    financialLoss: '₹4,80,000',
    scamResult: {
      probability: 91,
      threatLevel: 'High',
      category: 'Courier / Customs Intercept Fraud',
      explanation: 'Posing as an official courier company (FedEx) cooperating with the Narcotics Control Bureau. Suspects claim illegal drugs and multiple passports were caught under your identity, creating massive legal anxiety to extract high-value "bail" fees.',
      evidence: [
        'Impersonation of FedEx Express security division',
        'Impersonation of Narcotics Control Bureau (NCB)',
        'Claim of drug intercept (MDMA) tied to identity',
        'Urgent threat of border blockage & arrest',
        'Demand to call Mr. Sameer Wankhede (fake public officer name)'
      ],
      psychologicalIndicators: {
        urgency: 9,
        authorityImpersonation: true,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: false
      },
      urgencyScore: 88,
      financialRiskEstimate: '₹4,80,000 (Processing charges requested)',
      recommendedActions: [
        'Hang up and ignore all subsequent WhatsApp messages.',
        'FedEx and NCB never connect with citizens via random personal cell numbers.',
        'Do not share copies of your passport, Aadhaar, or signatures.',
        'File an instant ticket on cybercrime.gov.in.'
      ],
      explainabilityText: 'Sentinel AI flagged this as a high-threat courier scam. The signature warning signs are the reference to Narcotics units, a fictitious parcel holding drugs, and the pressure to transfer standard legal "arbitration" funds via UPI to prevent jail.'
    },
    networkData: {
      nodes: [
        { id: 'v2', label: 'Victim: Ankita Roy', type: 'Victim', status: 'Secure', details: 'UX Designer in Bengaluru', location: 'Bengaluru' },
        { id: 'f2', label: 'Suspect: "Sameer Wankhede"', type: 'Fraudster', status: 'Flagged', details: 'Operating calling cell out of Mewat', location: 'Mewat' },
        { id: 'p2', label: '+91 88204-10294', type: 'Phone', status: 'Flagged', details: 'SIM active with Bihar registration', location: 'Bihar Circle' },
        { id: 'a3', label: 'UPI ID: fedex.pay@oksbi', type: 'Account', status: 'Flagged', details: 'Mule merchant account', location: 'Haryana' },
        { id: 'd2', label: 'Device: Vivo Y21', type: 'Device', status: 'Flagged', details: 'IMEI: 351902847192019', location: 'Gurugram' }
      ],
      links: [
        { source: 'f2', target: 'p2', label: 'Rings Victim', type: 'Communicated' },
        { source: 'p2', target: 'v2', label: 'WhatsApp Threat', type: 'Communicated' },
        { source: 'v2', target: 'a3', label: 'UPI Transaction Sent', type: 'Transacted' },
        { source: 'f2', target: 'd2', label: 'Operates Phone', type: 'Shared' },
        { source: 'd2', target: 'a3', label: 'Linked Terminal', type: 'Shared' }
      ],
      networkRiskScore: 89,
      fraudRingConfidence: 91,
      connectionsCount: 5,
      criticalLeads: [
        'UPI ID has high-frequency transfers ranging exactly ₹50,000 to avoid bank pan-card audit limits.',
        'SIM cell coordinates place the active handset in Mewat cyber belt.'
      ]
    },
    policeLeads: {
      id: 'L-002',
      title: 'Mewat FedEx Impersonation Cell',
      severity: 'High',
      category: 'Customs Intercept Fraud',
      timestamp: '2026-06-23T08:30:00',
      status: 'Open',
      leads: [
        'Device Vivo Y21 IMEI is operating on cell tower MEW-492, Haryana.',
        'UPI alias fedex.pay@oksbi belongs to local cyber operator flagged in 3 complaints.'
      ],
      suggestedActions: [
        'Issue nationwide block on IMEI 351902847192019.',
        'Deactivate UPI handle immediately through National Payments Corporation of India (NPCI).'
      ]
    },
    investigationCase: {
      id: 'CASE-2026-102',
      title: 'Mewat Courier Scam Dossier',
      scamCategory: 'Courier / Customs Intercept Fraud',
      threatLevel: 'High',
      dateCreated: '2026-06-23T08:30:00',
      victimName: 'Ankita Roy',
      financialAmount: '₹4,80,000',
      phoneNumbers: ['+91 88204-10294'],
      muleAccounts: ['UPI: fedex.pay@oksbi'],
      status: 'New',
      timeline: [
        { time: '08:00 AM', event: 'Phishing SMS delivered claiming FedEx tracking holds narcotics', source: 'Gateway SMS' },
        { time: '08:15 AM', event: 'Victim calls support number; suspect claims NCB Mumbai division is issuing notice', source: 'CDR Call Log' },
        { time: '08:25 AM', event: 'Victim executes ₹4.8 Lakh transfer to prevent arrest', source: 'NPCI Log' }
      ],
      evidenceChain: [
        { id: 'E-04', type: 'Text', name: 'Fedex SMS alert.txt', hash: 'SHA256: e8203efbc10', verified: true }
      ],
      notes: [
        'Caller speaks heavily accented English with regional Mewat dialect.'
      ]
    },
    firDraft: {
      policeStation: 'Cyber Crime Cell Bengaluru',
      district: 'Bengaluru District',
      state: 'Karnataka',
      complainantName: 'Ankita Roy',
      complainantContact: '+91 99011-XXXXX',
      suspectDetails: 'FedEx Impersonators calling from +91 88204-10294, using UPI: fedex.pay@oksbi.',
      offenseSection: [
        'Section 66C IT Act',
        'Section 66D IT Act',
        'Section 420 IPC'
      ],
      incidentNarrative: 'The complainant received an SMS claiming an illegal package of MDMA was intercepted by NCB in Mumbai under her name. Out of severe panic and fear of public arrest, complainant sent ₹4,80,000 to the suspect\'s UPI ID fedex.pay@oksbi as "customs clearance and security bail". Suspects turned off their mobile immediately after the transaction.',
      timestamp: '2026-06-23T08:30:00',
      amountLost: '₹4,80,000'
    }
  },
  {
    id: 'upi_refund_fraud',
    title: 'UPI PIN Request Refund Scam',
    headline: 'GPay/PhonePe Cash Back Phishing link',
    inputText: `IMPORTANT GPAY REFUND: Dear customer, GooglePay Cash Reward is waiting for you. You have been awarded ₹25,000 in your bank as a refund. To complete the automated credit, tap the transaction link: upi-claim-paytm://verify-pay?id=28192 and input your secret UPI PIN to complete authorization. Claim within 10 mins or money will be refunded to Google.`,
    scamCategory: 'UPI Fraud',
    threatLevel: 'Medium',
    financialLoss: '₹25,000',
    scamResult: {
      probability: 85,
      threatLevel: 'Medium',
      category: 'UPI Refund / Cashback Phishing',
      explanation: 'Standard reverse-transaction fraud. The attacker sends a request crafted to look like a refund credit. Clicking the link prompts you to input your UPI PIN. A UPI PIN is strictly for DEBITING money, not CREDITING. You never need to enter your PIN to receive money.',
      evidence: [
        'Fraudulent claiming link using custom protocol schema',
        'Mandate to enter UPI PIN to receive money (Major Red Flag)',
        'Artificial psychological countdown (10 minutes urgency)',
        'Misuse of GPay brand imagery and trademark names'
      ],
      psychologicalIndicators: {
        urgency: 8,
        authorityImpersonation: false,
        fearInducement: false,
        financialLure: true,
        secrecyDemand: false
      },
      urgencyScore: 78,
      financialRiskEstimate: '₹25,000 (Account compromise limit)',
      recommendedActions: [
        'Do NOT tap the link or open the UPI application.',
        'Never enter your UPI PIN to receive money.',
        'Block the sender immediately on your SMS app.',
        'Report the mobile number as spam on Truecaller.'
      ],
      explainabilityText: 'UPI rules dictate that entering a UPI PIN always authorizes a cash withdrawal (debit) from your own bank. The request to input a PIN to "accept" a ₹25,000 reward is a definitive signal of phishing.'
    },
    networkData: {
      nodes: [
        { id: 'v3', label: 'Victim: Mohit Verma', type: 'Victim', status: 'Secure', details: 'Student at DU', location: 'Delhi' },
        { id: 'f3', label: 'Suspect: "UPI-Crediter"', type: 'Fraudster', status: 'Flagged', details: 'Operating via bulk SMS gateways', location: 'Unknown' },
        { id: 'p3', label: '+91 72038-19302', type: 'Phone', status: 'Flagged', details: 'SIM card registered in rural Assam', location: 'Assam Circle' },
        { id: 'a4', label: 'UPI Handle: claim.reward@paytm', type: 'Account', status: 'Flagged', details: 'Merchant ID routing immediately to e-wallets', location: 'Kolkata' }
      ],
      links: [
        { source: 'f3', target: 'p3', label: 'Sent Bulk SMS', type: 'Communicated' },
        { source: 'p3', target: 'v3', label: 'Delivered link', type: 'Communicated' },
        { source: 'v3', target: 'a4', label: 'PIN compromise route', type: 'Transacted' }
      ],
      networkRiskScore: 72,
      fraudRingConfidence: 85,
      connectionsCount: 4,
      criticalLeads: [
        'The SMS was delivered via a bulk gateway registered to "FAST-CREDIT-CORP". IP logs trace back to an office in Salt Lake, Kolkata.'
      ]
    },
    policeLeads: {
      id: 'L-003',
      title: 'Salt Lake Phishing Gateway',
      severity: 'Medium',
      category: 'UPI Cashback Phishing',
      timestamp: '2026-06-23T06:00:00',
      status: 'Resolved',
      leads: [
        'Bulk SMS sender tied to merchant account claim.reward@paytm was blocked.'
      ],
      suggestedActions: [
        'Coordinated block with SMS gateway operators.'
      ]
    },
    investigationCase: {
      id: 'CASE-2026-441',
      title: 'UPI Phishing Dossier',
      scamCategory: 'UPI Fraud',
      threatLevel: 'Medium',
      dateCreated: '2026-06-23T06:00:00',
      victimName: 'Mohit Verma',
      financialAmount: '₹25,000',
      phoneNumbers: ['+91 72038-19302'],
      muleAccounts: ['claim.reward@paytm'],
      status: 'Closed',
      timeline: [
        { time: '05:30 AM', event: 'Bulk SMS delivered to customer list', source: 'Telecom Gateway' },
        { time: '05:40 AM', event: 'Victim clicks link and enters UPI PIN in GPay app', source: 'App Trace' }
      ],
      evidenceChain: [
        { id: 'E-05', type: 'Text', name: 'Phishing SMS details.txt', hash: 'SHA256: cc40921a', verified: true }
      ],
      notes: [
        'Quick enforcement saved ₹20,000 due to prompt local bank dispute lock.'
      ]
    },
    firDraft: {
      policeStation: 'Cyber Cell North Delhi',
      district: 'North Delhi',
      state: 'Delhi',
      complainantName: 'Mohit Verma',
      complainantContact: '+91 97110-XXXXX',
      suspectDetails: 'Bulk SMS sender disguised as GooglePay agent via SIM +91 72038-19302.',
      offenseSection: [
        'Section 66D IT Act',
        'Section 420 IPC'
      ],
      incidentNarrative: 'The complainant was sent a deceitful GPay cashback SMS. On opening the link, he was requested to authenticate a credit of ₹25,000 by entering his secret UPI PIN. This resulted in an instant unauthorized debit of ₹25,000 from his account.',
      timestamp: '2026-06-23T06:00:00',
      amountLost: '₹25,000'
    }
  },
  {
    id: 'deepfake_voice_scam',
    title: 'Deepfake Voice Cloning (Kidnapping Scam)',
    headline: 'Voice cloned ransomware: Panic kidnapping trap',
    inputText: `[Voice Recording Transcript] "Papa, please listen to me! I got into a bad car accident here in Delhi, and these people are holding me in a room. They say if you do not transfer ₹2,00,000 right now to UPI ID family.save@oksbi, they will break my legs or worse! Please, they are beating me, please transfer it right now, they have my phone!"`,
    scamCategory: 'Deepfake Voice / Ransom Scam',
    threatLevel: 'Critical',
    financialLoss: '₹2,00,000',
    scamResult: {
      probability: 96,
      threatLevel: 'Critical',
      category: 'AI Voice Cloning & Virtual Kidnapping',
      explanation: 'The voice recording matches the emotional profile of the victim\'s daughter but contains distinct high-frequency generative indicators. This is an AI voice clone synthesized from her public social media reels, paired with artificial background slap-sounds to create intense anxiety.',
      evidence: [
        'Acoustic fingerprint reveals robotic prosody matching ElevenLabs/VASA engines',
        'Inconsistent breathing patterns (no physiological gasps during high distress speech)',
        'Identical vocal formants matched to social media source material',
        'Coercion to pay ransom instantly while blocking calling lines'
      ],
      psychologicalIndicators: {
        urgency: 10,
        authorityImpersonation: false,
        fearInducement: true,
        financialLure: false,
        secrecyDemand: true
      },
      urgencyScore: 100,
      financialRiskEstimate: '₹2,00,000 (Immediate demands)',
      recommendedActions: [
        'Do not transfer any money.',
        'Call your child\'s physical colleagues or hostel supervisor directly.',
        'Use an alternative cellular device to contact your child.',
        'Run the audio file through Sentinel AI Deepfake Lab for immediate voice safety verification.'
      ],
      explainabilityText: 'Sentinel AI flagged this at 96% confidence for voice cloning. Formant analysis shows structural anomalies in vocal tract representation and zero natural nasal exhalation during long phrases. This voice was synthesized using an online clone API.'
    },
    deepfakeData: {
      isFake: true,
      probability: 96,
      confidenceLevel: 98,
      technicalIndicators: {
        voiceCloning: true,
        artificialSpeechRatio: 92,
        lipSyncInconsistency: 0,
        audioArtifactsScore: 84,
        noiseInconsistencies: true
      },
      waveformPoints: [12, 45, 98, 23, -45, -90, -12, 60, 110, 5, -80, -34, 12, 85, 95, -15, -75, -5, 43, 90, 12, -45, -99, -15, 55],
      spectralAnomalies: [
        'Robotic pitch flattening: Artificial vocoder hum at 4.2 kHz frequency band.',
        'Breath anomalies: Zero inhalation gap observed over a 14-second rapid continuous sentence block.',
        'Formant alignment: Perfect mathematical match to a public 15-second Instagram audio clip.'
      ],
      findingsExplanation: 'Analysis reveals an ElevenLabs high-fidelity multi-lingual synthesis model was used to clone the speaker\'s vocal signature. The synthetic audio tracks show highly unnatural phase coherence.'
    },
    networkData: {
      nodes: [
        { id: 'v4', label: 'Victim: Alok Saxena', type: 'Victim', status: 'Secure', details: 'Senior citizen in Lucknow', location: 'Lucknow' },
        { id: 'child', label: 'Child: Riya Saxena', type: 'Victim', status: 'Secure', details: 'Student at IIT Delhi (Actually in class)', location: 'Delhi' },
        { id: 'f4', label: 'AI Attacker', type: 'Fraudster', status: 'Flagged', details: 'Cyber blackmail group using cloned vocal profiles', location: 'Bharatpur' },
        { id: 'a5', label: 'UPI Handle: family.save@oksbi', type: 'Account', status: 'Flagged', details: 'Mule wallet registered under pre-activated identity', location: 'Rajasthan' },
        { id: 'p4', label: '+91 70192-38471', type: 'Phone', status: 'Flagged', details: 'Burner SIM registered in Jaipur', location: 'Jaipur' }
      ],
      links: [
        { source: 'f4', target: 'p4', label: 'Spoofs caller ID', type: 'Communicated' },
        { source: 'p4', target: 'v4', label: 'Transmits AI Voice', type: 'Communicated' },
        { source: 'f4', target: 'a5', label: 'Links payout route', type: 'Registered' },
        { source: 'v4', target: 'a5', label: 'Panicked Transfer Intent', type: 'Transacted' }
      ],
      networkRiskScore: 97,
      fraudRingConfidence: 98,
      connectionsCount: 5,
      criticalLeads: [
        'The suspect voice was compiled using a public video of Riya Saxena uploaded to YouTube on March 14, 2026.',
        'UPI ID has been linked to three similar virtual kidnapping cases logged in Uttar Pradesh and Rajasthan within the last 12 hours.'
      ]
    },
    policeLeads: {
      id: 'L-004',
      title: 'Bharatpur Virtual Kidnap Cell',
      severity: 'Critical',
      category: 'AI Voice Cloning Ransom',
      timestamp: '2026-06-23T11:00:00',
      status: 'Open',
      leads: [
        'Sender SIM +91 70192-38471 is operating on cell tower BHT-11, Rajasthan.',
        'UPI ID: family.save@oksbi corresponds to a bank card belonging to a mule in Jaipur.'
      ],
      suggestedActions: [
        'Direct State Bank of India to freeze account linked to family.save@oksbi immediately.',
        'Initiate urgent trace with Lucknow and Rajasthan Police cyber commands.'
      ]
    },
    investigationCase: {
      id: 'CASE-2026-993',
      title: 'AI Voice Clone Kidnapping Case',
      scamCategory: 'Deepfake Voice / Ransom Scam',
      threatLevel: 'Critical',
      dateCreated: '2026-06-23T11:00:00',
      victimName: 'Alok Saxena',
      financialAmount: '₹2,00,000',
      phoneNumbers: ['+91 70192-38471'],
      muleAccounts: ['family.save@oksbi'],
      status: 'Enforcement Action',
      timeline: [
        { time: '10:50 AM', event: 'Victim receives call with voice of his daughter screaming for help', source: 'Telco' },
        { time: '10:55 AM', event: 'Suspect demands ₹2,00,000 instantly, warning him not to disconnect', source: 'Victim Report' },
        { time: '11:00 AM', event: 'Victim triggers Sentinel AI to check voice sample integrity; clone detected', source: 'Sentinel lab' }
      ],
      evidenceChain: [
        { id: 'E-06', type: 'Audio', name: 'Virtual Ransom Call.wav', hash: 'SHA256: ee8192a0', verified: true }
      ],
      notes: [
        'Highly urgent. Daughter is confirmed safe and physically present in class at IIT Delhi. No accident occurred.'
      ]
    },
    firDraft: {
      policeStation: 'Hazratganj Cyber Police Station',
      district: 'Lucknow District',
      state: 'Uttar Pradesh',
      complainantName: 'Alok Saxena',
      complainantContact: '+91 94150-XXXXX',
      suspectDetails: 'AI Fraudsters using cloned voice of Alok\'s daughter, calling from +91 70192-38471, and requiring UPI payment to family.save@oksbi.',
      offenseSection: [
        'Section 66D IT Act',
        'Section 384 IPC (Extortion)',
        'Section 419 IPC',
        'Section 420 IPC'
      ],
      incidentNarrative: 'The complainant received an extortionate call from mobile +91 70192-38471. The caller played a cloned voice of complainant\'s daughter, who was screaming that she was kidnapped after a car accident and needed ₹2,00,000 ransom instantly sent to UPI family.save@oksbi to avoid physical harm. This is a highly coercive virtual kidnapping fraud utilizing advanced generative AI technology.',
      timestamp: '2026-06-23T11:00:00',
      amountLost: '₹2,00,000'
    }
  }
];
