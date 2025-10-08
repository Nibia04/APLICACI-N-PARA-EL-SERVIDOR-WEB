import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { User } from "./User.js";

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    // Crear un nuevo usuario
    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    // Buscar todos los usuarios
    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    // Buscar usuario por ID
    async findById(idUsuario: number): Promise<User | null> {
        return await this.repository.findOne({ where: { idUsuario } });
    }

    // Buscar usuario por email
    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

    // Buscar usuarios por rol
    async findByRole(rol: string): Promise<User[]> {
        return await this.repository.find({ where: { rol } });
    }

    // Actualizar usuario
    async update(idUsuario: number, userData: Partial<User>): Promise<User | null> {
        await this.repository.update(idUsuario, userData);
        return await this.findById(idUsuario);
    }

    // Eliminar usuario
    async delete(idUsuario: number): Promise<boolean> {
        const result = await this.repository.delete(idUsuario);
        return result.affected ? result.affected > 0 : false;
    }

    // Verificar si existe un email
    async emailExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user !== null;
    }

    // Contar usuarios por rol
    async countByRole(rol: string): Promise<number> {
        return await this.repository.count({ where: { rol } });
    }
}