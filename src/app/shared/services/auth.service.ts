export class AuthService {
  private isAuthenticate = false;

  login() {
    this.isAuthenticate = true;
    window.localStorage.setItem('isAuthenticate', 'true');
  }

  logout() {
    this.isAuthenticate = true;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return  JSON.parse(window.localStorage.getItem('isAuthenticate')) ? true : false;
  }
}
