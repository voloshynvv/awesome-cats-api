import { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import {
  IconButton,
  PopoverOpenChangeDetails,
  Box,
  HStack,
  Input,
  Button,
  VisuallyHidden,
  useBreakpointValue,
} from '@chakra-ui/react';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';

interface SearchPopoverProps {
  onSubmit: (search: string) => void;
}

export const SearchPopover = ({ onSubmit }: SearchPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const placement = useBreakpointValue({ base: 'bottom', sm: 'right' }) as 'bottom' | 'right';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      setOpen(false);
    }

    onSubmit(value);
  };

  const handleOpenChange = ({ open }: PopoverOpenChangeDetails) => {
    if (!open) {
      onSubmit('');
    }

    setOpen(open);
  };

  return (
    <PopoverRoot
      key={placement}
      closeOnInteractOutside={false}
      open={open}
      onOpenChange={handleOpenChange}
      positioning={{ placement }}
      onExitComplete={() => setValue('')}
    >
      <PopoverTrigger asChild>
        <IconButton
          aria-label={open ? 'close search' : 'open search'}
          size="xs"
          variant="plain"
          transition="scale 0.25s, opacity 0.25s"
        >
          <Box as="span" scale={open ? 1 : 0} opacity={open ? 1 : 0} position="absolute" transition="inherit">
            <XIcon />
          </Box>

          <Box as="span" scale={open ? 0 : 1} opacity={open ? 0 : 1} transition="inherit">
            <SearchIcon />
          </Box>
        </IconButton>
      </PopoverTrigger>

      <PopoverContent css={{ '--popover-bg': 'tranparent' }} boxShadow="none">
        <HStack as="form" onSubmit={handleSubmit}>
          <Box as="label" w="full">
            <VisuallyHidden>Breed</VisuallyHidden>

            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. American Curl"
              size="xs"
            />
          </Box>

          <Button type="submit" size="xs">
            Search
          </Button>
        </HStack>
      </PopoverContent>
    </PopoverRoot>
  );
};
