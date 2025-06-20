import { MigrationMethodsInteractiveMap } from "@/components/migration-methods-interactive-map"

export default function InteractiveMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">نقشه تعاملی روش‌های مهاجرت</h1>
          <p className="text-gray-600">کشورها و روش‌های مهاجرتی مختلف را روی نقشه جهان کشف کنید</p>
        </div>
        <MigrationMethodsInteractiveMap />
      </div>
    </div>
  )
}
