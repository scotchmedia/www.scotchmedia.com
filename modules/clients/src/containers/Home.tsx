import HomeLayout from '../components/HomeLayout';
import React from 'react';
import { Head } from 'react-static';
import { withSiteData } from 'react-static';

// import logoImg from '../logo.png'

export default withSiteData(({ title }) => (
  <div>
    <Head>
      <title>Scotch Media</title>
    </Head>
    <HomeLayout />
  </div>
))
