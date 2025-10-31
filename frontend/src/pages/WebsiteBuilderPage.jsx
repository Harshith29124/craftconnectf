import React from 'react';
import { EmptyStates } from '../components/EmptyState';

const WebsiteBuilderPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyStates.Website />
      </div>
    </div>
  );
};

export default WebsiteBuilderPage;