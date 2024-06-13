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

function cpfValidator(cpf: string) {
  const cpfStr = cpf?.replace(/[^\d]+/g, "");

  if (cpfStr === "") return false;

  if (cpfStr?.length !== 11) {
    return false;
  }

  if (
    cpfStr === "00000000000" ||
    cpfStr === "11111111111" ||
    cpfStr === "22222222222" ||
    cpfStr === "33333333333" ||
    cpfStr === "44444444444" ||
    cpfStr === "55555555555" ||
    cpfStr === "66666666666" ||
    cpfStr === "77777777777" ||
    cpfStr === "88888888888" ||
    cpfStr === "99999999999"
  ) {
    return false;
  }

  let soma: number;
  let resto: number;

  soma = 0;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfStr.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;

  if (resto != parseInt(cpfStr.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfStr.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;

  if (resto != parseInt(cpfStr.substring(10, 11))) return false;

  return true;
}

function cnpjValidator(cnpj: string) {
  const cnpjStr = cnpj?.replace(/[^\d]+/g, "");
  if (!cnpjStr || cnpjStr === "") return false;

  if (cnpjStr.length !== 14) {
    return false;
  }

  if (
    cnpjStr === "00000000000000" ||
    cnpjStr === "11111111111111" ||
    cnpjStr === "22222222222222" ||
    cnpjStr === "33333333333333" ||
    cnpjStr === "44444444444444" ||
    cnpjStr === "55555555555555" ||
    cnpjStr === "66666666666666" ||
    cnpjStr === "77777777777777" ||
    cnpjStr === "88888888888888" ||
    cnpjStr === "99999999999999"
  ) {
    return false;
  }

  let tamanho: number = cnpjStr.length - 2;
  const digitos: string = cnpjStr.substring(tamanho);
  let numeros: string = cnpjStr.substring(0, tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpjStr.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }

  return true;
}

export function cpfCnpjValidator(documento: string) {
  if (!documento) return false;

  if (cpfValidator(documento) === true || cnpjValidator(documento) === true) {
    return true;
  } else {
    return false;
  }
}
