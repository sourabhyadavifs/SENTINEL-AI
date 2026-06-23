import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Mail, Send } from 'lucide-react';
import { FIRDraft } from '../types';

interface ComplaintGeneratorProps {
  firData?: FIRDraft;
}

export default function ComplaintGenerator({ firData }: ComplaintGeneratorProps) {
  const [complainant, setComplainant] = useState(firData?.complainantName || 'Dr. Ramesh S.');
  const [contact, setContact] = useState(firData?.complainantContact || '+91 98112-XXXXX');
  const [suspect, setSuspect] = useState(firData?.suspectDetails || 'Posing as CBI Inspector Vijay Kumar (+91 91048-28192)');
  const [amount, setAmount] = useState(firData?.amountLost || '₹14,50,000');
  const [narrative, setNarrative] = useState(firData?.incidentNarrative || 'Victim was coerced into staying on Skype call ("Digital Arrest") under threats of narcotics drugs link, and forced to transfer savings of ₹14,50,000 for clearing.');
  const [isCopied, setIsCopied] = useState(false);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Printing is restricted or blocked by the parent frame environment:', err);
    }
  };

  const handleCopy = () => {
    const text = `
FIRST INFORMATION REPORT (FIR) DRAFT
PREPARED UNDER THE INDEPENDENT CYBER DEFENSE TERMINAL (SENTINEL AI)

POLICE STATION: Cyber Crime Police Station
DISTRICT: Cyber Operations Wing, New Delhi
STATE: Delhi NCR

1. COMPLAINANT NAME: ${complainant}
2. CONTACT NO: ${contact}
3. SUSPECT DETAILS: ${suspect}
4. ESTIMATED LOSS: ${amount}
5. SECTIONS APPLIED: 
   - Section 66D IT Act (Cheating by personation)
   - Section 419 IPC (Cheating by personation)
   - Section 420 IPC (Cheating and fraud)
   - Section 170 IPC (Personating a public servant)

6. DETAILED SUMMARY OF EVENT:
${narrative}

--------------------------------------------------
Generated on: ${new Date().toLocaleString()}
    `;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      
      {/* Draft configuration form left */}
      <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
        
        <div className="space-y-4">
          <div className="border-b border-zinc-900 pb-3 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Dossier Builder</h4>
          </div>

          <div className="space-y-3.5 text-xs">
            
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Complainant Name</label>
              <input
                type="text"
                value={complainant}
                onChange={e => setComplainant(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Complainant Phone / Email</label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Suspect Bank/SIM Details</label>
              <input
                type="text"
                value={suspect}
                onChange={e => setSuspect(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Amount Extorted</label>
              <input
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Narrative Timeline Details</label>
              <textarea
                value={narrative}
                rows={4}
                onChange={e => setNarrative(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-[11px] leading-relaxed"
              />
            </div>

          </div>
        </div>

        {/* Builder Status */}
        <div className="pt-4 mt-4 border-t border-zinc-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">Draft structured under Ministry of Home Affairs rules</span>
        </div>

      </div>

      {/* Official Legal Draft output view right */}
      <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">COURT-READY DRAFT PREVIEW</span>
            <div className="flex items-center gap-2">
              
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-white rounded text-[10px] font-mono uppercase transition flex items-center gap-1"
              >
                {isCopied ? 'Copied!' : 'Copy Text'}
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-mono uppercase transition flex items-center gap-1"
              >
                <Printer className="w-3 h-3" /> Print
              </button>

            </div>
          </div>

          {/* Styled Document container */}
          <div className="bg-black/40 border border-zinc-900 rounded p-6 font-mono text-zinc-300 text-xs space-y-4 shadow-inner leading-relaxed overflow-y-auto max-h-[380px] print:bg-white print:text-black">
            
            <div className="text-center border-b border-dashed border-zinc-800 pb-4">
              <h2 className="font-bold text-sm tracking-widest text-white print:text-black uppercase">INDIAN CYBER CRIME COORDINATION CENTER (I4C)</h2>
              <p className="text-[10px] text-zinc-500 uppercase mt-1">FORENSIC COMPLAINT & FIR COMPILATION DOSSIER</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] border-b border-dashed border-zinc-900 pb-4">
              <div>
                <span className="text-zinc-600 block">GENERATING STATION:</span>
                <strong>Cyber Crime Cell, New Delhi HQ</strong>
              </div>
              <div>
                <span className="text-zinc-600 block">SYSTEM IDENTIFIER:</span>
                <strong>SENTINEL-AISTUDIO-v3.8</strong>
              </div>
            </div>

            <div className="space-y-3 text-[11px]">
              <div>
                <span className="text-zinc-600">A. COMPLAINANT IDENTIFICATION RECORD</span>
                <p className="pl-3 mt-1 text-zinc-100">Name: <strong>{complainant}</strong> <br /> Contact coordinates: {contact}</p>
              </div>

              <div>
                <span className="text-zinc-600">B. ACCUSED SYNDICATE LEDGER INDEX</span>
                <p className="pl-3 mt-1 text-zinc-100">Suspect indices: <strong>{suspect}</strong></p>
              </div>

              <div>
                <span className="text-zinc-600">C. FORENSIC LOSS SUMMARY</span>
                <p className="pl-3 mt-1 text-zinc-100">Total Damage Valuation: <strong className="text-red-400">{amount}</strong></p>
              </div>

              <div>
                <span className="text-zinc-600">D. APPLICABLE STATUTORY CLAUSES</span>
                <ul className="pl-6 list-disc mt-1 text-zinc-400 space-y-0.5 text-[10px]">
                  <li>Section 66D of Information Technology Act - Cheating by personation using computer resources.</li>
                  <li>Section 419 of Indian Penal Code (IPC) - Punishment for cheating by personation.</li>
                  <li>Section 420 of Indian Penal Code (IPC) - Cheating and dishonestly inducing delivery of property.</li>
                  <li>Section 170 of Indian Penal Code (IPC) - Personating a public servant.</li>
                </ul>
              </div>

              <div>
                <span className="text-zinc-600">E. INCIDENT CHRONOLOGICAL SUMMARY</span>
                <p className="pl-3 mt-1.5 text-zinc-200 border-l border-emerald-500/50 italic leading-relaxed text-[11px]">
                  "{narrative}"
                </p>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-dashed border-zinc-900 text-[10px] text-zinc-500">
              *** END OF FORENSIC COMPLAINT DATA SHEET ***
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-4 pt-3 border-t border-zinc-900">
          <span>SECURED DOCUMENT COMPILATION</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> VERIFIED SIGNATURE STAMPED
          </span>
        </div>

      </div>

    </div>
  );
}
