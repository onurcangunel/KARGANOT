
"use client";
import { motion } from "framer-motion";

const team = [
  {
    name: "Onur Can Güneş",
    role: "Kurucu & Yazılım Mühendisi",
    desc: "Yapay zeka, eğitim teknolojileri ve girişimcilik tutkunu.",
    img: "/image/team-onur.png"
  },
  {
    name: "Ayşe Yıldız",
    role: "Tasarımcı",
    desc: "Kullanıcı deneyimi ve arayüz tasarımında uzman.",
    img: "/image/team-ayse.png"
  },
  {
    name: "Mehmet Demir",
    role: "Eğitim Gönüllüsü",
    desc: "Öğrenci toplulukları ve sosyal sorumluluk projelerinde aktif.",
    img: "/image/team-mehmet.png"
  }
];


export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#007aff]/10 via-white to-[#00d4ff]/10 dark:from-gray-950 dark:via-gray-950 dark:to-black px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 bg-gradient-to-r from-[#007aff] via-[#00d4ff] to-purple-500 bg-clip-text text-transparent">Ekibimizi Tanıyın</h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-2">KARGANOT, genç mühendisler, tasarımcılar ve eğitim gönüllülerinden oluşan bir ekip tarafından geliştirildi.</p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              whileHover={{ scale: 1.05, boxShadow: "0 0 0 4px #00d4ff" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-7 flex flex-col items-center text-center border border-gray-100 dark:border-white/10 hover:border-[#00d4ff]"
            >
              <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mb-4 border-4 border-[#007aff] dark:border-[#00d4ff] object-cover" />
              <h4 className="text-lg font-semibold mb-1 text-[#007aff] dark:text-[#00d4ff]">{member.name}</h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{member.role}</span>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center mt-8"
      >
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">Ekibimize katılmak ister misin?</p>
        <a href="mailto:kariyer@karganot.com" className="inline-block px-6 py-3 rounded-full bg-[#007aff] text-white dark:bg-[#00d4ff] dark:text-black font-bold shadow hover:scale-105 transition">Başvur</a>
      </motion.section>
    </main>
  );
}
