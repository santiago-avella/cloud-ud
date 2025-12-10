import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFile } from './interfaces/create-file.interface';
import { File } from './entities/file.entity';
import { CreateFolderDto } from 'src/storage/dtos/create-folder.dto';

@Injectable()
export class FileFolderService {

    constructor(
        @InjectRepository(Folder)
        private readonly folderProvider: Repository<Folder>,

        @InjectRepository(File)
        private readonly fileProvider: Repository<File>
    ) { }

    public async getFolder(idFolder: string) {
        return this.folderProvider.findOneBy({ id: idFolder })
    }

    public async createFile(createFile: CreateFile) {
        const file = this.fileProvider.create({
            ...createFile,
            folder: { id: createFile.folder_id }
        })
        try {
            await this.fileProvider.save(file)
        } catch (error) {
            throw new RequestTimeoutException('error en el registro del archivo')
        }
    }

    public async createFolder(createFolderDto: CreateFolderDto, idSpaceStorage: string) {
        const branchIndex = await this.folderProvider.count({
            where: {
                storage: { id: idSpaceStorage }
            }
        })
        const folder = this.folderProvider.create({
            name: createFolderDto.name,
            storage: { id: idSpaceStorage },
            ...(createFolderDto.parent_id && { parent: {id: createFolderDto.parent_id} }),
        })
        try {
            await this.folderProvider.save(folder)
            return {
            success: true,
            message: 'Carpeta creada correctamente'
        }
        } catch (error) {
            throw new RequestTimeoutException('Error en crear la carpeta')
        }
        
    }

}


