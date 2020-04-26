export const getSession = () => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}
export const removeSession = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
};
export const setSession = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
};