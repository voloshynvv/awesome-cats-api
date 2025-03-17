import { Provider } from '@/components/ui/provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <Provider>{children}</Provider>;
};
