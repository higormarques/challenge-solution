import Collumns from "~/components/Columns";
import {
  Container,
} from "./Dashboard.styles";
import { SearchBar } from "~/components/Searchbar";
import { useFetchRegistrations } from "~/hooks/useFetchRegistrations";
import { Registration } from "~/types/types";
import { useState } from "react";
import useDebounce from "~/hooks/useDebounce";

interface RegistrationFetchResponse {
  data: Registration[];
  isLoading: boolean;
}

const DashboardPage = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const debouncedSearchInputValue = useDebounce(searchInputValue.replace(/[.-]/g, ''), 600);
  const { data: registrationsData, isLoading: registrationsIsLoading } = useFetchRegistrations(debouncedSearchInputValue) as RegistrationFetchResponse;

  const handleSearch = (value: string) => {
    setSearchInputValue(value);
  }

  return (
    <Container>
      <SearchBar handleSearch={handleSearch} />

      {registrationsIsLoading && <p>Carregando...</p>}

      {registrationsData && <Collumns registrations={registrationsData} />}
    </Container>
  );
};
export default DashboardPage;
