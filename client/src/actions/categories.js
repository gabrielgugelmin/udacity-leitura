import { getCategories } from "../utils/api";

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}

// export function handleGetCategories() {
//   return (dispatch) => {
//     return getCategories()
//       .then(categories => dispatch(receiveCategories(categories)))
//   }
// }
