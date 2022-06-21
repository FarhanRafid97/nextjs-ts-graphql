import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMyBioQuery } from '../src/generated/graphql';

export const useIsAuth = () => {
  const { data, loading } = useMyBioQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.myBio) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);
};
