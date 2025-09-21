import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center coming-soon-page">
      <h1>Coming Soon!</h1>
      <p>We're working hard to bring you this feature. Stay tuned!</p>
      <button onClick={() => navigate('/')} className="btn btn--primary">
        Go Home
      </button>
    </div>
  );
};

export default ComingSoonPage;