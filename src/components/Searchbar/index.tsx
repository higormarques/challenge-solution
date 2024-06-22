import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons/styles";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useState } from "react";
import { maskCPF, validateCPF } from "~/utils/cpf-utils";
import { useQueryClient } from "@tanstack/react-query";

interface SearchBarProps {
  handleSearch: (inputValue: string) => void;
}

const MAX_CPF_LENGTH = 14;

export const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const history = useHistory();
  const queryClient = useQueryClient()


  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;

    setInputValue(maskCPF(searchText));

    if (!validateCPF(event.target.value) && searchText.length !== 0) return;

    handleSearch(searchText);
  }

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['registrations'] });
  }

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" onChange={handleChage} value={inputValue} maxLength={MAX_CPF_LENGTH} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={refetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
