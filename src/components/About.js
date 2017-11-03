// @flow
import React from 'react';
import FeatureRoadmap from 'src/components/FeatureRoadmap';

export default function About({ match }: MatchProps) {
  return (
    <div className="About p-y-1">
      <div className="max-text-width bg-white p-a-2 m-x-auto min-vh">
        <div className="text-xs-center m-b-2">
          <h2 className="font-xl font-weight-200"> About </h2>
          <p>Fedulab for Make-A-Thon</p>
        </div>
        <div className="m-b-2">
          <h3>Our Mission</h3>
          <p>Help push ideas into reality.</p>
        </div>

        <div className="m-b-2">
          <h3>How To Contribute</h3>
          <p>
            Talk to us about design, improvements, or new features via
            <a
              href="https://coursera.slack.com/messages/fedulab"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              #fedulab {' '}
            </a>
            /
            <a
              href="https://coursera.slack.com/messages/context-fe-learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              #context-fe-learn
            </a>.
          </p>
          <p>
            Contribute to our
            <a
              href="https://github.com/vidaaudrey/fedulab"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Github repo
            </a>
            .
          </p>
        </div>
        <div className="m-b-2">
          <h3>The Team</h3>
          <p>Audrey, Jon, Hannah, Kalan, Ronald</p>
        </div>
        <div className="m-b-2">
          <h3>Feature Roadmap</h3>
          <FeatureRoadmap />
        </div>
      </div>
    </div>
  );
}
