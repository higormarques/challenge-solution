import Router from "~/router";
import Header from "./components/Header";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { NotificationProvider } from "~/hooks/useNotification";
import Notification from '~/components/Notification';

function App() {
  const queryClient = new QueryClient()


  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
        <Notification />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NotificationProvider>
  );
}

export default App;
