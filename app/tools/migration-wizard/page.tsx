import { MigrationMethodWizardAdvanced } from "@/components/migration-method-wizard-advanced"

export default function MigrationWizardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">ویزارد هوشمند انتخاب روش مهاجرت</h1>
          <p className="text-gray-600">
            با استفاده از ویزارد پیشرفته ما، مناسب‌ترین روش مهاجرتی را برای شرایط خود پیدا کنید
          </p>
        </div>
        <MigrationMethodWizardAdvanced />
      </div>
    </div>
  )
}
