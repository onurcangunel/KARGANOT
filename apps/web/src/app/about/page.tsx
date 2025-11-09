import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  return (
    <div className="space-y-6">
  <PageHeader title="Hakkımızda" description="KARGANOT’un hikayesi ve vizyonu" />
      <p>
        KARGANOT, 2025 yılında Türkiye’de öğrenciler arasında bilgi paylaşımını kolaylaştırmak amacıyla kurulmuştur. 
        Ders notları, sınav arşivleri ve topluluk katkılarıyla öğrenmeyi herkes için daha erişilebilir hale getirmeyi hedefler.
      </p>
    </div>
  );
}
