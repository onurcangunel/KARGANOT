import PageHeader from '@/components/ui/PageHeader';

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Gizlilik Politikası" description="Verilerinizi nasıl koruduğumuzu öğrenin" />
      <p>
        KARGANOT, kullanıcı verilerini yalnızca hizmet sunumu ve iyileştirme amacıyla işler, üçüncü taraflarla izinsiz paylaşmaz.
      </p>
    </div>
  );
}
