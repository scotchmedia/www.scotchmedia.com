import React from 'react';
import TutorialIndexLayout from '../components/TutorialIndexLayout';
import { withSiteData } from 'react-static';

export default withSiteData(() => (
  <TutorialIndexLayout
    pageTitle='Tutorials - Scotch Media'
  />
))
