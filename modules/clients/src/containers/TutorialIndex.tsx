import React from 'react';
import TutorialIndexLayout from '../components/TutorialIndexLayout';
import { Head } from 'react-static';
import { withSiteData } from 'react-static';

export default withSiteData(() => (
  <div>
    <Head>
      <title>Tutorials - Scotch Media</title>
    </Head>
    <TutorialIndexLayout />
  </div>
))
