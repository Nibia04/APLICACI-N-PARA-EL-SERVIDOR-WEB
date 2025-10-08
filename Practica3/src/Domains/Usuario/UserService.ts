import { UserRepository } from "./UserRepository.js";
import { User } from "./User.js";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Crear un nuevo usuario con validaciones
    async createUser(userData: {
        nombre: string;
        apellido: string;
        email: string;
        contraseña: string;
        direccion?: string;
        telefono?: string;
        rol?: string;
    }): Promise<User> {
        // Validar que el email no exista
        const emailExists = await this.userRepository.emailExists(userData.email);
        if (emailExists) {
            throw new Error('El email ya está registrado');
        }

        // Validar datos obligatorios
        if (!userData.nombre || !userData.apellido || !userData.email || !userData.contraseña) {
            throw new Error('Los campos nombre, apellido, email y contraseña son obligatorios');
        }

        // Asignar fecha de registro
        const userToCreate = {
            ...userData,
            fechaRegistro: new Date(),
            rol: userData.rol || 'cliente' // Rol por defecto
        };

        return await this.userRepository.create(userToCreate);
    }

    // Obtener todos los usuarios
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    // Obtener usuario por ID
    async getUserById(idUsuario: number): Promise<User> {
        const user = await this.userRepository.findById(idUsuario);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    // Obtener usuario por email
    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    // Obtener usuarios por rol
    async getUsersByRole(rol: string): Promise<User[]> {
        return await this.userRepository.findByRole(rol);
    }

    // Actualizar usuario
    async updateUser(idUsuario: number, userData: Partial<User>): Promise<User> {
        // Si se va a actualizar el email, verificar que no exista
        if (userData.email) {
            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser && existingUser.idUsuario !== idUsuario) {
                throw new Error('El email ya está registrado por otro usuario');
            }
        }

        const updatedUser = await this.userRepository.update(idUsuario, userData);
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    }

    // Eliminar usuario
    async deleteUser(idUsuario: number): Promise<void> {
        const deleted = await this.userRepository.delete(idUsuario);
        if (!deleted) {
            throw new Error('Usuario no encontrado');
        }
    }

    // Autenticar usuario (simulado)
    async authenticateUser(email: string, contraseña: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // En una aplicación real, aquí compararías el hash de la contraseña
        if (user.contraseña !== contraseña) {
            throw new Error('Credenciales inválidas');
        }

        return user;
    }

    // Obtener estadísticas de usuarios
    async getUserStats(): Promise<{ total: number; porRol: Record<string, number> }> {
        const allUsers = await this.userRepository.findAll();
        const total = allUsers.length;
        
        const porRol: Record<string, number> = {};
        allUsers.forEach(user => {
            if (user.rol) {
                porRol[user.rol] = (porRol[user.rol] || 0) + 1;
            }
        });

        return { total, porRol };
    }
}