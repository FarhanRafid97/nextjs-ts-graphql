import { Box, IconButton, Link } from '@chakra-ui/react';

import React from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useDeletePostMutation, useMyBioQuery } from '../src/generated/graphql';
import { isServer } from '../utils/isServer';

interface EditAndDeleteButtonProps {
  id: number;
  creatorId: number;
}

export const EditAndDeleteButton: React.FC<EditAndDeleteButtonProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: biodata }] = useMyBioQuery({
    pause: isServer(),
  });

  const [, deletePost] = useDeletePostMutation();

  if (biodata?.myBio?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/update/[id]" as={`/post/update/${id}`}>
        <Link>
          <IconButton
            mr={4}
            as={Link}
            icon={<EditIcon />}
            aria-label="button"
          />
        </Link>
      </NextLink>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="button"
        onClick={() => deletePost({ id })}
      />
    </Box>
  );
};
