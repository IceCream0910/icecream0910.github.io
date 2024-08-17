import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch("https://gateway.kinolights.com/graphql", {
            "headers": {
                "content-type": "application/json",
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"operationName\":\"QueryWatchedContents\",\"variables\":{\"offset\":0,\"limit\":6,\"userId\":208310,\"openYearRange\":{\"start\":1874,\"end\":2025},\"priceRange\":{\"start\":0,\"end\":5100},\"runningTimeRange\":{\"start\":0,\"end\":201},\"indexRatingRange\":{\"start\":0,\"end\":100},\"starRatingRange\":{\"start\":0.5,\"end\":5},\"rottenScoreRange\":{\"start\":0,\"end\":100},\"imdbScoreRange\":{\"start\":1,\"end\":10},\"isSubscription\":false,\"orderBy\":\"WATCHED_AT\",\"orderOption\":\"DESC\",\"myIndexRatings\":[],\"myStarRatings\":[]},\"query\":\"fragment FragmentMyPageMovieCardInfo on MovieOutput {\\n  id\\n  titleKr\\n  openYear\\n  posterImage {\\n    pathUrl\\n    __typename\\n  }\\n  mediaType\\n  genres\\n  indexRatingType\\n  indexRatingScore\\n  starRatingScore\\n  vodOfferItems {\\n    id\\n    providerId\\n    retailPrice\\n    monetizationType\\n    url\\n    properties\\n    __typename\\n  }\\n  userIndexRating(userId: $userId) {\\n    index\\n    __typename\\n  }\\n  userStarRating(userId: $userId) {\\n    star\\n    __typename\\n  }\\n  userReview(userId: $userId) {\\n    id\\n    __typename\\n  }\\n  certifiedAt\\n  __typename\\n}\\n\\nquery QueryWatchedContents($genres: [Int!], $imdbScoreRange: FloatRangeInput, $includeEtcNations: Boolean, $indexRatingRange: IntRangeInput, $isSubscription: Boolean, $mediaTypes: [MediaType!], $nations: [Int!], $priceRange: IntRangeInput, $openYearRange: IntRangeInput, $providerIds: [Int!], $ratingTypes: [RatingType!], $rottenScoreRange: IntRangeInput, $runningTimeRange: IntRangeInput, $starRatingRange: FloatRangeInput, $myIndexRatings: [MyIndexRating!], $myStarRatings: [Float!], $orderOption: OrderOptionType!, $offset: Int = 0, $limit: Int = 10, $userId: Int!, $orderBy: WatchedMovieOrderType!) {\\n  watchedMoviesCount: watchedContentCount(\\n    genres: $genres\\n    imdbScoreRange: $imdbScoreRange\\n    includeEtcNations: $includeEtcNations\\n    indexRatingRange: $indexRatingRange\\n    isSubscription: $isSubscription\\n    mediaTypes: $mediaTypes\\n    nations: $nations\\n    priceRange: $priceRange\\n    openYearRange: $openYearRange\\n    providerIds: $providerIds\\n    ratingTypes: $ratingTypes\\n    rottenScoreRange: $rottenScoreRange\\n    runningTimeRange: $runningTimeRange\\n    starRatingRange: $starRatingRange\\n    myIndexRatings: $myIndexRatings\\n    myStarRatings: $myStarRatings\\n    userId: $userId\\n  )\\n  watchedMovies: watchedContents(\\n    genres: $genres\\n    imdbScoreRange: $imdbScoreRange\\n    includeEtcNations: $includeEtcNations\\n    indexRatingRange: $indexRatingRange\\n    isSubscription: $isSubscription\\n    mediaTypes: $mediaTypes\\n    nations: $nations\\n    priceRange: $priceRange\\n    openYearRange: $openYearRange\\n    providerIds: $providerIds\\n    ratingTypes: $ratingTypes\\n    rottenScoreRange: $rottenScoreRange\\n    runningTimeRange: $runningTimeRange\\n    starRatingRange: $starRatingRange\\n    myIndexRatings: $myIndexRatings\\n    myStarRatings: $myStarRatings\\n    orderOption: $orderOption\\n    offset: $offset\\n    limit: $limit\\n    userId: $userId\\n    orderBy: $orderBy\\n  ) {\\n    ...FragmentMyPageMovieCardInfo\\n    userWatched(userId: $userId) {\\n      createdAt\\n      watchedAt\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
            "method": "POST",
        });;
        const data = await response.json();
        return NextResponse.json(data.data.watchedMovies);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error });
    }
}

export const dynamic = "force-dynamic";