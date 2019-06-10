export class AuthService {
  private isAuthenticate = false;

  login() {
    this.isAuthenticate = true;
  }

  logout() {
    this.isAuthenticate = true;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticate;
  }
}
