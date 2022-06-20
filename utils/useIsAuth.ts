import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMyBioQuery } from '../src/generated/graphql';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMyBioQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.myBio) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [fetching, data, router]);
};
