// preferences.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private readonly USERS_PREFERENCE_KEY = 'users';

  constructor() {}

  async registerUser(user: any) {
    // Obtén la lista actual de usuarios
    const existingUsers = await this.getUsers();

    // Verifica si el usuario ya existe
    const userExists = existingUsers.some((u) => u.username === user.username);
    if (userExists) {
      throw new Error('El usuario ya existe.');
    }

    // Agrega el nuevo usuario a la lista
    existingUsers.push(user);

    // Guarda la lista de usuarios actualizada en las preferencias
    await Preferences.set({ key: this.USERS_PREFERENCE_KEY, value: JSON.stringify(existingUsers) });
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    const users = await this.getUsers();

    const user = users.find((u) => u.username === username && u.password === password);

    return !!user; // Devuelve true si el usuario es válido, de lo contrario, false
  }

  private async getUsers(): Promise<any[]> {
    try {
      const result = await Preferences.get({ key: this.USERS_PREFERENCE_KEY });
      if (result && result.value) {
        return JSON.parse(result.value);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }
}
