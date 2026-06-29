import React, { useState } from 'react';
import { useAdminMode } from '../store/useAdminMode';
import { useAuthStore } from '../store/useAuthStore';
import { Edit2, Check, X } from 'lucide-react';

export default function EditableBlock({ value, onSave, type = 'text', className = '' }) {
  const { isAdmin } = useAuthStore();
  const { isEditing } = useAdminMode();
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAdmin || !isEditing) {
    // If it's a textarea type, we probably want to render newlines properly.
    if (type === 'textarea' && typeof value === 'string') {
      return (
        <span className={className}>
          {value.split('\\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < value.split('\\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      );
    }
    return <span className={className}>{value}</span>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(tempValue);
    setIsSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className={`relative inline-block ${className} min-w-[150px] w-full`}>
        {type === 'textarea' ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full min-h-[100px] bg-white dark:bg-gray-800 text-ink dark:text-white border-2 border-gold rounded-lg p-3 text-sm z-50 relative outline-none shadow-xl"
            autoFocus
          />
        ) : (
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 text-ink dark:text-white border-2 border-gold rounded-lg px-3 py-1.5 z-50 relative outline-none shadow-xl"
            autoFocus
          />
        )}
        <div className="absolute -bottom-10 right-0 flex gap-2 z-[60]">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-emerald-600 disabled:opacity-50"
          >
            {isSaving ? '...' : <><Check className="w-3.5 h-3.5" /> Save</>}
          </button>
          <button 
            onClick={handleCancel} 
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-rose-600 disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <span 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setTempValue(value);
        setEditing(true);
      }}
      className={`group relative inline-block cursor-pointer border border-dashed border-transparent hover:border-gold rounded transition-all duration-200 ${className} hover:bg-gold/5`}
    >
      {type === 'textarea' && typeof value === 'string' ? (
        value.split('\\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < value.split('\\n').length - 1 && <br />}
          </React.Fragment>
        ))
      ) : (
        value
      )}
      <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gold text-white p-1.5 rounded-full shadow-lg z-10 pointer-events-none">
        <Edit2 className="w-3 h-3" />
      </div>
    </span>
  );
}
