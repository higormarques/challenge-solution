
import {
  Column,
  ColumnContent,
  TitleColumn,
  Container,
} from "./Columns.styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationStatus } from "~/types/enums";
import { ColumnsProps } from "./Columns.types";

const allColumns = [
  { status: RegistrationStatus.Review, title: "Pronto para revisar" },
  { status: RegistrationStatus.Approved, title: "Aprovado" },
  { status: RegistrationStatus.Reproved, title: "Reprovado" },
];

const Collumns = (props: ColumnsProps) => {
  return (
    <Container>
      {allColumns.map(({ title, status, }) => {
        return (
          <Column status={status} key={title}>
            <>
              <TitleColumn status={status}>
                {title}
              </TitleColumn>
              <ColumnContent>
                {props?.registrations?.map((registration) => {
                  const { id } = registration;

                  if (registration.status === status) {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={id}
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
