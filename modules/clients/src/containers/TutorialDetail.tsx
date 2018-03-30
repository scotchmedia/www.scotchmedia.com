import React from 'react';
import TutorialDetailLayout from '../components/TutorialDetailLayout';
import { Head } from 'react-static';
import { withRouteData } from 'react-static';

interface Props {
  content: string;
  title: string;
  pageUrl: string;
  toc: any;
}

export default withRouteData(({ toc, title, content }: Props) => (
  <TutorialDetailLayout
    toc={toc}
    pageUrl={title}
    pageTitle={title}
    pageContent={content}
  />
))
