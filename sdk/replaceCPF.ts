export function mascararCPF(campo: string) {
  let cpf = campo;
  // Remove tudo que não é dígito
  cpf = cpf.replace(/\D/g, "");

  // Adiciona os pontos e traço
  if (cpf.length > 3) {
    cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
  }
  if (cpf.length > 7) {
    cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
  }
  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11) + "-" + cpf.substring(11);
  }

  return cpf;
}

export function getCPFNumeros(campo: string) {
  return campo.replace(/\D/g, "");
}
