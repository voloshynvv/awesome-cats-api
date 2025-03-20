import { NavLink } from 'react-router';
import { Box, Button, List } from '@chakra-ui/react';

export const NavigationBar = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      bottom="4"
      bg="white"
      left="0"
      right="0"
      mx="auto"
      w="fit"
      rounded="lg"
      zIndex="sticky"
    >
      <List.Root variant="plain" justifyContent="center" flexDirection="row" color="black" gap="3">
        <List.Item>
          <Button unstyled asChild p="2" pl="4">
            <NavLink to="/">Gallery</NavLink>
          </Button>
        </List.Item>

        <List.Item>
          <Button unstyled asChild p="2">
            <NavLink to="/breeds">Breeds</NavLink>
          </Button>
        </List.Item>

        <List.Item>
          <Button unstyled asChild p="2">
            <NavLink to="/favourites">Favorites</NavLink>
          </Button>
        </List.Item>
      </List.Root>
    </Box>
  );
};
