import PageHeader from '@/components/ui/PageHeader';

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sıkça Sorulan Sorular" description="Platform hakkında merak ettikleriniz" />
      <p>
        Hesap, not yükleme, moderasyon ve ödeme süreçleriyle ilgili sık sorulan soruları burada bulabilirsiniz.
      </p>
    </div>
  );
}
