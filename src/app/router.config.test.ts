import { describe, expect, it } from 'vitest';
import { router } from './router';

describe('app router config', () => {
  it('defines the expected main routes', () => {
    const rootRoute = router.routes[0];

    expect(rootRoute.path).toBe('/');
    expect(rootRoute.children).toHaveLength(4);
    expect(rootRoute.children?.[0]?.index).toBe(true);
    expect(rootRoute.children?.[1]?.path).toBe('characters');
    expect(rootRoute.children?.[1]?.children?.[0]?.path).toBe(':detailsId');
    expect(rootRoute.children?.[2]?.path).toBe('about');
    expect(rootRoute.children?.[3]?.path).toBe('*');
  });
});
