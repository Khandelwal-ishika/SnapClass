import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { WebCamCapture } from '../common/WebCamCapture';
import { Camera, Upload, Trash2, Check, Image as ImageIcon } from 'lucide-react';

interface AddPhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  onAddPhoto: (photoDataUrl: string) => void;
  onRemovePhoto: (index: number) => void;
}

export const AddPhotosModal: React.FC<AddPhotosModalProps> = ({
  isOpen,
  onClose,
  photos,
  onAddPhoto,
  onRemovePhoto,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleCapture = (dataUrl: string) => {
    onAddPhoto(dataUrl);
    showToast('Classroom angle captured and added to batch.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    showToast(`${files.length} snapshot${files.length !== 1 ? 's' : ''} uploaded.`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Capture / Upload Classroom Snapshots" maxWidth="xl">
      <div className="flex flex-col gap-5">
        <p className="text-xs text-slate-400 font-normal">
          Add one or multiple classroom angle snapshots to deep-scan for student faces.
        </p>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('camera')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition ${
              activeTab === 'camera'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Capture</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Files</span>
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium px-3 py-2 rounded-xl flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Camera Mode */}
        {activeTab === 'camera' && (
          <div>
            <WebCamCapture
              onCapture={handleCapture}
              buttonLabel="Capture Classroom Angle"
              showScanLaser={false}
            />
          </div>
        )}

        {/* Upload Mode */}
        {activeTab === 'upload' && (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 bg-slate-950 text-center relative group transition cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Click or drag photos here</h4>
            <p className="text-xs text-slate-400 font-normal max-w-xs">
              Supports JPG, JPEG, PNG. Multiple images can be uploaded simultaneously.
            </p>
          </div>
        )}

        {/* Gallery Thumbnails */}
        {photos.length > 0 && (
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Added Snapshots ({photos.length})
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1">
              {photos.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 aspect-square bg-slate-950">
                  <img src={img} alt={`Capture ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemovePhoto(idx)}
                    title="Remove Photo"
                    className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-slate-900/90 text-slate-300 text-[9px] font-mono font-bold px-1 rounded">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Done Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/25"
          >
            <Check className="w-4 h-4" />
            <span>Confirm ({photos.length} Snapshot{photos.length !== 1 ? 's' : ''} Staged)</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
