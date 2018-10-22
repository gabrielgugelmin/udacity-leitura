export const SORT_POSTS = 'SORT_POSTS';

export function sortPosts(sort, isAscending) {
  return {
    type: SORT_POSTS,
    sortBy: sort,
    isAscending,
  }
}
