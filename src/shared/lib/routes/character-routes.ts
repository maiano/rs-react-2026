type CharacterRouteParams = {
  page: number | string;
  search?: string;
};

function getCharacterSearchParams({ page, search }: CharacterRouteParams) {
  const params = new URLSearchParams();

  params.set('page', String(page));

  if (search) {
    params.set('search', search);
  }

  return params.toString();
}

export function getCharactersRoute(page: number | string, search = '') {
  return `/characters?${getCharacterSearchParams({ page, search })}`;
}

export function getCharacterDetailsRoute(
  detailsId: number | string,
  page: number | string,
  search = ''
) {
  return `/characters/${detailsId}?${getCharacterSearchParams({ page, search })}`;
}
