import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { Subject } from '../../types';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Send, Sparkles } from 'lucide-react';

interface ShareSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject | null;
}

export const ShareSubjectModal: React.FC<ShareSubjectModalProps> = ({
  isOpen,
  onClose,
  subject,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!subject) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://snapclass.app';
  const joinUrl = `${origin}?join-code=${subject.subject_code}`;

  const copyToClipboard = (text: string, isLink: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Join the course "${subject.name}" on SnapClass!\nCourse Code: ${subject.subject_code}\nRegistration Link: ${joinUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Enrollment Link: ${subject.name}`} maxWidth="lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* QR Code Section */}
          <div className="flex flex-col items-center bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Scan QR to Register
            </h4>
            <div className="bg-white p-3.5 rounded-xl shadow-md mb-3">
              <QRCodeSVG
                value={joinUrl}
                size={145}
                bgColor="#FFFFFF"
                fgColor="#0B0F19"
                level="Q"
                includeMargin={false}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Point phone camera to auto-join class
            </span>
          </div>

          {/* Code & Link Sharing Section */}
          <div className="flex flex-col gap-4">
            {/* Subject Code */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Course Registration Code
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-base font-bold text-cyan-300 tracking-wider">
                  {subject.subject_code}
                </div>
                <button
                  onClick={() => copyToClipboard(subject.subject_code, false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-2.5 rounded-xl cursor-pointer transition"
                  title="Copy code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct URL */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Direct Joining URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={joinUrl}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-400 truncate"
                />
                <button
                  onClick={() => copyToClipboard(joinUrl, true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl cursor-pointer transition shadow-sm"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-cyan-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Quick Share */}
            <button
              onClick={shareViaWhatsApp}
              className="bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm mt-1"
            >
              <Send className="w-4 h-4" />
              <span>Share to Student Group (WhatsApp)</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-400 font-normal">
          💡 When students scan this QR or click the URL, SnapClass will automatically open an instant 1-click enrollment confirmation.
        </div>
      </div>
    </Modal>
  );
};
