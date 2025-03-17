import { Box, Container, HStack } from '@chakra-ui/react';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <Box as="header" py="8" borderBottom="1px solid red">
      <Container justifyContent="space-between" as={HStack}>
        <Link to="/">Meal</Link>

        <nav>
          <HStack as="ul" gap="10">
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
          </HStack>
        </nav>
      </Container>
    </Box>
  );
};
