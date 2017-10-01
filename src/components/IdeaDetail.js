// @flow
import React from 'react';

import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

export default function IdeaDetail({ match }: MatchProps) {
  return (
    <div>
      <h2>IdeaDetail</h2>
      {match.params.ideaId}
    </div>
  );
}
