import React from 'react';
import { X as CircleX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditModal({ isOpen, onClose, title, onSave, inputType = "text" }) {
  const [value, setValue] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white px-8 pb-8 rounded-xl shadow-lg w-[500px] max-w-full text-center">
        <div className="flex justify-end mt-5 items-center w-full">
          <CircleX size={20} onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="font-bold text-gray-900 mt-5 mb-6 text-xl">
          {title}
        </div>
        <Input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-4"
        />
        <div className='flex justify-end mt-8'><Button className='border' onClick={() => {
          onSave(value);
          onClose();
        }}>Save</Button></div>
      </div>
    </div>
  );
}

export default EditModal;