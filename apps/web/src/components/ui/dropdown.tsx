import * as React from 'react';

export function Dropdown({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
      {children}
    </button>
  );
}
