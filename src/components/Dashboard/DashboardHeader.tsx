import React from 'react';
import './DashboardHeader.css';
import CloseButton from '../common/CloseButton';

const DashboardHeader: React.FC = () => {
  return (
    <div className="dashboard-header">
      <span className='header-text'>Dashboard</span>
      <div className='header-spacer' />
      <CloseButton onClick={()=> {}} className='close-header-button'/>
    </div>
  );
};

export default DashboardHeader;