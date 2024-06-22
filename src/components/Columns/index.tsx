
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "~/hooks/useFetchRegistrations";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type CollumnsProps = {
  registrations?: Registration[];
};

const Collumns = (props: CollumnsProps) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
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
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
