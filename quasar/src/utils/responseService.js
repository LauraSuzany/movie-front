const responseService = (obj, type, description) => {
  const response = obj.response;
  return !navigator.onLine
    ? new Error("Sem acesso à internet, por favor, tente mais tarde")
    : !response
    ? new Error("Servidor indisponivel, tente mais tarde")
    : new Error(verifyStatusResponse(response, type, description));
};

const verifyStatusResponse = (response, type, description) => {
  const data = response.data;
  const statusHttp = {
    400: () => verifyErrors(type, description, data),
    403: () => verifyErrors(type, description, data),
    401: () => verifyErrors(type, description, data),
    404: () => "Endereço de acesso não encontrado",
    500: () => verifyErrors(type, description, data),
    503: () => "Servidor indisponível. Tente novamente mais tarde",
    default: () => "Erro de verificação do status da requisição",
  };
  return (statusHttp[data?.code] || statusHttp.default)();
};

const verifyErrorsData = (data) => {
  return data && data.errors
    ? Object.keys(data.errors).map((k) => `${data.errors[k]}`)
    : "Existem erros a serem processados";
};

function verifyErrors(type, description, data) {
  // FIXME: Aprimorar o tratamento de erros provenientes do backend
  // TODO: Objeto esperado: code: 400 ou 500, message: .....
  switch (data.code) {
    case 400:
      return data.message || "Erro de négocio"; // Retorna a mensagem definida pelo back
    case 401:
      return data.message || "Você não tem permissão para executar essa ação.";
    case 403:
      return (
        data.message ||
        "Problemas com o token de autenticação. Logue-se novamente."
      );
    case 500:
      return verifyTypeAction(type, description); // Retorna uma mensagem definida na função
    default:
      return "";
  }
}

const verifyTypeAction = (action) => {
  const typesAction = {
    list: "Não foi possível realizar a listagem, tente mais tarde.",
    get: "Não foi possível realizar a consulta, tente mais tarde.",
    create: "Não foi possível realizar o cadastro, tente mais tarde.",
    update: "Não foi possível realizar a edição, tente mais tarde.",
    remove: "Não foi possível realizar a exclusão, tente mais tarde.",
    report:
      "Não foi possível realizar a geração do relatório, verifique sua consulta e tente novamente.",
    login: "Não foi possível realizar o login, tente mais tarde.",
    activate: "Não foi possível realizar a ativação, tente mais tarde.",
    deactivate: "Não foi possível realizar a desativação, tente mais tarde.",
    statistic:
      "Não foi possível retornar a contagem de registros no sistema, por favor tente mais tarde.",
    permission: "Não foi possível recuperar as permissões do usuário",
    search: "Não foi possível realizar a busca, tente mais tarde",
    default: "Erro de verificação",
    execute: "Não foi possível executar a ação solicitada, tente mais tarde.",
    disableChannel: "Não foi possivel desabilitar o canal",
  };
  return typesAction[action] || typesAction.default;
};
export { responseService };
