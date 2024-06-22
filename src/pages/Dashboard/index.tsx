import Collumns from "~/components/Columns";
import * as S from "./styles";
import { SearchBar } from "~/components/Searchbar";
import { useFetchRegistrations, Registration } from "~/hooks/useFetchRegistrations";
import { useState } from "react";

interface RegistrationFetchResponse {
  data: Registration[];
  isLoading: boolean;
}

const DashboardPage = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const { data: registrationsData, isLoading: registrationsIsLoading } = useFetchRegistrations(searchInputValue) as RegistrationFetchResponse;

  const handleSearch = (cpf: string) => {
    setSearchInputValue(cpf);
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} />

      {registrationsIsLoading && <p>Carregando...</p>}

      {registrationsData && <Collumns registrations={registrationsData} />}
    </S.Container>
  );
};
export default DashboardPage;
