// import React from 'react'

import TopBar from '../../shared/components/TopBar';
import HotStoreList from '../../shared/components/HotStoreList';

const HotStores = () => {
  return (
    <div>
      <TopBar text="지금 핫한 매장" />
      <HotStoreList />
    </div>
  );
};

export default HotStores;
