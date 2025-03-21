import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Heading,
  HStack,
  Box,
  Text,
  IconButton,
  Input,
  Skeleton,
  PopoverOpenChangeDetails,
} from '@chakra-ui/react';
import { PopoverTrigger, PopoverRoot, PopoverContent } from '@/components/ui/popover';

import { getRandomInteger } from '@/utils/get-random-interger';
import { getBreedsQueryOptions } from '@/api/queries/breeds';

const MIN_SKELETON_WIDTH = 60;
const MAX_SKELETON_WIDTH = 140;

export const Breeds = () => {
  const [search, setSearch] = useState('');

  const { data: breeds, isPending, isError, isSuccess } = useQuery(getBreedsQueryOptions(search));

  const skeleton = Array.from({ length: 56 }, (_, i) => (
    <Skeleton key={i} w={getRandomInteger(MIN_SKELETON_WIDTH, MAX_SKELETON_WIDTH) + 'px'} h="32px" />
  ));

  return (
    <>
      <HStack mb="8">
        <Heading alignSelf="flex-start">Breeds</Heading>
        <SearchPopover onSubmit={setSearch} />
      </HStack>

      {search && isSuccess && (
        <Text textStyle="sm" mb="2">
          Found results: {breeds?.length}
        </Text>
      )}

      <HStack wrap="wrap">
        {isPending && skeleton}

        {isError && <p>Something went wrong</p>}

        {breeds?.map((breed) => (
          <Button key={breed.id} _hover={{ transform: 'translateY(-1px)' }} transition="transform" size="xs" asChild>
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </Button>
        ))}
      </HStack>
    </>
  );
};

interface SearchPopoverProps {
  onSubmit: (search: string) => void;
}

const SearchPopover = ({ onSubmit }: SearchPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      setOpen(false);
    }

    onSubmit(value);
  };

  const handleOpenChange = (e: PopoverOpenChangeDetails) => {
    const { open } = e;

    if (!open) {
      onSubmit('');
    }

    setOpen(open);
  };

  return (
    <PopoverRoot
      unmountOnExit={true}
      closeOnInteractOutside={false}
      open={open}
      onOpenChange={handleOpenChange}
      positioning={{ placement: 'right' }}
    >
      <PopoverTrigger asChild>
        <IconButton size="xs" variant="plain" transition="scale 0.25s, opacity 0.25s">
          <Box as="span" scale={open ? 1 : 0} opacity={open ? 1 : 0} position="absolute" transition="inherit">
            <XIcon />
          </Box>

          <Box as="span" scale={open ? 0 : 1} opacity={open ? 0 : 1} transition="inherit">
            <SearchIcon />
          </Box>
        </IconButton>
      </PopoverTrigger>

      <PopoverContent css={{ '--popover-bg': 'tranparent' }}>
        <HStack as="form" onSubmit={handleSubmit}>
          <Input flex="1" value={value} onChange={(e) => setValue(e.target.value)} size="xs" />
          <Button size="xs" type="submit">
            Search
          </Button>
        </HStack>
      </PopoverContent>
    </PopoverRoot>
  );
};
