import styled from 'styled-components';

export const NotificationContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
`;

export const NotificationItem = styled.div<{ type: 'success' | 'error' }>`
  background-color: ${({ type }) =>
    type === 'success' ? 'green' : 'red'};
  color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
