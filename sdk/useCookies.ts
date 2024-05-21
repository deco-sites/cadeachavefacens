
export function setCookie(nome: string, valor: string, dias?: number) {
    const data = new Date();
    data.setTime(data.getTime() + (dias || 1 * 24 * 60 * 60 * 1000));
    const expira = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expira + ";path=/";
}

export function getCookie(nome: string) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nomeEQ) == 0) {
            return c.substring(nomeEQ.length, c.length);
        }
    }
    return "";
}
