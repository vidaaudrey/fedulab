


// userId: cj898xsy8zdfe0172p603308w (Audrey)
// make-a-thon id: cj8apmwh6gvzh0172zd86j8hq  
// ideaId: cj8aq1zo4h04m0117bff3kgo4 

// Idea 
{
  "category": "GENERAL",
  "title": "The Other Side",
  "tagline": "Pushing our limits",
  "description": "Do you ever wonder if you are biased? Do you want to reach to the other side and learn about their views and experience? Join 'The Other Side', let's make the world a better place by learning about ourselves and push our limits.",
  "coverBackgroundUrl": "http://www.webdesignhot.com/wp-content/uploads/2015/11/Abstract-Colorful-Geometric-Shapes-Background-Vector-Illustration.jpg", 

  "estimatedFinishTime": "2017-10-01T21:16:26.000Z",
  "displayOrder": 1,  
  "howToContribute": "Join #theOtherSide and let's talk!"
  "slackUrl": "#theOtherSide",
  "updatedAt": "2017-10-01T21:16:26.000Z",
  "youtubeVideoUrl": "https://youtu.be/Agu6jipKfYw",
  "slug": "the-other-side",
  "createdById": "cj898xsy8zdfe0172p603308w", 
  "makeathonId": "cj8apmwh6gvzh0172zd86j8hq",
  "contributorsId": "cj898xsy8zdfe0172p603308w",
}

mutation createIdeaMutation(
  $category: [IdeaCategory!], 
  $coverBackgroundUrl: String!, 
  $description: String!,
  $displayOrder: Int!,
  $estimatedFinishTime: DateTime!,
  $howToContribute: String!,
  $slackUrl: String,
  $tagline: String!,
  $title: String!,
  $updatedAt: DateTime!,
  $youtubeVideoUrl: String,
  $slug: String!,
  createdById: ID, 
  makeathonId: ID,
  contributorsId: [ID!]
  ) {
  createIdea(
    category: $category,
    coverBackgroundUrl: $coverBackgroundUrl,
    estimatedFinishTime: $estimatedFinishTime,
    description: $description,
    displayOrder: $displayOrder,
    howToContribute: $howToContribute,
    slackUrl: $slackUrl,
    tagline: $tagline,
    title: $title,
    updatedAt: $updatedAt,
    youtubeVideoUrl: $youtubeVideoUrl,
    slug: $slug,
    createdById: $createdById,
    makeathonId: $makeathonId,
    contributorsId: $contributorsId
   ) {
    id
    category
		title
    description
    tagline
  }
}

 // Makeathon
{
"logo": "https://s3.amazonaws.com/fedulab/web/logo_light.png",
"logo2x": "https://s3.amazonaws.com/fedulab/web/logo_light.png",
"ordinal": 8,
"slogan": "Time to make!",
"startTime": "2017-10-01T21:16:26.000Z"
}

mutation CreateMakeathon(
  $logo: String,
  $logo2x: String!
  $ordinal: Int!,
  $slogan: String!
  $startTime: DateTime!
  ) {
  createMakeathon(
    logo:$logo
    logo2x:$logo2x
    ordinal:$ordinal
    slogan:$slogan
    startTime:$startTime
    ){
    id
    logo
    ordinal
    slogan
    startTime
    
  }
}
