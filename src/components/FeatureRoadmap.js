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
    isDone: true,
    by: 'Kalan',
  },
  {
    name: 'Use Makeathon arts',
    isDone: true,
    by: 'Hannah',
  },
  {
    name: 'General UI cleanup',
    isDone: true,
    by: 'Hannah',
  },
  {
    name: 'Final Presentation View',
    isDone: true,
    by: 'Ronald',
  },
  {
    name: 'User Dashboard',
    isDone: true,
    by: 'Hannah',
  },
  {
    name: 'Explain Fedulab (requested by Courserian)',
    isDone: true,
  },
  {
    name: 'Voice recognition for start and stop (requested by Courserian)',
  },
  {
    name: 'MEME voter? (requested by Courserian)',
  },
  {
    name: 'List layout (requested by Courserian)',
  },
  {
    name: 'Video wall (requested by Courserian)',
  },
  {
    name: 'Idea Progress Tracking',
    isDone: false,
  },
  {
    name: 'Voting (less priority)',
    isDone: false,
  },
  {
    name: 'Enhance global state updates',
    isDone: false,
  },
  {
    name: 'Globally enable or disable Superuse UI',
    isDone: false,
  },
  {
    name: 'Commenting (GraphQL Subscription)',
    isDone: false,
  },
  {
    name: 'Make-A-Thon Photos Sharing',
    isDone: false,
  },
  {
    name: 'Chat',
    isDone: false,
  },
  {
    name: 'Notification',
    isDone: false,
  },
  {
    name: 'Multiple Makeathon Support',
    isDone: false,
  },
  {
    name: 'Code splitting',
    isDone: false,
  },
  {
    name: 'Speed up image loading',
    isDone: false,
  },
  {
    name: 'Service worker revisit',
    isDone: false,
  },
  {
    name: 'Benchmark with lighthouse and fix issues',
    isDone: false,
  },
  {
    name: 'Accessibility',
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
