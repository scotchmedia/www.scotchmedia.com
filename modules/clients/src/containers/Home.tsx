import HomeLayout from '../components/HomeLayout';
import React from 'react';
import { withSiteData } from 'react-static';

export default withSiteData(() => (
  <div>
    <HomeLayout />
  </div>
))
