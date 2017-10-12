// @flow
import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const MAX_WIDTH = 560;

export default function IdeaListItem({ idea }) {
  const allContributorNames = idea.contributors.map(item => item.name).join(',  ');
  return (
    <Link to={`/ideas/${idea.slug}`}>
      <Card style={{ width: '100%', maxWidth: MAX_WIDTH, height: 420 }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="example" width="100%" src={idea.coverBackgroundUrl} />
        </div>
        <div className="custom-card p-a-1">
          <h3>{idea.title}</h3>
          <h4>{allContributorNames}</h4>
          <p style={{ color: 'gray' }}>{idea.description}</p>
        </div>
      </Card>
    </Link>
  );
}
