import { Suspense } from 'react';
import SettingsForm from '@/components/admin/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Configure your store settings</p>
      </div>

      <Suspense fallback={<div>Loading settings...</div>}>
        <SettingsForm />
      </Suspense>
    </div>
  );
}
