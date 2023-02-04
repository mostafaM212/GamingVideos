import { TestBed } from '@angular/core/testing';

import { ClipResolverResolver } from './clip-resolver.resolver';

describe('ClipResolverResolver', () => {
  let resolver: ClipResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClipResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
