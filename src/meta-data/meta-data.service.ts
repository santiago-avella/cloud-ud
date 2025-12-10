import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FileMetaData } from './schemas/file-metada.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MetadataBase } from 'src/storage/interfaces/metada-base.interface';

@Injectable()
export class MetaDataService {
    constructor(
        @InjectModel(FileMetaData.name)
        private readonly fileMetaDataModel: Model<FileMetaData>
    ){}


    async createFileMetaData(file_metadata: MetadataBase){
        const metadata = new this.fileMetaDataModel(file_metadata)
        console.log(metadata)
        try {
            await metadata.save()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
