class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }

  setSession(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteSession(key: string) {
    window.sessionStorage.removeItem(key);
  }

  clearSession() {
    window.sessionStorage.clear();
  }

  setCookie(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getCookie(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCookie(key: string) {
    window.sessionStorage.removeItem(key);
  }

  clearCookie() {
    window.sessionStorage.clear();
  }
}

export default new LocalCache();
