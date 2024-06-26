import { Columns, SearchBar, Loading } from "~/components";
import {
  Container,
} from "./Dashboard.styles";
import useFetchRegistrations from "~/hooks/useFetchRegistrations";
import { Registration } from "~/types/types";
import { useState } from "react";

interface RegistrationFetchResponse {
  data: Registration[];
  isLoading: boolean;
}

const DashboardPage = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const { data: registrationsData, isLoading: registrationsIsLoading } = useFetchRegistrations(searchInputValue) as RegistrationFetchResponse;

  const handleSearch = (value: string) => {
    setSearchInputValue(value);
  }

  return (
    <Container>
      <SearchBar handleSearch={handleSearch} />

      {registrationsIsLoading && <Loading />}

      {registrationsData && <Columns registrations={registrationsData} />}
    </Container>
  );
};
export default DashboardPage;
