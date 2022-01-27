import React from 'react';
import { useRecoilValue } from 'recoil';
import { authentication } from '../store';

function Dashboard() {
  const auth = useRecoilValue(authentication)
  return <div className='container'>Welcome {auth.user.name}</div>;
}

export default Dashboard;
