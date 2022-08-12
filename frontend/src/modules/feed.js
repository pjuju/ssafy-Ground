const SET_FEED_DATA = "feed/SET_FEED_DATA";
const SET_FEED_CONTENT = "feed/SET_FEED_CONTENT";
const SET_FEED_IMAGES = "feed/SET_FEED_IMAGES";
const SET_FEED_LOCATION_ID = "feed/SET_FEED_LOCATION_ID";
const SET_FEED_CATEGORY_ID = "feed/SET_FEED_CATEGORY_ID";
const SET_FEED_PRIVATE = "feed/SET_FEED_PRIVATE";

export const setFeedData = (feedData) => ({ type : SET_FEED_DATA, feedData});
export const setFeedContent = (feedContent) => ({ type : SET_FEED_CONTENT, feedContent});
export const setFeedImages = (feedImages) => ({ type : SET_FEED_IMAGES, feedImages});
export const setFeedLocationId = (feedLocationId) => ({ type : SET_FEED_LOCATION_ID, feedLocationId});
export const setFeedCategoryId = (feedCategoryId) => ({ type : SET_FEED_CATEGORY_ID, feedCategoryId});
export const setFeedPrivate = (feedPrivate) => ({ type : SET_FEED_PRIVATE, feedPrivate});

const initialState = {
  feedData: {},
  feedContent: "",
  feedImages: [],
  feedLocationId: 0,
  feedCategoryId: 0,
  feedPrivate: false,
};

export default function feed(state=initialState, action) {
  switch(action.type){
    case SET_FEED_DATA:
      return {
        ...state,
        feedData: action.feedData,
      };
    
    case SET_FEED_CONTENT:
      return {
        ...state,
        feedContent: action.feedContent,
      };
    
    case SET_FEED_IMAGES:
      return {
        ...state,
        feedImages: action.feedImages,
      }
    
    case SET_FEED_LOCATION_ID:
      return {
        ...state,
        feedLocationId: action.feedLocationId,
      }
    
    case SET_FEED_CATEGORY_ID:
      return {
        ...state,
        feedCategoryId: action.feedCategoryId,
      }
    
    case SET_FEED_PRIVATE:
      return {
        ...state,
        feedPrivate: action.feedPrivate,
      }
    
    default:
      return state;
  }
}

