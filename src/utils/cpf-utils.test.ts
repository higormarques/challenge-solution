import { validateCPF, maskCPF } from './cpf-utils';

describe('validateCPF', () => {
  it('should return false for invalid CPF with incorrect length', () => {
    expect(validateCPF('123')).toBe(false);
  });

  it('should return false for invalid CPF with all digits the same', () => {
    expect(validateCPF('111.111.111-11')).toBe(false);
  });

  it('should return true for a valid CPF', () => {
    expect(validateCPF('111.444.777-35')).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    expect(validateCPF('123.456.789-08')).toBe(false);
  });
});

describe('maskCPF', () => {
  it('should mask unformatted CPF correctly', () => {
    expect(maskCPF('12345678909')).toBe('123.456.789-09');
  });

  it('should mask partially formatted CPF correctly', () => {
    expect(maskCPF('123.45678909')).toBe('123.456.789-09');
  });

  it('should retain correctly formatted CPF', () => {
    expect(maskCPF('123.456.789-09')).toBe('123.456.789-09');
  });

  it('should handle empty input', () => {
    expect(maskCPF('')).toBe('');
  });

  it('should remove non-numeric characters and mask correctly', () => {
    expect(maskCPF('123abc456def78909')).toBe('123.456.789-09');
  });
});
