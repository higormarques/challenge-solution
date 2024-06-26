import Collumns from "~/components/Columns";
import {
  Container,
} from "./Dashboard.styles";
import SearchBar from "~/components/SearchBar";
import useFetchRegistrations from "~/hooks/useFetchRegistrations";
import { Registration } from "~/types/types";
import { useState } from "react";
import Loading from "~/components/Loading";

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

      {registrationsData && <Collumns registrations={registrationsData} />}
    </Container>
  );
};
export default DashboardPage;
