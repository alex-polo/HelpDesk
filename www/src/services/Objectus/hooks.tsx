import { useQuery } from '@tanstack/react-query';
import { getObjectsAPI } from './Service';

export const useGetObjects = () => {
  return useQuery({
    queryKey: ['getObjectsFromObjectus'],
    queryFn: getObjectsAPI,
    select: ({ data }) => data,
  });
};
