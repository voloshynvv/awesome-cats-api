import { useMemo, useState } from 'react';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { createListCollection, SelectRootProps, Spinner, Text, Box, CollectionItem } from '@chakra-ui/react';
import { SelectContent, SelectRoot, SelectItem, SelectTrigger, SelectValueText } from '@/components/ui/select';

interface AppAsyncSelectProps extends Omit<SelectRootProps, 'collection' | 'onValueChange'> {
  value: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryOptions: any;
  placeholder: string;
  fetchOnMount?: boolean;
  onValueChange: (value: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemToValue: (item: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemToString: (item: any) => string;
}

export const AppAsyncSelect = ({
  value,
  queryOptions,
  fetchOnMount = false,
  placeholder,
  itemToString,
  itemToValue,
  onValueChange,
  ...props
}: AppAsyncSelectProps) => {
  const [open, setOpen] = useState(false);

  const hasValue = value.length > 0;

  const { data, isError, isPending, isSuccess } = useQuery({
    ...queryOptions,
    enabled: hasValue || fetchOnMount || open,
  });

  const collection = useMemo(() => {
    return createListCollection({
      items: (data as CollectionItem[]) ?? [],
      itemToValue,
      itemToString,
    });
  }, [data, itemToValue, itemToString]);

  return (
    <SelectRoot
      collection={collection}
      value={isSuccess ? value : []}
      onValueChange={(e) => onValueChange(e.value)}
      onOpenChange={(e) => setOpen(e.open)}
      {...props}
    >
      <SelectTrigger clearable loading={fetchOnMount && isPending}>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {isPending && (
          <Box p="2" display="flex" justifyContent="center">
            <Spinner color="fg.muted" />
          </Box>
        )}
        {isError && (
          <Text textAlign="center" p="2">
            Somethins went wrong
          </Text>
        )}
        {collection.items.map((item) => (
          <SelectItem item={item} key={item.id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
