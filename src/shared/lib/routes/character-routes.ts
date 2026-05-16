export function getCharactersRoute(page: number | string) {
  return `/characters?page=${page}`;
}

export function getCharacterDetailsRoute(detailsId: number | string, page: number | string) {
  return `/characters/${detailsId}?page=${page}`;
}
