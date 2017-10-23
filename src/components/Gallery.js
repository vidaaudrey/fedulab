// @flow
import React from 'react';
import { Container } from '@coursera/coursera-ui';
import GalleryIdeaList from 'src/components/GalleryIdeaList';

export default function Gallery() {
  return (
    <div className="bg-light p-y-3">
      <Container>
        <GalleryIdeaList />
      </Container>
    </div>
  );
}
