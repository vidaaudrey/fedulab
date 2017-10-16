import gql from 'graphql-tag';

export const CreateIdeaMutation = gql`
  mutation createIdeaMutation(
    $contributorsIds: [ID!]
    $contributorsText: String
    $createdById: ID
    $makeathonId: ID
    $category: [IdeaCategory!]
    $courseraVideoUrl: String
    $coverBackgroundUrl: String!
    $description: String!
    $displayOrder: Int!
    $estimatedFinishTime: DateTime!
    $howToContribute: String!
    $needMyLaptop: Boolean
    $presentLive: Boolean
    $slackUrl: String
    $slug: String!
    $startTime: DateTime!
    $tagline: String!
    $title: String!
    $youtubeVideoUrl: String
  ) {
    createIdea(
      contributorsIds: $contributorsIds
      contributorsText: $contributorsText
      createdById: $createdById
      makeathonId: $makeathonId
      category: $category
      courseraVideoUrl: $courseraVideoUrl
      coverBackgroundUrl: $coverBackgroundUrl
      description: $description
      displayOrder: $displayOrder
      estimatedFinishTime: $estimatedFinishTime
      howToContribute: $howToContribute
      needMyLaptop: $needMyLaptop
      presentLive: $presentLive
      slackUrl: $slackUrl
      slug: $slug
      startTime: $startTime
      tagline: $tagline
      title: $title
      youtubeVideoUrl: $youtubeVideoUrl
    ) {
      id
      category
      title
      description
      tagline
      slug
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation updateIdeaMutation(
    $id: ID!
    $contributorsIds: [ID!]
    $contributorsText: String
    $createdById: ID
    $makeathonId: ID
    $category: [IdeaCategory!]
    $courseraVideoUrl: String
    $coverBackgroundUrl: String!
    $description: String!
    $displayOrder: Int!
    $estimatedFinishTime: DateTime!
    $howToContribute: String!
    $needMyLaptop: Boolean
    $presentLive: Boolean
    $slackUrl: String
    $slug: String!
    $startTime: DateTime!
    $tagline: String!
    $title: String!
    $youtubeVideoUrl: String
  ) {
    updateIdea(
      id: $id
      contributorsIds: $contributorsIds
      contributorsText: $contributorsText
      createdById: $createdById
      makeathonId: $makeathonId
      category: $category
      courseraVideoUrl: $courseraVideoUrl
      coverBackgroundUrl: $coverBackgroundUrl
      description: $description
      displayOrder: $displayOrder
      estimatedFinishTime: $estimatedFinishTime
      howToContribute: $howToContribute
      needMyLaptop: $needMyLaptop
      presentLive: $presentLive
      slackUrl: $slackUrl
      slug: $slug
      startTime: $startTime
      tagline: $tagline
      title: $title
      youtubeVideoUrl: $youtubeVideoUrl
    ) {
      id
      category
      title
      description
      tagline
      slug
      contributorsText
    }
  }
`;
