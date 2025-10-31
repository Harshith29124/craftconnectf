import React from 'react';
import { EmptyStates } from '../components/EmptyState';

const InstagramIntegrationPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyStates.Instagram />
      </div>
    </div>
  );
};

export default InstagramIntegrationPage;