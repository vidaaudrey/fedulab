// @flow
import React from 'react';
import { Checkbox } from 'antd';

const FEATURE_ROADMAP = [
  {
    name: 'Claim ideas (link pitching ideas to user accounts)',
    isDone: true,
    by: 'Hannah',
  },
  {
    name: 'Enhance design of idea details page',
    isDone: false,
    by: 'Kalan',
  },
  {
    name: 'Use Makeathon arts',
    isDone: true,
    by: 'Hannah',
  },
  {
    name: 'General UI cleanup',
    isDone: false,
    by: 'Hannah',
  },
  {
    name: 'Final Presentation View',
    isDone: false,
    by: 'Ronald',
  },
  {
    name: 'User Dashboard',
    isDone: false,
    by: 'Hannah',
  },
  {
    name: 'Idea Progress Tracking',
    isDone: false,
  },
  {
    name: 'Voting (less priority)',
    isDone: false,
  },
];

export default function FeatureRoadmap({ match }: MatchProps) {
  return (
    <div className="FeatureRoadmap p-y-1">
      {FEATURE_ROADMAP.map(todo => (
        <div className="m-b-1s" key={todo.name}>
          <Checkbox checked={todo.isDone}>
            <span className="font-md">{todo.name}</span>
          </Checkbox>
          {todo.by && <span className="font-italic">{todo.by}</span>}
        </div>
      ))}
    </div>
  );
}
