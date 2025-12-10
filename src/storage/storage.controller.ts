import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PayloadUser } from 'src/auth/interfaces/payload-user.interface';
import { UploadFileDto } from './dtos/upload-file.dto';
import { CreateFolderDto } from './dtos/create-folder.dto';

@Controller('storage')
export class StorageController {
    constructor(
        private readonly storageService: StorageService
    ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtGuard)
    public async upload(@UploadedFile() file: Express.Multer.File, @Req() req: PayloadUser, @Body() uploadFileDto: UploadFileDto){
        return this.storageService.uploadFile(file, req.payload_user.id, uploadFileDto)
    }

    @Post('folder')
    @UseGuards(JwtGuard)
    public async createFolder(@Body() createFolderDto: CreateFolderDto, @Req() req: PayloadUser){
        return this.storageService.createFolder(createFolderDto, req.payload_user.id)
    }
}
