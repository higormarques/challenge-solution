
import {
  Column,
  ColumnContent,
  TitleColumn,
  Container,
} from "./Columns.styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "~/hooks/useFetchRegistrations";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type ColumnsProps = {
  registrations?: Registration[];
};

const Collumns = (props: ColumnsProps) => {
  return (
    <Container>
      {allColumns.map((collum) => {
        return (
          <Column status={collum.status} key={collum.title}>
            <>
              <TitleColumn status={collum.status}>
                {collum.title}
              </TitleColumn>
              <ColumnContent>
                {props?.registrations?.map((registration) => {
                  if (registration.status === collum.status) {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    );
                  }

                  return null
                })}
              </ColumnContent>
            </>
          </Column>
        );
      })}
    </Container>
  );
};
export default Collumns;
