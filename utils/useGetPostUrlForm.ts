import { usePostQuery } from '../src/generated/graphql';
import { useGetIdInt } from './useGetIdint';

export const useGetPostUrlForm = () => {
  const idInt = useGetIdInt();
  return usePostQuery({
    pause: idInt === -1,
    variables: {
      id: idInt,
    },
  });
};
