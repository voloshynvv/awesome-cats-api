import { Link } from 'react-router';
import { useParams } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { IconButton } from '@chakra-ui/react';

import { BreedDetails } from './components/breed-details/breed-details';

export const Breed = () => {
  const { breedId = '' } = useParams();

  return (
    <>
      <IconButton
        mb="4"
        aria-label="back to all breeds"
        asChild
        variant="ghost"
        md={{ transform: 'translateX(calc(-100% - 20px))', position: 'absolute' }}
        _hover={{ translate: '-3px' }}
      >
        <Link to=".." relative="path">
          <ArrowLeftIcon />
        </Link>
      </IconButton>

      <BreedDetails breedId={breedId} />
    </>
  );
};
