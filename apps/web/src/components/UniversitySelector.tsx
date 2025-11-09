"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Opt = { id: string; ad: string };

export default function UniversitySelector() {
  const [query, setQuery] = useState("");
  const [universiteler, setUniversiteler] = useState<Opt[]>([]);
  const [fakulteler, setFakulteler] = useState<Opt[]>([]);
  const [bolumler, setBolumler] = useState<Opt[]>([]);

  const [selectedUni, setSelectedUni] = useState<Opt | null>(null);
  const [selectedFac, setSelectedFac] = useState<Opt | null>(null);

  // Üni arama
  useEffect(() => {
    const t = setTimeout(async () => {
      if (query.length < 2) return setUniversiteler([]);
      const res = await axios.get(`/api/v1/universiteler`, { params: { search: query } });
      setUniversiteler(res.data || []);
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  // Fakülte getir
  useEffect(() => {
    (async () => {
      if (!selectedUni) return setFakulteler([]);
      const res = await axios.get(`/api/v1/universiteler/${selectedUni.id}/fakulteler`);
      setFakulteler(res.data || []);
    })();
  }, [selectedUni]);

  // Bölüm getir
  useEffect(() => {
    (async () => {
      if (!selectedFac) return setBolumler([]);
      const res = await axios.get(`/api/v1/fakulteler/${selectedFac.id}/bolumler`);
      setBolumler(res.data || []);
    })();
  }, [selectedFac]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Üniversite</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Üniversite ara... (örn. İstanbul, Muğla)"
          className="w-full rounded-lg border px-3 py-2"
        />
        {universiteler.length > 0 && (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {universiteler.map((u) => (
              <button
                key={u.id}
                onClick={() => { setSelectedUni(u); setSelectedFac(null); setBolumler([]); }}
                className={`text-left border rounded-lg px-3 py-2 hover:bg-gray-50 ${selectedUni?.id === u.id ? 'ring-2 ring-blue-500' : ''}`}
              >{u.ad}</button>
            ))}
          </div>
        )}
      </div>

      {selectedUni && (
        <div>
          <label className="block text-sm font-medium mb-1">Fakülte</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {fakulteler.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFac(f)}
                className={`text-left border rounded-lg px-3 py-2 hover:bg-gray-50 ${selectedFac?.id === f.id ? 'ring-2 ring-blue-500' : ''}`}
              >{f.ad}</button>
            ))}
          </div>
        </div>
      )}

      {selectedFac && (
        <div>
          <label className="block text-sm font-medium mb-1">Bölüm</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {bolumler.map((b) => (
              <span key={b.id} className="border rounded-lg px-3 py-2 bg-white">{b.ad}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
