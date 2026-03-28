/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { NetworkSecurityDashboard } from './components/NetworkSecurityDashboard';
import { DataSecurityDashboard } from './components/DataSecurityDashboard';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'network' | 'data'>('network');

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'network' ? (
        <NetworkSecurityDashboard />
      ) : (
        <DataSecurityDashboard />
      )}
    </DashboardLayout>
  );
}
