import { LoadingContainer, Spinner } from './Loading.styles';

const Loading = () => (
    <LoadingContainer data-testId="loading-container">
        <Spinner data-testId="spinner" />
    </LoadingContainer>
);

export default Loading;
