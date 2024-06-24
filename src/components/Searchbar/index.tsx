import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button, { IconButton } from "~/components/Buttons";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import {
  Container,
  Actions,
} from "./SearchBar.styles";
import { useEffect, useState } from "react";
import { maskCPF, validateCPF } from "~/utils/cpf-utils";
import { useQueryClient } from "@tanstack/react-query";
import { SearchBarProps } from "./SearchBar.types";
import useDebounce from "~/hooks/useDebounce";

const MAX_FORMATED_CPF_LENGTH = 14;

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const history = useHistory();
  const queryClient = useQueryClient()

  const debouncedSearchInputValue = useDebounce(inputValue.replace(/[.-]/g, ''), 600);

  useEffect(() => {
    if (!validateCPF(debouncedSearchInputValue) && debouncedSearchInputValue.length !== 0) {
      setInputError('CPF inválido');
      return
    }

    setInputError('');
    handleSearch(debouncedSearchInputValue);
  }, [debouncedSearchInputValue, handleSearch])


  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = maskCPF(event.target.value);

    setInputValue(searchText);

  }

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['registrations'] });
  }

  return (
    <Container>
      <TextField placeholder="Digite um CPF válido" onInput={handleChage} value={inputValue} maxLength={MAX_FORMATED_CPF_LENGTH} error={inputError} />
      <Actions>
        <IconButton aria-label="refetch" onClick={refetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()} >Nova Admissão</Button>
      </Actions>
    </Container>
  );
};

export default SearchBar;