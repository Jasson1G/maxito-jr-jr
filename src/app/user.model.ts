// user.model.ts

export interface UserData {
  fullName: string;
  username: string;
  password: string;
  // Otros campos del usuario si los tienes
}

// Un array de objetos UserData para almacenar múltiples usuarios
export const users: UserData[] = [];
