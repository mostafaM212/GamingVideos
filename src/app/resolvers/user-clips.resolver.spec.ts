import { TestBed } from '@angular/core/testing';

import { UserClipsResolver } from './user-clips.resolver';

describe('UserClipsResolver', () => {
  let resolver: UserClipsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserClipsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
