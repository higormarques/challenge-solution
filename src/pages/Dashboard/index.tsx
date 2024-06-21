import Collumns from "~/components/Columns";
import * as S from "./styles";
import { SearchBar } from "~/components/Searchbar";
import { useFetchRegistrations } from "~/hooks/useFetchRegistrations";


const DashboardPage = () => {
  const { data } = useFetchRegistrations()

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={data} />
    </S.Container>
  );
};
export default DashboardPage;
